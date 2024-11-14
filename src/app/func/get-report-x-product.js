import { APIENDPOINTS } from '../../lib/api-call/data'

export default function getReportXProduct (initialDate, finalDate, cancelled = false) {
  const headers = new Headers()
  headers.append('accept', 'application/json')

  const options = {
    method: 'GET',
    headers
  }

  return fetch(`${!cancelled ? APIENDPOINTS.getReportXProduct : APIENDPOINTS.cancelledProducts}?initial_date=${initialDate}&final_date=${finalDate}`, options)
}
