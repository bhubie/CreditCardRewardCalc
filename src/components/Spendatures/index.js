import { h, Component } from 'preact';
import style from './style.css';
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

	constructor(props) {
		super(props);
		this.state = {
			spendatures: props.spendatures,
			monthlyTransactions: props.monthlyTransactions
		};
	}


	componentDidMount() {
	}

	componentWillUnmount() {

	}

	render({ className, spendatures, monthlyTransactions}) {
		let spendatureItems = spendatures.map( (spendatureCategory, index) => (
			
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
				<MonthlyTransactions monthlyTransactions={monthlyTransactions}
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

