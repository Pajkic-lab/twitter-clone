import { ReactComponent as Cross } from 'assets/svg/cross.svg'
import { ReactComponent as Image } from 'assets/svg/image.svg'
import { FormikHelpers, useFormik } from 'formik'
import { SecondaryButton } from 'ui/Button'
import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { BaseInput } from 'ui/Input'
import { Colors } from 'ui/styles'
import * as yup from 'yup'
import React from 'react'

interface Props {
  editProfileModalIsOpen: boolean
  setEditProfileModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileModal: React.FC<Props> = ({ editProfileModalIsOpen, setEditProfileModalIsOpen }) => {
  const closeModal = () => {
    setEditProfileModalIsOpen(false)
  }

  const onSubmit = (values: any, actions: FormikHelpers<any>) => {
    console.log(values)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().max(12, 'Name can not be longer then 8 characters').min(3, 'Name has to be minimum 3 character'),
    bio: yup.string().max(160, 'Bio can not be longer then 160 characters'),
    location: yup.string().max(20, 'Location can not be longer then 20 characters'),
    website: yup.string().url().max(35, 'Website can not be longer then 35 characters'),
  })

  const { handleSubmit, handleBlur, handleChange, setErrors, isSubmitting, errors, touched, values } = useFormik({
    initialValues: {
      name: '',
      bio: '',
      location: '',
      website: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <>
      <Modal isOpen={editProfileModalIsOpen} onBackgroundClick={closeModal}>
        <ModalSection>
          <TittleWrapper>
            <SVGTittleWrapper>
              <ExitSvgWrapper onClick={closeModal}>
                <CrossSvg />
              </ExitSvgWrapper>
              <H2Tittle>Eddit profile</H2Tittle>
            </SVGTittleWrapper>
            <SaveModalButton>Save</SaveModalButton>
          </TittleWrapper>

          <CoverWeapper>
            <SVGWrapper>
              <ImageSVG />
            </SVGWrapper>
          </CoverWeapper>

          <AvatarWrapper>
            <ImageSVG />
          </AvatarWrapper>

          <Form onSubmit={handleSubmit}>
            <Input
              id={'name'}
              type={'name'}
              name={'Name'}
              value={values.name}
              error={errors.name}
              touched={touched.name}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <Input
              id={'bio'}
              type={'text'}
              name={'Bio'}
              value={values.bio}
              error={errors.bio}
              touched={touched.bio}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <Input
              id={'location'}
              type={'text'}
              name={'Location'}
              value={values.location}
              error={errors.location}
              touched={touched.location}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
            <Input
              id={'website'}
              type={'text'}
              name={'Website'}
              value={values.website}
              error={errors.website}
              touched={touched.website}
              onBlure={handleBlur}
              handleChange={handleChange}
            />
          </Form>
        </ModalSection>
      </Modal>
    </>
  )
}

const ModalSection = styled.div`
  height: 70vh;
  overflow-y: scroll;
  border-radius: 1rem;
  padding: 0 1.5rem 1rem 1.5rem;
  background-color: ${Colors.black};
`

const TittleWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 1rem 0;
`

const SVGTittleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ExitSvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const CrossSvg = styled(Cross)`
  fill: ${Colors.white};
  width: 1.5rem;
  height: 1.5rem;
`

const H2Tittle = styled.h2`
  margin: 0;
  font-weight: 700;
  color: ${Colors.white};
`

const SaveModalButton = styled(SecondaryButton)`
  color: ${Colors.textGray};
  padding-left: 0;
  padding-right: 0;
`

const CoverWeapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding-bottom: 1rem;
`

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blackActive};
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${Colors.textColor};
  margin-bottom: 1rem;
  cursor: pointer;
`

const ImageSVG = styled(Image)`
  fill: ${Colors.textGray};
  width: 1.5rem;
  height: 1.5rem;
`

const Form = styled.form``

const Input = styled(BaseInput)`
  width: 35rem;
`
