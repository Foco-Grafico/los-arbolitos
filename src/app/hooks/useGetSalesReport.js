import { useEffect, useState } from "react";
import getSellReport from "../func/getSellReport";

export default function useGetSalesReport(
	initialDate = new Date(),
	finalDate = new Date(),
) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totals, setTotals] = useState({
		totalCash: 0,
		totalDebit: 0,
		total: 0,
	});

	useEffect(() => {
		setLoading(true);
		getSellReport(
			initialDate.toISOString().split("T")[0],
			finalDate.toISOString().split("T")[0],
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				if (res.status === 404) {
					return {
						data: [],
					};
				}
				throw new Error("Error al obtener las ventas");
			})
			.then((res) => {
				setData(res.data);

				let totalCash = 0;
				let totalDebit = 0;
				let total = 0;

				for (const order of res.data) {
					if (order.is_effective === 1) totalCash += order.total;
					else totalDebit += order.total;

					total += order.total;
				}

				setTotals({
					totalCash,
					totalDebit,
					total,
				});
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => setLoading(false));
	}, [initialDate, finalDate]);

	return {
		data,
		setData,
		loading,
		totals,
	};
}
