// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { CategoryList, CategoryEdit, CategoryCreate } from './source';
import { ArtifactList, ArtifactEdit, ArtifactCreate } from './source';
import { MediaList, MediaEdit, MediaCreate } from './source';

const dataProvider = jsonServerProvider('http://localhost:8000');




const App = () => (
    <Admin dataProvider={dataProvider} >
        <Resource name="categories"
                  list={CategoryList}
                  edit={CategoryEdit}
                  create={CategoryCreate} />
        <Resource name="artifacts"
                  list={ArtifactList}
                  edit={ArtifactEdit}
                  create={ArtifactCreate} />
        <Resource name="media"
                  list={MediaList}
                  edit={MediaEdit}
                  create={MediaCreate} />
    </Admin>
);

export default App;
