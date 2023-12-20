import { View, TouchableOpacity } from 'react-native'
import Editar from '../../../assets/editar'
import SignoMas from '../../../assets/signodemas'

export default function Counters () {
  return (
    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <TouchableOpacity>
        <Editar fill='#005942' style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SignoMas fill='#005942' style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  )
}
