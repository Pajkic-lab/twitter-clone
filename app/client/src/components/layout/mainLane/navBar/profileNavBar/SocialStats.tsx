import styled from 'styled-components'
import { Colors } from 'ui/styles'
import React from 'react'

export const SocialStats = () => {
  return (
    <SocialStatsWrapper>
      <FollowingStatsWrapper>
        <StatsNumberSpan>0</StatsNumberSpan>
        <StatsTextSpan>Following</StatsTextSpan>
      </FollowingStatsWrapper>
      <FollowersStatsWrapper>
        <StatsNumberSpan>0</StatsNumberSpan>
        <StatsTextSpan>Followers</StatsTextSpan>
      </FollowersStatsWrapper>
    </SocialStatsWrapper>
  )
}

const SocialStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 1rem;
`

const FollowingStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const FollowersStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

const StatsNumberSpan = styled.span`
  color: ${Colors.textGray};
  font-weight: 700;
  padding-right: 0.3rem;
`

const StatsTextSpan = styled.span`
  color: ${Colors.darkGray};
  padding-right: 1rem;
`
