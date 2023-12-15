import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { routerStore } from '../../stores/router'

export default function Home () {
  const getProps = routerStore(state => state.getProps)
  const { email } = getProps()
  console.log(email)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
