/*
            1.) Calcualate Bonus for each Reward Category
                - IF Yearly Value for category > category cap (ex restaurants)
                    - yearly value for cat / 12 * category factor * credit card point value + (yearly value for cat - category cap ) / 12 * Credit Card Base factor * Credit Card Point Value
                - Else 
                    - Category Factor * Credit card poit value * monthly value category
			2.) calcualte Base Bonus
            3.) Calculate Monthly Reward Value:
				- Sum each reward category Bonus + Base Bonus
            4.) Calcualte Anual Reward Value
                - Monthly reward * 12
			5.) Calculate Anual Reward Total
				- IF Monthly Transactions > Credit Card Min Transaction Amount
					- Annual Reward Value + (Annual Reward Value * Bonus Reward) + Travel Bonus 
				- Else 
					- Annual Reward Value + Travel Bonus
			6.) calculate Reward Year One
				- Welcome Bonus + Annual Reward Total - AnnualFeeYearOne
			7.) calculate reward 2 years
				- Reward 1 year + (annual reward total - AnnualFeeYearOnePlus)
			8.) calcualte reward 5 years

*/

function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const calcCategoryBonus = ( categoryMonthlyValue, categoryYearlyValue, categoryCap, categoryFactor, creditCardPointValue, creditCardBaseFactor) => {
	let categoryBonus = 0;
	if (categoryCap > 0) {
		if (categoryYearlyValue > categoryCap) {
			categoryBonus = ((categoryCap / 12 ) * categoryFactor * creditCardPointValue) + (((categoryYearlyValue - categoryCap) / 12) * creditCardBaseFactor * creditCardPointValue);
			// (((categoryCap / 12) * categoryFactor * creditCardPointValue) + (categoryYearlyValue - categoryCap) / 12) * creditCardBaseFactor * creditCardPointValue;
		}
		else {
			categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
		}
	}
	else {
		categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
	}
	return(round(categoryBonus, 2));
};

const calcBaseBonus = (creditCardBaseFactor, creditCardPointValue, monthlyMiscExpense) => {
	let baseBonus = creditCardBaseFactor * creditCardPointValue * monthlyMiscExpense;
	return(round(baseBonus, 2));
};

const calcMonthlyRewardValue = (arrayOfRewardCategoryBonus, baseBonus) => {
	return(round(arrayOfRewardCategoryBonus.reduce((accum, val) => accum + Number(val), 0) + baseBonus, 2));
};

const calcYearlyRewardValue = (monthlyRewardValue) => {
	let yearlyRewardValue = monthlyRewardValue * 12;
	return(round(yearlyRewardValue, 2));
};

const setRewardCategoryBonuses = (spendatureCategories, creditCardRewardCategories, creditCardPointValue, creditCardBaseFactor) => {
	try {
		creditCardRewardCategories.map((category) => {
			let spendatureCatValues = spendatureCategories.filter(rewardCategory => rewardCategory.category === category.Name);
			if (spendatureCatValues[0] !== undefined) {
				category.Bonus = calcCategoryBonus(spendatureCatValues[0].monthlyValue,
					spendatureCatValues[0].yearlyValue,
					category.Cap,
					category.Factor,
					creditCardPointValue,
					creditCardBaseFactor);
			}
		});
		return creditCardRewardCategories;
	}
	catch (e) {
		return e;
	}
};

const calcAnnualRewardValue = (monthlyTransactions, creditCardMinTransactions, annualRewardValue, bonusReward, travelBonus) => {
		if (monthlyTransactions > creditCardMinTransactions) {
			return(round(annualRewardValue + (annualRewardValue * bonusReward) + travelBonus,2));
		}
		return(round(annualRewardValue + travelBonus,2));
};

const calcRewardOneYear = (annualRewardTotal, welcomeBonus, annualFeeYearOne) => {
	return(round(annualRewardTotal + welcomeBonus - annualFeeYearOne,2));
};

const calcRewardTwoYears = (rewardOneYear, annualRewardValue, annualFeeYearOnePlus) => {
	return(round(rewardOneYear + annualRewardValue - annualFeeYearOnePlus, 2));
};

const calcRewardFiveYears = (rewardOneYear,  annualRewardValue, annualFeeYearOnePlus) =>  {
			return(round(rewardOneYear + ((annualRewardValue - annualFeeYearOnePlus) * 4), 2));
};

const calcCreditCardRewards = (creditCards, spendatures, monthlyTransactions) => new Promise((resolve, reject) => {
	try {
		resolve(creditCards.map((creditCard) => {
				
			creditCard.RewardCategories = setRewardCategoryBonuses(spendatures, creditCard.RewardCategories
				,creditCard.PointValue, creditCard.BaseFactor);
				
			creditCard.BaseBonus =  calcBaseBonus(creditCard.BaseFactor,
				creditCard.PointValue,
				spendatures.filter(spendature => spendature.category === 'Misc')[0].monthlyValue);
			
			const catBonus = creditCard.RewardCategories.map(category => category.Bonus);
			creditCard.MonthlyRewardValue = calcMonthlyRewardValue(catBonus, creditCard.BaseBonus);
				
			creditCard.AnnualRewardValue = calcYearlyRewardValue(creditCard.MonthlyRewardValue);
				
			creditCard.AnnualRewardTotal = calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction,
				creditCard.AnnualRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
				
			creditCard.RewardOneYear = calcRewardOneYear(creditCard.AnnualRewardTotal, creditCard.WelcomeBonus,
					creditCard.AnnualFeeYearOne);
				
			creditCard.RewardTwoYears =	calcRewardTwoYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal,
					creditCard.AnnualFeeYearOnePlus);
				
			creditCard.RewardFiveYears = calcRewardFiveYears(creditCard.RewardOneYear, creditCard.AnnualRewardTotal,
						creditCard.AnnualFeeYearOnePlus);
						
			return creditCard;
		}));
	}
	catch (e){
		reject(e);
	}	
});

export { calcCategoryBonus
	,calcMonthlyRewardValue
	,setRewardCategoryBonuses
	,calcBaseBonus
	,calcYearlyRewardValue
	,calcAnnualRewardValue
	,calcRewardOneYear
	,calcRewardTwoYears
	,calcRewardFiveYears
	,calcCreditCardRewards };

