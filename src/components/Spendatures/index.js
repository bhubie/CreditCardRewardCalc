import { h, Component } from 'preact';
import style from './style.css';
import SpendatureCategory from '../../Utils/SpendatureCategory';
import { SpendatureItem } from './SpendatureItem/index.js';
import { MonthlyTransactions } from './MonthlyTransactions/index.js';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

export default class Spendatures extends Component {
	
	handleSpendacureItemChange = (event) => {
		const s = this.state.spendatures;
		s[event.target.id].monthlyValue = event.target.value;
		s[event.target.id].updateYearlyValue(event.target.value);
		
		// re-render
		this.forceUpdate();
	}

	handleMonthlyTransactionChange = (event) => {
		this.setState({ monthlyTransactions: event.target.value });
	}

	constructor() {
		super();
		this.state = {
			spendatures: [new SpendatureCategory('Restaurants', 200.00),
				new SpendatureCategory('Groceries', 300.00),
				new SpendatureCategory('Air Travel', 50.00),
				new SpendatureCategory('Other Travel', 50.00),
				new SpendatureCategory('Gas', 80.00),
				new SpendatureCategory('Amazon', 200.00),
				new SpendatureCategory('Misc', 800.00)],
			monthlyTransactions: 50
		};
	}


	componentDidMount() {
	}

	componentWillUnmount() {

	}

	render({ className }) {
		let spendatureItems = this.state.spendatures.map( (spendatureCategory, index) => (
			
			<SpendatureItem category={spendatureCategory.category}
				monthlyValue={spendatureCategory.monthlyValue}
				yearlyValue={spendatureCategory.yearlyValue}
				handleMonthlyValueChange={this.handleSpendacureItemChange}
				id={index}
				type="number"
				class={style.spendature}
			/>
		));
		
		return (
			<div id="spendatureWrapper" class={style.spendatureWrapper}>
			<div id="spendaturesContainer" class={style.spendatures} >
				<h1 class={style.header}>Monthly Spendatures</h1>
				{ spendatureItems }
				<MonthlyTransactions monthlyTransactions={this.state.monthlyTransactions}
					handleMonthlyTransactionChange={this.handleMonthlyTransactionChange}
				/>
				<div class={style.button}>
					<Button raised className="mdc-theme--secondary-bg" onClick={this.props.handleSubmitSpendatures.bind(this, this.state.spendatures, this.state.monthlyTransactions)}>
						Press to Calculate
					</Button>
				</div>
			</div>
			</div>
		);
	}
}

