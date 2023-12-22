import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Aceptar from '../../../../assets/aceptar'
import SwitchSlider from '../switch-slider'
import { orderStore } from '../../../../stores/waiter'

export default function EditProducts ({ editarPlatillo, setEditarPlatillo, item }) {
  const { isDishSelected, setIsDishSelected, selectedProducts } = orderStore((state) => ({
    isDishSelected: state.isDishSelected,
    setIsDishSelected: state.setIsDishSelected,
    selectedProducts: state.selectedProducts
  }))
  console.log(selectedProducts)

  const toggleModificarPlatillo = () => {
    setIsDishSelected(false)
  }

  if (isDishSelected) {
    return (
      <View
        animationType='slide'
        transparent
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalEditProduct}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
              <Text style={styles.modalText}>
                PLATILLO PRIORITARIO
              </Text>
              <SwitchSlider />
              <TouchableOpacity
                onPress={toggleModificarPlatillo}
              >
                <Aceptar fill='#005942' style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#377c6a90',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalForm: {
    backgroundColor: '#fff',
    width: 540,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  },
  modalText: {
    color: '#005943',
    fontSize: 15,
    fontWeight: 'bold'
  },
  modalEditProduct: {
    backgroundColor: '#fff',
    width: 540,
    height: 400,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20
  }
})
