import * as React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
export const Cancelar = (props) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 35.37 35.16'
    xmlSpace='preserve'
    {...props}
  >
    <G>
      <Circle fill='#EC2024' cx={17.56} cy={17.51} r={17.51} />
      <Path
        fill='#FFFFFF'
        d='M21,17.82c-0.32-0.31-0.32-0.82-0.01-1.14l5.14-5.25c0.7-0.7,0.92-1.92,0.12-2.72h0 c-0.8-0.8-2.06-0.67-2.76,0.02l-5.29,5.23c-0.31,0.31-0.82,0.31-1.13,0l-5.23-5.12c-0.7-0.7-1.91-0.93-2.71-0.14h0 c-0.79,0.79-0.66,2.05,0.04,2.74l5.15,5.21c0.31,0.32,0.31,0.83-0.01,1.14l-4.96,4.9c-0.7,0.7-0.87,2.18-0.07,2.98l0,0 c0.8,0.8,2.28,0.63,2.98-0.07l4.85-4.96c0.32-0.32,0.83-0.32,1.15,0l4.88,4.94c0.7,0.7,2.21,0.92,3,0.13l0,0 c0.79-0.79,0.57-2.31-0.13-3L21,17.82z'
      />
    </G>
  </Svg>
)
