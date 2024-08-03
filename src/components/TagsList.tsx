import React from "react"
import { ITags } from "../interfaces/contactInterfaces"
import TagsItem from "./TagsItem"

interface Props {
  tags: ITags[]
  className?: string
}

const TagsList = ({ tags, className }: Props) => {
  return (
    <div>
      <div className={`flex flex-wrap gap-2 gap- ${className}`}>
        {tags.map(tag => (
          <TagsItem key={tag.id} tag={tag.tag} />
        ))}
      </div>
    </div>
  )
}

export default TagsList
