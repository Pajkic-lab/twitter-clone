// import { Button } from 'components/learning/Button'
// import { Container } from 'components/learning/Container'
// import { Grett } from 'components/learning/Grett'
// import { Heading } from 'components/learning/Heading'
// import { Input } from 'components/learning/Input'
// import { InputDestructuring } from 'components/learning/InputDestructuring'
// import { Oscar } from 'components/learning/Oscar'
// import { Person } from 'components/learning/Person'
// import { PersonList } from 'components/learning/PersonList'
// import { Status } from 'components/learning/Status'
import React from 'react'

export function SignIn() {
  const personName = {
    first: 'Marko',
    lastName: 'Pajkic',
  }

  const nameList = [
    {
      first: 'Marko',
      lastName: 'Pajkic',
    },
    {
      first: 'Marko',
      lastName: 'Pajkic',
    },
    {
      first: 'Marko',
      lastName: 'Pajkic',
    },
  ]

  return (
    <div>
      {/* basic props */}
      {/* <Grett name="Marko" message={10} isLogdIn={true} /> */}
      {/* <Person name={personName} /> */}
      {/* <PersonList names={nameList} /> */}
      {/* advanced props */}
      {/* <Status status="error" /> */}
      {/* <Heading>Place Holder</Heading> */}
      {/* <Oscar>
        <Heading>testic</Heading>
      </Oscar> */}
      {/* <Grett name="Marko" isLogdIn={true} /> */}
      {/* event props */}
      {/* <Button
        handleClick={(e, id) => {
          console.log('Button click', e, id)
        }}
      /> */}
      {/* <Input value="" handleChange={e => console.log(e)} /> */}
      {/* style props */}
      {/* <Container styles={{ border: '1px solid black', padding: '1rem' }} /> */}
      {/* props tips destructuring */}
      {/* <InputDestructuring value="" handleChange={e => console.log(e)} /> */}
    </div>
  )
}
