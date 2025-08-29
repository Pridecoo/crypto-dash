import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const API_URL = import.meta.env.VITE_COIN_API_URL;

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	TimeScale
);

const CoinChart = ({ coinId }) => {
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCoinData() {
			const response = await fetch(
				`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
			);
			const data = await response.json();
			const prices = data.prices.map((price) => ({
				x: price[0],
				y: price[1],
			}));

			setChartData({
				datasets: [
					{
						label: "Price (USD)",
						data: prices,
						fill: true,
						borderColor: "#007bff",
						backgroundColor: "rgba(0, 123, 255, 0.1)",
						pointRadius: 0,
						tension: 0.3,
					},
				],
			});

			setLoading(false);
		}

		fetchCoinData();
	}, [coinId]);

	return (
		<div style={{ marginTop: "30px" }}>
			{loading ? (
				<Spinner />
			) : chartData ? (
				<Line
					data={chartData}
					options={{
						responsive: true,
						plugins: {
							legend: { display: false },
							tooltip: { mode: "index", intersect: false },
						},
						scales: {
							x: {
								type: "time",
								time: { unit: "day" },
								ticks: {
									autoSkip: true,
									maxTicksLimit: 7,
								},
							},
							y: {
								ticks: {
									callback: (value) =>
										`$${value.toLocaleString()}`,
								},
							},
						},
					}}
				/>
			) : (
				<p>No data available</p>
			)}
		</div>
	);
};

export default CoinChart;
