import { SearchUsersResponseDto } from '@tw/data';
import { Colors, MagnifyingGlass } from '@tw/ui/assets';
import { BreakpointKeys, Breakpoints } from '@tw/ui/common';
import { Loader, SingleUser } from '@tw/ui/components';
import { useState } from 'react';
import styled from 'styled-components';

type SearchBarProps = {
  id: string;
  size: BreakpointKeys;
  sizeTable: Breakpoints;
  searchInputOnChange: (val: string) => void;
  searchUserRes: SearchUsersResponseDto[] | undefined;
  searchIsLoading: boolean;
};

type SearchResultWindowProps = {
  size: BreakpointKeys;
  sizeTable: Breakpoints;
  searchIsLoading: boolean;
  searchUserRes: SearchUsersResponseDto[];
  inputValue: string;
};

type InputStyleProps = {
  $size: BreakpointKeys;
  $sizeTable: Breakpoints;
};

type SearchedDataUiProps = {
  searchUserRes: SearchUsersResponseDto[];
};

/**
 * This component needs to be revamped. Make it polymorphic as async dropdown
 * for this specific case it needs to be search bar, there might be some other uses.
 */

/* WIP */
export const SearchInput = (props: SearchBarProps) => {
  const {
    id,
    size,
    sizeTable,
    searchInputOnChange,
    searchUserRes = [],
    searchIsLoading,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (val: string) => {
    searchInputOnChange(val);
    setInputValue(val);
  };

  return (
    <Wrapper>
      <>
        <Label htmlFor={id}>{<Svg $isFocused={isFocused} />}</Label>
        <Input
          id={id}
          placeholder={'Search Twitter'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          $sizeTable={sizeTable}
          $size={size}
        />
        {inputValue && (
          <SearchResultWindow
            size={size}
            sizeTable={sizeTable}
            searchUserRes={searchUserRes}
            searchIsLoading={searchIsLoading}
            inputValue={inputValue}
          />
        )}
      </>
    </Wrapper>
  );
};

const SearchResultWindow = (props: SearchResultWindowProps) => {
  const { size, sizeTable, searchUserRes, searchIsLoading, inputValue } = props;

  return (
    <SearchDataWrapper $size={size} $sizeTable={sizeTable}>
      {searchUserRes && <SearchedDataUi searchUserRes={searchUserRes} />}
      {!searchUserRes.length && !searchIsLoading && inputValue && <NoDataUi />}
      {searchIsLoading && <LoadingUi />}
    </SearchDataWrapper>
  );
};

const SearchedDataUi = (props: SearchedDataUiProps) => {
  const { searchUserRes } = props;
  return (
    <>
      {searchUserRes.map((user) => (
        <ProfileButtonWrapper key={user.id}>
          <SingleUser user={user} />
        </ProfileButtonWrapper>
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
  margin-top: 1rem;
`;

const Input = styled.input<InputStyleProps>`
  width: ${({ $size, $sizeTable }) => `${$sizeTable[$size]}rem`};
  padding-left: 55px;
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

const SearchDataWrapper = styled.div<InputStyleProps>`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);

  width: ${({ $size, $sizeTable }) => `${$sizeTable[$size]}rem`};
  height: 400px;
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
  color: ${Colors.grayPrimary};
  font-weight: 700;
`;
