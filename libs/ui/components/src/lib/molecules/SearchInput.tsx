import { SearchUsersResponseDto } from '@tw/data';
import { colors, MagnifyingGlass } from '@tw/ui/assets';
import { UserLIst } from '@tw/ui/components';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

type SearchInputProps = {
  id: string;
  meId: number;
  searchInputOnChange: (val: string) => void;
  searchUserRes: SearchUsersResponseDto[] | undefined;
  searchIsLoading: boolean;
};

type SearchResultWindowProps = {
  meId: number;
  searchIsLoading: boolean;
  searchUserRes: SearchUsersResponseDto[];
};

/**
 * This component needs to be revamped. Make it polymorphic as async dropdown
 * for this specific case it needs to be search bar, there might be some other cases.
 */

// clear button is missing...
export const SearchInput = (props: SearchInputProps) => {
  const {
    id,
    meId,
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>
        <Svg $isFocused={isFocused} />
      </Label>

      <Input
        id={id}
        placeholder={'Search Twitter'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {inputValue && (
        <SearchResultWindow
          meId={meId}
          searchUserRes={searchUserRes}
          searchIsLoading={searchIsLoading}
        />
      )}
    </Wrapper>
  );
};

const SearchResultWindow = (props: SearchResultWindowProps) => {
  const { meId, searchUserRes, searchIsLoading } = props;

  return (
    <SearchDataWrapper>
      {searchUserRes && (
        <UserLIst
          meId={meId}
          users={searchUserRes}
          userListLoading={searchIsLoading}
        />
      )}
    </SearchDataWrapper>
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
