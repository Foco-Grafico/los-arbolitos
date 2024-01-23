import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { accountStore } from '../../../stores/account'
import { API_URL } from '../../lib/api-call/data'

export const useRegisterNotifications = () => {
  const account = accountStore(state => state.account)

  useEffect(() => {
    if (account == null) return

    registerForPushNotificationsAsync()
      .then(token => {
        fetch(`${API_URL}/notifications/register?user_id=${account?.id}`, {
          method: 'POST',
          body: JSON.stringify({
            token
          })
        })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [account])
}

async function registerForPushNotificationsAsync () {
  let token

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      globalThis.alert('Failed to get push token for push notification!')
      return
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId
    })
    console.log(token)
  } else {
    globalThis.alert('Must use physical device for Push Notifications')
  }

  return token.data
}
