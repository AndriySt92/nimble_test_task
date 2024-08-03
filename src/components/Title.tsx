import classNames from "classnames"
import React from "react"

interface Props {
  children: React.ReactNode
  className?: string
  variant?: "large" | "small"
}

const Title = ({ children, className, variant = "large" }: Props) => {
  let variantClass = variant === "large" ? "text-2xl" : "text-xl"
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
