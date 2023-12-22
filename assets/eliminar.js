import * as React from 'react'
import Svg, { G, Circle, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Eliminar = (props) => (
  <Svg
    baseProfile='basic'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 27.57 27.57'
    xmlSpace='preserve'
    {...props}
  >
    <G>
      <G>
        <Circle className='st5' cx={13.78} cy={13.78} r={13.78} />
      </G>
      <G>
        <Path
          className='st1'
          d='M19.74,9.53c-0.47,0-0.85,0.38-0.85,0.85v9.52c-0.05,0.9-0.81,1.58-1.71,1.54h-6.79 c-0.9,0.04-1.66-0.64-1.71-1.54v-9.52c0-0.47-0.38-0.85-0.85-0.85c-0.47,0-0.85,0.38-0.85,0.85v9.52 c0.05,1.83,1.58,3.28,3.41,3.24h6.79c1.83,0.04,3.36-1.4,3.41-3.24v-9.52C20.59,9.91,20.2,9.53,19.74,9.53z'
        />
        <Path
          className='st1'
          d='M20.59,6.98h-3.4v-1.7c0-0.47-0.38-0.85-0.85-0.85h-5.1c-0.47,0-0.85,0.38-0.85,0.85v1.7h-3.4 c-0.47,0-0.85,0.38-0.85,0.85c0,0.47,0.38,0.85,0.85,0.85h13.6c0.47,0,0.85-0.38,0.85-0.85C21.44,7.36,21.06,6.98,20.59,6.98z  M12.08,6.98V6.13h3.4v0.85H12.08z'
        />
        <Path
          className='st1'
          d='M12.93,18.03v-5.95c0-0.47-0.38-0.85-0.85-0.85c-0.47,0-0.85,0.38-0.85,0.85v5.95c0,0.47,0.38,0.85,0.85,0.85 C12.55,18.88,12.93,18.5,12.93,18.03z'
        />
        <Path
          className='st1'
          d='M16.33,18.03v-5.95c0-0.47-0.38-0.85-0.85-0.85s-0.85,0.38-0.85,0.85v5.95c0,0.47,0.38,0.85,0.85,0.85 S16.33,18.5,16.33,18.03z'
        />
      </G>
    </G>
  </Svg>
)
export default Eliminar
