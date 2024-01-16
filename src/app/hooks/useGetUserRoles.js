import { useEffect, useState } from 'react'
import getUserRoles from '../func/getUsersRoles'

export default function useGetUserRoles () {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    getUserRoles()
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return { data: [] }
        }
        throw new Error('Error al obtener los roles de usuario')
      })
      .then(res => {
        return setRoles(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return { roles }
}
