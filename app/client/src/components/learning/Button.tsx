import React, { MouseEvent } from 'react'

type ButtonProps = {
  handleClick: (e: MouseEvent<HTMLButtonElement>, id: number) => void
}

export function Button(props: ButtonProps) {
  return (
    <div>
      <button onClick={e => props.handleClick(e, 1)}>Click</button>
    </div>
  )
}
