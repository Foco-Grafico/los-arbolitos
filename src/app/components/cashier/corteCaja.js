import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import useGetReconciliation from '../../hooks/useGetReconciliation'
import HeaderAdmin from '../admin/header'
import Footer from '../admin/footer'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { CSSPDF } from '../pdfcss'
import ClassHeader from '../../../classes/header'
import ReportTable from '../../../classes/table'

export default function CorteDeCaja () {
  const { reconciliation } = useGetReconciliation()
  console.log(JSON.stringify(reconciliation.data))

  const generateOrderReport = async () => {
    const orders = reconciliation.data
    const totalGeneral = orders?.total
    const quantityGeneral = orders?.quantity
    const tableOrders = orders.map(order => {
      const header = new ClassHeader({
        order
      })

      const table = new ReportTable({
        header: ['PRODUCTOS', 'PRECIO'],
        items: [
          ...order?.products?.map(x => ({
            name: x?.name,
            total: x?.price.toLocaleString('es-MX', {
              style: 'currency',
              currency: 'MXN'
            })
          })),
          ...order?.drinks.map(x => ({
            name: `${x.name} (${x.quantity})`,
            total: x.total.toLocaleString('es-MX', {
              style: 'currency',
              currency: 'MXN'
            })
          }))
        ],
        total: `${order?.total.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN'
        })} ${order?.discount != null && order?.discount > 0
            ? `(Descuento: ${order?.discount.toLocaleString('es-MX', {
              style: 'currency',
              currency: 'MXN'
            })})`
              : ''}`
      })

      return { header, table }
    })
    //
    const html = `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="description" content="Astro description">
      <meta name="viewport" content="width=device-width" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="generator" content={Astro.generator} />
      <title>{title}</title>
    </head>
    <body>
      <main class="px-16 py-16 flex-col flex gap-11">
        ${tableOrders?.map(({ header, table }) => {
          return `
          <section class="flex flex-col gap-5">
            ${header?.render()}
            ${table?.getHTMLTable()}
          </section>
          `
        })}

        <div class="flex gap-2 flex-grow">
          <div style="background-color: #fbbd01;" class="flex rounded font-black justify-center flex-grow">
            <span>TOTAL DE VENTA POR EFECTIVO</span >
          </div>
          <div style="color: #fbbd01;" class=" bg-black flex justify-center items-center px-10 rounded flex-grow">
          </div>
        </div>
        <div class="flex gap-2 flex-grow">
          <div style="background-color: #fbbd01;" class="flex rounded font-black justify-center flex-grow">
            <span>TOTAL DE VENTA POR TARJETA</span >
          </div>
          <div style="color: #fbbd01;" class=" bg-black flex justify-center items-center px-10 rounded flex-grow">
          </div>
        </div>
        <div class="flex gap-2 flex-grow">
        <div style="background-color: #fbbd01;" class="flex rounded font-black justify-center flex-grow">
          <span>TOTAL GENERAL / TOTAL DE ORDENES</span>
        </div>
        <div style="color: #fbbd01;" class=" bg-black flex justify-center items-center px-10 rounded flex-grow">
          ${totalGeneral.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
          })} / ${quantityGeneral}
        </div>
      </div>
      </main>
    </body>
  </html>

  ${CSSPDF}
    `

    printToFileAsync({
      html,
      base64: false
    })
      .then(file => {
        shareAsync(file.uri)
      })
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderAdmin>
        <Text>Corte de caja</Text>
      </HeaderAdmin>
      <View style={{ flex: 1, paddingVertical: 40 }}>
        <FlatList
          data={reconciliation?.data}
          renderItem={({ item }) =>
            <View key={item.key}>
              <Text>{item?.user?.name}  {item?.table?.name}</Text>
              <Text>'Productos'</Text>
              {item?.dishes?.map(product => {
                return (
                  <Text key={product?.id}>
                    Nombre: {product?.name} Precio: {product?.total}
                  </Text>
                )
              })}
            </View>}
        />
        <Text>Total: {reconciliation?.total}</Text>
      </View>
      <TouchableOpacity onPress={generateOrderReport}>
        <Text>Generar reporte</Text>
      </TouchableOpacity>
      <Footer />
    </View>

  )
}
