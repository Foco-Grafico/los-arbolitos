import { StyleSheet, Text, View } from 'react-native'

export default function HeaderAdmin ({ children }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#005942',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})
