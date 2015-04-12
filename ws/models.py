# ws/models.py

from django.db import models

class Static(models.Model):
    label = models.CharField(max_length=255)
    info = models.TextField()

    def __unicode__( self ):
        return "{0}".format(self.label)
    
class Tag(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    
    def __unicode__( self ):
        return "{0}, {1}".format(self.label, self.definition)
    
class Skill(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    champ = models.OneToOneField('Champion', null=True) # A skill has one champion -> OneToOneField
    tags = models.ForeignKey('Tag', null=True)          # A skill has many tags -> ForeignKey
    
    def __unicode__( self ):
        return "{0}, {1}".format(self.label, self.definition)
    
class Champion(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    relation_map = models.TextField()
    skills = models.ForeignKey('Skill', null=True)      # A champion has many skills -> ForeignKey
    
    def __unicode__( self ):
        return "{0}, {1}".format(self.label, self.definition)
    
class Relation(models.Model):
    definition = models.TextField()
    key1 = models.ForeignKey('Skill', null=True)        # A relation has two key skills -> ForeignKey
    
    def __unicode__( self ):
        return "{0}".format(self.definition)