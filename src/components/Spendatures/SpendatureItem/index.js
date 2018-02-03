import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';

const SpendatureItem = ({ id, category, monthlyValue, yearlyValue, handleMonthlyValueChange }) => (
	<div id={'spendature' + id} class={style.spendature}>
		<TextField multiline={false}
			value={monthlyValue} onKeyUp={handleMonthlyValueChange}
			label={category} id={id}
			type="number"
			min="0"
			step=".01"
		/>
	</div>
	
);

export { SpendatureItem };