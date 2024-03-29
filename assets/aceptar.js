import * as React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Aceptar = (props) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 35.37 35.16'
    xmlSpace='preserve'
    fill='#3ab54a'
    style={props.style}
    {...props}
  >
    <G>
      <Circle className='st2' cx={17.68} cy={17.58} r={17.51} />
      <Path
        className='st1'
        d='M14.15,26.57c-0.67,0.05-1.22-0.24-1.7-0.69c-1.89-1.78-3.78-3.56-5.66-5.35c-1.03-0.99-1.11-2.38-0.22-3.34 c0.91-0.98,2.36-1.02,3.41-0.06c1.21,1.11,2.42,2.24,3.59,3.39c0.34,0.33,0.53,0.37,0.88,0c3.4-3.5,6.82-6.98,10.23-10.46 c0.47-0.48,0.91-1.01,1.6-1.2c1.1-0.3,2.16,0.1,2.7,1c0.54,0.9,0.41,2.04-0.37,2.85c-1.78,1.86-3.58,3.7-5.38,5.55 c-2.42,2.48-4.84,4.95-7.25,7.43C15.48,26.21,14.93,26.61,14.15,26.57z'
        fill='#fff'
      />
    </G>
  </Svg>
)
export default Aceptar
