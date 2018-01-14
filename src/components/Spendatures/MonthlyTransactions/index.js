import { h } from 'preact';
import Textfield from 'preact-material-components/Textfield';
import 'preact-material-components/Textfield/style.css';

const MonthlyTransactions = ({ monthlyTransactions, handleMonthlyTransactionChange }) => (
	<div>
		<Textfield multiline={false}
			value={monthlyTransactions} onKeyUp={handleMonthlyTransactionChange}
			label="CC Transactions"
			type="number"
		/>
	</div>
	
);

export { MonthlyTransactions };