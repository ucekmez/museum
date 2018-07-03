import falcon
from db import *
from falcon_multipart.middleware import MultipartMiddleware
from falcon_cors import CORS
import base64
from PIL import Image
import numpy as np
import io

cors = CORS(allow_all_origins=True,
            allow_all_headers=True,
            allow_all_methods=True,
            allow_credentials_all_origins=True,
            expose_headers_list=["X-Total-Count", "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"]
            )

api = application = falcon.API(middleware=[MultipartMiddleware(), cors.middleware])


################## READ

class FetchCategory(object):
    def on_get(self, req, resp, id):
        doc = Category.objects(id=id).to_json(indent=2)
        resp.body = doc

class FetchAllCategories(object):
    def on_get(self, req, resp):
        result = Category.objects()
        doc    = result.to_json(indent=2)
        count  = result.count()
        resp.set_header('X-Total-Count', count)
        resp.body = doc

class FetchArtifact(object):
    def on_get(self, req, resp, id):
        doc = Artifact.objects(id=id).to_json(indent=2)
        resp.body = doc

class FetchAllArtifact(object):
    def on_get(self, req, resp):
        result = Artifact.objects()
        doc    = result.to_json(indent=2)
        count  = result.count()
        resp.set_header('X-Total-Count', count)
        resp.body = doc

class FetchMedia(object):
    def on_get(self, req, resp, id):
        doc = Media.objects(id=id)[0]
        img = base64.decodestring(doc.source.read())

        resp.content_type = 'image/png'
        resp.body = img

class FetchMediaThumb(object):
    def on_get(self, req, resp, id):
        doc = Media.objects(id=id)[0]
        img = base64.decodestring(doc.thumbnail.read())

        resp.content_type = 'image/png'
        resp.body = img

class FetchAllMedia(object):
    def on_get(self, req, resp, id):
        doc = Media.objects(id=id).to_json(indent=2)
        resp.body = doc

class FetchArtifactMedia(object):
    def on_get(self, req, resp, id):
        doc = Media.objects(artifact=id).to_json(indent=2)
        resp.body = doc

class FetchAllMedia(object):
    def on_get(self, req, resp):
        result = Media.objects()
        doc    = result.to_json(indent=2)
        count  = result.count()
        resp.set_header('X-Total-Count', count)
        resp.body = doc


singlecategory = FetchCategory()
allcategories  = FetchAllCategories()
singleartifact = FetchArtifact()
allartifacts   = FetchAllArtifact()
allmedia       = FetchAllMedia()
singlemedia    = FetchMedia()
singlethumb    = FetchMediaThumb()
allmedia       = FetchAllMedia()
artifactmedia  = FetchArtifactMedia()


api.add_route('/categories/{id}', singlecategory)
api.add_route('/categories', allcategories)
api.add_route('/artifacts/{id}', singleartifact)
api.add_route('/artifacts', allartifacts)
api.add_route('/artifacts/{id}/media', artifactmedia)
api.add_route('/media/{id}', singlemedia)
api.add_route('/mediashow/{id}', singlemedia)
api.add_route('/thumbshow/{id}', singlethumb)
api.add_route('/media', allmedia)

################## CREATE

class CreateCategory(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        title       = data['title']       if 'title' in data and data['title'] != "" else "Başlık yok!"
        description = data['description'] if 'description' in data else ""
        cat         = Category(title=title, description=description)
        cat.save()

        resp.body = "OK"

class CreateMedia(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))['data']

        mediatype   = data['mediatype'] or "image"
        language    = data['language'] or "tr"
        artifact    = data['artifact']
        description = data['description']
        media       = data['media'].split(",")[1] if data['media'] else ""
        thumbnail   = data['thumbnail'].split(",")[1] if data['thumbnail'] else ""
        header      = data['media'].split(",")[0] + "," if data['media'] else ""

        med = Media(language=language, mediatype=mediatype, description=description, artifact=artifact, header=header)
        #rawdata     = base64.decodestring(media.encode())
        med.source.put(media.encode())
        try:
            med.thumbnail.put(thumbnail.encode())
        except:
            pass
        med.save()

        resp.body = str(med.id)#header+med.source.read().decode()

