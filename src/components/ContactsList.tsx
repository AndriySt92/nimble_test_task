import { ContactItem } from "../components"
import type { IContact } from "../interfaces/contactInterfaces"

interface Props {
  contacts: IContact[]
}

const ContactsList = ({ contacts }: Props) => {
  return (
    <>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  )
}

export default ContactsList
