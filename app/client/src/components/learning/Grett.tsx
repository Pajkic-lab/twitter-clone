import React from 'react'

type GrettProps = {
  name: string
  message?: number
  isLogdIn: boolean
}

export function Grett(props: GrettProps) {
  return (
    <div>
      {props.isLogdIn
        ? `name is :${props.name} age: ${props.message}`
        : `guset`}
    </div>
  )
}
