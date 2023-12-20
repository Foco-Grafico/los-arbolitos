import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useGetCategories from '../hooks/useGetCategories'
import { waiterStore } from '../../../stores/waiter'

export default function App () {
  const [selectedOption, setSelectedOption] = useState(0)
  const { categories } = useGetCategories()
  const setSelectedCategory = waiterStore(state => state.setSelectedCategory)

  return (
    <View style={styles.footer}>
      {categories.map((option, index) => (
        <TouchableOpacity
          key={option.key}
          style={selectedOption === index ? styles.selected : styles.notSelected}
          onPress={() => {
            setSelectedOption(index)
            setSelectedCategory(option.id)
          }}
        >
          <Text style={styles.text}>{option.name}</Text>
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
