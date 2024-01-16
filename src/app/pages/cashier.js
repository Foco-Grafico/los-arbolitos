import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import Tables from '../components/cashier/tables'
import Products from '../components/cashier/products'
import * as Print from 'expo-print'
import finishOrderInCashier from '../func/finish-order-in.cashier'
import useGetOrdersInCashier from '../hooks/getOrdersInCashier'
import { Cerrar } from '../../../assets/cerrar'
import { routerStore } from '../../../stores/router'

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function Cashier () {
  const [selectedTable, setSelectedTable] = useState({})
  const [originalTotal, setOriginalTotal] = useState(0)
  const { data, setData } = useGetOrdersInCashier()
  const [discount, setDiscount] = useState(0)
  const [totalWithDiscount, setTotalDis] = useState(0)
  const nav = routerStore(state => state.nav)

  const print = async () => {
    const descuento = ((discount !== '0' && discount !== '' && discount != null) ? discount : 0)
    const subtotal = Number(originalTotal)
    const iva = (Number(totalWithDiscount) * 0.16)
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
          FOLIO: ${selectedTable?.id}<br>
          ${new Date().toLocaleDateString()}
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

          </tbody>
        </table>
        <p style=" font-family: Helvetica Neue; font-weight: normal;">
        ${(discount !== '0' && discount !== '' && discount != null && discount !== 0)
       ? `SubTotal: ${priceFormatter.format(subtotal)}<br>
          Descuento: ${priceFormatter.format(descuento)}<br>
          IVA: ${priceFormatter.format(iva)}<br>
          <b>Total: </b>${priceFormatter.format(total)} (IVA incluido)<br><br>
          Gracias por su preferencia<br>
          ¡Vuelva pronto!
          `
        : `SubTotal: ${priceFormatter.format(subtotal)}<br>
          IVA: ${priceFormatter.format(iva)}<br>
          <b>Total: </b>${priceFormatter.format(total)} (IVA incluido)<br><br>
          Gracias por su preferencia<br>
          ¡Vuelva pronto!
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
      console.log(e)
    }
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleDiscount = (text) => {
    const discount = Number(text)
    const total = text ? Number(originalTotal) - discount : Number(originalTotal)

    if (isNaN(discount)) {
      setDiscount(0)
      setTotalDis(originalTotal)
      return
    }

    setTotalDis(total)
    setDiscount(discount)
  }

  const handleFinishOrder = () => {
    finishOrderInCashier(selectedTable?.id, selectedTable?.discount ? selectedTable?.discount : 0)
    setData(prev => prev.filter(order => order.id !== selectedTable?.id))
    setSelectedTable({})
  }

  return (
    <View style={styles.container}>
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
            setOriginalTotal(order.total)
            setTotalDis(order.total)
            setDiscount(0)
          }}
        />
        <View style={{ width: '70%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Products table={selectedTable} />
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            <Text style={styles.text}>DESCUENTO</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={{ width: 150, paddingVertical: 5, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }} keyboardType='numeric' value={discount.toString()} onChangeText={handleDiscount}
              />
            </View>
            <Text style={styles.text}>TOTAL</Text>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ width: 150, paddingVertical: 5, borderWidth: 1, borderRadius: 10, color: '#005943', textAlign: 'center', fontSize: 15 }}>
                {totalWithDiscount ? priceFormatter.format(totalWithDiscount) : '$0.00'}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttons} onPress={print}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>IMPRIMIR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttons} onPress={handleFinishOrder} disabled={!selectedTable?.requested}>
            {selectedTable?.requested
              ? <Text style={{ color: '#fff', fontWeight: 'bold' }}>CERRAR CUENTA</Text>
              : <Text style={{ color: '#fff', fontWeight: 'bold' }}>ESPERE...</Text>}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer} />
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
