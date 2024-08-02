import React from "react"

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
  onClick = () => {},
  type = "submit",
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
