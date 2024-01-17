import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReporteVentas () {
  const [date, setDate] = useState(new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      .catch((err) => {
        console.log(err)
      })

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate)

    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    console.log(formattedDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  console.log(date)
  return (
    <View style={styles.main}>
      <HeaderAdmin>
        REPORTE DE VENTAS
      </HeaderAdmin>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE INICIO</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>Seleccionar Fecha</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour
              onChange={onChange}
              timeZoneName='MX'
            />
          )}
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text>FECHA DE TÉRMINO</Text>
          <TouchableOpacity onPress={showDatepicker} style={{ borderWidth: 1, borderRadius: 10 }}>
            <Text>{date}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour
              onChange={onChange}
              timeZoneName='MX'
            />
          )}
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
