import { Colors, MagnifyingGlass } from '@tw/ui/assets';
import { Loader } from '@tw/ui/components';
import {
  resetSearchRespons,
  searchThunk,
  useAppDispatch,
  useAppSelector,
} from '@tw/ui/data-access';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * This component needs to be revamped.
 */
export const SearchBar: React.FC<{ InputId: string }> = ({ InputId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { searchResponse: searchRespons, searchIsLoading } = useAppSelector(
    (state) => state.utile
  );

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (searchData: string) => {
    setInputValue(searchData);
    if (searchData) {
      void dispatch(searchThunk({ searchData }));
    } else {
      dispatch(resetSearchRespons());
    }
  };

  const navigateToProfile = (userId: number, uniqueName: string) => {
    dispatch(resetSearchRespons());
    setInputValue('');
    navigate(`/user/${userId}/unique-name/${uniqueName}`);
  };

  return (
    <Wrapper>
      <>
        <Label htmlFor={InputId}>{<Svg $isFocused={isFocused} />}</Label>
        <Input
          id={InputId}
          placeholder="Search Twitter"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {inputValue && (
          <SearchDataWrapper>
            {searchRespons &&
              searchRespons.map((user) => (
                <ProfileButtonWrapper
                  key={user.id}
                  onClick={() => navigateToProfile(user.id!, user.uniqueName)}
                >
                  <BioWrapper>
                    <ProfileImage
                      $backgroundImage={user.avatar && user.avatar}
                    />
                    <TextWrapper>
                      <H3>{user.name}</H3>
                      <Span>{user.uniqueName}</Span>
                    </TextWrapper>
                  </BioWrapper>
                </ProfileButtonWrapper>
              ))}
            {searchIsLoading &&
              (!searchRespons || searchRespons.length < 1) && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            {(!searchRespons || searchRespons.length < 1) &&
              !searchIsLoading && (
                <NoResultWrapper>
                  <H3>No matching data</H3>
                </NoResultWrapper>
              )}
          </SearchDataWrapper>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding-left: 55px;
  width: 330px;
  height: 3rem;
  outline: none;
  background-color: ${Colors.graySearchInputBackground};
  border: 2px solid ${Colors.graySearchInputBackground};
  border-radius: 5rem;
  font-size: 1rem;
  color: ${Colors.white};
  cursor: text;

  ::placeholder {
    transform: translateY(-2px);
  }

  &:focus {
    border: 2px solid ${Colors.bluePrimary};
    background-color: ${Colors.black};
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  cursor: pointer;
`;

const Svg = styled(MagnifyingGlass)<{ $isFocused: boolean }>`
  fill: ${Colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;

  ${(props) =>
    props.$isFocused &&
    `
    fill: ${Colors.bluePrimary};
  `}
`;

const SearchDataWrapper = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);

  height: 400px;
  width: 300px;
  overflow-y: scroll;
  border-radius: 1rem;
  padding: 1rem 0 1rem 0;
  background-color: ${Colors.black};
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
`;

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.grayDarkActive};
  }
`;

const BioWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.3rem;
`;

const ProfileImage = styled.div<{ $backgroundImage: string }>`
  border-radius: 100%;
  width: 3.2rem;
  height: 3.2rem;
  background-color: ${Colors.bluePrimary};

  ${(props) =>
    props.$backgroundImage &&
    `
    background-image: url(${props.$backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${Colors.black};
  `}
`;

const TextWrapper = styled.div``;

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.grayPrimary};
  font-weight: 700;
`;

const Span = styled.span`
  margin: 0;
  padding-left: 0.8rem;
  color: ${Colors.graySecondary};
  font-weight: 500;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const NoResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
