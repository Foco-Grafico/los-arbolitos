import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
export const Cerrar = ({ fill = '#EC2024', ...props }) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 18.18 18.06'
    xmlSpace='preserve'
    {...props}
  >
    <G>
      <Path
        fill={fill}
        d='M12.42,9.67c-0.32-0.31-0.32-0.82-0.01-1.14l5.14-5.25c0.7-0.7,0.92-1.92,0.12-2.72h0 c-0.8-0.8-2.06-0.67-2.76,0.02L9.61,5.81c-0.31,0.31-0.82,0.31-1.13,0L3.25,0.69c-0.7-0.7-1.91-0.93-2.71-0.14h0 C-0.25,1.35-0.12,2.6,0.58,3.3l5.15,5.21c0.31,0.32,0.31,0.83-0.01,1.14l-4.96,4.9c-0.7,0.7-0.87,2.18-0.07,2.98l0,0 c0.8,0.8,2.28,0.63,2.98-0.07l4.85-4.96c0.32-0.32,0.83-0.32,1.15,0l4.88,4.94c0.7,0.7,2.21,0.92,3,0.13l0,0 c0.79-0.79,0.57-2.31-0.13-3L12.42,9.67z'
      />
    </G>
  </Svg>
)

export const BlockIcon = (props) => (
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
    className='icon icon-tabler icons-tabler-outline icon-tabler-container-off'
    {...props}
  >
    <Path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <Path d='M20 4v.01' />
    <Path d='M20 20v.01' />
    <Path d='M20 16v.01' />
    <Path d='M20 12v.01' />
    <Path d='M20 8v.01' />
    <Path d='M8.297 4.289a1 1 0 0 1 .703 -.289h6a1 1 0 0 1 1 1v7m0 4v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-11' />
    <Path d='M4 4v.01' />
    <Path d='M4 20v.01' />
    <Path d='M4 16v.01' />
    <Path d='M4 12v.01' />
    <Path d='M4 8v.01' />
    <Path d='M3 3l18 18' />
  </Svg>
)
