import { StyleSheet, TouchableOpacity, View } from "react-native";
import NavBarKitchen from "../components/kitchen/navBar";
import ActualDish from "../components/kitchen/actual-dish";
import OrderList from "../components/kitchen/order-list";
import useKitchenGetOrders from "../hooks/getOrdersInKitchen";
import ReportButton from "../components/kitchen/report-button";
import { IconRefresh } from "../components/icons";

export default function Kitchen({ bar = false }) {
	const { orders, setOrders, reloadOrders } = useKitchenGetOrders(bar);

	return (
		<View style={styles.container}>
			<NavBarKitchen />
			<View
				style={{
					flex: 1,
					paddingHorizontal: 30,
					paddingVertical: 30,
				}}
			>
				<ActualDish bar={bar} setOrders={setOrders} />
				<OrderList bar={bar} orders={orders} />
			</View>
			<View style={{
				width: '100%',
				justifyContent: 'space-between',
				flexDirection: 'row',
				paddingHorizontal: 20,
				paddingVertical: 10
			}}
			>
				<TouchableOpacity
					onPress={reloadOrders}
					style={{
						backgroundColor: '#005943',
						alignItems: 'center',
						justifyContent: 'center',
						width: 60,
						borderRadius: 100
					}}
				>
					<IconRefresh fill='#fff' />
				</TouchableOpacity>
				<ReportButton />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderWidth: 1,
	},
	footer: {
		backgroundColor: "#462f27",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "10%",
	},
	middle: {
		backgroundColor: "#fff",
		flex: 1,
		gap: 20,
	},
});
