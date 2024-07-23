import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList
} from "react-native";
import { Image } from "expo-image";
import { API_URL } from "../../../lib/api-call/data";
import { kitchenStore } from "../../../../stores/kitchen";
import Estrella from "../../../../assets/estrella";
import { useDeviceType, types } from "../../hooks/device";
import { v4 } from "../../../lib/uuid";
import { markAsPreparation } from "../../../lib/api-call/kitchen/mark-as-preparation";

export default function OrderList({ orders = [] }) {
	const configNewInfo = kitchenStore((state) => state.configNewInfo);
	const type = useDeviceType();
	const pretty = orders?.map((order, i) =>
		order?.pending_list.map((dish) => ({ ...dish, orderIndex: i })),
	);

	return (
		<View style={{
			marginTop: 10,
			height: 200,
		}}>
			<FlatList
				data={pretty}
				horizontal
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: '100%',
							borderWidth: 1,
							borderColor: '#000',
							marginHorizontal: 10,
						}}
					/>
				)}
				keyExtractor={() => v4()}
				renderItem={({ item: order }) => (
					<View style={{
						gap: 10,
						flexDirection: 'row',
					}}>
						{order?.map((dish) => (
							<TouchableOpacity
								key={dish.key}
								style={{
									position: "relative",
									alignItems: "center",
								}}
								onPress={() => {
									if (dish.orderIndex <= 1) {
										markAsPreparation(orders[dish.orderIndex]?.id, dish.ids);
									}

									configNewInfo({
										mesero: {
											id: orders[dish.orderIndex]?.user?.id,
											name: orders[dish.orderIndex]?.user?.name,
											lastName: orders[dish.orderIndex]?.user?.lastname,
										},
										orderId: orders[dish.orderIndex]?.id,
										dish,
										orderIndex: dish.orderIndex,
										table: orders[dish.orderIndex]?.table_id,
									});
								}}
							>
								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
										position: "relative",
										overflow: "visible",
									}}
								>
									<Image
										source={
											dish?.picture?.startsWith("http")
												? dish?.picture
												: `${API_URL}/${dish.picture}`
										}
										style={{
											width: type === types.TABLET ? 120 : 60,
											aspectRatio: '1/1',
										}}
									/>
									{/* <View
							  style={{
								width: type === types.TABLET ? 120 : 60,
								height: type === types.TABLET ? 120 : 60,
								borderWidth: 1,
								borderColor: '#000'
							  }}
							/> */}
									{orders[dish.orderIndex].priority && (
										<Estrella
											style={{
												width: 24,
												height: 24,
												position: "absolute",
												right: 0,
												top: 0,
											}}
											condition={false}
										/>
									)}
									{dish.priority && (
										<Estrella
											style={{
												width: 24,
												height: 24,
												position: "absolute",
												right: 0,
												top: 0,
											}}
											condition
										/>
									)}
								</View>

								<Text
									style={{
										...styles.text,
										fontSize: 16,
										width: type === types.TABLET ? 120 : 60,
										textAlign: "center",
										flexWrap: "wrap",
									}}
								>
									{dish.name} ({dish?.quantity})
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		justifyContent: "center",
		gap: 10,
	},
	text: {
		color: "black",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "center",
	},
	separator: {
		width: 2,
		height: "100%",
		alignSelf: "center",
		backgroundColor: "#000",
	},
	img: {
		width: 100,
		height: 100,
	},
});
