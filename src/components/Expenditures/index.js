import { h, Component } from 'preact';
import style from './style.css';
import { ExpenditureItem } from './ExpenditureItem/index.js';
import { MonthlyTransactions } from './MonthlyTransactions/index.js';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

export default class expenditures extends Component {
	
	handleSpendacureItemChange = (event) => {
		const s = this.state.expenditures;
		s[event.target.id].monthlyValue = event.target.value;
		s[event.target.id].updateYearlyValue(event.target.value);
		
		// re-render
		this.forceUpdate();
	}

	handleMonthlyTransactionChange = (event) => {
		this.setState({ monthlyTransactions: event.target.value });
	}

	constructor(props) {
		super(props);
		this.state = {
			expenditures: props.expenditures,
			monthlyTransactions: props.monthlyTransactions
		};
	}


	componentDidMount() {
	}

	componentWillUnmount() {

	}

	render({ className, expenditures, monthlyTransactions}) {
		let expenditureItems = expenditures.map( (expenditureCategory, index) => (
			
			<ExpenditureItem category={expenditureCategory.category}
				monthlyValue={expenditureCategory.monthlyValue}
				yearlyValue={expenditureCategory.yearlyValue}
				handleMonthlyValueChange={this.handleSpendacureItemChange}
				id={index}
				type="number"
				class={style.expenditure}
			/>
		));
		
		return (
			<div id="expenditureWrapper" class={style.expenditureWrapper}>
			<div id="expendituresContainer" class={style.expenditures} >
				<h1 class={style.header}>Monthly Expenditures</h1>
				{ expenditureItems }
				<MonthlyTransactions monthlyTransactions={this.state.monthlyTransactions}
					handleMonthlyTransactionChange={this.handleMonthlyTransactionChange}
				/>
				<div class={style.button}>
					<button class='mdc-button mdc-button--raised mdc-button mdc-button--raised mdc-theme--secondary-bg mdc-theme--secondary-bg' onClick={this.props.handleSubmitExpenditures.bind(this, this.state.expenditures, this.state.monthlyTransactions)}>
						Press to Calculate
					</button>
				</div>
			</div>
			</div>
		);
	}
}

