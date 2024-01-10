import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export const useHorribleSound = () => {
  const [horribleSound, setHorribleSound] = useState()

  const playHorribleSound = () => {
    console.log('load horrible sound')
    Audio.Sound.createAsync(require('../../assets/horrible-sound.mp3'))
      .then(({ sound }) => {
        console.log('play horrible sound')
        sound.playAsync()
        setHorribleSound(sound)
      })
  }

  useEffect(() => {
    return () => {
      horribleSound?.unloadAsync()
    }
  }, [horribleSound])

  return {
    play: playHorribleSound
  }
}
