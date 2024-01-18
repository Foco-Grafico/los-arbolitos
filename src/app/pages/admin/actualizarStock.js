import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useGetSupplies from '../../hooks/getSupplies'
import Aceptar from '../../../../assets/aceptar'
import { Cancelar } from '../../../../assets/cancelar'
import { useRef, useState } from 'react'
import debounce from 'just-debounce-it'

export default function UpdateStock ({ editProductController }) {
  const [search, setSearchState] = useState('')
  const scroll = useRef()

  const scrollController = debounce(() => {
    scroll?.current?.scrollTo({ x: 0, y: 0, animated: true })
  }, 1000, true)

  const setSearch = debounce(setSearchState, 500)

  const { supplies } = useGetSupplies({
    all: true,
    q: search
  })

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        <Text>ACTUALIZAR STOCK</Text>
      </HeaderAdmin>
      <View
        style={{
          alignItems: 'flex-end',
          paddingHorizontal: 25
        }}
      >
        <TextInput
          placeholder='BUSCAR'
          onChangeText={(text) => {
            scrollController()
            setSearch(text)
          }}
          style={{
            borderWidth: 1,
            width: 250,
            height: 40,
            borderRadius: 10,
            color: '#000',
            paddingHorizontal: 10
          }}
        />

      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around', margin: 10 }}>
          <View style={{ ...styles.box, borderWidth: 0 }} />
          <View style={{ ...styles.box, borderWidth: 0 }}>
            <Text style={{ color: '#005943', fontWeight: 'bold' }}>STOCK MÍNIMO</Text>
          </View>
          <View style={{ ...styles.box, borderWidth: 0 }}>
            <Text style={{ color: '#005943', fontWeight: 'bold' }}>STOCK MÁXIMO</Text>
          </View>
          <View style={{ ...styles.box, borderWidth: 0 }}>
            <Text style={{ color: '#005943', fontWeight: 'bold' }}>STOCK</Text>
          </View>
        </View>
        <ScrollView
          ref={scroll}
          style={{
            paddingHorizontal: 10
          }}
        >
          {supplies.map((item) => (
            <View key={item?.key} style={{ flexDirection: 'row', gap: 10, margin: 5, alignItems: 'center' }}>
              <View style={{ ...styles.box, borderWidth: 0, height: 50, width: 120, alignItems: 'flex-start' }}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>{item?.name}</Text>
              </View>
              <View style={styles.box}>
                <Text>{item?.min_quantity}</Text>
              </View>
              <View style={styles.box}>
                <Text>{item?.max_quantity}</Text>
              </View>
              <TextInput style={styles.box} placeholder={item?.stock} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', gap: 40, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
        <TouchableOpacity>
          <Cancelar style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Aceptar style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 30,
    width: 120,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})
