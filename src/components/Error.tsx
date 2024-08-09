import classNames from "classnames"

interface Props {
  text: string
  className?: string
}

const Error = ({ className, text }: Props) => {
  const allClasses = classNames(
    "text-red-500 text-center mt-2",
    className,
  )

  return <div className={allClasses}>{text}</div>
}

export default Error
