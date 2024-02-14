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
// import { printToFileAsync } from 'expo-print'
// import { shareAsync } from 'expo-sharing'
// import ClassHeader from '../../../classes/header'
// import ReportTable from '../../../classes/table'
// import { CSSPDF } from '../../components/pdfcss'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function RendimientoMesero () {
  const [calendarInitialOpen, setCalendarInitialOpen] = useState(false)
  const [calendarFinalOpen, setCalendarFinalOpen] = useState(false)
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const { data: sells, loading } = useGetSellReportByUser(initialDate, finalDate)

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

  // console.log(initialDate, finalDate)
  return (
    <View style={styles.main}>
      <Calendar
        isOpen={calendarInitialOpen}
        onChangeDate={date => {
          setCalendarInitialOpen(false)
          setInitialDate(date)
        }}
      />
      <Calendar
        isOpen={calendarFinalOpen}
        onChangeDate={date => {
          setCalendarFinalOpen(false)
          setFinalDate(date)
        }}
      />
      <LoadingModal loading={loading} />
      <HeaderAdmin>
        <Text style={styles.textTitle}>RENDIMIENTO DE MESERO</Text>
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
              setCalendarInitialOpen(prev => !prev)
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
                {dateFormatter.format(initialDate)}
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
          <Pressable onPress={() => setCalendarFinalOpen(prev => !prev)}>
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
              >{dateFormatter.format(finalDate)}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ height: 700, alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', flex: 1 }}>
          <ScrollView contentContainerStyle={{ gap: 10 }}>
            {sells?.map((user, index) => (
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
  textName: {
    color: '#005943',
    fontWeight: 'bold',
    fontSize: 20
  },
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})
