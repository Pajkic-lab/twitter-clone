import React, { ReactNode } from 'react'
import { Heading } from './Heading'

type OscarProps = {
  children: ReactNode
}

export function Oscar(props: OscarProps) {
  return (
    <div>
      <h2>Oscar goes to decaprio</h2>
    </div>
  )
}
