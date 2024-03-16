import { PublicUserBase } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { linksRecords } from '@tw/ui/common';
import { QueryAction, useResetQuery } from '@tw/ui/data-access';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type SingleUserProps = {
  publicUser: PublicUserBase;
  meId: number;
};

export const SingleUser = (props: SingleUserProps) => {
  const {
    meId,
    publicUser: { name, uniqueName, avatar, id },
  } = props;

  const navigate = useNavigate();

  const goToUserPage = () => {
    if (meId === id) {
      return navigate(linksRecords.profilePage.base);
    }
    useResetQuery(QueryAction.Remove, ['publicUser']); // must be handled differently
    navigate(linksRecords.publicProfilePage.baseById(id));
  };

  return (
    <ProfileButtonWrapper onClick={goToUserPage}>
      <BioWrapper>
        <ProfileImage $backgroundImage={avatar} />
        <TextWrapper>
          <H3>{name}</H3>
          <Span>{uniqueName}</Span>
        </TextWrapper>
      </BioWrapper>
    </ProfileButtonWrapper>
  );
};

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const BioWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.3rem;

  && :hover {
    background-color: ${colors.grayDarkActive};
  }
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 3.2rem;
  min-width: 3.2rem;
  height: 3.2rem;
  background-color: ${colors.bluePrimary};

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.black};
  `}
`;

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.graySecondary};
  font-weight: 500;
`;
