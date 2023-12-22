import io from 'socket.io-client'
import { API_URL } from '../lib/api-call/data'

export const socket = io(API_URL)

export const SOCKETS = {
  new_order_dish: 'update_order_dish'
}
