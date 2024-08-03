import React from "react"
import classNames from "classnames"
import { UseFormRegister, RegisterOptions } from "react-hook-form"
import { Error } from "../components"


interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  register: UseFormRegister<any>
  validation?: RegisterOptions
  inputClassName?: string
  labelClassName?: string
}

const LabeledInput = ({
  name,
  placeholder,
  label = '',
  type = 'text',
  error = "",
  register,
  validation,
  inputClassName = "",
  labelClassName = "",
}: Props) => {
  const labelAllClasses = classNames(
    "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    labelClassName,
  )
  const inputAllClasses = classNames(
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    inputClassName,
    error && "border-red-500",
  )

  return (
    <div className="mb-5">
      <label htmlFor={name} className={labelAllClasses}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={inputAllClasses}
        {...register(name, validation)}
      />
      {error && <Error className="text-start text-sm" text={error} />}
    </div>
  )
}

export default LabeledInput
