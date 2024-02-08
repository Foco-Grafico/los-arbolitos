import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useGetUsers from '../../hooks/getUsers'
import Editar from '../../../../assets/editar'
import SignoMas from '../../../../assets/signodemas'
import Footer from '../../components/admin/footer'
import { routerStore } from '../../../../stores/router'
import { selectedAccountStore } from '../../../../stores/account'

export default function Empleados () {
  const { users } = useGetUsers()
  const nav = routerStore(state => state.nav)
  const setSelectedAccount = selectedAccountStore(state => state.setSelectedAccount)

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>EMPLEADOS</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={users}
          contentContainerStyle={{ width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
          renderItem={({ item, index }) =>
            <View style={{ backgroundColor: index % 2 === 0 ? '#bfd5d0' : 'white', flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
              <View style={{ paddingVertical: 10, width: '90%' }}>
                <Text style={{ ...styles.text, color: index % 2 === 0 ? '#005943' : '#367c6a' }}>{item?.name} {item?.lastname}</Text>
              </View>
              <TouchableOpacity
                style={{ width: '10%' }} onPress={
                () => {
                  setSelectedAccount(item)
                  nav('createEmployee')
                }
                }
              >
                <Editar style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            </View>}
        />
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }} onPress={() => nav('createEmployee')}>
          <SignoMas style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 10
  },
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
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
    color: '#005942',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#462f27',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
