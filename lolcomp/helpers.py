# lolcomp/helpers.py

from ws.models import *
import os, re, json

# CONSTANTS
CST = {
    'config': 'Config',
    'champ_list': 'Champ_List',
    'tag_defs': 'Tag_Definitions',
    'relation_defs': 'Relation_Definitions',
    'urf_matches': 'Urf_Matches',
    'synergy': 'Synergy',
    'counter': 'Counter',
    'static': 'Static',
    'tag': 'Tag',
    'exception': 'Exception',
    'region': os.environ.get('DEFAULT_REGION', ''),
    'ver': os.environ.get('DEFAULT_VERSION', ''),
    'protocol': 'https',
    'host': 'global.api.pvp.net',
    'host_urf': 'na.api.pvp.net'
}

API = {
    'static_data': CST['protocol']+'://'+CST['host']+'/api/lol/static-data/'+CST['region']+CST['ver']+'champion',
    'api_challenge': CST['protocol']+'://'+CST['host_urf']+'/api/lol/'+CST['region']+'v4.1/game/ids'
}

# Helper Fn
def im_jarvan():
    return 'im helping'

def static_create(arg):
    new_singleton = Static(label=arg['label'], definition=arg['definition'])
    new_singleton.save()
    return

def get_info(champ, skill):
    champ = Champion.objects.filter(label=champ)[0]
    if(skill == 4):
        info_label = 'sanitizedDescription'
    else:
        info_label = 'sanitizedTooltip'
    info = json.loads(champ.skill_set.all()[skill].definition)[info_label]
        
    if(type(skill) == int):
        return info
    else:
        return champ

# from lolcomp.helpers import *; check_if_tag_qualifies(rule, info)
def check_if_tag_qualifies(rule, info):
    found = False
    for part in re.split(', *', rule):
        found_part = True
        for needle in re.split(' *AND *', part):
            match = re.search(needle, info)
            if(not match):
                found_part = False
                
            if found_part:
                found = True
                        
    return found