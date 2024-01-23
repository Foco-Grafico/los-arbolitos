import { StyleSheet, Text, View } from 'react-native'
import { boxesStore } from '../../../../stores/admin'

export default function HeaderAdmin ({ children }) {
  const selectedBox = boxesStore(state => state.selectedBox)

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{children}</Text>
      {selectedBox.name !== '' ? <Text style={styles.text}>({selectedBox?.name})</Text> : ''}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})
