# ws/models.py

from django.db import models

class Static(models.Model):
    label = models.CharField(max_length=255)
    info = models.TextField()

class Tag(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    
class Skill(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    champ = models.OneToOneField('Champion')        # A skill has one champion -> OneToOneField
    tags = models.ForeignKey('Tag')                 # A skill has many tags -> ForeignKey
    
class Champion(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    relation_map = models.TextField()
    skills = models.ForeignKey('Skill')             # A champion has many skills -> ForeignKey
    
class Relation(models.Model):
    definition = models.TextField()
    key1 = models.ForeignKey('Skill')               # A relation has two key skills -> ForeignKey
    