class CreateArtifact(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        qr_id       = data['qr_id']       if 'qr_id' in data else ""
        ibeacon_id  = data['ibeacon_id']  if 'ibeacon_id' in data else ""
        category    = data['category'] # references to category
        tags        = data['tags']        if 'tags' in data else ""
        faved       = data['faved']       if 'faved' in data else ""

        title       = data['title']       if 'title' in data and data['title'] != "" else "Başlık yok!"
        description = data['description'] if 'description' in data else ""
        extra       = data['extra']       if 'extra' in data else ""

#       list(map(lambda x: Content(language=x['language'], content=x['content']), data['extra']))

        art = Artifact(title=title,
                       qr_id=qr_id,
                       ibeacon_id=ibeacon_id,
                       category=category,
                       description=description,
                       tags=tags,
                       extra=extra)
        art.save()

        resp.body = "OK"


class CreateCategoryTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        language    = data['language']
        title       = data['title']
        description = data['description']
        category    = data['category']


        cattrans    = CategoryTranslation(language=language,
                                          title=title,
                                          description=description,
                                          category=category)
        cattrans.save()

        resp.body = "OK"

class CreateArtifactTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        language    = data['language']
        title       = data['title']
        description = data['description']
        extra       = data['extra']
        artifact    = data['artifact']

        arttrans    = ArtifactTranslation(language=language,
                                          title=title,
                                          description=description,
                                          extra=extra,
                                          artifact=artifact)
        arttrans.save()

        resp.body = "OK"


createcategory = CreateCategory()
createmedia    = CreateMedia()
createartifact = CreateArtifact()
createcategorytranslation = CreateCategoryTranslation()
createartifacttranslation = CreateArtifactTranslation()


api.add_route('/categories/create', createcategory)
api.add_route('/categories/translation/create', createcategorytranslation)
api.add_route('/media/create', createmedia)
api.add_route('/artifacts/create', createartifact)
api.add_route('/artifacts/translation/create', createartifacttranslation)




################


class EditCategory(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']
        title       = data['title'] if data['title'] != "" else "Başlık yok!"
        description = data['description']

        try:
            found             = Category.objects(id=id)
            found.update(set__title=title)
            found.update(set__description=description)


            resp.body = "OK"
        except:
            resp.body = "ERROR"

class EditArtifact(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']
        title       = data['title'] if data['title'] != "" else "Başlık yok!"
        qr_id       = data['qr_id']
        ibeacon_id  = data['ibeacon_id']
        category    = data['category']
        tags        = data['tags']
        description = data['description']

        tags        = list(filter(lambda t: len(t)> 0, tags))
        try:
            found = Artifact.objects(id=id)
            found.update(set__title=title)
            found.update(set__qr_id=qr_id)
            found.update(set__ibeacon_id=ibeacon_id)
            found.update(set__tags=tags)
            found.update(set__description=description)

            cat = Category.objects(id=category)
            found.update(set__category=cat[0].id)

            resp.body = "OK"
        except:
            resp.body = "ERROR"


editcategory    = EditCategory()
editartifact    = EditArtifact()


api.add_route('/categories/edit', editcategory)
api.add_route('/artifacts/edit', editartifact)

################


class RemoveCategory(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = Category.objects(id=id)
            found.delete()
            resp.body = "OK"
        except:
            resp.body = "ERROR"

class RemoveArtifact(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = Artifact.objects(id=id)
            try:
                found.delete()
                resp.body = "OK"
            except:
                resp.body = "ERROR"
        except:
            resp.body = "NOOBJ"

class RemoveMedia(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = Media.objects(id=id)
            try:
                found.delete()
                resp.body = "OK"
            except:
                resp.body = "ERROR"
        except:
            resp.body = "NOOBJ"



removecategory = RemoveCategory()
removeartifact = RemoveArtifact()
removemedia    = RemoveMedia()


api.add_route('/categories/remove', removecategory)
api.add_route('/artifacts/remove', removeartifact)
api.add_route('/media/remove', removemedia)

# EOF
