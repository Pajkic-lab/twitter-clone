import React, { MouseEvent } from 'react'

type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input(props: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }
  return (
    <div>
      <input value={props.value} onChange={handleChange} />
    </div>
  )
}
