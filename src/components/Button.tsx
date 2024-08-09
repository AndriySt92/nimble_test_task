import type React from "react"
import classNames from "classnames"

interface Props {
  children: React.ReactNode
  className?: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  children,
  className,
  onClick,
  ...rest
}: Props) => {
  const allClasses = classNames(
    "flex items-center justify-center text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    className,
  )

  return (
    <button className={allClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button
