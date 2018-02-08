import { h, Component } from 'preact';
import { calcCreditCardRewards } from '../../Utils/CreditCardRewardCalculator.js';
import  Table  from '../Table/index.js';
import style from './style.css';

export default class CreditCards extends Component {

	calculateCreditCardRewards(nextProps, creditCards){
		calcCreditCardRewards(creditCards, nextProps.expenditures, nextProps.monthlyTransactions).then(results => {
			this.setState({
				creditCards: results
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
				<Table tableData={this.state.creditCards}
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

