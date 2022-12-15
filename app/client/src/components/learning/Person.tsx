import React from 'react'

type PersonProps = {
  name: {
    first: string
    lastName: string
  }
}

export function Person(props: PersonProps) {
  return <div>{props.name.first}</div>
}
