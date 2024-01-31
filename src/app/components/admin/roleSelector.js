import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import useGetUserRoles from '../../hooks/useGetUserRoles'

export default function RoleSelector ({ onChange }) {
  const [value, setValue] = useState(null)
  const { roles } = useGetUserRoles()

  useEffect(() => {
    if (roles.length > 0) {
      setValue(roles[0].id)
      onChange(roles[0])
    }
  }, [roles])

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={roles}
        mode='modal'
        maxHeight={300}
        labelField='name'
        valueField='id'
        placeholder='Selecciona un rol'
        value={value}
        onChange={item => {
          setValue(item.id)
          onChange(item)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: 280,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingLeft: 10
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
