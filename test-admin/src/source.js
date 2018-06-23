import React from 'react';
import { Filter, List, Datagrid, TextField, ReferenceField, ChipField } from 'react-admin';
import { Edit, Create, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid key="id">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

const CategoryTitle = ({ record }) => {
    return <span>Category {record ? `"${record.title}"` : ''}</span>;
};

export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);

/////////////

const ArtifactFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Category" source="category" reference="categories" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
    </Filter>
);

export const ArtifactList = (props) => (
    <List {...props} filters={<ArtifactFilter />}>
        <Datagrid key="id">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <ReferenceField label="Category" source="category" reference="categories">
                <ChipField source="title" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

const ArtifactTitle = ({ record }) => {
    return <span>Artifact {record ? `"${record.title}"` : ''}</span>;
};

export const ArtifactEdit = (props) => (
    <Edit title={<ArtifactTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <ReferenceInput label="Category" source="category" reference="categories">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="qr_id" />
            <TextInput source="ibeacon_id" />

            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const ArtifactCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <ReferenceInput label="Category" source="category" reference="categories">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="qr_id" />
            <TextInput source="ibeacon_id" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);

/////////////

const MediaFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Artifact" source="artifact" reference="artifacts" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
    </Filter>
);

export const MediaList = (props) => (
    <List {...props} filters={<MediaFilter />}>
        <Datagrid key="id">
            <TextField source="id" />
            <TextField source="language" />
            <TextField source="mediatype" />
            <TextField source="description" />
            <ReferenceField label="Artifact" source="artifact" reference="artifacts">
                <ChipField source="title" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);


const MediaTitle = ({ record }) => {
    return <span>Media {record ? `"${record.id}"` : ''}</span>;
};

export const MediaEdit = (props) => (
    <Edit title={<MediaTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <TextInput source="language" />
            <TextInput source="mediatype" />
            <ReferenceInput label="Artifact" source="artifact" reference="artifacts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const MediaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="language" />
            <TextInput source="mediatype" />
            <ReferenceInput label="Artifact" source="artifact" reference="artifacts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <LongTextInput source="description" />
        </SimpleForm>
    </Create>
);




// EOF
