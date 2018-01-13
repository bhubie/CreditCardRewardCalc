import { h, Component } from 'preact';
import { calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from '../../Utils/CreditCardRewardCalculator.js';
import  Table  from '../Table/index.js';
import style from './style';

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
	}

	componentWillReceiveProps (nextProps){
		this.calculateCreditCardRewards(nextProps);
	}

	render() {
		return (
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
		);
	}
}

