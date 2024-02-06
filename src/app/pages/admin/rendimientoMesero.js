import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
import Calendario from '../../../../assets/calendario'
import Descargar from '../../../../assets/descargar'
import useGetUsers from '../../hooks/getUsers'
// import { printToFileAsync } from 'expo-print'
// import { shareAsync } from 'expo-sharing'
// import ClassHeader from '../../../classes/header'
// import ReportTable from '../../../classes/table'
// import { CSSPDF } from '../../components/pdfcss'

export default function RendimientoMesero () {
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
  console.log(users)
  return (
    <View style={styles.main}>
      <HeaderAdmin>
        <Text style={styles.textTitle}>RENDIMIENTO DE MESERO</Text>
      </HeaderAdmin>
      <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'column', gap: 30 }}>
            <Text style={styles.text}>FECHA DE INICIO</Text>
            <Pressable onPress={() => setCalendarInitialOpen(!calendarInitialOpen)}>
              <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 30 }}>
                <Calendario />
                {initialDate === undefined ? <Text>{formattedDate}</Text> : <Text>{initialDate}</Text>}
              </View>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'column', gap: 30 }}>
            <Text style={styles.text}>FECHA DE TÉRMINO</Text>
            <Pressable onPress={() => setCalendarFinalOpen(!calendarFinalOpen)}>
              <View style={{ borderWidth: 1, gap: 10, flexDirection: 'row', width: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 30 }}>
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
        <View style={{ borderWidth: 1, borderRadius: 10, width: '80%', height: 700, alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { setOpenReport(true) }}>
            <ScrollView contentContainerStyle={{ gap: 10, width: '100%' }} visible={openReport}>
              {users?.map((user, index) => (
                <View key={user.key} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: 40 }}>
                  <View style={{ backgroundColor: index % 2 === 0 ? '#bfd5d0' : 'white', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                    <View style={{ flexDirection: 'row', width: 200 }}>
                      <Text style={styles.text}>{user?.name}</Text>
                      <Text style={styles.text}> {user?.lastname}</Text>
                    </View>
                  </View>
                  <View style={{ borderWidth: 1, borderRadius: 10, height: 40, width: 150, paddingHorizontal: 10, justifyContent: 'center' }}>
                    <Text style={styles.text}>$ {user?.total}</Text>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                      <Descargar style={{ width: 20, height: 20 }} />
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
  main: {
    flex: 1,
    backgroundColor: 'white',
    gap: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'

  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})
