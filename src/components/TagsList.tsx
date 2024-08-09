import type { ITags } from "../interfaces/contactInterfaces"
import TagsItem from "./TagsItem"

interface Props {
  tags: ITags[]
}

const TagsList = ({ tags }: Props) => {
  return (
    <>
      {tags.map(tag => (
        <TagsItem key={tag.id} tag={tag.tag} />
      ))}
    </>
  )
}

export default TagsList
