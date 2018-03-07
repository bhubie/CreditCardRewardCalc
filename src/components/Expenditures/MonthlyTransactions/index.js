import { h } from 'preact';
import style from './style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

const MonthlyTransactions = ({ monthlyTransactions, handleMonthlyTransactionChange }) => (
	<div id='expenditure7' class={style.expenditure}>
		<TextField multiline={false}
			value={monthlyTransactions} onKeyUp={handleMonthlyTransactionChange}
			label="Credit Card Transactions"
			type="number"
		/>
	</div>
	
);

export { MonthlyTransactions };