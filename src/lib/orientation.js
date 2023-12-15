import * as ScreenOrientation from 'expo-screen-orientation'

export const SetScreenOrientation = async () => {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
}
