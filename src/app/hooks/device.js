import { useEffect, useState } from 'react'
import * as Device from 'expo-device'

export const types = Device.DeviceType

export const useDeviceType = () => {
  const [type, setType] = useState(Device.DeviceType.TABLET)

  useEffect(() => {
    Device.getDeviceTypeAsync()
      .then(type => setType(type))
  })

  return type
}
