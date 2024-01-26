import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SignoMenos from '../../../../../../assets/signodemenos'
import SignoMas from '../../../../../../assets/signodemas'

export const Counter = ({ defaultValue = 1, onChange = () => {}, block = false }) => {
  const [counter, setCounter] = useState(defaultValue)

  useEffect(() => {
    if (block && counter < 1) {
      setCounter(() => {
        onChange(1)
        return 1
      })
    }
  }, [counter])

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setCounter(prev => {
            onChange(prev - 1)
            return prev - 1
          })
        }}
      >
        <SignoMenos style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
        {counter}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setCounter(prev => {
            onChange(prev + 1)
            return prev + 1
          })
        }}
      >
        <SignoMas style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  )
}
