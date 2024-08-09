import { useGetContactsQuery } from "../redux/contactApi"
import { Loader, Error, ContactsList } from "../components"

const Contacts = () => {
  const { contacts, isLoading, isError } = useGetContactsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      contacts: data ?? [],
      isLoading,
      isError,
    }),
  })

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
        {contacts.length > 0 ? (
          <ContactsList contacts={contacts} />
        ) : (
          <p className="text-center text-2xl">No contacts available.</p>
        )}
      </div>
    </div>
  )
}

export default Contacts
