import { h, Component } from 'preact';
import style from './style.css';
import { WelcomeMessage } from '../WelcomeMessage/index.js';
import Spendatures from '../Spendatures/index.js';
import { defaultSpendatures, defaultMonthlyTransactions} from '../../Utils/Utils.js';
import CreditCards from '../CreditCards/index.js';


export default class Home extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	handleGetStarted = () => {
		const creditCardTable = document.getElementById('spendatureWrapper');
		creditCardTable.scrollIntoView(true);

	}

	handleSubmitSpendatures = (spendatures, monthlyTransactions) => {
		this.setState({
			spendatures,
			monthlyTransactions
		});

		//Scroll To Credit Card Table
		const creditCardTable = document.getElementById('creditCardContainer');
		creditCardTable.scrollIntoView(true);
		let scrolledY = window.scrollY;
		if (scrolledY) {
			window.scroll(0, scrolledY - 50);
		}
	};

	constructor(props) {
		super(props);
		this.handleGetStarted = this.handleGetStarted.bind(this);
		this.state = {
			spendatures: defaultSpendatures,
			monthlyTransactions: defaultMonthlyTransactions
		};
	  }

	render() {

		return (
            <div id="homeContainer" class={style.home}>
				<WelcomeMessage onClick={this.handleGetStarted} />
				<Spendatures handleSubmitSpendatures={this.handleSubmitSpendatures} 
				className={style.spendatures} spendatures={this.state.spendatures}
				monthlyTransactions={this.state.monthlyTransactions} />
				<CreditCards spendatures={this.state.spendatures}
					monthlyTransactions={this.state.monthlyTransactions}
					className={style.creditcards}
				/>
			</div>
		);
	}
}
