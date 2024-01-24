import { useRef } from 'react'
import { getOrder } from '../../../lib/api-call/order/get-order'
import { basicInfo, dishList } from '../../../../stores/waiter/order-sec.store'

export const useOrderController = () => {
  const abortController = useRef(new AbortController())
  const dishListReset = dishList(state => state.reset)
  const basicInfoReset = basicInfo(state => state.reset)

  const setOrder = (table) => {
    dishListReset()
    basicInfoReset()

    try {
      abortController.current.abort('Previous request cancelled')
      abortController.current = new AbortController()
    } catch {
    }

    getOrder(table.current_order, {
      signal: abortController.current.signal
    })
      .then(order => {
        dishList.setState({
          pretty: order.pretty_list
        })

        basicInfo.setState({
          status: order.status
        })
      })
  }

  return {
    setOrder
  }
}
