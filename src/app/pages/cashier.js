import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Modal } from 'react-native'
import { useState } from 'react'
import Tables from '../components/cashier/tables'
import Products from '../components/cashier/products'
import * as Print from 'expo-print'
import finishOrderInCashier from '../func/finish-order-in.cashier'
import useGetOrdersInCashier from '../hooks/getOrdersInCashier'
import { Cerrar } from '../../../assets/cerrar'
import { routerStore } from '../../../stores/router'
import Footer from '../components/admin/footer'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  timeStyle: 'short'
})

export default function Cashier () {
  const [selectedTable, setSelectedTable] = useState({})
  const [requested, setRequested] = useState(false)
  const { data, setData } = useGetOrdersInCashier()
  const [discount, setDiscount] = useState(0)
  const nav = routerStore(state => state.nav)
  const [paymentTypeModal, setPaymentType] = useState(false)
  const [isEffective, setIsEffective] = useState(true)
  const [concept, setConcept] = useState('')
  const [extraPrice, setExtraPrice] = useState(0)

  console.log('selectedTable', JSON.stringify(selectedTable))

  const print = async (isEffective) => {
    setPaymentType(false)

    const hasConcept = concept !== '' && concept !== null && concept !== undefined

    const totalWithDiscount = Number((selectedTable?.total + Number(extraPrice)) - discount)
    // const originalTotal = Number(selectedTable?.total)

    const descuento = ((discount !== '0' && discount !== '' && discount != null) ? discount : 0)
    // const iva = (Number(totalWithDiscount) * 0.16)
    // const subtotal = Number(originalTotal - iva)
    const total = totalWithDiscount

    const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="text-align: center; justify-content:space-around;">
        <p style=" font-family: Montserrat; font-weight: normal;">
         RESTAURANT "LOS ARBOLITOS"<br>
         DIRECCIÓN: AV. ANTONIO TOLEDO CORRO #14 HUERTOS FAMILIARES<br>
         MAZATLÁN, SINALOA CP. 82137<br>
          MESA ${selectedTable?.table?.name}<br>
          FOLIO: ${selectedTable?.folio}<br>
          FECHA: ${new Date().toLocaleDateString()}<br>
          HORA: ${dateFormatter.format(new Date())}<br>
          ${(isEffective === true)
            ? `
            TIPO DE PAGO: EFECTIVO<br>
            `
            : `
            TIPO DE PAGO: TARJETA<br>
            `
          }
          <span>-------------------------------</span>
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="solid black; padding: 5px; text-align: start;">CANT</th>
              <th style="solid black; padding: 5px; text-align: start;">DESCRIPCION</th>
              <th style="solid black; padding: 5px; text-align: end;">IMPORTE</th>
            </tr>
          </thead>

          <tbody>
            ${selectedTable?.pretty_list?.map((product) => {
              return (`
                <tr>
                  <td style="solid black; padding: 5px;">${product?.quantity}</td>
                  <td style="solid black; padding: 5px;">${product?.name}</td>
                  <td style="solid black; padding: 5px; text-align: end;">${priceFormatter.format(product?.price * product.quantity)}</td>
                </tr>
                ${
                  Object.keys(product?.supplies_modified).map(key => {
                    return product?.supplies_modified[key].map(supply => {
                      return (`
                        <tr>
                          <td style="solid black; padding: 5px;"></td>
                          <td style="solid black; padding: 5px;">(${supply.quantity}) ${supply.name}</td>
                          <td style="solid black; padding: 5px; text-align: end;">${priceFormatter.format(supply.extra_cost)}</td>
                        </tr>
                      `)
                    })
                  }).join('')
                }
              `)
            }).join('')}

            ${hasConcept ? `<tr><td style="solid black; padding: 5px;"></td><td style="solid black; padding: 5px;">${concept}</td><td style="solid black; padding: 5px;">${priceFormatter.format(Number(extraPrice))}</td></tr>` : ''}
          </tbody>
        </table>

        <p style=" font-family: Helvetica Neue; font-weight: normal;">
        ${(discount !== '0' && discount !== '' && discount != null && discount !== 0)
       ? `
          Descuento: ${priceFormatter.format(descuento)}<br>
          <b style='font-size: 24' >Total: </b><b style='font-size: 24'>${priceFormatter.format(total)}</b><br><br>
          <br>
          <br>
          Propina sugerida (10%): ${priceFormatter.format(total * 0.10)}<br>
          Propina sugerida (15%): ${priceFormatter.format(total * 0.15)}<br>
          Propina sugerida (20%): ${priceFormatter.format(total * 0.20)}<br>
          <br>
          <br>
          <br>
          Para realizar facturas, puede ingresar en esta liga:<br><br>
          https://losarbolitos.realizatufactura.com/<br><br>

          O escanear este QR
          <br>
          <br>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://losarbolitos.realizatufactura.com/"><br>
          <br><br>
         ¡Gracias por su preferencia,<br>
          Vuelva pronto!
          `
        : `
          <b style='font-size: 24' >Total: </b><b style='font-size: 24'>${priceFormatter.format(total)}</b><br><br>
          <br>
          <br>
          Propina sugerida (10%): ${priceFormatter.format(total * 0.10)}<br>
          Propina sugerida (15%): ${priceFormatter.format(total * 0.15)}<br>
          Propina sugerida (20%): ${priceFormatter.format(total * 0.20)}<br>
          <br>
          <br>
          <br>
          Para realizar facturas, puede ingresar en esta liga:<br><br>
          https://losarbolitos.realizatufactura.com/<br><br>

          O escanear este QR
          <br>
          <br>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://losarbolitos.realizatufactura.com/"><br>
          <br><br>
         ¡Gracias por su preferencia,<br>
          Vuelva pronto!
          `
      }
        </p>
      </body>
    </html>
    `
    try {
      await Print.printAsync({
        html
      })
      setRequested(true)
      setData(prev => {
        const copyPrev = [...prev]
        const index = copyPrev.findIndex(order => order.id === selectedTable?.id)

        const newOrder = {
          ...copyPrev[index],
          requested: true
        }

        copyPrev[index] = newOrder

        return copyPrev
      })
    } catch (e) {
      print(isEffective)
    }
  }

  const handleDiscount = (text) => {
    const discount = Number(text)

    if (isNaN(discount)) {
      setDiscount(0)
      return
    }

    setDiscount(discount)
  }

  const handleFinishOrder = () => {
    finishOrderInCashier(selectedTable?.id, discount, isEffective, concept, extraPrice)
      .finally(() => {
        setData(prev => prev.filter(order => order.id !== selectedTable?.id))
        setSelectedTable({})
        setRequested(false)
        setDiscount(0)
        setConcept('')
        setExtraPrice(0)
      })
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent
        visible={paymentTypeModal}
        onRequestClose={() => {
          setPaymentType(false)
        }}
        statusBarTranslucent
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>
          <View style={{ backgroundColor: '#fff', width: '80%', height: '50%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 40 }}>
            <Text style={{ color: '#005942', fontWeight: 'bold', fontSize: 20 }}>¿Cómo desea pagar?</Text>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ height: 50, width: 150, borderWidth: 1, backgroundColor: '#005942', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                  setIsEffective(true)
                  print(true)
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>EFECTIVO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 50, width: 150, borderWidth: 1, backgroundColor: '#005942', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => {
                  setIsEffective(false)
                  print(false)
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>TARJETA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>CAJA</Text>
        <TouchableOpacity
          onPress={() => {
            nav('login')
          }}
        >
          <Cerrar fill='#fff' style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Tables
          hasSelected={selectedTable?.id != null}
          data={data}
          onPressTable={(order) => {
            setSelectedTable(order)
            setDiscount(order?.discount ? order?.discount : 0)
          }}
        />
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', gap: 30, paddingVertical: 10 }}>
            <Products setSelectedTable={setSelectedTable} table={selectedTable} />
          </ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5, paddingVertical: 10 }}>
            <Text style={styles.text}>DESCUENTO</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                key={selectedTable?.key}
                style={{
                  width: 150,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#005943',
                  textAlign: 'center',
                  fontSize: 15
                }}
                keyboardType='numeric'
                defaultValue={discount.toString()}
                onChangeText={handleDiscount}
              />
            </View>
            <Text style={styles.text}>TOTAL</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ width: 150, paddingVertical: 5, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }}>
                {selectedTable?.total ? priceFormatter.format((selectedTable?.total + Number(extraPrice)) - discount) : '$0.00'}
              </Text>
            </View>
            <Text style={styles.text}>CONCEPTO</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={{
                  width: 150,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#005943',
                  textAlign: 'center',
                  fontSize: 15
                }}
                onChangeText={setConcept}
                multiline
              />
            </View>
            <Text style={styles.text}>PRECIO EXTRA</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={{
                  width: 150,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#005943',
                  textAlign: 'center',
                  fontSize: 15
                }}
                keyboardType='numbers-and-punctuation'
                onChangeText={setExtraPrice}
                value={extraPrice.toString()}
              />
            </View>
            <TouchableOpacity
              style={styles.buttons} onPress={
              () => { setPaymentType(true) }
            }
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>IMPRIMIR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons} onPress={handleFinishOrder} disabled={!requested}
            >
              {requested
                ? <Text style={{ color: '#fff', fontWeight: 'bold' }}>CERRAR CUENTA</Text>
                : <Text style={{ color: '#fff', fontWeight: 'bold' }}>ESPERE...</Text>}
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    flexDirection: 'row',
    flex: 1
  },
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  footer: {
    backgroundColor: '#462f27',
    height: '6%'
  },

  buttons: {
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: '#005942',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  text: {
    color: 'black',
    fontWeight: 'bold'
  },
  textProduct: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  }
})
