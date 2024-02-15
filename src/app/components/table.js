import { Text, View } from 'react-native'
import { v4 } from '../../lib/uuid'

export const Table = ({
  header = [],
  rows = [[]],
  footer = []
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          marginBottom: 4
        }}
      >
        {header.map((h) => (
          <View
            style={{
              flex: 1
            }}
            key={v4()}
          >
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              {h}
            </Text>
          </View>
        ))}
      </View>

      <View>
        {rows.map((row) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10
            }}
            key={v4()}
          >
            {row.map((cell) => (
              <View
                style={{
                  flex: 1
                }}
                key={v4()}
              >
                <Text>
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10
        }}
      >
        {footer.map((f) => (
          <View
            style={{
              flex: 1
            }}
            key={v4()}
          >
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              {f}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
