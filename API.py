import falcon
from database.db import *
import msgpack

api = application = falcon.API()


################## READ

class FetchCategory(object):
    def on_get(self, req, resp, id):
        doc = Category.objects(id=id).to_json()
        resp.body = doc

class FetchAllCategories(object):
    def on_get(self, req, resp):
        doc = Category.objects().to_json()
        resp.body = doc

class FetchArtifact(object):
    def on_get(self, req, resp, id):
        doc = Artifact.objects(id=id).to_json()
        resp.body = doc

class FetchAllArtifact(object):
    def on_get(self, req, resp):
        doc = Artifact.objects().to_json()
        resp.body = doc

singlecategory = FetchCategory()
allcategories  = FetchAllCategories()
singleartifact = FetchArtifact()
allartifacts   = FetchAllArtifact()

api.add_route('/categories/{id}', singlecategory)
api.add_route('/categories', allcategories)
api.add_route('/artifacts/{id}', singleartifact)
api.add_route('/artifacts', allartifacts)

################## CREATE
class CreateCategory(object):
    def on_post(self, req, resp):
        data = json.loads(req.stream.read())

        # title lang options
        titles       = list(map(lambda x: Content(lang=x['lang'], content=x['content']), data['title']))
        # description lang options
        descriptions = list(map(lambda x: Content(lang=x['lang'], content=x['content']), data['description']))

        cat = Category(title=titles, description=descriptions)
        cat.save()

        resp.body = "OK"


createcategory = CreateCategory()

api.add_route('/categories/create', createcategory)







# EOF
