import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import useGetUsers from '../../hooks/getUsers'

export default function Empleados () {
  const { users } = useGetUsers()

  console.log((users))
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
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>EMPLEADOS</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={({ item, index }) =>
            <View>
              <Text style={{ ...styles.text, color: index % 2 === 0 ? 'green' : 'blue' }}>{item?.name} {item?.lastname}</Text>
            </View>}
        />
      </View>
      <View style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  },
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  product: {
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20

  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#462f27',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
