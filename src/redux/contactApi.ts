import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  IContact,
  IContactRequestData,
} from "../interfaces/contactInterfaces"

const BASE_URL = import.meta.env.VITE_BASE_URL
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN

export const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contacts"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      if (AUTH_TOKEN) {
        headers.set("Authorization", `Bearer ${AUTH_TOKEN}`)
      }
      return headers
    },
  }),

  endpoints: builder => ({
    addContact: builder.mutation<void, IContactRequestData>({
      query: contactFormData => ({
        url: "contact",
        method: "POST",
        body: contactFormData,
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),

    getContacts: builder.query<IContact[], void>({
      query: () => ({
        url: "contacts",
        method: "GET",
        params: {
          sort: 'created:desc',
        },
      }),
      transformResponse: (response: any) => response.resources,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Contacts", id }) as const),
              { type: "Contacts", id: "LIST" },
            ]
          : [{ type: "Contacts", id: "LIST" }],
    }),

    getContact: builder.query<IContact, string>({
      query: id => ({
        url: `contacts/${id}`,
      }),
      transformResponse: (response: any) => response.resources[0],
    }),

    deleteContact: builder.mutation<void, string>({
      query: id => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),

    addTag: builder.mutation<void, { id: string; tags: string[] }>({
      query: ({ id, tags }) => ({
        url: `contacts/${id}/tags`,
        method: "PUT",
        body: tags,
        invalidatesTags: [{ type: "Contacts", id: "LIST" }],
      }),
    }),
  }),
})

export const {
  useAddContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useDeleteContactMutation,
  useAddTagMutation,
} = contactApi
