import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);
	const [filter, setFilter] = useState("");
	const [sortBy, setSortBy] = useState("market_cap_desc");

	useEffect(() => {
		async function fetchData() {
			try {
				const coinsPromise = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
				);
				const coins = await coinsPromise.json();

				if (coinsPromise.ok) {
					setCoins(coins);
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
	}, [limit]);

	const filteredCoins = coins
		.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(filter.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(filter.toLowerCase())
			);
		})
		.slice()
		.sort((a, b) => {
			switch (sortBy) {
				case "market_cap_desc":
					return b.market_cap - a.market_cap;
				case "market_cap_asc":
					return a.market_cap - b.market_cap;
				case "price_desc":
					return b.current_price - a.current_price;
				case "price_asc":
					return a.current_price - b.current_price;
				case "change_desc":
					return (
						b.price_change_percentage_24h -
						a.price_change_percentage_24h
					);
				case "change_asc":
					return (
						a.price_change_percentage_24h -
						b.price_change_percentage_24h
					);
			}
		});

	return (
		<div>
			<h1>Crypto Dash</h1>
			{loading && <p>Loading...</p>}
			{error && <div className="error">{error}</div>}

			<div className="top-controls">
				<FilterInput filter={filter} onFilterChange={setFilter} />
				<SortSelector sortBy={sortBy} onSortChange={setSortBy} />
				<LimitSelector limit={limit} onLimitChange={setLimit} />
			</div>

			{!loading && !error && (
				<main className="grid">
					{filteredCoins.length > 0 ? (
						filteredCoins.map((coin) => (
							<CoinCard coin={coin} key={coin.id} />
						))
					) : (
						<p>No Matching Coins :C</p>
					)}
				</main>
			)}
		</div>
	);
};

export default App;
