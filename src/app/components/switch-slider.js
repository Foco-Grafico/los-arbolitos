import React, { useRef, useEffect, useState } from 'react'
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native'

export default function SwitchSlider () {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <View style={active ? styles.slider : styles.inActive}>
      <TouchableOpacity onPress={handleClick}>
        <FadeInView active={active} style={active ? styles.bolitaActive : styles.bolitainActive} />
      </TouchableOpacity>
    </View>
  )
}

const FadeInView = ({ active, style }) => {
  const moveAnim = useRef(new Animated.Value(-20))

  useEffect(() => {
    Animated.spring(
      moveAnim.current,
      {
        toValue: active ? 10 : -20,
        useNativeDriver: true,
        bounciness: 60

      }
    ).start()
  }, [active])

  return (
    <View style={{ paddingLeft: 20 }}>
      <Animated.View
        style={{
          ...style,
          transform: [{ translateX: moveAnim.current }]
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  slider: {
    width: 60,
    height: 30,
    backgroundColor: '#005942',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'transparent',
    shadowRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10
  },
  inActive: {
    width: 60,
    height: 30,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'transparent',
    shadowRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10
  },
  bolitaActive: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: '#ecedf1'
  },
  bolitainActive: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: '#ecedf1'
  }
})
