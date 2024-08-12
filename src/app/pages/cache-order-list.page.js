import {View, Text, StyleSheet, FlatList, Pressable} from "react-native";
import {useCacheOrders} from "../hooks/use-cache-orders";
import {IconArrowBack} from "@tabler/icons-react-native";
import {routerStore} from "../../../stores/router";

export function CacheOrderListPage() {
    const orders = useCacheOrders();
    const nav = routerStore(state => state.nav)

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: '#3b6b2f',
                    paddingVertical: 10,
                }}
            >

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >ORDENES GUARDADAS</Text>

                <Pressable
                    onPress={() => nav('login')}
                >
                    <IconArrowBack size={20} color="white"/>
                </Pressable>

            </View>


            <FlatList style={{
                paddingBottom: 10,
            }} contentContainerStyle={{
                gap: 10
            }} data={orders} renderItem={({item}) => <OrderItem order={item}/>}/>
        </View>
    );
}

export const OrderItem = ({order}) => {
    return (
        <View>
            <View
                style={styles.orderHeaderBar}
            >
                <Text
                    style={styles.headerText}
                >Mesa: {order?.table?.name}</Text>
                <Text
                    style={styles.headerText}
                >Folio: {order?.folio}</Text>
            </View>

            {
                order?.dishes?.map((dish, index) => {
                    return <DishItem key={index} dish={dish}/>
                })
            }

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
            }}>
                <Text style={{
                    fontWeight: 'bold',
                }}>TOTAL</Text>
                <Text style={{
                    fontWeight: 'bold',
                }}>{order?.total}</Text>
            </View>
        </View>
    )
}

export const DishItem = ({dish}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
        }}>
            <Text style={{
                fontWeight: 'bold',
            }}>{dish?.name}</Text>
            <Text style={{
                fontWeight: 'bold',
            }}>{dish?.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    orderHeaderBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderRadius: 10,
    },
    headerText: {
        fontWeight: 'bold',
        color: '#35771f',
    }
});