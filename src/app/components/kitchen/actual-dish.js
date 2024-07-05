import { Image } from "expo-image";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Aceptar from "../../../../assets/aceptar";
import { kitchenStore } from "../../../../stores/kitchen";
import finishOrderInKitchen from "../../func/finish-order-in-kitchen";
import { v4 } from "../../../lib/uuid";
import { useDeviceType, types } from "../../hooks/device";
import { markAsPreparation } from "../../../lib/api-call/kitchen/mark-as-preparation";
import { API_URL } from "../../../lib/api-call/data";
import { useState } from "react";
import { ModalDetails } from "./ModalDetails";
import { useConfig } from "../../hooks/use-get-config";

export default function ActualDish({ setOrders, bar = false }) {
	const dish = kitchenStore((state) => state.selectedDish);
	const orderIndex = kitchenStore((state) => state.orderIndex);
	const setDish = kitchenStore((state) => state.setSelectedDish);
	const type = useDeviceType();
	const [modalConfirmation, setModalConfirmation] = useState(false);
	const [visibleDetails, setVisibleDetails] = useState(false);
	const [detailDish, setDetailDish] = useState({});
	const { chef_perm: permittedDishes } = useConfig();
	const isModified = dish.name.endsWith('(M)');

	const handleFinish = () => {
		for (const id of dish.ids) {
			finishOrderInKitchen(id);
		}

		setOrders((prev) => {
			const copyPrev = [...prev];

			const newPrettyDishes = copyPrev[orderIndex].pending_list.filter(
				(dishInOrder) => dishInOrder?.ids[0] !== dish?.ids[0],
			);

			const newDishes = copyPrev[orderIndex].dishes.filter(
				(dishInOrder) => !dish.ids.find((id) => id === dishInOrder.id),
			);

			if (newPrettyDishes.length === 0) {
				const newOrders = copyPrev.filter(
					(order, index) => index !== orderIndex,
				);

				if (newOrders.length === 0) {
					setDish(null);
				} else {
					kitchenStore.setState({
						orderIndex: 0,
					});
					setDish(newOrders[0]?.pending_list[0]);
					markAsPreparation(
						newOrders[0]?.id,
						newOrders[0]?.pending_list[0]?.ids,
					);
				}

				return newOrders;
			}

			copyPrev[orderIndex].pending_list = newPrettyDishes;
			copyPrev[orderIndex].dishes = newDishes;

			markAsPreparation(
				copyPrev[0]?.id,
				copyPrev[orderIndex]?.pending_list[0]?.ids,
			);
			setDish(copyPrev[0]?.pending_list[0]);

			kitchenStore.setState({
				orderIndex: 0,
			});

			return copyPrev;
		});
	};

	if (dish == null) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					borderWidth: 1,
				}}
			>
				<Text style={{ fontSize: 30, fontWeight: "bold" }}>
					{bar
						? "No hay bebidas en preparación"
						: "No hay platillos en preparación"}
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<ModalDetails
				onPressClose={() => setVisibleDetails(false)}
				dish={detailDish}
				isVisible={visibleDetails}
			/>
			<Modal
				visible={modalConfirmation}
				transparent
				animationType="slide"
				statusBarTranslucent
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}
				>
					<View
						style={{
							backgroundColor: "#fff",
							borderRadius: 10,
							padding: 20,
							width: 300,
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							¿Desea terminar el platillo?
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								marginTop: 20,
							}}
						>
							<TouchableOpacity onPress={() => setModalConfirmation(false)}>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "bold",
										color: "#005943",
									}}
								>
									NO
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									handleFinish();
									setModalConfirmation(false);
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "bold",
										color: "#005943",
									}}
								>
									SI
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<View
				style={{
					flexDirection: "row",
					gap: 20,
				}}
			>
				{dish?.picture != null && (
					<Image
						source={
							dish?.picture?.startsWith("http")
								? dish?.picture
								: `${API_URL}/${dish?.picture}`
						}
						style={{
							width: type === types.TABLET ? 240 : 100,
							aspectRatio: "1/1",
						}}
					/>
				)}

				{dish?.name != null && (
					<View
						style={{
							flex: 1,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 40,
								color: isModified ? 'orange' : '#000',
							}}
						>
							{dish.name.toUpperCase()}
						</Text>
						<Text
							style={{
								fontSize: 20,
							}}
						>
							<Text
								style={{
									fontWeight: "bold",
								}}
							>
								CANTIDAD
							</Text>{" "}
							({dish?.quantity})
						</Text>
					</View>
				)}
			</View>

			<FlatList
				data={dish?.ids}
				keyExtractor={() => v4()}
				ItemSeparatorComponent={() => (
					<View
						style={{
							width: '100%',
							marginHorizontal: 10,
							paddingTop: 10,
							borderBottomWidth: 1,
						}}
					/>
				)}
				renderItem={({ item, index }) => (
					<View>
						<View>
							<Text
								style={{ color: "#005943", fontWeight: "bold", fontSize: 25 }}
							>
								MODIFICACIONES - PRODUCTO: {index + 1}
							</Text>
							{dish.supplies_modified[item].map((supply) => (
								<View key={v4()}>
									<Text style={{ fontSize: 24, fontWeight: "bold" }}>
										- {supply.name} ({supply.quantity})
									</Text>
								</View>
							))}
						</View>
						<Text
							style={{ color: "#005943", fontWeight: "bold", fontSize: 25 }}
						>
							OBSERVACIONES
						</Text>
						<Text style={{ fontSize: 24, fontWeight: "bold" }}>
							{dish?.comments[index] !== "null" &&
								dish?.comments[index] !== "undefined" &&
								dish?.comments[index]}
						</Text>
					</View>
				)}
			/>
			<View
				style={{
					alignItems: "flex-end",
				}}
			>
				{/* Cambiar el limite de ordenes admitidas al preprar */}
				{!(orderIndex > permittedDishes - 1) && (
					<TouchableOpacity onPress={() => setModalConfirmation(true)}>
						<Aceptar style={{ width: 24, height: 24 }} />
					</TouchableOpacity>
				)}
			</View>
		</View>
		// <View style={{
		//   ...styles.container,
		//   borderWidth: 1,
		//   flex: 1
		// }}
		// >
		//   <View style={{
		//     flexDirection: 'row',
		//     flex: 1,
		//     justifyContent: 'space-around',
		//     alignItems: 'center',
		//     paddingHorizontal: 50,
		//     borderWidth: 1
		//   }}
		//   >
		//     <View style={{
		//       ...styles.img,
		//       borderWidth: 1
		//     }}
		//     >
		//       {dish?.picture != null && <Image source={dish?.picture?.startsWith('http') ? dish?.picture : `${API_URL}/${dish?.picture}`} style={styles.img} />}
		//     </View>
		//     <View style={{ flexDirection: 'column', gap: 5, borderWidth: 1 }}>
		//       <View style={{ flexDirection: 'row' }}>
		//         <Text style={styles.text}>{dish?.name}</Text>
		//         <Text> {dish?.description} </Text>
		//         <Text style={styles.text}>CANTIDAD ( {dish?.quantity} )</Text>
		//       </View>
		//       <View style={{ flexDirection: 'row', gap: 10, flex: 1, borderWidth: 1 }}>
		//         <FlatList
		//           data={dish?.ids}
		//           keyExtractor={() => v4()}
		//           horizontal
		//           style={{ flex: 1 }}
		//           ItemSeparatorComponent={() => <View style={{ width: 1, borderRadius: 5, backgroundColor: '#000', marginHorizontal: 10 }} />}
		//           renderItem={({ item, index }) => (
		//             <View>
		//               <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 15 }}>OBSERVACIONES</Text>
		//             </View>
		//           )}
		//         />
		//       </View>
		//       {/* <View style={styles.observations}>
		//         <Text style={{ color: '#005943', fontWeight: 'black', fontSize: 12 }}>OBSERVACIONES</Text>
		//         {dish?.comments.map((comment) => (
		//           <Text style={styles.text} key={dish.key + comment}>{comment}</Text>
		//         ))}
		//       </View> */}
		//       <View style={{ alignItems: 'flex-end' }}>
		//         <TouchableOpacity onPress={handleFinish}>
		//           <Aceptar style={{ width: 24, height: 24 }} />
		//         </TouchableOpacity>
		//       </View>
		//     </View>
		//   </View>
		// </View>
	);
}
