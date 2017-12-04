import { h } from 'preact';
import Textfield from 'preact-material-components/Textfield';
import 'preact-material-components/Textfield/style.css';

const SpendatureItem = ({ id, category, monthlyValue, yearlyValue, handleMonthlyValueChange }) => (
	<div>
		<Textfield multiline={false}
			value={monthlyValue} onKeyUp={handleMonthlyValueChange}
			label={category} id={id}
		/>
	</div>
	
);

export { SpendatureItem };