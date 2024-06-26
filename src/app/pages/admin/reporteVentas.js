import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import HeaderAdmin from "../../components/admin/header";
import Footer from "../../components/admin/footer";
import { Calendar } from "../../components/calendar";
import { useState } from "react";
import Calendario from "../../../../assets/calendario";
import Descargar from "../../../../assets/descargar";
import * as Linking from "expo-linking";

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export default function ReporteVentas() {
	const [calendarInitialOpen, setCalendarInitialOpen] = useState(false);
	const [calendarFinalOpen, setCalendarFinalOpen] = useState(false);
	const [initialDate, setInitialDate] = useState(
		(() => {
			const date = new Date();
			const dateMinusOneDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
			return dateMinusOneDay;
		})(),
	);
	const [finalDate, setFinalDate] = useState(
		(() => {
			const date = new Date();
			const dateMinusOneDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
			return dateMinusOneDay;
		})(),
	);

	return (
		<View style={styles.main}>
			{/* <LoadingModal loading={loading} /> */}
			<HeaderAdmin>REPORTE DE VENTAS</HeaderAdmin>
			<View style={styles.container}>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 10,
						flex: 1,
					}}
				>
					<Text style={styles.text}>FECHA DE INICIO</Text>
					<Pressable onPress={() => setCalendarInitialOpen((prev) => !prev)}>
						<View
							style={{
								borderWidth: 1,
								gap: 10,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 10,
								padding: 10,
							}}
						>
							<Calendario />
							<Text
								style={[
									styles.text,
									{
										fontSize: 18,
									},
								]}
							>
								{dateFormatter.format(initialDate)}
							</Text>
						</View>
					</Pressable>
				</View>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: 10,
						flex: 1,
					}}
				>
					<Text style={styles.text}>FECHA DE TÉRMINO</Text>
					<Pressable onPress={() => setCalendarFinalOpen((prev) => !prev)}>
						<View
							style={{
								borderWidth: 1,
								gap: 10,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 10,
								padding: 10,
							}}
						>
							<Calendario />
							<Text
								style={[
									styles.text,
									{
										fontSize: 18,
									},
								]}
							>
								{dateFormatter.format(finalDate)}
							</Text>
						</View>
					</Pressable>
				</View>
				<Calendar
					isOpen={calendarInitialOpen}
					onChangeDate={(date) => {
						setCalendarInitialOpen(false);
						setInitialDate(date);
					}}
				/>
				<Calendar
					isOpen={calendarFinalOpen}
					onChangeDate={(date) => {
						setCalendarFinalOpen(false);
						setFinalDate(date);
					}}
				/>
			</View>

			<View
				style={{
					flex: 1,
					padding: 40,
				}}
			>
				<TouchableOpacity
					style={{
						borderWidth: 1,
						borderRadius: 10,
						gap: 10,
					}}
					onPress={() => {
						Linking.openURL(
							`https://vps.focograficomx.com:8001/reports/sell?init=${initialDate.toISOString().split("T")[0]}&end=${finalDate.toISOString().split("T")[0]}`,
						);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 10,
						}}
					>
						<Text style={styles.text}>GENERAR PDF</Text>

						<View style={{ height: 30 }}>
							<Descargar style={{ width: 24, height: 24 }} />
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginTop: 30,
	},
	main: {
		flex: 1,
		backgroundColor: "#fff",
		flexDirection: "column",
		gap: 10,
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#005943",
	},
});
