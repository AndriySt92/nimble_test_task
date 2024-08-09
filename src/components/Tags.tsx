import classNames from "classnames"
import { Title, TagsList } from "../components"
import type { ITags } from "../interfaces/contactInterfaces"

interface Props {
  tags: ITags[]
  withTitle?: boolean
  className?: string
}

const Tags = ({ tags, withTitle = false, className = "" }: Props) => {
  const allClasses = classNames("flex flex-wrap gap-2", className)

  return (
    <div>
      {withTitle && <Title variant="small">Tags</Title>}
      <div className={allClasses}>
        <TagsList tags={tags} />
      </div>
    </div>
  )
}

export default Tags
