import { h, Component } from 'preact';
import { calcCreditCardRewards, getTopCard } from '../../Utils/CreditCardRewardCalculator.js';
import { TopCards } from '../TopCards/index.js';
import  Table  from '../Table/index.js';
import style from './style.css';

export default class CreditCards extends Component {

	handleViewAllCards = () => {
		const creditCardTable = document.getElementById('creditCardTable');
		creditCardTable.scrollIntoView({ behavior: 'smooth' });
	}

	calculateCreditCardRewards(nextProps, creditCards){
		let cclist;
		let bestCard;
		let secondBestCard;
		let thirdBestCard;

		calcCreditCardRewards(creditCards, nextProps.expenditures, nextProps.monthlyTransactions)
		.then(results => {
			cclist = results;
			return getTopCard(cclist, 'RewardFiveYears', 1);	
		}).then(bestCard1 => {
			bestCard = bestCard1;
			return getTopCard(cclist, 'RewardFiveYears', 2);	
		}).then(secondBestCard1 => {
			secondBestCard = secondBestCard1;
			return getTopCard(cclist, 'RewardFiveYears', 3);
		}).then(thirdBestCard1 => {
			thirdBestCard = thirdBestCard1;
			this.setState({
				creditCards: cclist,
				bestCard: bestCard,
				secondBestCard: secondBestCard,
				thirdBestCard: thirdBestCard1
			});
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			creditCards: []
		};
	}

	componentDidMount() {
		fetch('CreditCards.json')
		.then(res => {
			return res.json();
		})
		.then(j => {
			this.calculateCreditCardRewards(this.props, j.creditCards);
		});
	}

	componentWillReceiveProps (nextProps){
		this.calculateCreditCardRewards(nextProps, this.state.creditCards);
	}

	render() {
		return (
			<div id="creditCardContainer" class={style.creditCardContainer} >
				<TopCards bestCard={this.state.bestCard} secondBestCard={this.state.secondBestCard} thirdBestCard={this.state.thirdBestCard}
					handleViewAllCards ={this.handleViewAllCards}
				/>
				<Table tableData={this.state.creditCards}
					tableTitle= 'Credit Cards'
					defaultSortColumn="Institution"
					columnHeaders={[{
						friendlyName: 'Institution',
						name: 'Institution',
						sortDirection: 'Asc',
						allowSorting: true,
						isNumber: false
					}, {
						friendlyName: 'Credit Card Name',
						name: 'Name',
						sortDirection: 'Desc',
						allowSorting: true,
						isNumber: false
					}, {
						friendlyName: 'Type',
						name: 'RewardType',
						sortDirection: 'Desc',
						allowSorting: true,
						isNumber: false
					}, {
						friendlyName: 'Reward One Year',
						name: 'RewardOneYear',
						sortDirection: 'Desc',
						allowSorting: true,
						isNumber: true
					}, {
						friendlyName: 'Reward Two Years',
						name: 'RewardTwoYears',
						sortDirection: 'Desc',
						allowSorting: true,
						isNumber: true
					}, {
						friendlyName: 'Reward Five Years',
						name: 'RewardFiveYears',
						sortDirection: 'Desc',
						allowSorting: true,
						isNumber: true
					}]}
				/>
			</div>
		);
	}
}

