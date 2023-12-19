import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Counters () {
  return (
    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 5
  },
  button: {
    backgroundColor: '#fe8c00',
    borderRadius: 100,
    fontSize: 20,
    color: '#000000',
    borderWidth: 1,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    textAlign: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25
  }
})
