import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useGetReconciliation from '../../hooks/useGetReconciliation'
import HeaderAdmin from '../admin/header'
import Footer from '../admin/footer'
import { CSSPDF } from '../pdfcss'
import ClassHeader from '../../../classes/header'
import ReportTable from '../../../classes/table'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Print from 'expo-print'

const ExcelJS = require('exceljs')

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

// 1195

export default function CorteDeCaja () {
  const { reconciliation: orders, loading } = useGetReconciliation()

  const print = async (order) => {
    const hasConcept = order.concept !== 'null' && order.concept !== null && order.concept !== '' && order.concept !== 'undefined'

    const descuento = ((order.discount !== '0' && order.discount !== '' && order.discount != null) ? order.discount : 0)
    // const iva = (Number(order.total) * 0.16)
    // const subtotal = Number(order.total - iva)
    const total = order.total

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
          MESA ${order?.table?.name}<br>
          FOLIO: ${order?.folio}<br>
          FECHA: ${new Date().toLocaleDateString()}<br>
          HORA: ${order?.timestamp.split('T')[1]}<br>
          ${(order?.is_effective === true)
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
            ${order?.pretty_list?.map((product) => {
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

            ${hasConcept
? `
              <tr>
                <td style="solid black; padding: 5px;"></td>
                <td style="solid black; padding: 5px;">${order.concept}</td>
                <td style="solid black; padding: 5px; text-align: end;">${priceFormatter.format(order.extra_price)}</td>
            `
: ''}

          </tbody>
        </table>
          

        <p style=" font-family: Helvetica Neue; font-weight: normal;">
        ${(order.discount !== '0' && order.discount !== '' && order.discount != null && order.discount !== 0)
       ? `
          Descuento: ${priceFormatter.format(descuento)}<br>
          <b style='font-size: 24' >Total: </b><b style='font-size: 24'>${priceFormatter.format(total)}</b><br><br>
          <br>
          <br>
          Propina sugerida (10%): ${priceFormatter.format(total * 0.10)}<br>
          Propina sugerida (15%): ${priceFormatter.format(total * 0.15)}<br>
          Propina sugerida (20%): ${priceFormatter.format(total * 0.20)}<br>
          Gracias por su preferencia<br>
          ¡Vuelva pronto!
          `
        : `
          <b style='font-size: 24' >Total: </b><b style='font-size: 24'>${priceFormatter.format(total)}</b><br><br>
          <br>
          <br>
          Propina sugerida (10%): ${priceFormatter.format(total * 0.10)}<br>
          Propina sugerida (15%): ${priceFormatter.format(total * 0.15)}<br>
          Propina sugerida (20%): ${priceFormatter.format(total * 0.20)}<br>
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
    } catch (e) {
      console.log(e)
    }
  }

  const inventoryReport = () => {
    const header = new ClassHeader({
      report: 'CORTE DE CAJA'
    })

    const tables = orders?.data?.map((order) => new ReportTable({
      header: ['PRODUCTO', `PRECIO (${order?.is_effective ? 'E' : 'T'})`, `MESA ${order?.table?.name}`],

      items: order?.dishes?.map((dish) => ({
        name: dish?.name,
        price: dish?.total,
        supplies: dish?.supplies
      })),
      total: order?.total
    }))

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
      <main class="px-16 py-16 flex-col flex gap-11 m-10">
        <section class="flex flex-col gap-5">
          ${header.render()}
          ${tables.map(table => table.getHTMLTable()).join('')}
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total en efectivo: ${priceFormatter.format(orders?.total_cash)}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total en tarjeta: ${priceFormatter.format(orders?.total_debit)}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total general: ${priceFormatter.format(orders?.total)}</span>
          </section>
        </section>
        </main>
    </body>
  </html>

  ${CSSPDF}
    `

    printToFileAsync({
      html,
      base64: false
    }).then((file) => {
      shareAsync(file.uri)
    })
  }

  const inventoryReportExcel = () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFF' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '005942' } },
      alignment: { horizontal: 'center' },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }

    const headersIndex = []

    const matriz = orders?.data?.reduce((acc, curr, index) => {
      headersIndex.push(acc.length)

      const header = [`FOLIO ${curr?.folio}`, `MESERO ${curr?.user?.name}`, `MESA ${curr?.table?.name}`, curr?.is_effective ? 'EFECTIVO' : 'TARJETA']

      const itemsHeader = ['PRODUCTO', 'PRECIO']
      const items = curr?.dishes?.map((dish) => {
        return [dish?.name, priceFormatter.format(dish?.total)]
      })

      const total = ['', 'TOTAL', priceFormatter.format(curr?.total)]

      return [...acc, header, itemsHeader, ...items, total]
    }, [])

    const totalDebit = ['TOTAL EN TARJETA', priceFormatter.format(orders?.total_debit)]
    const totalCash = ['TOTAL EN EFECTIVO', priceFormatter.format(orders?.total_cash)]
    const total = ['TOTAL GENERAL', priceFormatter.format(orders?.total)]

    matriz.forEach((row, index) => {
      const isHeader = headersIndex.includes(index)

      if (isHeader) {
        worksheet.addRow(row).eachCell({ includeEmpty: true }, (cell) => {
          cell.style = headerStyle
        })
        return
      }

      // if (isLast) {
      //   worksheet.addRow(row).eachCell({ includeEmpty: true }, (cell) => {
      //     cell.style = {
      //       ...headerStyle,
      //       fill: {
      //         ...headerStyle.fill,
      //         fgColor: { argb: '8B4513' } // Brown color
      //       }
      //     }
      //   })
      //   return
      // }

      worksheet.addRow(row)
    })

    worksheet.addRows([totalCash, totalDebit, total]).forEach((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.style = {
          ...headerStyle,
          fill: {
            ...headerStyle.fill,
            fgColor: { argb: '8B4513' } // Brown color
          }
        }
      })
    })

    worksheet.columns.forEach(column => {
      column.width = 20
    })

    const filePath = `${FileSystem.documentDirectory}/output.xlsx`

    workbook.xlsx.writeBuffer({
      useStyles: true
    })
      .then(buffer => {
        FileSystem.writeAsStringAsync(filePath, buffer.toString('base64'), { encoding: FileSystem.EncodingType.Base64 })
          .catch(err => {
            console.error('Errror al guardar', err)
          })
          .finally(async () => {
            // shareAsync(filePath, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', dialogTitle: 'Compartir archivo Excel' })

            const curi = await FileSystem.getContentUriAsync(filePath)

            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
              data: curi,
              flags: 1,
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
          })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={loading}
        transparent
        statusBarTranslucent
        animationType='fade'
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 7 }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Cargando...</Text>
          </View>
        </View>
      </Modal>
      <HeaderAdmin>
        <Text>CORTE DE CAJA</Text>
      </HeaderAdmin>
      <View style={{ flex: 1, paddingVertical: 40 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
          {orders?.data?.map(item => {
            return (
              <TouchableOpacity
                key={item.key} style={{ flexDirection: 'column', paddingHorizontal: 15, borderWidth: 1, width: '100%', gap: 20 }} onPress={() => {
                  print(item)
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={{ ...styles.text }}>Folio: {item?.folio}</Text>
                  <Text style={styles.text}>Mesero: {item?.user?.name}</Text>
                  <Text style={styles.text}>Mesa: {item?.table?.name}</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 5, paddingHorizontal: 40 }}>
                  {item?.dishes?.map(product => {
                    return (
                      <View key={product?.id} style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ ...styles.text, flex: 3 }}>
                          {product?.name}
                        </Text>
                        <Text style={{ ...styles.text, flex: 1 }}>
                          Precio: {priceFormatter.format(product?.total)}
                        </Text>
                      </View>
                    )
                  })}
                  {item?.concept !== 'null' && item?.concept !== null && item?.concept !== '' && item?.concept !== 'undefined' && (
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Text style={{ ...styles.text, flex: 3 }}>
                        {item?.concept}
                      </Text>
                      <Text style={{ ...styles.text, flex: 1 }}>
                        Precio: {priceFormatter.format(item?.extra_price)}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={{ ...styles.text, textAlign: 'right' }}> Total:{priceFormatter.format(item?.total)} </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <Text style={styles.text}>Total:{priceFormatter.format(orders?.total)}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <TouchableOpacity onPress={inventoryReport} style={styles.button}>
            <Text style={styles.titles}>GENERAR REPORTE PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={inventoryReportExcel}
            style={styles.button}
          >
            <Text style={styles.titles}>GENERAR REPORTE EXCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>

  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#005942',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    flex: 1
  },
  titles: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }

})
