import React from 'react'

type StatusProps = {
  status: 'loading' | 'success' | 'error'
}

export function Status(props: StatusProps) {
  let message
  if (props.status === 'loading') {
    message = 'Loading...'
  }
  if (props.status === 'success') {
    message = 'Success...'
  }
  if (props.status === 'error') {
    message = 'Error...'
  }
  return (
    <div>
      <h2>{message}</h2>
    </div>
  )
}
