# A very good explaination of model relationships
# http://agiliq.com/blog/2010/01/doing-things-with-django-models-aka-django-models-/ 

# ws/models.py

from django.db import models

class Static(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()

    def __unicode__( self ):
        return "{0}".format(self.label)
    
class Tag(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    
    def __unicode__( self ):
        return "{0}".format(self.label)
    
class Skill(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    key = models.CharField(max_length=32)
    champ = models.ForeignKey('Champion', null=True)
    tags = models.ManyToManyField('Tag', null=True)
    
    def __unicode__( self ):
        return "{0}".format(self.label)
    
class Relation(models.Model):
    type = models.TextField(null=True)
    definition = models.TextField()
    champs = models.ManyToManyField('Champion', null=True)
    
    def __unicode__( self ):
        return "{0}, {1}".format(self.type, self.definition)
    
class Champion(models.Model):
    label = models.CharField(max_length=255)
    definition = models.TextField()
    
    def __unicode__( self ):
        return "{0}".format(self.label)
    