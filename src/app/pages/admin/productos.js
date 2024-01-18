import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import Editar from '../../../../assets/editar'

export default function ProductosList () {
  const bebidas = 'BEBIDAS'

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        <Text>PRODUCTOS DE {bebidas}</Text>
      </HeaderAdmin>
      {/* <FlatList
        numColumns={2}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: 'center', gap: 20 }}
        renderItem={({ item, index }) => (
          <View
            key={item.key} style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}
          >
            <TouchableOpacity style={styles.container}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>{item?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 7, top: 50 }}
              onPress={() => {
                // setInfo({
                //   name: item?.name,
                //   id: item?.id,
                //   index
                // })

                // setModal(true)
              }}
            >
              <Editar style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        )}
      /> */}
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
    height: 90,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
