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

class FetchLanguage(object):
    def on_get(self, req, resp, id):
        doc = Language.objects(id=id).to_json(indent=2)
        resp.body = doc

class FetchAllLanguages(object):
    def on_get(self, req, resp):
        result = Language.objects()
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

class FetchMediaObject(object):
    def on_get(self, req, resp, id):
        doc = Media.objects(id=id).to_json(indent=2)
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
        img = doc.thumbnail.read()

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

class FetchCategoryTranslations(object):
    def on_get(self, req, resp, id):
        doc = CategoryTranslation.objects(category=id).to_json(indent=2)
        resp.body = doc

class FetchSingleCategoryTranslation(object):
    def on_get(self, req, resp, id):
        doc = CategoryTranslation.objects(id=id).to_json(indent=2)
        resp.body = doc

class FetchArtifactTranslations(object):
    def on_get(self, req, resp, id):
        doc = ArtifactTranslation.objects(artifact=id).to_json(indent=2)
        resp.body = doc

class FetchSingleArtifactTranslation(object):
    def on_get(self, req, resp, id):
        doc = ArtifactTranslation.objects(id=id).to_json(indent=2)
        resp.body = doc

singlecategory = FetchCategory()
allcategories  = FetchAllCategories()
singlelanguage = FetchLanguage()
alllanguages   = FetchAllLanguages()
singleartifact = FetchArtifact()
allartifacts   = FetchAllArtifact()
allmedia       = FetchAllMedia()
singlemedia    = FetchMedia()
mediaobject    = FetchMediaObject()
singlethumb    = FetchMediaThumb()
allmedia       = FetchAllMedia()
artifactmedia  = FetchArtifactMedia()
categorytranslations      = FetchCategoryTranslations()
singlecategorytranslation = FetchSingleCategoryTranslation()
artifacttranslations      = FetchArtifactTranslations()
singleartifacttranslation = FetchSingleArtifactTranslation()


api.add_route('/categories/{id}', singlecategory)
api.add_route('/categories', allcategories)
api.add_route('/categorytranslations/{id}', categorytranslations)
api.add_route('/categorytranslation/{id}', singlecategorytranslation)
api.add_route('/languages/{id}', singlelanguage)
api.add_route('/languages', alllanguages)
api.add_route('/artifacts/{id}', singleartifact)
api.add_route('/artifacts', allartifacts)
api.add_route('/artifacts/{id}/media', artifactmedia)
api.add_route('/artifacttranslations/{id}', artifacttranslations)
api.add_route('/artifacttranslation/{id}', singleartifacttranslation)
api.add_route('/media/{id}', mediaobject)
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


class CreateCategoryTranslation(object):
    def on_post(self, req, resp, id):
        data          = json.loads(req.stream.read().decode("utf-8"))
        category      = id
        language      = data['language'] # lang id geliyor
        title         = data['title']
        description   = data['description']

        lang = Language.objects(id=language)[0]

        cattrans    = CategoryTranslation(language_code=lang.code,
                                          language_title=lang.title,
                                          title=title,
                                          description=description,
                                          category=category)
        cattrans.save()

        resp.body = "OK"

class CreateLanguage(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        title       = data['title']       if 'title' in data and data['title'] != "" else "Belirtilmedi!"
        code        = data['code']        if 'code' in data else "yok"
        lang        = Language(title=title, code=code)
        lang.save()

        resp.body = "OK"


class CreateMedia(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))['data']

        mediatype   = data['mediatype'] or "image"
        language    = data['language'] or "tr"
        artifact    = data['artifact']
        description = data['description']
        media       = data['media'].split(",")[1] if data['media'] else ""
        header      = data['media'].split(",")[0] + "," if data['media'] else ""

        med = Media(language=language, mediatype=mediatype, description=description, artifact=artifact, header=header)
        #rawdata     = base64.decodestring(media.encode())
        med.source.put(media.encode())
        med.save()


        with open("/tmp/{}.png".format(med.id), "wb") as f:
            f.write(base64.decodebytes(med.source.read()))
        tmp_img   = Image.open("/tmp/{}.png".format(med.id))
        tmp_img.thumbnail((256, 256))
        tmp_img.save("/tmp/{}_thumb.png".format(med.id))
        with open("/tmp/{}_thumb.png".format(med.id), "rb") as f:
            med.thumbnail.put(f, content_type='image/png')
            med.save()


        resp.body = med.to_json()

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

