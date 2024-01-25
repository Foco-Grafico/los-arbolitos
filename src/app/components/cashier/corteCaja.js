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

const ExcelJS = require('exceljs')

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function CorteDeCaja () {
  const { reconciliation: orders, loading } = useGetReconciliation()

  const inventoryReport = () => {
    const header = new ClassHeader({
      report: 'CORTE DE CAJA'
    })

    const tables = orders?.data?.map((order) => new ReportTable({
      header: ['PRODUCTO', 'PRECIO'],
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
            <span style='color:white'>Total: ${priceFormatter.format(orders?.total)}</span>
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

      const header = [`FOLIO ${curr?.folio}`, `MESERO ${curr?.user?.name}`, `MESA ${curr?.table?.name}`]

      const itemsHeader = ['PRODUCTO', 'PRECIO']
      const items = curr?.dishes?.map((dish) => {
        return [dish?.name, priceFormatter.format(dish?.total)]
      })

      const total = ['', 'TOTAL', priceFormatter.format(curr?.total)]

      return [...acc, header, itemsHeader, ...items, total]
    }, [])

    const total = ['TOTAL', priceFormatter.format(orders?.total)]

    matriz.push(total)

    matriz.forEach((row, index) => {
      const isHeader = headersIndex.includes(index)
      const isLast = index === matriz.length - 1

      if (isHeader) {
        worksheet.addRow(row).eachCell({ includeEmpty: true }, (cell) => {
          cell.style = headerStyle
        })
        return
      }

      if (isLast) {
        worksheet.addRow(row).eachCell({ includeEmpty: true }, (cell) => {
          cell.style = {
            ...headerStyle,
            fill: {
              ...headerStyle.fill,
              fgColor: { argb: '8B4513' } // Brown color
            }
          }
        })
        return
      }

      worksheet.addRow(row)
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
              <View key={item.key} style={{ flexDirection: 'column', paddingHorizontal: 15, borderWidth: 1, width: '100%', gap: 20 }}>
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
                          Precio: {product?.total}
                        </Text>
                      </View>
                    )
                  })}
                </View>
                <Text style={{ ...styles.text, textAlign: 'right' }}> Total:{item?.total} </Text>
              </View>
            )
          })}
        </ScrollView>
        <Text style={styles.text}>Total: {orders?.total}</Text>
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
