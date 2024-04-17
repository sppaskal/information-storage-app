const viewableAccountFields = [
    'id',
    'type_name',
    'email',
    'username',
    'password',
    'company',
    'website',
    'description',
    'date_created',
    'date_updated'
];

const editableAccountFields = [
    'type_name',
    'email',
    'username',
    'password',
    'company',
    'website',
    'description'
]

// Fields that need a popup on page load
const popupOnLoadFields = [
    'type_name'
]

export {
    viewableAccountFields,
    editableAccountFields,
    popupOnLoadFields
};