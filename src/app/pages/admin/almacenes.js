import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useGetBoxList from '../../hooks/useGetBoxList'
import SignoMas from '../../../../assets/signodemas'

export default function Almacenes () {
  const { boxes } = useGetBoxList()
  console.log(boxes)

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        INVENTARIOS
      </HeaderAdmin>
      <View style={styles.container}>
        {boxes?.map(box => {
          return (
            <TouchableOpacity key={box?.id} style={styles.box}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                {box?.name}
              </Text>
            </TouchableOpacity>
          )
        })}
        <View />
      </View>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 30, borderRadius: 10 }}>
        <TouchableOpacity style={{ borderRadius: 10, padding: 10 }}>
          <SignoMas style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 10
  },
  box: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    height: 50,
    width: 200,
    justifyContent: 'center',
    shadowColor: '#000'
  }
})
