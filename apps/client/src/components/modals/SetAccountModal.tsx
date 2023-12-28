import { SocialTwitter } from '@styled-icons/foundation/SocialTwitter';
import { Colors } from '@tw/ui/assets';
import {
  checkNameUniqueness,
  updateUserUniqueName,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import * as yup from 'yup';
// import { JumboButton } from '../../ui/Button';
import { JumboButton } from '@tw/ui/components';
import { BaseInput } from '../../ui/Input';

export const SetAccountModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isNameUnique, uniqueName } = useAppSelector((state) => state.auth);

  const onSubmit = async () => {
    if (isNameUnique && !errors.uniqueName) {
      await dispatch(updateUserUniqueName(values));
    }
  };

  const validationSchema = yup.object().shape({
    uniqueName: yup
      .string()
      .matches(/^@/, 'Unique Name must start with @ symbol')
      .required('Unique Name is required')
      .min(4, 'minimum 4 characters')
      .max(8, 'Name can not be longer then 8 characters')
      .matches(/^[^@]*@[^@]*$/, 'String should contain only one @ symbol'),
  });

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    setErrors,
    isSubmitting,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      uniqueName: '',
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (values.uniqueName) {
      touched.uniqueName = true;
      void dispatch(checkNameUniqueness(values));
    }
    if (!isNameUnique) {
      setErrors({ uniqueName: 'Name is already taken' });
    }
  }, [values, isNameUnique]);

  return (
    <Modal isOpen={!uniqueName}>
      <ModalSection>
        <LogoWrapper>
          <LogoSvg />
        </LogoWrapper>
        <H1>What should we call you?</H1>
        <H5>Your @username is unique. You can always change it later.</H5>
        <Form onSubmit={handleSubmit}>
          <Input
            id={'uniqueName'}
            type={'uniqueName'}
            name={'Unique name'}
            value={values.uniqueName}
            error={errors.uniqueName}
            touched={touched.uniqueName}
            onBlure={handleBlur}
            handleChange={handleChange}
          />
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isNameUnique && !errors.uniqueName ? false : true}
          >
            Join us
          </Button>
        </Form>
      </ModalSection>
    </Modal>
  );
};

const ModalSection = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 25px 75px 25px 75px;
  background-color: ${Colors.black};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoSvg = styled(SocialTwitter)`
  width: 40px;
  height: 40px;
  color: ${Colors.grayPrimary};
`;

const H1 = styled.h1`
  color: ${Colors.white};
  font-size: xx-large;
  font-weight: 700;
  margin-bottom: 0;
`;

const H5 = styled.h4`
  color: ${Colors.graySecondary};
  margin-top: 0.4rem;
  margin-bottom: 2.4rem;
`;

const Form = styled.form``;

const Input = styled(BaseInput)``;

const Button = styled(JumboButton)`
  margin-top: 1.5rem;
`;
