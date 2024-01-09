import { StyleSheet, View } from 'react-native'

export default function Footer () {
  return (
    <View style={styles.footer} />
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#462f27',
    height: '6%'
  }
})
