import { EditProfileModal } from 'components/modals/EditProfileModal'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { SecondaryButton } from 'ui/Button'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from 'ui/styles'
import { followUserThunk } from 'store/features/authSlice/thunk'
import { useParams } from 'react-router-dom'

export const AvatarAndOptions: React.FC<{ avatar: string; pathname: string }> = ({ avatar, pathname }) => {
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false)
  const params = useParams()
  const dispatch = useAppDispatch()

  const { isAuth } = useAppSelector(state => state.auth)

  const followUserHelper = () => {
    if (params.id) {
      void dispatch(followUserThunk(parseInt(params.id)))
    }
  }

  return (
    <ProfileImageWrapper>
      <ImageWrapper $backgroundImage={avatar} />
      {pathname === '/profile' && (
        <>
          <EditProfileButton onClick={() => setEditProfileModalIsOpen(true)}>Edit profile</EditProfileButton>
          <EditProfileModal
            editProfileModalIsOpen={editProfileModalIsOpen}
            setEditProfileModalIsOpen={setEditProfileModalIsOpen}
          />
        </>
      )}
      {pathname !== '/profile' && isAuth && <FolloweButton onClick={() => followUserHelper()}>follow</FolloweButton>}
      {pathname !== '/profile' && !isAuth && null}
    </ProfileImageWrapper>
  )
}

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  padding: 0.8rem 1rem;
  height: 85px;
`

const ImageWrapper = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  top: -5rem;
  left: 1rem;
  width: 10rem;
  height: 10rem;
  border: 4px solid ${Colors.black};
  border-radius: 50%;
  background-color: ${Colors.darkerGrey};
  ${props =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`

const EditProfileButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;
`

const FolloweButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;
`
