import { SearchUsersResponseDto } from '@tw/data';
import { colors, MagnifyingGlass } from '@tw/ui/assets';
import { Loader, SingleUser } from '@tw/ui/components';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

type SearchInputProps = {
  id: string;
  searchInputOnChange: (val: string) => void;
  searchUserRes: SearchUsersResponseDto[] | undefined;
  searchIsLoading: boolean;
};

type SearchResultWindowProps = {
  searchIsLoading: boolean;
  searchUserRes: SearchUsersResponseDto[];
  inputValue: string;
};

type SearchedDataUiProps = {
  searchUserRes: SearchUsersResponseDto[];
};

/**
 * This component needs to be revamped. Make it polymorphic as async dropdown
 * for this specific case it needs to be search bar, there might be some other uses.
 */

export const SearchInput = (props: SearchInputProps) => {
  const {
    id,
    searchInputOnChange,
    searchUserRes = [],
    searchIsLoading,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = useCallback(
    (val: string) => {
      searchInputOnChange(val);
      setInputValue(val);
    },
    [searchInputOnChange]
  );

  return (
    <Wrapper>
      <Label htmlFor={id}>
        <Svg $isFocused={isFocused} />
      </Label>

      <Input
        id={id}
        placeholder={'Search Twitter'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
      />

      {inputValue && (
        <SearchResultWindow
          searchUserRes={searchUserRes}
          searchIsLoading={searchIsLoading}
          inputValue={inputValue}
        />
      )}
    </Wrapper>
  );
};

const SearchResultWindow = (props: SearchResultWindowProps) => {
  const { searchUserRes, searchIsLoading, inputValue } = props;

  return (
    <SearchDataWrapper>
      {!searchUserRes.length && !searchIsLoading && inputValue && <NoDataUi />}
      {searchUserRes && <SearchedDataUi searchUserRes={searchUserRes} />}
      {searchIsLoading && <LoadingUi />}
    </SearchDataWrapper>
  );
};

const SearchedDataUi = (props: SearchedDataUiProps) => {
  const { searchUserRes } = props;
  return (
    <>
      {searchUserRes.map((user) => (
        <SingleUser user={user} key={user.id} />
      ))}
    </>
  );
};

const NoDataUi = () => {
  return (
    <NoResultWrapper>
      <H3>No matching data</H3>
    </NoResultWrapper>
  );
};

const LoadingUi = () => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding-left: 55px;
  height: 3rem;
  outline: none;
  background-color: ${colors.grayMediaBarBackground};
  border: 2px solid ${colors.grayMediaBarBackground};
  border-radius: 5rem;
  font-size: 1rem;
  color: ${colors.white};
  cursor: text;

  ::placeholder {
    transform: translateY(-2px);
  }

  &:focus {
    border: 2px solid ${colors.bluePrimary};
    background-color: ${colors.black};
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  cursor: pointer;
`;

const Svg = styled(MagnifyingGlass)<{ $isFocused: boolean }>`
  fill: ${colors.graySecondary};
  width: 1.5rem;
  height: 1.5rem;

  ${(props) =>
    props.$isFocused &&
    `
    fill: ${colors.bluePrimary};
  `}
`;

const SearchDataWrapper = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 400px;
  overflow-y: scroll;
  border-radius: 1rem;
  padding: 1rem 0 1rem 0;
  background-color: ${colors.black};
  box-shadow: 0 0 8px hsla(0, 100%, 99.2156862745098%, 0.738);
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

const H3 = styled.h3`
  margin: 0;
  padding-left: 0.8rem;
  color: ${colors.grayPrimary};
  font-weight: 700;
`;
