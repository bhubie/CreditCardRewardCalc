import { h, Component } from 'preact';
import { calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from '../../Utils/CreditCardRewardCalculator.js';

//import CreditCardList from '../../Utils/CreditCards.json';

export default class CreditCards extends Component {

	async calculateCreditCardRewards(nextProps){
		let creditCards = await this.state.creditCards.map(async (creditCard) => {
			
			creditCard.RewardCategories = await setRewardCategoryBonuses(nextProps.spendatures, creditCard.RewardCategories
				,creditCard.PointValue, creditCard.BaseFactor);
						
			creditCard.BaseBonus = await calcBaseBonus(creditCard.BaseFactor,
				creditCard.PointValue,
				nextProps.spendatures.filter(spendature => spendature.category === 'Misc')[0].monthlyValue);
						
			creditCard.MonthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), creditCard.BaseBonus);
						
			creditCard.AnnualRewardValue = await calcYearlyRewardValue(creditCard.MonthlyRewardValue);
						
			creditCard.AnnualRewardTotal = await calcAnnualRewardValue(nextProps.monthlyTransactions, creditCard.BonusRewardMinTransaction,
				creditCard.AnnualRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
						
			creditCard.RewardOneYear = await calcRewardOneYear(creditCard.AnnualRewardTotal, creditCard.WelcomeBonus,
				creditCard.AnnualFeeYearOne);
						
			creditCard.RewardTwoYears = await calcRewardTwoYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal,
				creditCard.AnnualFeeYearOnePlus);
						
			creditCard.RewardFiveYears = await calcRewardFiveYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal,
				creditCard.AnnualFeeYearOnePlus);
				
			return creditCard;
		});

		this.setState({
			creditCards: await Promise.all(creditCards)
		});

		//console.log(this.state.creditCards);
	}
	
	constructor() {
		super();
		this.state = {
			creditCards: []
		};
	}

	async componentDidMount() {

		const res = await fetch('Utils/CreditCards.json');
		const j = await res.json();
		this.setState({ creditCards: j.creditCards });

		//console.log(this.state.creditCards);
	}

	componentWillReceiveProps (nextProps){
		this.calculateCreditCardRewards(nextProps);
	}

	componentWillUnmount() {

	}

	render() {

		let creditCardRows = this.state.creditCards.map((creditCard) => {
			return (<tr>
				<td>{creditCard.Name}</td>
				<td>{creditCard.RewardType}</td>
				<td>{creditCard.RewardOneYear}</td>
				<td>{creditCard.RewardTwoYears}</td>
				<td>{creditCard.RewardFiveYears}</td>
			</tr>);
		});

		return (
			<div>
				<table>
					<thead>
						<th>Credit Card Name</th>
						<th>Type</th>
						<th>Reward One Year</th>
						<th>Reward Two Years</th>
						<th>Reward Five Years</th>
					</thead>
					<tbody>
						{creditCardRows}
					</tbody>
				</table>
			</div>
		);
	}
}

