# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Champion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=255)),
                ('definition', models.TextField()),
                ('relation_map', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('definition', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=255)),
                ('definition', models.TextField()),
                ('champ', models.OneToOneField(null=True, to='ws.Champion')),
            ],
        ),
        migrations.CreateModel(
            name='Static',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=255)),
                ('definition', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=255)),
                ('definition', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='skill',
            name='tags',
            field=models.ForeignKey(to='ws.Tag', null=True),
        ),
        migrations.AddField(
            model_name='relation',
            name='key1',
            field=models.ForeignKey(to='ws.Skill', null=True),
        ),
        migrations.AddField(
            model_name='champion',
            name='skills',
            field=models.ForeignKey(to='ws.Skill', null=True),
        ),
    ]
