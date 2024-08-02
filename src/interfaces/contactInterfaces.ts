interface FieldValue {
  label: string
  modifier: string
  value: string
}

interface Fields {
  'first name': FieldValue[];
  'last name': FieldValue[];
  email: FieldValue[];
}

interface ITags {
  id: string
  tag: string
}

export interface IContact {
  id: string
  avatar_url: string
  fields: Fields
  tags: ITags[]
}

interface Privacy {
  edit: null | string; 
  read: null | string;
}

export interface IContactFormData {
  fields: Fields;
  record_type: 'person'; 
  privacy: Privacy;
  owner_id: null | string; 
}
