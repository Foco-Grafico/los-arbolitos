import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Descargar = (props) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 33.85 33.93'
    xmlSpace='preserve'
    {...props}
  >
    <G id='Solid_00000167362693466056066540000005809757875213793704_'>
      <Path
        className='st3'
        d='M15.65,26.39c0.69,0.69,1.8,0.69,2.48,0c0,0,0,0,0,0l6.62-6.62c0.69-0.69,0.69-1.8,0-2.48 c-0.69-0.69-1.8-0.69-2.48,0l-3.62,3.62V1.75c0-0.97-0.79-1.75-1.75-1.75c-0.97,0-1.75,0.79-1.75,1.75v19.16l-3.62-3.62 c-0.69-0.69-1.8-0.69-2.48,0c-0.69,0.69-0.69,1.8,0,2.48L15.65,26.39z'
      />
      <Path
        className='st3'
        d='M32.1,15.21c-0.97,0-1.75,0.79-1.75,1.75v13.45H3.43V16.96c0-0.97-0.79-1.75-1.75-1.75s-1.75,0.79-1.75,1.75 V31c0,1.62,1.31,2.92,2.92,2.92h28.08c1.62,0,2.92-1.31,2.92-2.92V16.96C33.85,15.99,33.07,15.21,32.1,15.21z'
      />
    </G>
  </Svg>
)
export default Descargar
