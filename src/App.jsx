import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFound";
import CoinDetailsPage from "./pages/CoinDetails";

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

	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							coins={coins}
							filter={filter}
							setFilter={setFilter}
							limit={limit}
							setLimit={setLimit}
							sortBy={sortBy}
							setSortBy={setSortBy}
							loading={loading}
							error={error}
						/>
					}
				/>
				<Route path="/about" element={<AboutPage />} />
				<Route path="coin/:id" element={<CoinDetailsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default App;
