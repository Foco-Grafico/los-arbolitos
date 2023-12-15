import debounce from 'just-debounce-it'
import { UserModel } from '../../models/user'
import { API_URL } from './data'

/**
 *
 * @param {FormData} formdata
 * @description El formdata debe contener los campos username y password
 */
export const login = async (username, password, cb) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')

  const user = await fetch(`${API_URL}/auth?username=${username}&password=${password}`, {
    method: 'POST',
    headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      if (res.status === 404) {
        throw new Error('Usuario no encontrado')
      }
      if (res.status === 401) {
        throw new Error('Contraseña incorrecta')
      }

      throw new Error('Error de conexión')
    })
    .then(data => {
      return UserModel.parse(data.data)
    })
    .catch(err => {
      cb(null, err)
    })

  if (user != null) {
    cb(user, null)
  }
}

export const loginDebounce = debounce(login, 500)
