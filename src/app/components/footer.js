import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function App () {
  const [selectedOption, setSelectedOption] = useState(0)

  const options = ['Aperitivos', 'Desayunos', 'Comidas', 'Postres', 'Bebidas']

  console.log(selectedOption)
  return (
    <View style={styles.footer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={selectedOption === index ? styles.selected : styles.notSelected}
          onPress={() => setSelectedOption(index)}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#462f27',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selected: {
    backgroundColor: '#005942',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#fff',
    borderWidth: 1,
    height: '100%',
    width: '20%'
  },
  notSelected: {
    backgroundColor: '#462f27',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '20%'
  }
})
