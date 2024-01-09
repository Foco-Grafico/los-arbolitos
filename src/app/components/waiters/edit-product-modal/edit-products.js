// import { TouchableOpacity, View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import Aceptar from '../../../../../assets/aceptar'
// import SwitchSlider from '../switch-slider'
// import { orderStore } from '../../../../stores/waiter'
import Eliminar from '../../../../../assets/eliminar'
// import SignoMenos from '../../../../assets/signodemenos'
// import SignoMas from '../../../../assets/signodemas'
// // import useGetSupplies from '../../hooks/getSupplies'
// // import { useState } from 'react'
// import debounce from 'just-debounce-it'
// import { modifyDish } from '../../../../lib/api-call/order/modify-dish'

import { FlatList, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SearchBarSupply } from './components/searchSuppliesBar'
import { Counter } from './components/counter'
import { modifyDish } from '../../../../lib/api-call/order/modify-dish'
import { tableStore } from '../../../../../stores/waiter'
// import { tableStore } from '../../../../../stores/waiter'
// import SignoMas from '../../../../../assets/signodemas'
// import SignoMenos from '../../../../../assets/signodemenos'
// import { v4 } from '../../../../lib/uuid'
// import { useState } from 'react'
// import debounce from 'just-debounce-it'
// import useGetSupplies from '../../../hooks/getSupplies'
// import { TextInputDebounced } from '../components/text-input'

const Layout = ({ children }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#377c6a90',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'column',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 20,
          gap: 20,
          flex: 1,
          width: '100%'
        }}
      >
        {children}
      </View>
    </View>

  )
}

export default function EditProducts ({ editProductController }) {
  const [dishSelected, setSelectDish] = useState(null)
  const editProducts = tableStore(state => state.editProducts)

  if (editProductController?.isVisible && dishSelected == null) {
    return (
      <Layout>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#005943'
          }}
        >
          PRODUCTOS
        </Text>
        <FlatList
          data={editProductController?.data?.items ?? []}
          style={{
            width: '100%'
          }}
          contentContainerStyle={{
            gap: 5,
            width: '50%',
            alignSelf: 'center'
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#8d89898a',
                padding: 5,
                borderRadius: 5
              }}
              onPress={() => {
                setSelectDish(item)
              }}
            >
              <Text
                style={{
                  color: '#005943',
                  fontSize: 15,
                  fontWeight: 'bold'
                }}
              >
                {item?.name?.toUpperCase()}
              </Text>
              <TouchableOpacity onPress={() => {
                // console.log('item', item)
              }}
              >
                <Eliminar style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            editProductController?.setVisible?.(false)
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#005943'
            }}
          >
            CERRAR
          </Text>
        </TouchableOpacity>
      </Layout>

    )
  }

  if (editProductController?.isVisible) {
    return (
      <Layout>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#005943',
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 4
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff'
              }}
            >
              {dishSelected?.name}
            </Text>
          </View>
          <SearchBarSupply
            onAddSupplyClick={(supply) => {
              setSelectDish(prev => {
                const newDish = { ...prev }
                newDish.supplies.push({ ...supply, quantity: 1 })
                return newDish
              })
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
            gap: 5
          }}
        >
          {dishSelected?.supplies?.map((supply, index) => (
            <View
              key={supply?.key}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#005943'
                }}
              >
                {supply?.name}
              </Text>
              <Counter
                onChange={(value) => {
                  setSelectDish(prev => {
                    const newDish = { ...prev }
                    newDish.supplies[index].quantity = value

                    if (value === 0) {
                      newDish.supplies.splice(index, 1)
                    }

                    return newDish
                  })
                }}
                defaultValue={supply?.quantity}
              />
            </View>
          ))}
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 1,
            padding: 5,
            borderRadius: 5
          }}
        >
          <Text>
            Observaciones
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={{
              textAlignVertical: 'top'
            }}
            defaultValue={dishSelected?.comment}
            onChangeText={text => {
              setSelectDish(prev => {
                const newDish = { ...prev }
                newDish.comment = text
                return newDish
              })
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#005943'
            }}
          >
            PLATILLO PRIORITARIO
          </Text>
          <Switch
            trackColor={{ true: '#005942' }}
            thumbColor='#005942'
            ios_backgroundColor='#3e3e3e'
            onValueChange={() => {
              setSelectDish(prev => {
                const newDish = { ...prev }
                newDish.priority = !newDish.priority

                return newDish
              })
            }}
            value={dishSelected?.priority}
          />
          <TouchableOpacity
            onPress={() => {
              // editProductController?.onAccept(dishSelected)
              // setSelectDish(null)

              const supplies = dishSelected?.supplies?.map(supply => ({
                id: supply?.id,
                quantity: supply?.quantity
              }))

              modifyDish(editProductController?.data?.orderId, dishSelected?.id, supplies, dishSelected?.priority, dishSelected?.comment)

              editProducts(editProductController?.data?.orderId)
              setSelectDish(null)
            }}
          >
            <Aceptar style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </Layout>
    )
  }
}

// const Supply = ({ supply, index, productIndex, adjust }) => {
//   return (
//     <View style={{ width: 250, marginBottom: 5, flexDirection: 'row', gap: 20 }}>
//       <Text style={{ width: 100, color: '#005943', fontSize: 15, fontWeight: 'bold' }}>
//         {supply?.name}
//       </Text>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
//         <TouchableOpacity
//           onPress={() => {
//             adjust(index, productIndex, '-')
//           }}
//         >
//           <SignoMenos style={{ width: 24, height: 24 }} />
//         </TouchableOpacity>
//         <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
//           {supply?.quantity}
//         </Text>
//         <TouchableOpacity
//           onPress={() => {
//             adjust(index, productIndex, '+')
//           }}
//         >
//           <SignoMas style={{ width: 24, height: 24 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }
