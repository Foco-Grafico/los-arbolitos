import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export const Salero = (props) => (
  <Svg
    baseProfile='basic'
    x={0}
    y={0}
    viewBox='0 0 24 24'
    xmlSpace='preserve'
    {...props}
  >
    <Circle
      cx={11.63}
      cy={11.66}
      r={11.64}
      style={{
        fill: '#ff9d00'
      }}
    />
    <Path
      fill='#fff'
      d='M15.17 10.02a.582.582 0 0 0-.54-.16l-2.44-3.1a.3.3 0 0 0-.42-.05.3.3 0 0 0-.05.42l2.43 3.08-.43.43-2.17-2.63c-.03-.03-.06-.06-.09-.08a4.09 4.09 0 0 0-2.69-.37c-.76.15-1.45.49-1.88.92-.35.35-.47.72-.32 1.01.02.04.05.07.08.1l4.51 3.6-.43.43L4.98 9.1c-.2-.16-.35-.48-.37-.82-.01-.27.06-.5.19-.63l3.37-3.37c.13-.13.36-.2.63-.18.34.02.66.16.82.37l.44.56c.1.13.29.15.42.05a.3.3 0 0 0 .05-.42l-.45-.56c-.26-.34-.74-.57-1.25-.6-.44-.02-.83.1-1.09.36L4.38 7.23c-.26.25-.39.64-.36 1.08.03.51.26.99.59 1.25l5.76 4.54c-.01.04-.01.08-.01.12 0 .16.06.31.17.42l1.05 1.05c.39.39.92.61 1.47.61s1.08-.22 1.47-.61l1.68-1.68c.39-.39.61-.92.61-1.47 0-.56-.22-1.08-.61-1.47l-1.03-1.05zm-8.06-.83c.02-.09.15-.29.48-.52.83-.57 2.23-.87 3.53-.23l2.17 2.62-1.71 1.71-4.47-3.58zm7.63 1.25.42.42-3.79 3.79-.42-.42 3.79-3.79zm1.25 2.92-.2-.2a.29.29 0 0 0-.42 0 .29.29 0 0 0 0 .42l.22.22-.42.42-.22-.22a.29.29 0 0 0-.42 0 .29.29 0 0 0 0 .42l.22.22-.42.42-.22-.22a.29.29 0 0 0-.42 0 .29.29 0 0 0 0 .42l.2.2c-.24.16-.52.24-.82.24-.4 0-.77-.15-1.05-.43l-.21-.21 3.79-3.79.21.21c.28.28.43.65.43 1.05-.01.31-.09.59-.25.83zm3.18 3.19a.3.3 0 0 0-.42-.02.3.3 0 0 0-.02.42c.06.06.14.1.22.1.07 0 .14-.03.2-.08.13-.11.14-.3.02-.42zm-2.1 1.67a.3.3 0 0 0-.02.42c.06.06.14.1.22.1a.3.3 0 0 0 .22-.5.29.29 0 0 0-.42-.02zm.81-2.96a.292.292 0 0 0-.42.04c-.11.13-.09.31.04.42.06.05.12.07.19.07.09 0 .17-.04.23-.11.11-.13.09-.31-.04-.42zm-.6 1.48a.3.3 0 0 0-.02.42c.06.06.14.1.22.1a.3.3 0 0 0 .22-.5.3.3 0 0 0-.42-.02zM16 15.5a.3.3 0 0 0 .02.42c.06.05.13.08.2.08.08 0 .16-.03.22-.1a.3.3 0 0 0-.02-.42.3.3 0 0 0-.42.02zm.2 1.45a.292.292 0 0 0-.42.04c-.11.13-.09.31.04.42.06.05.12.07.19.07.09 0 .17-.04.23-.11.1-.13.09-.32-.04-.42z'
    />
    <Path
      fill='#fff'
      d='M11.12 6.19c.16 0 .3-.13.3-.3s-.13-.3-.3-.3c-.16 0-.3.13-.3.3s.13.3.3.3z'
    />
  </Svg>
)
