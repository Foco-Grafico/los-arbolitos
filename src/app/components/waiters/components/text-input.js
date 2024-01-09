import debounce from 'just-debounce-it'
import { TextInput } from 'react-native'

export const TextInputDebounced = ({ defaultValue = '', onChangeText = (text) => {}, debounceTime = 500 }) => {
  const handleChangeText = debounce(text => {
    onChangeText(text)
  }, debounceTime)

  return (
    <TextInput
      style={{
        flexWrap: 'wrap'
      }}
      defaultValue={defaultValue}
      onChangeText={handleChangeText}
    />
  )
}
