import React from "react"

interface Props {
  tag: string
}

const TagsItem = ({ tag }: Props) => {
  return (
    <span className="mr-2 rounded-sm bg-gray-300 px-3 py-1 text-sm font-semibold text-black">
      {tag}
    </span>
  )
}

export default TagsItem
