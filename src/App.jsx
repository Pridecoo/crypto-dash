import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const coinsPromise = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
				);
				const coins = await coinsPromise.json();

				if (coinsPromise.ok) {
					setCoins(coins);
					console.log(coins);
				} else {
					throw Error("Failed to fetch coins.");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1>Crypto Dash</h1>
			{loading && <p>Loading...</p>}
			{error && <div className="error">{error}</div>}

			{!loading && !error && (
				<main className="grid">
					{coins.map((coin) => (
						<CoinCard coin={coin} key={coin.id} />
					))}
				</main>
			)}
		</div>
	);
};

export default App;
