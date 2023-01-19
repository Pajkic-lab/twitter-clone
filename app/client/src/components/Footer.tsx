import styled from 'styled-components'
import React from 'react'
import { Colors } from 'ui/styles'

export const Footer = () => {
  const buttonsDate = [
    { buttonText: 'About', link: 'https://about.twitter.com/en' },
    { buttonText: 'Help Center', link: 'https://help.twitter.com/en' },
    { buttonText: 'Terms of Service', link: 'https://twitter.com/en/tos' },
    { buttonText: 'Privacy Policy', link: 'https://twitter.com/en/privacy' },
    {
      buttonText: 'Cookie Policy',
      link: 'https://help.twitter.com/en/rules-and-policies/twitter-cookies',
    },
    {
      buttonText: 'Accessibility',
      link: 'https://help.twitter.com/en/resources/accessibility',
    },
    {
      buttonText: 'Ads info',
      link: 'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo',
    },
    { buttonText: 'Blog', link: 'https://blog.twitter.com/' },
    { buttonText: 'Status', link: 'https://status.twitterstat.us/' },
    { buttonText: 'Careers', link: 'https://careers.twitter.com/' },
    {
      buttonText: 'Brand Resources',
      link: 'https://about.twitter.com/en/who-we-are/brand-toolkit',
    },
    {
      buttonText: 'Advertising',
      link: 'https://ads.twitter.com/login?ref=gl-tw-tw-twitter-advertise',
    },
    { buttonText: 'Marketing', link: 'https://marketing.twitter.com/en' },
    {
      buttonText: 'Twitter for Business',
      link: 'https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness',
    },
    { buttonText: 'Developers', link: 'https://developer.twitter.com/en' },
    {
      buttonText: 'Directory',
      link: 'https://twitter.com/i/directory/profiles',
    },
    {
      buttonText: 'Settings',
      link: 'https://twitter.com/settings/account/personalization',
    },
    { buttonText: '© 2022 Twitter, Inc.', link: '/' },
  ]

  return (
    <>
      <Wraper>
        {buttonsDate.map((el, index) => {
          return (
            <A key={index} href={el.link} target="_blank">
              {el.buttonText}
            </A>
          )
        })}
      </Wraper>
    </>
  )
}

const Wraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${Colors.black};
  padding: 12px 0;
`

const A = styled.a`
  padding: 2px 8px;
  font-size: small;
  color: ${Colors.darkGray};
  white-space: nowrap;
`
