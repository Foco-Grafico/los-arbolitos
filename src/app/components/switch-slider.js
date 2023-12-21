import React, { useRef, useEffect, useState } from 'react'
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native'

export default function SwitchSlider () {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }
  const FadeInView = (props) => {
    const moveAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.spring(
        moveAnim,
        {
          toValue: active ? 10 : -20,
          useNativeDriver: true
        }
      ).start()
    }, [moveAnim, active])

    return (
      <View style={{ paddingLeft: 20 }}>
        <Animated.View
          style={{
            ...props.style,
            transform: [{ translateX: moveAnim }]
          }}
        >
          {props.children}
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={active ? styles.slider : styles.inActive}>
      <TouchableOpacity onPress={handleClick}>
        <FadeInView style={active ? styles.bolitaActive : styles.bolitainActive} />
      </TouchableOpacity>
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
