import React from "react"
import { Title } from "../components"
import TagsList from "./TagsList"
import { ITags } from "../interfaces/contactInterfaces"

interface Props {
  tags: ITags[]
}

const Tags = ({ tags }: Props) => {
  return (
    <div>
      <Title variant="small">Tags</Title>
      <TagsList tags={tags} />
    </div>
  )
}

export default Tags
