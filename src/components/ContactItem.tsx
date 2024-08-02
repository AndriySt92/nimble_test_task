import React from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import { IContact } from "../interfaces/contactInterfaces"
import UserInfo from "./UserInfo"
import { useDeleteContactMutation } from "../redux/contactApi"
import { toast } from "react-toastify"

interface Props {
  contact: IContact
}

const ContactItem = ({ contact }: Props) => {
  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async () => {
    try {
      console.log(contact.id)
      await deleteContact(contact.id).unwrap()
      toast("Deleted successfully")
    } catch (error: any) {
      const message = error.data.message || "Something went wrong"
      toast.error(message)
    }
  }

  return (
    <div className="bg-gray-100 rounded-md p-5 relative">
      <Link to={`/contact/${contact.id}`} className="flex flex-col">
        <UserInfo
          avatar={contact.avatar_url}
          firstName={contact.fields?.["first name"]?.[0]?.value}
          lastName={contact.fields?.["last name"]?.[0]?.value}
          email={contact.fields?.email?.[0]?.value}
        />
        <div>
          <div className="flex flex-wrap gap-1 ml-[78px]">
            {contact.tags.map(tag => (
              <span
                key={tag.id}
                className="mr-2 rounded-sm bg-gray-300 px-3 py-1 text-sm font-semibold text-black"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        </div>{" "}
      </Link>
      <TiDeleteOutline
        onClick={handleDelete}
        className="absolute right-3 top-3 h-6 w-6 cursor-pointer"
      />
    </div>
  )
}

export default ContactItem
