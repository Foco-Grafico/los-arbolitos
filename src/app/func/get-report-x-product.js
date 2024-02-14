import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getReportXProduct (initialDate, finalDate) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${APIENDPOINTS.getReportXProduct}?initial_date=${initialDate}&final_date=${finalDate}`, options)
}
