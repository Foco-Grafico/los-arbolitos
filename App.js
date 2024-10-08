import { Route, ORIENTATIONS } from "./src/app/components/route";
import Login from "./src/app/pages/login";
import Cashier from "./src/app/pages/cashier";
import Admin from "./src/app/pages/admin";
import Kitchen from "./src/app/pages/kitchen";
import CreateEmployee from "./src/app/pages/admin/crearEmpleado";
import CorteDeCaja from "./src/app/components/cashier/corteCaja";
import Almacenes from "./src/app/pages/admin/almacenes";
import ReporteVentas from "./src/app/pages/admin/reporteVentas";
import ReporteVentasPorProducto from "./src/app/pages/admin/reporteVentaProductos";
import CategoriaProductos from "./src/app/pages/admin/categoriaProductos";
import ProductosList from "./src/app/pages/admin/productos";
import ActualizarStock from "./src/app/pages/admin/actualizarStock";
import AlmacenInv from "./src/app/pages/admin/menuAlmacen";
import CategoriaInsumos from "./src/app/pages/admin/categoriaInsumos";
import InsumosList from "./src/app/pages/admin/insumos";
import NuevoInsumo from "./src/app/pages/admin/nuevoInsumo";
import NuevoProducto from "./src/app/pages/admin/nuevoProducto";
import RendimientoMesero from "./src/app/pages/admin/rendimientoMesero";
import Zonas from "./src/app/pages/admin/zonas";
import { LogBox, View } from "react-native";
import { Waiter } from "./src/app/pages/waiter";
import { routes } from "./src/lib/data";
import { StatusBar } from "expo-status-bar";
import Empleados from "./src/app/pages/admin/empleados";
import * as Notifications from "expo-notifications";
import { LowConnectionModal } from "./src/app/components/LowConnectionModal";
import { useRegisterNotifications } from "./src/app/hooks/register-notifications";
import {CacheOrderListPage} from "./src/app/pages/cache-order-list.page";
// import { Calendar } from './src/app/components/calendar'

LogBox.ignoreLogs(["new NativeEventEmitter", "Aborted", "Maximum call stack"]);

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
		priority: Notifications.AndroidNotificationPriority.HIGH,
	}),
});

function App() {
	useRegisterNotifications();

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<StatusBar hidden />
			{/*<LowConnectionModal />*/}
			<Route name="cache-orders" orientation={ORIENTATIONS.PORTRAIT}>
				<CacheOrderListPage />
			</Route>
			<Route name="login">
				<Login />
			</Route>
			<Route name={routes[6]}>
				<Waiter leader />
			</Route>
			<Route name={routes[2]}>
				<Waiter />
			</Route>
			<Route name={routes[4]} orientation={ORIENTATIONS.PORTRAIT}>
				<Cashier />
			</Route>
			<Route name={routes[3]} orientation={ORIENTATIONS.PORTRAIT}>
				<Kitchen />
			</Route>
			<Route name={routes[1]} orientation={ORIENTATIONS.PORTRAIT}>
				<Admin />
			</Route>
			<Route name={routes[5]} orientation={ORIENTATIONS.PORTRAIT}>
				<Kitchen bar />
			</Route>
			<Route name="empleados" orientation={ORIENTATIONS.PORTRAIT}>
				<Empleados />
			</Route>
			<Route name="createEmployee" orientation={ORIENTATIONS.PORTRAIT}>
				<CreateEmployee />
			</Route>
			<Route name="corteCaja" orientation={ORIENTATIONS.PORTRAIT}>
				<CorteDeCaja />
			</Route>
			<Route name="almacenes" orientation={ORIENTATIONS.PORTRAIT}>
				<Almacenes />
			</Route>
			<Route name="reporteVentas" orientation={ORIENTATIONS.PORTRAIT}>
				<ReporteVentas />
			</Route>
			<Route name="categoriaProductos" orientation={ORIENTATIONS.PORTRAIT}>
				<CategoriaProductos />
			</Route>
			<Route name="productos" orientation={ORIENTATIONS.PORTRAIT}>
				<ProductosList />
			</Route>
			<Route name="actualizarStock" orientation={ORIENTATIONS.PORTRAIT}>
				<ActualizarStock />
			</Route>
			<Route name="menuAlmacen" orientation={ORIENTATIONS.PORTRAIT}>
				<AlmacenInv />
			</Route>
			<Route name="categoriaInsumos" orientation={ORIENTATIONS.PORTRAIT}>
				<CategoriaInsumos />
			</Route>
			<Route name="insumosList" orientation={ORIENTATIONS.PORTRAIT}>
				<InsumosList />
			</Route>
			<Route name="nuevoInsumo" orientation={ORIENTATIONS.PORTRAIT}>
				<NuevoInsumo />
			</Route>
			<Route name="zonas" orientation={ORIENTATIONS.PORTRAIT}>
				<Zonas />
			</Route>
			<Route name="nuevoProducto" orientation={ORIENTATIONS.PORTRAIT}>
				<NuevoProducto />
			</Route>
			<Route name="reporteVentaProductos" orientation={ORIENTATIONS.PORTRAIT}>
				<ReporteVentasPorProducto />
			</Route>
			<Route name="rendimientoMesero" orientation={ORIENTATIONS.PORTRAIT}>
				<RendimientoMesero />
			</Route>
		</View>
	);
}

export default App;
