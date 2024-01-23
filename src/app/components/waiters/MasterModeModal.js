import { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

export const MasterModeModal = ({ isActive, onClose }) => {
  const [section, setSection] = useState('main')

  return (
    <Modal
      visible={isActive}
      animationType='slide'
      transparent
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 20
        }}
      >
        {section === 'main' && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              Opciones
            </Text>

            <View
              style={{
                gap: 5
              }}
            >
              <Button
                onPress={() => {
                  setSection('products')
                }}
              >
                Finalizar productos
              </Button>
              <Button>
                Cambiar status de orden
              </Button>
              <Button
                onPress={onClose}
              >
                Salir
              </Button>
            </View>
          </>
        )}

        {section === 'products' && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              Productos
            </Text>
          </>
        )}
      </View>

    </Modal>
  )
}

const Button = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#005943',
        borderRadius: 10,
        fontSize: 20,
        elevation: 10,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          textAlign: 'center'
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
