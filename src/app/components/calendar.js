import { useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'

const MONTHS = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre'

}

const getMonthNameInSpanish = (date) => {
  const month = date.getMonth()

  return MONTHS[month]
}

const getLastDayOfMonth = (month) => {
  const date = new Date()
  date.setMonth(month)
  date.setDate(0)

  const day = date.getDate()

  return day
}

const getArrayDays = (date = new Date()) => {
  const newDate = new Date(date)

  const day = getLastDayOfMonth(newDate.getMonth() + 1)

  const days = new Array(day).fill(0).map((_, i) => ({
    day: i + 1,
    transparent: false,
    last: false
  }))

  const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1).getDay()

  for (let i = 0; i < firstDay; i++) {
    days.unshift({
      day: getLastDayOfMonth(newDate.getMonth() - 1) - i,
      transparent: true,
      last: false
    })
  }

  const lastElementsOfChunk = getLastChunk(days, 7)

  const newDays = days.map((day, i) => {
    if (i < 8) return day

    const last = lastElementsOfChunk.includes(day)

    if (last) {
      return {
        ...day,
        last
      }
    }

    return day
  })

  return newDays
}

const getLastChunk = (array = [], chunkSize) => {
  const elementsForLine = array.length % chunkSize

  const elements = [...array].reverse().splice(0, elementsForLine)

  return [...elements].reverse()
}

export const Calendar = ({ isOpen }) => {
  const [date, setDate] = useState(new Date())

  const nextMonth = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    setDate(newDate)
  }

  const prevMonth = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1)
    setDate(newDate)
  }

  return (
    <Modal
      visible={isOpen}
      animationType='fade'
      statusBarTranslucent
      transparent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            width: '80%',
            height: '35%'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
              marginBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={prevMonth}
            >
              <Text>Anterior</Text>
            </TouchableOpacity>

            <Text>{getMonthNameInSpanish(date)}</Text>

            <TouchableOpacity
              onPress={nextMonth}
            >
              <Text>Siguiente</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{
              maxHeight: 300,
              minWidth: 300
            }}
            numColumns={7}
            contentContainerStyle={{
              gap: 20
            }}
            data={getArrayDays(date)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flex: item.last ? 0 : 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: item.last ? 25 : 0
                }}
              >
                <Text
                  style={{
                    opacity: item.transparent ? 0.2 : 1
                  }}
                >
                  {item.day}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}
