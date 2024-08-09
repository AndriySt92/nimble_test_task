interface Props {
  firstName: string
  lastName: string
  email: string
}

const UserInfo = ({ firstName = "", lastName = "", email = "" }: Props) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-md font-semibold">
        <span>{firstName}</span> <span>{lastName}</span>
      </div>
      <div className="text-md">{email}</div>
    </div>
  )
}

export default UserInfo
