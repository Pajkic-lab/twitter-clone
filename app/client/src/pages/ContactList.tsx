import { ConnectionsTrigger } from 'customHooks/ConnectionsTrigger'
import { MainLane } from 'components/layout/mainLane'
import { MediaBar } from 'components/layout/mediaBar'
import { SideBar } from 'components/layout/SideBar'
import styled from 'styled-components'
import React from 'react'

export const ContactList: React.FC = () => {
  return (
    <Wrapper>
      <ConnectionsTrigger />
      <SideBar />
      <MainLane />
      <MediaBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`
