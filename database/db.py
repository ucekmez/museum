from mongoengine import *
import datetime, json

connect('museumdbase', host='localhost', port=7779)

class Content(EmbeddedDocument):
    lang        = StringField(max_length=2, required=True)
    content     = StringField()
    meta        = {'indexes': [{'fields': ['$content']}]}

class Media(Document):
    lang        = StringField(max_length=2, required=True)
    source      = FileField()
    thumbnail   = FileField()
    mediatype   = StringField(max_length=8)
    description = StringField()

class Category(Document):
    title       = ListField(EmbeddedDocumentField(Content))
    description = ListField(EmbeddedDocumentField(Content))

class Artifact(Document):
    title       = ListField(EmbeddedDocumentField(Content))
    qr_id       = StringField(max_length=32)
    ibeacon_id  = StringField(max_length=32)
    media       = ListField(ReferenceField(Media))
    category    = ReferenceField(Category, reverse_delete_rule=CASCADE)
    description = ListField(EmbeddedDocumentField(Content))
    tags        = ListField(StringField(max_length=32))
    extra       = ListField(EmbeddedDocumentField(Content))
    created_at  = DateTimeField(default=datetime.datetime.utcnow)
    faved       = ListField(StringField(max_length=32)) # device_ids of users

    meta        = {'allow_inheritance': True, 'ordering': ['-created_at']}



#EOF
