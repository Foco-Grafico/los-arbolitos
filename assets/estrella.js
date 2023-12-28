import * as React from 'react'
import Svg, { Polygon } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Estrella = (props) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 30.08 28.43'
    xmlSpace='preserve'
    {...props}
  >
    <Polygon
      className='st4'
      points='15.14,0 18.67,10.86 30.08,10.86 20.85,17.57 24.37,28.43 15.14,21.72 5.9,28.43 9.43,17.57  0.19,10.86 11.61,10.86 '
      fill='#fbb03b'
    />
  </Svg>
)
export default Estrella
