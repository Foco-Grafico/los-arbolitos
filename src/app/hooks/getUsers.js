import { useEffect, useState } from 'react'
import getUsers from '../func/get-users'

export default function useGetUsers () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 404) {
          return { data: [] }
        }
        throw new Error('Error al obtener los usuarios')
      })
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return {
    users
  }
}
