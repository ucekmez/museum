import falcon
from db import *
from falcon_multipart.middleware import MultipartMiddleware
from falcon_cors import CORS

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
        doc = Media.objects(id=id).to_json(indent=2)
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
singlemedia    = FetchMedia()
allmedia       = FetchAllMedia()

api.add_route('/categories/{id}', singlecategory)
api.add_route('/categories', allcategories)
api.add_route('/artifacts/{id}', singleartifact)
api.add_route('/artifacts', allartifacts)
api.add_route('/media/{id}', singlemedia)
api.add_route('/media', allmedia)

################## CREATE

class CreateCategory(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read())
        title       = data['title']
        description = data['description']
        cat         = Category(title=title, description=description)
        cat.save()

        resp.body = "OK"

class CreateMedia(object):
    def on_post(self, req, resp):
        media       = req.get_param('media')
        media_raw   = media.file.read()
        media_name  = media.filename

        language    = str(req.get_param('language').value.decode('utf-8'))
        mediatype   = str(req.get_param('mediatype').value.decode('utf-8'))
        description = str(req.get_param('description').value.decode('utf-8'))
        artifact    = str(req.get_param('artifact').value.decode('utf-8'))

        med = Media(language=language, mediatype=mediatype, description=description, artifact=artifact)
        med.source.put(media_raw)
        med.save()

        resp.body = "OK"

class CreateArtifact(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read())
        qr_id       = data['qr_id']
        ibeacon_id  = data['ibeacon_id']
        category    = data['category'] # references to category
        tags        = data['tags']
        faved       = data['faved']

        title       = data['title']
        description = data['description']
        extra       = data['extra']

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
        data        = json.loads(req.stream.read())
        language    = data['language']
        title       = data['title']
        description = data['description']
        category    = data['category']


        cattrans    = CategoryTranslation(language=language, title=title, description=description, category=category)
        cattrans.save()

        resp.body = "OK"

class CreateArtifactTranslation(object):
    def on_post(self, req, resp):
        data        = json.loads(req.stream.read())
        language    = data['language']
        title       = data['title']
        description = data['description']
        category    = data['category']


        cattrans    = CategoryTranslation(language=language, title=title, description=description, category=category)
        cattrans.save()

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







# EOF
