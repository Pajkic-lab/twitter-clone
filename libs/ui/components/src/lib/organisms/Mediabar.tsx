import { SearchUsersResponseDto } from '@tw/data';
import { colors } from '@tw/ui/assets';
import { BreakpointKeys, Breakpoints } from '@tw/ui/common';
import { ReactNode } from 'react';
import Sticky from 'react-stickynode';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { SearchInput } from '../molecules/SearchInput';

type MediabarProps = {
  mediabarSize: BreakpointKeys;
  searchInputOnChange: (val: string) => void;
  searchUserRes: SearchUsersResponseDto[] | undefined;
  searchIsLoading: boolean;
  topWindowChilde: ReactNode;
  bottomWindow: ReactNode;
};

const sizeTable: Breakpoints = {
  s: 0,
  m: 0,
  l: 20.714,
  xl: 25,
  '2xl': 0,
  '3xl': 0,
};

/**
 * Flicker is do to library 'react-stickynode'
 */
export const Mediabar = (props: MediabarProps) => {
  const {
    mediabarSize,
    searchInputOnChange,
    searchUserRes,
    searchIsLoading,
    topWindowChilde,
    bottomWindow,
  } = props;

  if (sizeTable[mediabarSize] === sizeTable.m) return;

  return (
    <Wrapper size={mediabarSize}>
      <SearchInputWrapper size={mediabarSize}>
        <SearchInput
          id={uuid()}
          searchInputOnChange={searchInputOnChange}
          searchUserRes={searchUserRes}
          searchIsLoading={searchIsLoading}
        />
      </SearchInputWrapper>

      <Sticky>
        <TopWindow>{topWindowChilde}</TopWindow>
        <BottomWindow>{bottomWindow}</BottomWindow>
        <MediabarFooterContainer>
          <Text>
            Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
            More © 2022 Twitter, Inc.
          </Text>
        </MediabarFooterContainer>
      </Sticky>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ size: BreakpointKeys }>`
  width: ${({ size }) => `${sizeTable[size]}rem`};
  margin-left: 2rem;
`;

const SearchInputWrapper = styled.div<{ size: BreakpointKeys }>`
  width: ${({ size }) => `${sizeTable[size]}rem`};
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: ${colors.black};
`;

const TopWindow = styled.div`
  background-color: ${colors.grayMediaBarBackground};
  height: 21.4rem;
  width: 100%;
  margin-top: 4.5rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
`;

const BottomWindow = styled.div`
  background-color: ${colors.grayMediaBarBackground};
  height: 800px;
  width: 100%;
  border-radius: 1rem;
`;

const MediabarFooterContainer = styled.div`
  padding: 2rem 0.5rem;
`;

const Text = styled.span`
  color: ${colors.graySecondary};
`;
