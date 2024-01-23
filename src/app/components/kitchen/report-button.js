import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { ModalHistory } from './ModalHistory'

export default function ReportButton () {
  const [modal, setModal] = useState(false)

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => { setModal(true) }}>
        <Text style={{ ...styles.text, fontSize: 14, color: '#fff' }}>Historial</Text>
      </TouchableOpacity>
      {modal && (
        <ModalHistory setModal={setModal} />
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#462f27',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 100
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
