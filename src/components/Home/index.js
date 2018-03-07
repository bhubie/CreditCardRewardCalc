import { h, Component } from 'preact';
import style from './style.css';
import { WelcomeMessage } from '../WelcomeMessage/index.js';
import Expenditures from '../Expenditures/index.js';
import { defaultExpenditures, defaultMonthlyTransactions} from '../../Utils/Utils.js';
import CreditCards from '../CreditCards/index.js';


export default class Home extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	handleGetStarted = () => {
		const creditCardTable = document.getElementById('expenditureWrapper');
		creditCardTable.scrollIntoView({ behavior: 'smooth' });

	}

	handleSubmitExpenditures = (expenditures, monthlyTransactions) => {
		this.setState({
			expenditures,
			monthlyTransactions
		});

		//Scroll To Credit Card Table
		const creditCardTable = document.getElementById('creditCardContainer');
		creditCardTable.scrollIntoView({ behavior: 'smooth' });
	};

	constructor(props) {
		super(props);
		this.handleGetStarted = this.handleGetStarted.bind(this);
		this.state = {
			expenditures: defaultExpenditures,
			monthlyTransactions: defaultMonthlyTransactions
		};
	  }

	render() {

		return (
            <div id="homeContainer" class={style.home}>
				<WelcomeMessage onClick={this.handleGetStarted} />
				<Expenditures handleSubmitExpenditures={this.handleSubmitExpenditures} 
				className={style.expenditures} expenditures={this.state.expenditures}
				monthlyTransactions={this.state.monthlyTransactions} />
				<CreditCards expenditures={this.state.expenditures}
					monthlyTransactions={this.state.monthlyTransactions}
					className={style.creditcards}
				/>
			</div>
		);
	}
}
