# ws/views.py

from django.http import HttpResponse
from django.http import HttpResponseRedirect
import json
from lolcomp.helpers import *
import os
import requests
from ws.models import *


# retrieve constants for app sitedown
def cst_sitedown(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'jarvan': im_jarvan(),
        }
        
        if(post['test'] == 'wuju'):
            data['compromised'] = True
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")


# retrieve constants for app main
def cst_main(request):
    if request.method == 'POST':
        
        # Get Lolcomp Analysis Report
        query_set = Static.objects.filter(label=CST['lolcomp_analyzed_champs'])
        if(query_set):
            report = json.loads(query_set[0].definition)
        else:
            report = 'error'
            
        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'lolcomp_report': report,
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# retrieve constants for app internal
def cst_internal(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        data = {
            'static_url': os.environ.get('DJANGO_STATIC_HOST', False),
            'type': {
                'synergy': CST['synergy'],
                'counter': CST['counter']
            }
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# get/set config data singleton
def rw_static_def(request):
    if request.method == 'POST':
        '''
        expected_object = {
            label: "config",
            mode: "write",
            data: data_to_write
        }
        '''
        post = json.loads(request.body)
        singleton = post['label']
        data_to_write = post.get('data', {})
        create_new_flag = False
        
        if(post['mode'] == 'read'):
            try:
                query_set = Static.objects.filter(label=CST[singleton])
                data = json.loads(query_set[0].definition)
            except:
                create_new_flag = True
                data = data_to_write
        elif(post['mode'] == 'write'):
            # overwrite the previous data
            try:
                query_set = Static.objects.filter(label=CST[singleton])
                obj = query_set[0]
                obj.definition = json.dumps(data_to_write)
                obj.save()
            except:
                create_new_flag = True
                
            data = {
                'status': "success - wrote " + CST[singleton],
            }
            
        if(create_new_flag == True):
            static_create({
                'label': CST[singleton],
                'definition': json.dumps(data_to_write)
            })
            
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# send a request to riot api
def riot_api_request(request):
    if request.method == 'POST':
        post = json.loads(request.body)

        settings = {
            'api_key': os.environ.get('RIOT_API_KEY', '')
        }
        for p in post['params']:
            settings[p] = post['params'][p]
        
        r = requests.get(API[post['url']], params=settings)

        data = {
            'status': r.status_code,
            'data': r.json()
        }
        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
    
    
# update the static data champ singleton
def update_champs_data(request):
    if request.method == 'POST':
        # Make call to Riot API for all champ data
        settings = {
            'champData': 'all',
            'api_key': os.environ.get('RIOT_API_KEY', '')
        }

        url = API['static_data']
        r = requests.get(url, params=settings)
        champ_data = r.json()

        data = {
            'status': r.status_code,
            'patch': champ_data.get('version', 'error'),
        }
        if data['patch'] == 'error':
            data['response'] = r.json()
        else:
            # Record to DB
            query_set = Static.objects.filter(label=CST['champ_data'])
            if(query_set):
                static_obj = query_set[0]
                static_obj.definition = json.dumps(champ_data)
                static_obj.save()
            else:
                static_obj = Static(label=CST['champ_data'], definition=json.dumps(champ_data))
                static_obj.save()
        
            # overwrite the previous data
            champion_db = Champion.objects.all()
            if champion_db:
                champion_db.delete()

            skill_db = Skill.objects.all()
            if skill_db:
                skill_db.delete()
            
            for info in champ_data['data'].itervalues():
                obj = Champion(label=info['name'], definition=json.dumps(info))
                obj.save()
                map = ["Q", "W", "E", "R"]
                for i, skill in enumerate(info['spells']):
                    if(i<4):
                        obj_skill = Skill(label=skill['name'], definition=json.dumps(skill))
                        obj_skill.key = map[i]
                        obj_skill.champ = obj
                        obj_skill.save()
                obj_passive = Skill(label=info['passive']['name'], definition=json.dumps(info['passive']))
                obj_passive.champ = obj
                obj_passive.key = "Passive"
                obj_passive.save()

        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")


# generate relation objects for each relation rule
def apply_rules_to_db(request):
    if request.method == 'POST':
        data = {
            "status": 200
        }

        # Apply Tag Rules
        Tag.objects.all().delete()
        obj = Static.objects.filter(label=CST['tag_defs'])
        if(obj):
            # create a tag obj in db for each rule
            tag_defs = json.loads(obj[0].definition)
            for rule in tag_defs:
                new_tag = Tag(label=rule['label'], definition=json.dumps(rule))
                new_tag.save()
            # loop over each champion's skill and apply the tags accordingly
            for champ_obj in Champion.objects.all():
                for skill in champ_obj.skill_set.all():
                    skill_def = json.loads(skill.definition)
                    if(skill.key == 'Passive'):
                        info = skill_def['sanitizedDescription']
                    else:
                        info = skill_def['sanitizedTooltip']

                    for rule in tag_defs:
                        status = check_if_tag_qualifies(rule['key_words'], info)
                        if(status == True):
                            new_obj = Tag.objects.filter(label=rule['label'])
                            skill.tags.add(new_obj[0])

        # Apply Relation Rules
        Relation.objects.all().delete()
        obj = Static.objects.filter(label=CST['relation_defs'])
        if(obj):
            relation_defs = json.loads(obj[0].definition)
            for rule in relation_defs:
                # check if tag or exception
                type_k1 = rule['k1']['obj_type']
                type_k2 = rule['k2']['obj_type']
                
                skill_obj_k1 = [] # array of champ_objs
                skill_obj_k2 = [] 
                rel_def = {}      # { champ : skill }
                # case 1: k1=exception to k2=exception
                if (type_k1 == 'exception') and (type_k2 == 'exception'):
                    # k1
                    champ_obj = Champion.objects.filter(label=rule['k1']['data']['champ'])
                    skill_obj = Skill.objects.filter(key=rule['k1']['data']['skill'], champ=champ_obj)[0]
                    skill_obj_k1.append(skill_obj)
                    
                    # k2
                    champ_obj = Champion.objects.filter(label=rule['k2']['data']['champ'])
                    skill_obj = Skill.objects.filter(key=rule['k2']['data']['skill'], champ=champ_obj)[0]
                    skill_obj_k2.append(skill_obj)
                # case 2: k1=exception to k2=tag
                if (type_k1 == 'exception') and (type_k2 == 'tag'):
                    # k1
                    champ_obj = Champion.objects.filter(label=rule['k1']['data']['champ'])
                    skill_obj = Skill.objects.filter(key=rule['k1']['data']['skill'], champ=champ_obj)[0]
                    skill_obj_k1.append(skill_obj)
                    
                    # k2
                    tag_obj = Tag.objects.filter(label=rule['k2']['data'])[0]
                    for skill_obj in tag_obj.skill_set.all():
                        skill_obj_k2.append(skill_obj)
                        

                # case 3: k1=tag   to k2=exception
                if (type_k1 == 'tag') and (type_k2 == 'exception'):
                    # k1
                    tag_obj = Tag.objects.filter(label=rule['k1']['data'])[0]
                    for skill_obj in tag_obj.skill_set.all():
                        skill_obj_k1.append(skill_obj)
                        
                    # k2
                    champ_obj = Champion.objects.filter(label=rule['k2']['data']['champ'])
                    skill_obj = Skill.objects.filter(key=rule['k2']['data']['skill'], champ=champ_obj)[0]
                    skill_obj_k2.append(skill_obj)

                # case 4: k1=tag   to k2=tag
                if (type_k1 == 'tag') and (type_k2 == 'tag'):
                    # k1
                    tag_obj = Tag.objects.filter(label=rule['k1']['data'])[0]
                    for skill_obj in tag_obj.skill_set.all():
                        skill_obj_k1.append(skill_obj)
                        
                    # k2
                    tag_obj = Tag.objects.filter(label=rule['k2']['data'])[0]
                    for skill_obj in tag_obj.skill_set.all():
                        skill_obj_k2.append(skill_obj)
                
                # create a new relation between champ_i and champ_j
                for skill_k1 in skill_obj_k1:
                    for skill_k2 in skill_obj_k2:
                            
                        rel_def = {
                            "label": rule['label'],
                            "k1": {
                                "name": skill_k1.champ.label,
                                "key": skill_k1.key
                            },
                            "k2": {
                                "name": skill_k2.champ.label,
                                "key": skill_k2.key
                            },
                            'description': rule['description']
                        }
                        new_rule = Relation(definition=json.dumps(rel_def), type=rule['type'])
                        new_rule.save()
                        new_rule.champs.add(skill_k1.champ)
                        new_rule.champs.add(skill_k2.champ)  
                        
        # Build the relation map for each champ
        relation_map = {}
        for champ_obj in Champion.objects.all():
            # create a synergy and counter tree for each champion
            relation_map[champ_obj.label] = {CST['synergy']:{}, CST['counter']:{}}
            for rel_obj in Relation.objects.filter(champs=champ_obj):
                # add each relation to the correct type tree under the partner's name
                info = json.loads(rel_obj.definition)
                if champ_obj.label == info['k1']['name']:
                    other_champ_name = info['k2']['name']
                else:
                    other_champ_name = info['k1']['name']
                    
                relation_list = relation_map[champ_obj.label][rel_obj.type].get(other_champ_name, False)
                if (not relation_list):
                    relation_map[champ_obj.label][rel_obj.type][other_champ_name] = []
                relation_map[champ_obj.label][rel_obj.type][other_champ_name].append(info)
                        
        # Write Lolcomp relation map to singleton
        prev = Static.objects.filter(label=CST['lolcomp_analyzed_champs'])
        if(prev):
            prev[0].delete()
        report = Static(label=CST['lolcomp_analyzed_champs'], definition=json.dumps(relation_map))
        report.save()
                        
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")