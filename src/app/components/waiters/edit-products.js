import { TouchableOpacity, View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import SwitchSlider from '../switch-slider'
import { orderStore } from '../../../../stores/waiter'
import Eliminar from '../../../../assets/eliminar'
import SignoMenos from '../../../../assets/signodemenos'
import SignoMas from '../../../../assets/signodemas'
import useGetSupplies from '../../hooks/getSupplies'
import { useState } from 'react'
import debounce from 'just-debounce-it'
import { modifyDish } from '../../../lib/api-call/order/modify-dish'

export default function EditProducts () {
  const { isDishSelected, setIsDishSelected, selectedProducts, addSupplyToProduct, table } = orderStore((state) => ({
    isDishSelected: state.isDishSelected,
    setIsDishSelected: state.setIsDishSelected,
    selectedProducts: state.selectedProducts,
    addSupplyToProduct: state.addSupplyToProduct,
    table: state.table
  }))
  const [query, setQuery] = useState(null)
  const { supplies, setView } = useGetSupplies({ q: query })

  const toggleModificarPlatillo = () => {
    setIsDishSelected(false)

    for (const product of selectedProducts) {
      const supplies = product.supplies.map(supply => ({
        id: supply.id,
        quantity: supply.quantity
      }))

      console.log(supplies)

      modifyDish(table?.order?.id, product.id, supplies)
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const debouncedSetQ = debounce(setQuery, 400)

  if (isDishSelected) {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >

        <View style={styles.modal}>
          <View style={styles.modalEditProduct}>
            <ScrollView
              onScroll={() => {
                setView(false)
              }}
              contentContainerStyle={{ }}
            >
              {selectedProducts.map((item, i) => (
                <Product
                  addSupplyToProduct={addSupplyToProduct}
                  suppliesSetView={setView} setQ={debouncedSetQ}
                  supplies={supplies}
                  key={i}
                  product={item}
                  index={i}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={toggleModificarPlatillo}
            >
              <Aceptar style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const Product = ({ product, index, setQ, supplies, suppliesSetView, addSupplyToProduct }) => {
  return (
    <View style={styles.modalObject}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ backgroundColor: '#005943', color: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 2, fontWeight: 'bold', fontSize: 15 }}>
            {product.name}
          </Text>
          <Eliminar style={{ width: 24, height: 24 }} />
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, position: 'relative' }}>
          <TextInput
            onChangeText={(text) => {
              suppliesSetView(true)
              setQ(text)
            }}
            placeholder='BUSCAR'
            placeholderTextColor='#005943'
            style={styles.buscador}
          />
          {supplies.length > 0 && (
            <View style={{
              position: 'absolute',
              top: '105%',
              width: '100%',
              left: 20,
              maxHeight: 110,
              backgroundColor: '#8d89898a',
              borderRadius: 5,
              gap: 5,
              paddingVertical: 5,
              overflow: 'hidden'
            }}
            >
              {supplies.map((supply, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      const newSupply = {
                        extra_cost: 0,
                        id: supply.id,
                        key: `${supply.key + i}`,
                        name: supply.name,
                        quantity: 1
                      }

                      addSupplyToProduct(newSupply, index)
                      suppliesSetView(false)
                    }}
                    style={{ width: '100%', paddingHorizontal: 10 }} key={supply.key}
                  >
                    {supply != null
                      ? (
                        <Text style={{
                          fontSize: 15,
                          fontWeight: 'bold'
                        }}
                        >
                          {supply?.name}
                        </Text>
                        )
                      : null}
                  </TouchableOpacity>
                )
              })}
              {supplies?.name}
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {product.supplies.map((supply, i) => <Supply key={supply.key} supply={supply} productIndex={index} index={i} />)}
      </View>
      <View style={styles.textinput}>
        <TextInput style={styles.modalText} placeholderTextColor='#005943' placeholder='Observaciones' />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
        <Text style={styles.modalText}>
          PLATILLO PRIORITARIO
        </Text>
        <SwitchSlider />
      </View>
      <View style={{ backgroundColor: '#005943', width: '90%', height: 5, alignContent: 'center' }} />
    </View>
  )
}

const Supply = ({ supply, index, productIndex }) => {
  const { incrementSupplyQuantity, decrementSupplyQuantity } = orderStore((state) => ({
    incrementSupplyQuantity: state.incrementSupplyQuantity,
    decrementSupplyQuantity: state.decrementSupplyQuantity
  }))

  return (
    <View style={{ width: 250, marginBottom: 5, flexDirection: 'row', gap: 20 }}>
      <Text style={{ width: 100, color: '#005943', fontSize: 15, fontWeight: 'bold' }}>
        {supply?.name}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
        <TouchableOpacity
          onPress={() => {
            decrementSupplyQuantity(index, productIndex)
          }}
        >
          <SignoMenos style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
          {supply?.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => {
            incrementSupplyQuantity(index, productIndex)
          }}
        >
          <SignoMas style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#377c6a90',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buscador: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderRadius: 10,
    color: '#000',
    paddingHorizontal: 10
  },
  modalForm: {
    backgroundColor: '#fff',
    width: 540,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  modalText: {
    color: '#005943',
    fontSize: 15,
    fontWeight: 'bold'
  },
  modalEditProduct: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20
  },
  modalObject: {
    flexDirection: 'column',
    gap: 15,
    width: 500,
    alignItems: 'center',
    paddingVertical: 20
  },
  observaciones: {
    color: '#005943',
    fontSize: 15,
    fontWeight: 'bold'
  },
  textinput: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 500,
    height: 150
  }
})
