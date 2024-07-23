import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
import Calendario from '../../../../assets/calendario'
import { LoadingModal } from '../../components/loading-modal'
import useGetReportXProduct from '../../hooks/useGetReportXProduct'
import { Table } from '../../components/table'
import { v4 } from '../../../lib/uuid'
import { dateFormatter, priceFormatter } from '../../../utils/formatters'
import ClassHeader from '../../../classes/header'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { CSSPDF } from '../../components/pdfcss'
import Descargar from '../../../../assets/descargar'
import ReportXProductTable from '../../../classes/tablexproduct'
// import Descargar from '../../../../assets/descargar'

export default function ReporteVentasPorProducto() {
  const [calendarInitialOpen, setCalendarInitialOpen] = useState(false)
  const [calendarFinalOpen, setCalendarFinalOpen] = useState(false)
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const { data, loading, total } = useGetReportXProduct(initialDate, finalDate)

  console.log(JSON.stringify(data))

  const salesReport = () => {
    const header = new ClassHeader({
      // biome-ignore lint/style/useTemplate: <explanation>
      report: 'VENTAS POR PRODUCTO CON FECHA DEL ' + initialDate.toISOString().split('T')[0] + ' AL ' + finalDate.toISOString().split('T')[0]
    })

    const tables = Object.entries(data).map(([key, value]) => new ReportXProductTable({
      header: [`${key}`, 'PRODUCTO', 'CANTIDAD'],

      items: value.products.map((dish) => ({
        name: dish?.name,
        quantity: dish?.quantity,
        total: dish?.total,
        extras: dish?.extras
      })),
      total: value?.total

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

  return (
    <View style={styles.main}>
      <LoadingModal loading={loading} />
      <Calendar
        isOpen={calendarInitialOpen}
        onChangeDate={
          (date) => {
            setInitialDate(date)
            setCalendarInitialOpen(false)
          }
        }
      />
      <Calendar
        isOpen={calendarFinalOpen}
        onChangeDate={
          (date) => {
            setFinalDate(date)
            setCalendarFinalOpen(false)
          }
        }
      />
      <HeaderAdmin>
        <Text style={styles.textTitle}>REPORTE DE VENTAS POR PLATILLO</Text>
      </HeaderAdmin>
      <View style={styles.container}>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          flex: 1
        }}
        >
          <Text style={styles.text}>FECHA DE INICIO</Text>
          <Pressable
            onPress={() => {
              setCalendarInitialOpen(true)
            }}
          >
            <View style={{
              borderWidth: 1,
              gap: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 10
            }}
            >
              <Calendario />
              <Text
                style={[styles.text, {
                  fontSize: 18
                }]}
              >
                {dateFormatter(initialDate)}
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          flex: 1
        }}
        >
          <Text style={styles.text}>FECHA DE TÉRMINO</Text>
          <Pressable onPress={() => setCalendarFinalOpen(true)}>
            <View style={{
              borderWidth: 1,
              gap: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 10
            }}
            >
              <Calendario />
              <Text
                style={[styles.text, {
                  fontSize: 18
                }]}
              >
                {dateFormatter(finalDate)}
              </Text>
            </View>
          </Pressable>

        </View>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            gap: 10
          }}
          style={{
            paddingHorizontal: 20
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>Reporte de ventas por producto</Text>
            <Descargar style={{ width: 24, height: 24 }} onPress={() => { salesReport() }} />
          </View>
          {Object.entries(data).map(([key, value]) => {
            return (
              <Table
                key={v4()}
                header={[key, 'Cantidad', 'Total']}
                rows={[
                  ...value.products.map((item) => {
                    return ([item.name, item.quantity, priceFormatter(item.total)])
                  })
                ]}
                footer={['Total', '', priceFormatter(value.total)]}
              />
            )
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Text
          style={[styles.text, {
            fontSize: 18,
            fontWeight: 'bold'
          }]}
        >Total: {priceFormatter(total)}
        </Text>
      </View>
      <Footer />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 30
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  }
})
