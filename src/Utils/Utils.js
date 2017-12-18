const formatAsCurrency = (number) => {
	if (isNaN(number)) {
		return number;
	}
	
	const options = { style: 'currency', currency: 'USD' };
	const currencyFormat = new Intl.NumberFormat('en-US', options);
	return currencyFormat.format(number);

};

export { formatAsCurrency };