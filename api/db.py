#!/usr/bin/python
# -*- coding: utf-8 -*-

from mongoengine import *
import datetime, json, requests, random, string
import mongoengine_goodjson as gj

connect('museumdbase', host='51.15.130.186', port=7779)

def generateID():
    return ''.join([random.choice(string.ascii_letters + string.digits) for n in range(8)])

class Language(gj.Document):
    title       = StringField(max_length=64, required=True)
    code        = StringField(required=True)

class Category(gj.Document):
    title       = StringField(max_length=64)
    description = StringField()
    created_at  = DateTimeField(default=datetime.datetime.utcnow)

    meta        = {'ordering': ['-created_at']}

class CategoryTranslation(gj.Document):
    category       = ReferenceField(Category, reverse_delete_rule=CASCADE)
    language_code  = StringField(max_length=4)
    language_title = StringField(max_length=16)
    title          = StringField(max_length=64)
    description    = StringField()
    meta           = {'indexes': [{'fields': ['$title', '$description']}]}


class Artifact(gj.Document):
    title       = StringField(max_length=64)
    qr_id       = StringField(max_length=32)
    ibeacon_id  = StringField(max_length=32)
    category    = ReferenceField(Category, reverse_delete_rule=CASCADE) # keeps category id
    description = StringField()
    isfeatured  = BooleanField(default=False)
    tags        = ListField(StringField(max_length=32))
    extra       = StringField()
    created_at  = DateTimeField(default=datetime.datetime.utcnow)
    faved       = ListField(StringField(max_length=32)) # device_ids of users

    meta        = {'allow_inheritance': True, 'ordering': ['-created_at'], 'strict': False}

class ArtifactTranslation(gj.Document):
    artifact       = ReferenceField(Artifact, reverse_delete_rule=CASCADE)
    language_code  = StringField(max_length=4)
    language_title = StringField(max_length=16)
    title          = StringField(max_length=64)
    description    = StringField()
    extra          = StringField()
    meta           = {'indexes': [{'fields': ['$title', '$description', '$extra']}]}


class Media(gj.Document):
    language    = StringField(max_length=2, required=True)
    source      = FileField()
    thumbnail   = FileField()
    mediatype   = StringField(max_length=8)
    header      = StringField(max_length=32)
    artifact    = ReferenceField(Artifact, reverse_delete_rule=CASCADE) # keeps artifact id
    description = StringField()

class Page(gj.Document):
    title       = StringField(max_length=64)
    content     = StringField()

class PageTranslation(gj.Document):
    page           = ReferenceField(Page, reverse_delete_rule=CASCADE)
    language_code  = StringField(max_length=4)
    language_title = StringField(max_length=16)
    title          = StringField(max_length=64)
    content        = StringField()
    meta           = {'indexes': [{'fields': ['$title', '$content']}]}

# create media
# requests.post('http://localhost:8000/media/create/',
#              files={'media': open('nophoto.png', 'rb'),
#                     'lang': 'tr', 'mediatype': 'image',
#                     'description':'tanimlama tanimlama tanimlama', 'artifact': 'some_artifact_id'}).content
#
# show created media
# import PIL.Image, io
# image = Image.open(io.BytesIO(Media.objects()[0].source.read())).save('concon.png')
#
# create category
# requests.post('http://localhost:8000/categories/create/',
#              data=json.dumps({'title':
#                               [{'lang': 'tr', 'content': 'title_req_turkce'},
#                                {'lang': 'en', 'content': 'title_req_ingilizce'}],
#                                'description':
#                               [{'lang': 'tr', 'content': 'description_req_turkce'},
#                                {'lang': 'en', 'content': 'description_req_ingilizce'}]}),
#              headers={'Content-Type': 'application/json'}).content
#
# create artifact
# payload = {'title': [{'lang': 'tr', 'content': 'title_req_turkce'},
#                     {'lang': 'en', 'content': 'title_req_ingilizce'}],
#           'qr_id': '7456789kjnbvgh',
#           'ibeacon_id': '83hfmmhgfiefmef',
#           'category': '5b2957af704cdc675e144cb2',
#           'description': [{'lang': 'tr', 'content': 'description_req_turkce'},
#                           {'lang': 'en', 'content': 'description_req_ingilizce'}],
#           'tags': ['tag1', 'tag2', 'tag3', 'tag4'],
#           'extra': [{'lang': 'tr', 'content': 'extra_extra_description_req_turkce'},
#                     {'lang': 'en', 'content': 'extra_extra_description_req_ingilizce'}],
#           'faved': ['user1_device_id', 'user2_device_id', 'user3_device_id']}
# requests.post('http://localhost:8000/artifacts/create/', data=json.dumps(payload)).content
