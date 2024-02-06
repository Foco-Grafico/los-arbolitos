import { Modal, Text, View } from 'react-native'

export const LoadingModal = ({ loading }) => (
  <Modal
    visible={loading}
    transparent
    statusBarTranslucent
    animationType='fade'
  >
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 7 }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Cargando...</Text>
      </View>
    </View>
  </Modal>
)
