import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { routerStore } from '../../stores/router'

export default function Home () {
  const nav = routerStore(state => state.nav)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
      <TouchableOpacity onPress={() => nav('login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
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
