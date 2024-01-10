import { StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import { useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function CreateEmployee () {
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

  return (
    <View style={styles.main}>
      <HeaderAdmin>CREAR EMPLEADO</HeaderAdmin>
      <View style={styles.container}>
        <Text>Nombre</Text>

      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
