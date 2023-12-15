import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const Ok = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 48 48'
    width='48px'
    height='48px'
    {...props}
  >
    <Path
      fill='#4caf50'
      d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
    />
    <Path
      fill='#ccff90'
      d='M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z'
    />
  </Svg>
)
export default Ok
