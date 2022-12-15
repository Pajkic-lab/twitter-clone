import React from 'react'

type HeadingProps = {
  children: string
}

export function Heading(props: HeadingProps) {
  return (
    <div>
      <h2>{props.children}</h2>
    </div>
  )
}
