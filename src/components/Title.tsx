import type React from "react"
import classNames from "classnames"

interface Props {
  children: React.ReactNode
  className?: string
  variant?: "large" | "small"
}

const Title = ({ children, className, variant = "large" }: Props) => {
  const variantClass = variant === "large" ? "text-2xl" : "text-xl"
  const allClasses = classNames(
    "font-semibold mb-5 text-start",
    variantClass,
    className,
  )

  return (
    <h1 className={allClasses}>
      {children}
    </h1>
  )
}

export default Title
