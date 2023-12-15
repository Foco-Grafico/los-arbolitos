import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    // Por ejemplo, puedes validar los datos del usuario o enviar una solicitud a tu servidor
    if (email === '' || password === '') {
      Alert.alert('Por favor, introduce tu correo electrónico y contraseña')
    } else {
      Alert.alert(`Bienvenido ${email}`)
    }
  }

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
          alignItems: 'center'
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
        <Button title='Iniciar sesión' onPress={handleLogin} />
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8
  }
})
