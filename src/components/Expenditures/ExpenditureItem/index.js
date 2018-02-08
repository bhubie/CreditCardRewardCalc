import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';

const ExpenditureItem = ({ id, category, monthlyValue, yearlyValue, handleMonthlyValueChange }) => (
	<div id={'expenditure' + id} class={style.expenditure}>
		<TextField multiline={false}
			value={monthlyValue} onKeyUp={handleMonthlyValueChange}
			label={category} id={id}
			type="number"
			min="0"
			step=".01"
		/>
	</div>
	
);

export { ExpenditureItem };