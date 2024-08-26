import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getSellReport(initialDate, finalDate) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getSellReport}?init=${initialDate}&end=${finalDate}`, options)
}

export function getCanceledReport(initialDate, finalDate) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getSellReport}/canceled?init=${initialDate}&end=${finalDate}`, options)
}