import classNames from "classnames"

interface Props {
  src: string
  alt: string
  variant?: "large" | "small"
  className?: string
}

const Avatar = ({ className, variant = "small", ...rest }: Props) => {
  const variantClass = variant === "small" ? "h-16 w-16" : "h-[110px] w-[110px]"
  const allClasses = classNames("rounded-full border-2 border-white", variantClass, className)

  return <img className={allClasses} {...rest} alt="avatar" />
}

export default Avatar
