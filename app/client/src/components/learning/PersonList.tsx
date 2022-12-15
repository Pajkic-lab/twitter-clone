import React from 'react'

type PersonProps = {
  names: {
    first: string
    lastName: string
  }[]
}

export function PersonList(props: PersonProps) {
  return (
    <div>
      {props.names.map(name => {
        return (
          <>
            <h1>{name.first}</h1>
            <h1>{name.lastName}</h1>
          </>
        )
      })}
    </div>
  )
}
