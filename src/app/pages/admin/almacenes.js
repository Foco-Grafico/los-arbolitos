import { StyleSheet, Text, View } from 'react-native'
import HeaderAdmin from '../../components/admin/header'
import Footer from '../../components/admin/footer'
import useGetBoxList from '../../hooks/useGetBoxList'

export default function Almacenes () {
  const { boxes } = useGetBoxList()
  console.log(boxes)

  return (
    <View style={styles.main}>
      <HeaderAdmin>
        INVENTARIOS
      </HeaderAdmin>
      <View style={styles.container}>
        <Text>
          Inventarios
        </Text>
        {boxes?.map(box => {
          return (
            <Text key={box?.id}>
              {box?.name}
            </Text>
          )
        })}
        <View />
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
