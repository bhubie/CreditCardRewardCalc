import { h } from 'preact';
import style from './style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

const MonthlyTransactions = ({ monthlyTransactions, handleMonthlyTransactionChange }) => (
	<div id='spendature7' class={style.spendature}>
		<TextField multiline={false}
			value={monthlyTransactions} onKeyUp={handleMonthlyTransactionChange}
			label="CC Transactions"
			type="number"
		/>
	</div>
	
);

export { MonthlyTransactions };