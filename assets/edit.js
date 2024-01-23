import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
export const IconEdit = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    className='icon icon-tabler icon-tabler-edit'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    strokeWidth={2}
    stroke='#000'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <Path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
    <Path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
    <Path d='M16 5l3 3' />
  </Svg>
)
