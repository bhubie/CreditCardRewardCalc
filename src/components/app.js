import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { Header } from '../components/Header';
import Spendatures from '../components/Spendatures';
import CreditCards from '../components/CreditCards';
//import SpendatureCategory from '../Utils/SpendatureCategory';

export default class App extends Component {
	
	handleRoute = (e) => {
		this.currentUrl = e.url;
	};

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
			window.scroll(0, scrolledY - 80);
		}
	};

	render() {

		return (
			<div id="app">
				<Header />
				<Spendatures handleSubmitSpendatures={this.handleSubmitSpendatures} />
				<CreditCards spendatures={this.state.spendatures}
					monthlyTransactions={this.state.monthlyTransactions}
				/>
			</div>
		);
	}
}
