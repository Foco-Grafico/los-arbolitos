import debounce from 'just-debounce-it'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import useGetSupplies from '../../../../hooks/getSupplies'
import { useState } from 'react'
import { v4 } from '../../../../../lib/uuid'

export const SearchBarSupply = ({ onAddSupplyClick }) => {
  const [q, setQ] = useState('')
  const { supplies } = useGetSupplies({ q })

  const [key, setKey] = useState(v4())

  const setQuery = debounce(setQ, 500)

  return (
    <View
      style={{
        position: 'relative'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}
      >
        <TextInput
          key={key}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            color: '#000',
            paddingHorizontal: 10,
            width: 200
          }}
          defaultValue=''
          onChangeText={setQuery}
          placeholder='BUSCAR'
          placeholderTextColor='#005943'
        />
        {/* <SignoMas style={{ width: 24, height: 24 }} /> */}
      </View>
      {Array.isArray(supplies) && supplies?.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: '105%',
            width: '100%',
            maxHeight: 110,
            borderRadius: 5,
            gap: 5,
            paddingVertical: 5,
            overflow: 'hidden',
            backgroundColor: '#8d89898a',
            zIndex: 10
          }}
        >
          {supplies.map((supply) => (
            <TouchableOpacity
              key={supply.id}
              onPress={() => {
                onAddSupplyClick?.(supply)
                setQ('')
                setKey(v4())
              }}
              style={{
                width: '100%',
                paddingHorizontal: 10
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingHorizontal: 10
                }}
              >
                {supply.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
