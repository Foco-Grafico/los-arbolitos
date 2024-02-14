import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { Calendar } from '../../components/calendar'
import { useState } from 'react'
import Calendario from '../../../../assets/calendario'
import Descargar from '../../../../assets/descargar'
import ClassHeader from '../../../classes/header'
import ReportTable from '../../../classes/table'
import useGetSalesReport from '../../hooks/useGetSalesReport'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { CSSPDF } from '../../components/pdfcss'
import { LoadingModal } from '../../components/loading-modal'
import { Table } from '../../components/table'

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

export default function ReporteVentas () {
  const [calendarInitialOpen, setCalendarInitialOpen] = useState(false)
  const [calendarFinalOpen, setCalendarFinalOpen] = useState(false)
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const { data, loading } = useGetSalesReport(initialDate, finalDate)

  console.log(JSON.stringify(data))
  const salesReport = () => {
    const header = new ClassHeader({
      report: 'VENTAS POR FECHA DEL ' + dateFormatter.format(initialDate).toUpperCase() + ' AL ' + dateFormatter.format(finalDate).toUpperCase()
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
            <span style='color:white'>Total en efectivo: ${data?.total_cash}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total en tarjeta: ${data?.total_debit}</span>
          </section>
          <section style='background-color: #005942; align-self: flex-end;' class="flex flex-col px-3 rounded font-black w-36 h-12 justify-center">
            <span style='color:white'>Total general: ${data?.total}</span>
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

  return (
    <View style={styles.main}>
      <LoadingModal loading={loading} />
      <HeaderAdmin>
        REPORTE DE VENTAS
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
          <Pressable onPress={() => setCalendarInitialOpen(prev => !prev)}>
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
      </View>

      <View
        style={{
          flex: 1,
          padding: 40
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            gap: 10
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10
            }}
          >
            <Text style={styles.text}>
              VISTA PREVIA DEL PDF
            </Text>

            <TouchableOpacity style={{ height: 30 }} onPress={() => { salesReport() }}>
              <Descargar style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>

          <FlatList
            style={{
              maxHeight: 400,
              paddingHorizontal: 10
            }}
            data={data}
            contentContainerStyle={{
              gap: 10
            }}
            renderItem={({ item }) => (
              <Table
                header={['PRODUCTO', `PRECIO (${item?.is_effective ? 'E' : 'T'})`, `MESA ${item?.table?.name}`]}
                rows={
                  item?.dishes?.reduce((acc, dish) => {
                    acc.push([dish?.name, priceFormatter.format(dish?.total), ''])

                    if (dish?.supplies?.length) {
                      dish?.supplies?.forEach(supply => {
                        acc.push([` - ${supply?.name}`, priceFormatter.format(supply?.extra_cost), ''])
                      })
                    }

                    return acc
                  }, [])
                }
              />
            )}
          />

        </View>
      </View>

      {/* <View style={{ flexDirection: 'row', gap: 50, paddingHorizontal: 20 }}>
        <Cancelar style={{ width: 24, height: 24 }} />
        <Aceptar style={{ width: 24, height: 24 }} />
      </View> */}

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
    marginTop: 30
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005943'
  }
})
