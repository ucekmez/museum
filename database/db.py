# database
from mongoengine import *
import datetime

connect('museumdbase', host='localhost', port=7779)

class Content(EmbeddedDocument):
    lang        = StringField(max_length=16, required=True)
    content     = StringField()

    meta        = {'indexes': [{'fields': ['$content']}]}

class Photo(EmbeddedDocument):
    source      = FileField()
    thumbnail   = StringField(max_length=512)
    description = ListField(EmbeddedDocumentField(Content))

class Voice(EmbeddedDocument):
    source      = FileField()
    description = ListField(EmbeddedDocumentField(Content))

class Video(EmbeddedDocument):
    source      = FileField()
    description = ListField(EmbeddedDocumentField(Content))

class Category(Document):
    name        = StringField(max_length=128, required=True)
    description = ListField(EmbeddedDocumentField(Content))

class Artifact(Document):
    title       = ListField(EmbeddedDocumentField(Content))
    qr_id       = StringField(max_length=32)
    ibeacon_id  = StringField(max_length=32)

    photos      = ListField(EmbeddedDocumentField(Photo))
    videos      = ListField(EmbeddedDocumentField(Video))
    voices      = ListField(EmbeddedDocumentField(Voice))

    category    = ReferenceField(Category, reverse_delete_rule=CASCADE)
    description = ListField(EmbeddedDocumentField(Content))
    tags        = ListField(StringField(max_length=32))
    extra       = ListField(EmbeddedDocumentField(Content))

    created_at  = DateTimeField(default=datetime.datetime.utcnow)

    meta        = {'allow_inheritance': True, 'ordering': ['-created_at']}
