import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { v4 } from '../../../lib/uuid'

export const ModalDetails = ({ dish, isVisible, onPressClose = () => {} }) => {
  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      visible={isVisible}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 20
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10
            }}
          >
            Detalles del platillo
          </Text>

          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nombre:</Text>
            <Text
              style={{
                fontSize: 16
              }}
            >{dish.name}
            </Text>
          </View>

          {dish.comments != null && dish.comments !== '' && (
            <View
              style={{
                marginBottom: 10
              }}
            >
              <Text style={{
                fontWeight: 'bold',
                fontSize: 18
              }}
              >
                Comentario:
              </Text>
              <Text
                style={{
                  fontSize: 16
                }}
              >{dish.comments}
              </Text>
            </View>
          )}

          {dish?.supplies_modified && dish?.supplies_modified.length > 0 && (
            <View
              style={{
                marginBottom: 20
              }}
            >
              <Text style={{
                fontWeight: 'bold',
                fontSize: 18
              }}
              >
                Modificados:
              </Text>
              {/* {dish.supplies_modified.map((supply) => (
                <View
                  key={v4()}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text>{supply.name}</Text>
                  <Text>{supply.quantity}</Text>
                </View>
              ))} */}
              <FlatList
                data={dish.supplies_modified}
                keyExtractor={() => v4()}
                style={{ maxHeight: 150, width: 250, paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: 'green'
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10
            }}
          >
            <TouchableOpacity
              onPress={onPressClose}
              style={{
                backgroundColor: '#f0f0f0',
                padding: 10,
                borderRadius: 5
              }}
            >
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 16
                }}
              >
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
