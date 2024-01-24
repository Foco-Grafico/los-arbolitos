import { useEffect, useState } from 'react'
import { getTables } from '../../../lib/api-call/waiter/getTables'
import { accountStore } from '../../../../stores/account'
import { useOrderController } from './useOrderController'

export const useTables = () => {
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(0)
  const account = accountStore(state => state.account)
  const { setOrder } = useOrderController()

  useEffect(() => {
    if (account == null) return

    getTables(account.id)
      .then((tables) => {
        setTables(tables)
        setOrder(tables[0])
      })
  }, [account])

  return {
    tables,
    selectedTable,
    setSelectedTable
  }
}
