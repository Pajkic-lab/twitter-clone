import React, { MouseEvent } from 'react'

type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputDestructuring({ value, handleChange }: InputProps) {
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(event)
  //   }
  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  )
}
