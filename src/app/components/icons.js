import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

/**
 *
 * @param {import('react-native-svg').SvgProps} props
 * @returns
 */
export const IconRefresh = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    className='icon icon-tabler icons-tabler-outline icon-tabler-refresh'
    {...props}
  >
    <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <Path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
    <Path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
  </Svg>
)
