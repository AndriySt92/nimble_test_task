import { TiDeleteOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import type { IApiError, IContact } from "../interfaces/contactInterfaces"
import { useDeleteContactMutation } from "../redux/contactApi"
import { Avatar, UserInfo, Tags } from "../components"

interface Props {
  contact: IContact
}

const ContactItem = ({ contact }: Props) => {
  const [deleteContact] = useDeleteContactMutation()

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id).unwrap()
      toast("Deleted successfully")
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message =
          (error as IApiError)?.data?.message || "Something went wrong"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div className="bg-gray-100 rounded-md p-5 relative">
      <Link to={`/contact/${contact.id}`} className="flex flex-col">
        <div className="flex items-center gap-3">
          <Avatar
            src={contact.avatar_url}
            alt={contact.fields?.["first name"]?.[0]?.value}
            variant="small"
          />
          <UserInfo
            firstName={contact.fields?.["first name"]?.[0]?.value}
            lastName={contact.fields?.["last name"]?.[0]?.value}
            email={contact.fields?.email?.[0]?.value}
          />
        </div>
        <Tags tags={contact.tags} className="ml-[78px]" />
      </Link>
      <TiDeleteOutline
        onClick={handleDelete}
        className="absolute right-3 top-3 h-6 w-6 cursor-pointer"
      />
    </div>
  )
}

export default ContactItem
