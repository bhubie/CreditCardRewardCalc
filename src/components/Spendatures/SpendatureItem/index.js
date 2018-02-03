import { h } from 'preact';
import Textfield from 'preact-material-components/Textfield';
import 'preact-material-components/Textfield/style.css';
import style from './style.css';

const SpendatureItem = ({ id, category, monthlyValue, yearlyValue, handleMonthlyValueChange }) => (
	<div id={'spendature' + id} class={style.spendature}>
		<Textfield multiline={false}
			value={monthlyValue} onKeyUp={handleMonthlyValueChange}
			label={category} id={id}
			type="number"
			min="0"
			step=".01"
		/>
	</div>
	
);

export { SpendatureItem };