from django.contrib import admin

# Register your models here.
import models

admin.site.register(models.Static)
admin.site.register(models.Tag)
admin.site.register(models.Skill)
admin.site.register(models.Champion)
admin.site.register(models.Relation)