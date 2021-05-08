import React from 'react'

type Props = {
  onClick?: () => void,
  message: string,
}

export const Button = ({ onClick, message }: Props) => {
  return (
    <div onClick={onClick}>
      {message}
    </div>
  )
}
