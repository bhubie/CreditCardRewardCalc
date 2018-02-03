import SpendatureCategory from './SpendatureCategory.js';


const formatAsCurrency = (number) => {
	if (isNaN(number)) {
		return number;
	}
	
	const options = { style: 'currency', currency: 'USD' };
	const currencyFormat = new Intl.NumberFormat('en-US', options);
	return currencyFormat.format(number);

};

const defaultSpendatures = [new SpendatureCategory('Restaurants', 200.00),
	new SpendatureCategory('Groceries', 300.00),
	new SpendatureCategory('Air Travel', 50.00),
	new SpendatureCategory('Other Travel', 50.00),
	new SpendatureCategory('Gas', 80.00),
	new SpendatureCategory('Amazon', 200.00),
	new SpendatureCategory('Misc', 800.00)];

const defaultMonthlyTransactions = 50;


export { formatAsCurrency
	,defaultSpendatures
	,defaultMonthlyTransactions };