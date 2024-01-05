import * as React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import * as Print from 'expo-print'

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`

export default function Printer () {
  const print = async () => {
    await Print.printAsync({
      html
    })
  }

  return (
    <View style={styles.container}>
      <Button title='Print' onPress={print} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8
  },
  spacer: {
    height: 8
  },
  printer: {
    textAlign: 'center'
  }
})
