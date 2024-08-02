import React from "react"

interface Props {
  avatar: string
  firstName: string
  lastName: string
  email: string
}

const UserInfo = ({
  firstName = "",
  lastName = "",
  email = "",
  avatar = "",
}: Props) => {
  return (
    <div className="flex items-center gap-3">
      <img alt="avatar" src={avatar} className="h-16 w-16 rounded-full" />
      <div className="flex flex-col justify-center">
        <div className="text-md font-semibold">
          <span>{firstName}</span> <span>{lastName}</span>
        </div>
        <div className="text-md">{email}</div>
      </div>
    </div>
  )
}

export default UserInfo
