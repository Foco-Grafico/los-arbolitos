import { useEffect, useState } from 'react'
import { API_URL } from '../../lib/api-call/data'

export const useConfig = () => {
  const [config, setConfig] = useState({
    chef_perm: 4,
    pass: ''
  })

  useEffect(() => {
    fetch(API_URL + '/config')
      .then(response => response.json())
      .then(data => setConfig(data))
  }, [])

  return config
}
