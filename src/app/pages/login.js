import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '35%',
          borderWidth: 1
        }}
      >
        <Text>Imagen</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <TextInput
          style={styles.input}
          placeholder='Correo electrónico'
          onChangeText={setEmail}
          value={email}
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          textContentType='password'
        />
        <TouchableOpacity
          onPress={() => {
            if (email === '' || password === '') {
              Alert.alert('Por favor, introduce tu correo electrónico y contraseña')
            } else {
              Alert.alert(`Bienvenido ${email}`)
            }
          }}
        >
          <Text>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5
  }
})
