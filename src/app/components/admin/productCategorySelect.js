import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { supplyCatStore } from '../../../../stores/admin'
import useGetCategories from '../../hooks/useGetCategories'

export default function ProductCategorySelector (category) {
  const [value, setValue] = useState(null)
  const { categories } = useGetCategories()
  const selectedCategory = supplyCatStore(state => state.selectedSupplyCategory)

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        mode='modal'
        maxHeight={300}
        labelField='name'
        valueField='id'
        placeholder={selectedCategory?.name}
        value={value}
        onChange={item => {
          setValue(item.id)
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '80%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10

  },
  icon: {
    marginRight: 5
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 10
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
    paddingLeft: 10
  }
})
