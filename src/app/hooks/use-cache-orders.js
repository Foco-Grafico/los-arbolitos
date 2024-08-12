import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useCacheOrders() {
    const [cacheOrders, setCacheOrders] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('local-orders')
            .then(res => {
                if (res) {
                    setCacheOrders(JSON.parse(res))
                }
            })
            .catch(err => console.error(err))
    }, []);

    return cacheOrders;
}