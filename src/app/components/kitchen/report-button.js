import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { ModalHistory } from './ModalHistory'
import Historial from '../../../../assets/historial'

export default function ReportButton () {
  const [modal, setModal] = useState(false)

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => { setModal(true) }}>
        <Historial />
      </TouchableOpacity>
      {modal && (
        <ModalHistory setModal={setModal} />
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005943',
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
