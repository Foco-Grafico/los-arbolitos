import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
import Calendario from '../../../../assets/calendario'
import Descargar from '../../../../assets/descargar'
import useGetUsers from '../../hooks/getUsers'
import useGetSellReportByUser from '../../hooks/useGetSellReportByUser'
import { LoadingModal } from '../../components/loading-modal'

export default function ReporteVentasPorProducto () {
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
  const [openReport, setOpenReport] = useState(false)
  const { users } = useGetUsers()
  const { sells, loading } = useGetSellReportByUser()

  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript comienzan desde 0
  const year = date.getFullYear()

  const formattedDate = `${year}-${month}-${day}`

  //   const salesReport = () => {
  //     const header = new ClassHeader({
  //       report: 'VENTAS POR FECHA DEL ' + initialDate + ' AL ' + finalDate
  //     })

  //     const tables = data?.map((orders) => new ReportTable({
  //       header: ['PRODUCTO', `PRECIO (${orders?.is_effective ? 'E' : 'T'})`, `MESA ${orders?.table?.name}`],

  //       items: orders?.dishes?.map((dish) => ({
  //         name: dish?.name,
  //         price: dish?.total,
  //         supplies: dish?.supplies
  //       })),
  //       total: orders?.total
  //     }))

  //     const html = `
  //         <html lang="en">
  //         <head>
  //           <meta charset="UTF-8" />
  //           <meta name="description" content="Astro description">
  //           <meta name="viewport" content="width=device-width" />
  //           <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  //           <meta name="generator" content={Astro.generator} />
  //           <title>{title}</title>
  //         </head>
  //         <body>
  //           <main class="px-16 py-16 flex-col flex gap-11 m-10">
  //             <section class="flex flex-col gap-5">
  //               ${header.render()}
  //               ${tables.map(table => table.getHTMLTable()).join('')}
  //               <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
  //                 <span style='color:white'>Total en efectivo: ${formatDate(data?.total_cash)}</span>
  //               </section>
  //               <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
  //                 <span style='color:white'>Total en tarjeta: ${formatDate(data?.total_debit)}</span>
  //               </section>
  //               <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
  //                 <span style='color:white'>Total general: ${formatDate(data?.total)}</span>
  //               </section>
  //             </section>
  //             </main>
  //         </body>
  //       </html>

  //       ${CSSPDF}
  //         `

  //     printToFileAsync({
  //       html,
  //       base64: false
  //     }).then((file) => {
  //       shareAsync(file.uri)
  //     })
  //   }
  console.log(sells)

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
      <LoadingModal loading={false} />
      <HeaderAdmin>
        <Text style={styles.textTitle}>REPORTE DE VENTAS POR PLATILLO</Text>
      </HeaderAdmin>
      <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', gap: 40 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'column', gap: 30 }}>
            <Text style={styles.text}>FECHA DE INICIO</Text>
            <Pressable onPress={() => setCalendarInitialOpen(!calendarInitialOpen)}>
              <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 30 }}>
                <Calendario />
                {initialDate === undefined ? <Text style={{ color: 'gray' }}>{formattedDate}</Text> : <Text style={{ color: 'gray' }}>{initialDate}</Text>}
              </View>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'column', gap: 30 }}>
            <Text style={styles.text}>FECHA DE TÉRMINO</Text>
            <Pressable onPress={() => setCalendarFinalOpen(!calendarFinalOpen)}>
              <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 30 }}>
                <Calendario />
                {finalDate === undefined ? <Text style={{ color: 'gray' }}>{formattedDate}</Text> : <Text style={{ color: 'gray' }}>{finalDate}</Text>}
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
        <View style={{ height: 700, alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', flex: 1 }}>
            <ScrollView contentContainerStyle={{ gap: 10 }} visible={openReport}>
              {users?.map((user, index) => (
                <View key={user.key} style={{ flexDirection: 'row', justifyContent: 'space-around', height: 40, gap: -5 }}>
                  <View style={{ backgroundColor: index % 2 === 0 ? '#bfd5d0' : 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <View style={{ flexDirection: 'row', width: 280, justifyContent: 'center' }}>
                      <Text style={styles.textName}>{user?.name}</Text>
                      <Text style={styles.textName}> {user?.lastname}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ borderWidth: 1, borderRadius: 10, height: 40, width: 150, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                      <Text style={styles.text}>$ {user?.total}</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Descargar style={{ width: 20, height: 20, fill: '#005943' }} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
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
