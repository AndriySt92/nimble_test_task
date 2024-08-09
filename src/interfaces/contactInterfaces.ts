interface IFieldValue {
  label: string
  modifier: string
  value: string
}

export interface IFields {
  "first name"?: IFieldValue[]
  "last name"?: IFieldValue[]
  email: IFieldValue[]
}

export interface ITags {
  id: string
  tag: string
}

export interface ICreateTagsRequestData {
  id: string
  body: { tags: string[] }
}

export interface IContact {
  id: string
  avatar_url: string
  fields: IFields
  tags: ITags[]
}

interface Privacy {
  edit: null | string
  read: null | string
}

export interface IContactFormData {
  email: string
  firstName: string
  lastName: string
}

export interface IContactRequestData {
  fields: IFields
  record_type: "person"
  privacy: Privacy
  owner_id: null | string
}

export interface IApiError {
  data?: {
    message?: string
  }
}

export interface IGetContactsResponse {
  resources: IContact[]
}

export interface IGetContactResponse {
  resources: [IContact]
}
