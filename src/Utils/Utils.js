import ExpenditureCategory from './ExpenditureCategory.js';


const formatAsCurrency = (number) => {
	if (isNaN(number)) {
		return number;
	}
	
	const options = { style: 'currency', currency: 'USD' };
	const currencyFormat = new Intl.NumberFormat('en-US', options);
	return currencyFormat.format(number);

};

const defaultExpenditures = [new ExpenditureCategory('Restaurants', 200.00),
	new ExpenditureCategory('Groceries', 300.00),
	new ExpenditureCategory('Air Travel', 50.00),
	new ExpenditureCategory('Other Travel', 50.00),
	new ExpenditureCategory('Gas', 80.00),
	new ExpenditureCategory('Amazon', 200.00),
	new ExpenditureCategory('Misc', 800.00)];

const defaultMonthlyTransactions = 50;


export { formatAsCurrency
	,defaultExpenditures
	,defaultMonthlyTransactions };