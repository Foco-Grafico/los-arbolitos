import { Pressable, StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
// import { printToFileAsync } from 'expo-print'
// import { shareAsync } from 'expo-sharing'
// import { CSSPDF } from '../pdfcss'
// import ReportTable from '../../../classes/table'
// import DateHeader from '../../../classes/dateHeader'

export default function ReporteVentas () {
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

  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        REPORTE DE VENTAS
      </HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE INICIO</Text>
          <Pressable onPress={() => setCalendarOpen(!calendarOpen)}>
            <Text>CALENDARIO</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE TÉRMINO</Text>
        </View>
        <Calendar
          isOpen={calendarOpen}
          onChangeDate={date => {
            setCalendarOpen(false)
          }}
        />
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
  }
})
