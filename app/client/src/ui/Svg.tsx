import React from 'react'
import styled from 'styled-components'
import { Colors } from './styles'

interface Props {
  svg: React.SVGProps<SVGSVGElement>
  width?: number
  height?: number
  color?: string
}

const SvgComponent: React.FC<Props> = props => {
  return <IconSvg {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const IconSvg = styled(SvgComponent)<{
  height?: number
  width?: number
}>`
  margin-left: -5px;
  width: ${props => (props.width ? `${props.width}px` : '60px')};
  height: ${props => (props.height ? `${props.height}px` : '60px')};
  color: ${Colors.textGray};
`
