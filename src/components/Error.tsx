import React from 'react'

interface Props {
    text: string
    className?: string
  }

const Error = ({className, text}: Props) => {
  return (
    <div className={`text-red-500 text-sm text-center mt-2 ${className}`}>{text}</div>
  )
}

export default Error