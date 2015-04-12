# lolcomp/helpers.py

from ws.models import *
import os

# CONSTANTS
CST = {
    'champ_data': 'Champ_Data',
    'tag_defs': 'Tag_Definitions',
    'relation_defs': 'Relation_Definitions',
    'urf_matches': 'Urf_Matches',
    'region': os.environ.get('DEFAULT_REGION', ''),
    'ver': os.environ.get('DEFAULT_VERSION', ''),
    'protocol': 'https',
    'host': 'global.api.pvp.net'
}

API = {
    'static_data': CST['protocol']+'://'+CST['host']+'/api/lol/static-data/'+CST['region']+CST['ver']+'champion'
}

# Helper Fn
def im_jarvan():
    return 'im helping'

def static_create(arg):
    new_singleton = Static(label=arg['label'], definition=arg['definition'])
    new_singleton.save()
    return