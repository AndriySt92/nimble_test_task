import React from "react"
import { useGetContactsQuery } from "../redux/contactApi"
import { Loader, Error, ContactsList } from "../components"
import { IContact } from "../interfaces/contactInterfaces"

const Contacts = () => {
  const { data: contacts, isLoading, isError } = useGetContactsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <Error
        className={"text-2xl text-center"}
        text="Ocurred some error with fetching contacts"
      />
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5 text-start">Create contact</h1>
      <div className="flex flex-col gap-5">
        <ContactsList contacts={contacts as IContact[]} />
      </div>
    </div>
  )
}

export default Contacts