class CreateArtifactTranslation(object):
    def on_post(self, req, resp, id):
        data          = json.loads(req.stream.read().decode("utf-8"))
        artifact      = id
        language      = data['language'] # lang id geliyor
        title         = data['title']
        description   = data['description']
        extra         = data['extra']

        lang = Language.objects(id=language)[0]


        arttrans    = ArtifactTranslation(language_code=lang.code,
                                          language_title=lang.title,
                                          title=title,
                                          description=description,
                                          artifact=artifact)
        arttrans.save()

        resp.body = "OK"

createcategory = CreateCategory()
createlanguage = CreateLanguage()
createmedia    = CreateMedia()
createartifact = CreateArtifact()
createcategorytranslation = CreateCategoryTranslation()
createartifacttranslation = CreateArtifactTranslation()


api.add_route('/categories/create', createcategory)
api.add_route('/languages/create', createlanguage)
api.add_route('/categorytranslations/create/{id}', createcategorytranslation)
api.add_route('/media/create', createmedia)
api.add_route('/artifacts/create', createartifact)
api.add_route('/artifacttranslations/create/{id}', createartifacttranslation)




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


class EditCategoryTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']
        title       = data['title'] if data['title'] != "" else "Başlık yok!"
        description = data['description']
        language    = data['language']

        try:
            found   = CategoryTranslation.objects(id=id)
            found.update(set__title=title)
            found.update(set__description=description)

            lang   = Language.objects(id=language)

            found.update(set__language_code=lang[0].code)
            found.update(set__language_title=lang[0].title)

            resp.body = "OK"
        except:
            resp.body = "ERROR"

class EditLanguage(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']
        title       = data['title'] if data['title'] != "" else "Belirtilmedi!"
        code        = data['code']

        try:
            found             = Language.objects(id=id)
            found.update(set__title=title)
            found.update(set__code=code)


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
        extra       = data['extra']

        tags        = list(filter(lambda t: len(t)> 0, tags))
        try:
            found = Artifact.objects(id=id)
            found.update(set__title=title)
            found.update(set__qr_id=qr_id)
            found.update(set__ibeacon_id=ibeacon_id)
            found.update(set__tags=tags)
            found.update(set__description=description)
            found.update(set__extra=extra)

            cat = Category.objects(id=category)
            found.update(set__category=cat[0].id)

            resp.body = "OK"
        except:
            resp.body = "ERROR"


class EditArtifactTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']
        title       = data['title'] if data['title'] != "" else "Başlık yok!"
        description = data['description']
        extra       = data['extra']
        language    = data['language']

        try:
            found   = ArtifactTranslation.objects(id=id)
            found.update(set__title=title)
            found.update(set__description=description)
            found.update(set__extra=extra)

            lang   = Language.objects(id=language)

            found.update(set__language_code=lang[0].code)
            found.update(set__language_title=lang[0].title)

            resp.body = "OK"
        except:
            resp.body = "ERROR"



editcategory    = EditCategory()
editlanguage    = EditLanguage()
editartifact    = EditArtifact()
editcategoryt   = EditCategoryTranslation()
editartifactt   = EditArtifactTranslation()


api.add_route('/categories/edit', editcategory)
api.add_route('/categorytranslations/edit', editcategoryt)
api.add_route('/languages/edit', editlanguage)
api.add_route('/artifacts/edit', editartifact)
api.add_route('/artifacttranslations/edit', editartifactt)


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

class RemoveCategoryTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = CategoryTranslation.objects(id=id)
            found.delete()
            resp.body = "OK"
        except:
            resp.body = "ERROR"

class RemoveLanguage(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = Language.objects(id=id)
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

class RemoveArtifactTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read().decode("utf-8"))
        id          = data['id']

        try:
            found       = ArtifactTranslation.objects(id=id)
            found.delete()
            resp.body = "OK"
        except:
            resp.body = "ERROR"

removecategory  = RemoveCategory()
removecategoryt = RemoveCategoryTranslation()
removelanguage  = RemoveLanguage()
removeartifact  = RemoveArtifact()
removemedia     = RemoveMedia()
removeartifactt = RemoveArtifactTranslation()


api.add_route('/categories/remove', removecategory)
api.add_route('/categorytranslations/remove', removecategoryt)
api.add_route('/languages/remove', removelanguage)
api.add_route('/artifacts/remove', removeartifact)
api.add_route('/media/remove', removemedia)
api.add_route('/artifacttranslations/remove', removeartifactt)

# EOF
