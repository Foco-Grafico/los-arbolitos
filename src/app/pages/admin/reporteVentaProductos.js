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
// import Descargar from '../../../../assets/descargar'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function ReporteVentasPorProducto () {
  const [calendarInitialOpen, setCalendarInitialOpen] = useState(false)
  const [calendarFinalOpen, setCalendarFinalOpen] = useState(false)
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const { data, loading, total } = useGetReportXProduct(initialDate, finalDate)

  console.log(initialDate, finalDate)

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
                {dateFormatter.format(finalDate)}
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
          <Text>Reporte de ventas por producto</Text>
          {Object.entries(data).map(([key, value]) => {
            return (
              <Table
                key={v4()}
                header={[key, 'Cantidad', 'Total']}
                rows={
                  value.map((item) => {
                    return ([item.name, item.quantity, item.total])
                  })
                }
              />
            )
          })}
        </ScrollView>
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
