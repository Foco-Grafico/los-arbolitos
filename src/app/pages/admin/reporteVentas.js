import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
import Calendario from '../../../../assets/calendario'
import { Cancelar } from '../../../../assets/cancelar'
import Aceptar from '../../../../assets/aceptar'
import Descargar from '../../../../assets/descargar'
import ClassHeader from '../../../classes/header'
import ReportTable from '../../../classes/table'
import useGetSalesReport from '../../hooks/useGetSalesReport'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { CSSPDF } from '../../components/pdfcss'

export default function ReporteVentas () {
  function formatDate (date) {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript comienzan desde 0
    const year = d.getFullYear()

    return `${year}-${month}-${day}`
  }

  const [calendarInitialOpen, setCalendarInitialOpen] = useState(false)
  const [calendarFinalOpen, setCalendarFinalOpen] = useState(false)
  const [initialDate, setInitialDate] = useState()
  const [finalDate, setFinalDate] = useState()
  const { data } = useGetSalesReport(initialDate, finalDate)
  const [openReport, setOpenReport] = useState(false)

  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript comienzan desde 0
  const year = date.getFullYear()

  const formattedDate = `${year}-${month}-${day}`

  const salesReport = () => {
    const header = new ClassHeader({
      report: 'VENTAS POR FECHA DEL ' + initialDate + ' AL ' + finalDate
    })

    const tables = data?.map((orders) => new ReportTable({
      header: ['PRODUCTO', `PRECIO (${orders?.is_effective ? 'E' : 'T'})`, `MESA ${orders?.table?.name}`],

      items: orders?.dishes?.map((dish) => ({
        name: dish?.name,
        price: dish?.total,
        supplies: dish?.supplies
      })),
      total: orders?.total
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
            <span style='color:white'>Total en efectivo: ${formatDate(data?.total_cash)}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total en tarjeta: ${formatDate(data?.total_debit)}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total general: ${formatDate(data?.total)}</span>
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

  console.log(JSON.stringify(data))
  // const salesReport = () => {
  //   const header = new DateHeader({
  //     report: 'CORTE DE CAJA'
  //   })

  //   // const tables = orders?.data?.map((order) => new ReportTable({
  //   //   header: ['PRODUCTO', 'PRECIO'],
  //   //   items: order?.dishes?.map((dish) => ({
  //   //     name: dish?.name,
  //   //     price: dish?.total,
  //   //     supplies: dish?.supplies
  //   //   })),
  //   //   total: order?.total
  //   // }))

  //   const html = `
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="description" content="Astro description">
  //     <meta name="viewport" content="width=device-width" />
  //     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  //     <meta name="generator" content={Astro.generator} />
  //     <title>{title}</title>
  //   </head>
  //   <body>
  //     <main class="px-16 py-16 flex-col flex gap-11 m-10">
  //       <section class="flex flex-col gap-5">
  //         ${header.render()}
  //         ${tables.map(table => table.getHTMLTable()).join('')}
  //       </section>
  //       <section style='background-color: #005942; margin-top: 10px;' class=" flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
  //         <span style='color:white'>Total: ${orders?.total}</span>
  //       </section>
  //     </main>
  //   </body>
  // </html>

  // ${CSSPDF}
  //   `

  //   printToFileAsync({
  //     html,
  //     base64: false
  //   }).then((file) => {
  //     shareAsync(file.uri)
  //   })
  // }

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        REPORTE DE VENTAS
      </HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={styles.text}>FECHA DE INICIO</Text>
          <Pressable onPress={() => setCalendarInitialOpen(!calendarInitialOpen)}>
            <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Calendario />
              {initialDate === undefined ? <Text>{formattedDate}</Text> : <Text>{initialDate}</Text>}
            </View>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={styles.text}>FECHA DE TÉRMINO</Text>
          <Pressable onPress={() => setCalendarFinalOpen(!calendarFinalOpen)}>
            <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Calendario />
              {finalDate === undefined ? <Text>{formattedDate}</Text> : <Text>{finalDate}</Text>}
            </View>
          </Pressable>
        </View>
        <Calendar
          isOpen={calendarInitialOpen}
          onChangeDate={date => {
            setCalendarInitialOpen(false)
            setInitialDate(formatDate(date))
          }}
        />
        <Calendar
          isOpen={calendarFinalOpen}
          onChangeDate={date => {
            setCalendarFinalOpen(false)
            setFinalDate(formatDate(date))
          }}
        />
      </View>
      <View style={{ borderWidth: 1, borderRadius: 10, width: '80%', height: 550, alignSelf: 'center', gap: 10 }}>
        <TouchableOpacity style={{ height: 30, alignSelf: 'flex-end', padding: 14 }} onPress={() => { salesReport() }}>
          <Descargar style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setOpenReport(true) }}>
          <Text style={styles.text}>
            VISTA PREVIA DEL PDF
          </Text>
          <ScrollView contentContainerStyle={{ gap: 10 }} visible={openReport}>
            {data?.map((order) => (
              <View key={order.key} style={{ flexDirection: 'column', justifyContent: 'space-around', width: '100%' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text style={styles.text}>PRODUCTO {order?.table?.name}</Text>
                  <Text style={styles.text}>PRECIO {order?.table?.name}</Text>
                  <Text style={styles.text}>MESA {order?.table?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text style={styles.text}>MESA {order?.table?.name}</Text>
                  <Text style={styles.text}>TOTAL: {order?.total}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'flex-end', flexDirection: 'row', gap: 50, paddingHorizontal: 20, flex: 1, marginTop: 40 }}>
        <Cancelar style={{ width: 24, height: 24 }} />
        <Aceptar style={{ width: 24, height: 24 }} />
      </View>
      {/* <TouchableOpacity onPress={() => salesReport()} style={styles.button}>
        <Text style={styles.titles}>GENERAR REPORTE</Text>
      </TouchableOpacity> */}
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005943'
  }
})
