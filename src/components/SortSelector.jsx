const SortSelector = ({ sortBy, onSortChange }) => {
	return (
		<div className="controls">
			<label htmlFor="sort">Sort By:</label>
			<select
				id="sort"
				value={sortBy}
				onChange={(e) => onSortChange(e.target.value)}
			>
				<option value="market_cap_desc">Market Cap (DESC)</option>
				<option value="market_cap_asc">Market Cap (ASC)</option>
				<option value="price_desc">Price (DESC)</option>
				<option value="price_asc">Price (ASC)</option>
				<option value="change_desc">24H Change (DESC)</option>
				<option value="change_asc">24H Change (ASC)</option>
			</select>
		</div>
	);
};

export default SortSelector;
