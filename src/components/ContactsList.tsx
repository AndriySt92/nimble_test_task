import React from "react"
import { useGetContactsQuery } from "../redux/contactApi"
import { Loader, Error, ContactItem } from "../components"

const ContactsList = () => {
  const { data, isLoading, error, isError } = useGetContactsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error className={"text-2xl text-center"} text={error as string} />
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5 text-start">Create contact</h1>
      <div className="flex flex-col gap-5">
        {data?.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}

export default ContactsList
