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

const calcCategoryBonus = ( categoryMonthlyValue, categoryYearlyValue, categoryCap, categoryFactor, creditCardPointValue, creditCardBaseFactor) =>
	
	//return categoryBonus;
	 new Promise((resolve, reject) => {
		try {
			let categoryBonus = 0;
			if (categoryCap > 0) {
				if (categoryYearlyValue > categoryCap) {
					categoryBonus = (((categoryYearlyValue / 12) * categoryFactor * creditCardPointValue) + (categoryYearlyValue - categoryCap) / 12) * creditCardBaseFactor * creditCardPointValue;
				}
				else {
					categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
				}
			}
			else {
				categoryBonus = categoryFactor * creditCardPointValue * categoryMonthlyValue;
			}
			resolve(categoryBonus);
		}
		catch (e){
			reject(e);
		}
		
	})
;

const calcBaseBonus = (creditCardBaseFactor, creditCardPointValue, monthlyMiscExpense) => new Promise((resolve, reject) => {
	try {
		let baseBonus = creditCardBaseFactor * creditCardPointValue * monthlyMiscExpense;
		resolve(baseBonus);
	}
	catch (e){
		reject(e);
	}
});

const calcMonthlyRewardValue = (arrayOfRewardCategoryBonus, baseBonus) => new Promise((resolve, reject) => {
	try {
		resolve(arrayOfRewardCategoryBonus.reduce((accum, val) => accum + Number(val), 0) + baseBonus);
	}
	catch (e){
		reject(e);
	}
});

const calcYearlyRewardValue = (monthlyRewardValue) => new Promise((resolve, reject) => {
	try {
		let yearlyRewardValue = monthlyRewardValue * 12;

		resolve(round(yearlyRewardValue, 2));
	}
	catch (e) {
		reject(e);
	}
});

const setRewardCategoryBonuses = async (spendatureCategories, creditCardRewardCategories, creditCardPointValue, creditCardBaseFactor) => {
	try {
		//creditCardRewardCategories.forEach(category => {
		await Promise.all(creditCardRewardCategories.map(async (category) => {
			let spendatureCatValues = spendatureCategories.filter(rewardCategory => rewardCategory.category === category.Name);
			if (spendatureCatValues[0] !== undefined) {
				category.Bonus = await calcCategoryBonus(spendatureCatValues[0].monthlyValue,
					spendatureCatValues[0].yearlyValue,
					category.Cap,
					category.Factor,
					creditCardPointValue,
					creditCardBaseFactor);
			}
		}));
		return creditCardRewardCategories;
	}
	catch (e) {
		return e;
	}
	
};

const calcAnnualRewardValue = (monthlyTransactions, creditCardMinTransactions, annualRewardValue, bonusReward, travelBonus) => new Promise((resolve, reject) => {
	try {
		if (monthlyTransactions > creditCardMinTransactions) {
			resolve(round(annualRewardValue + (annualRewardValue * bonusReward) + travelBonus,2));
		}
		resolve(round(annualRewardValue + travelBonus,2));
	}
	catch (e) {
		reject(e);
	}
});

const calcRewardOneYear = (annualRewardTotal, welcomeBonus, annualFeeYearOne) => new Promise((resolve, reject) => {
	try {
		resolve(round(annualRewardTotal + welcomeBonus - annualFeeYearOne,2));
	}
	catch (e) {
		reject(e);
	}
});

const calcRewardTwoYears = (rewardOneYear, annualRewardValue, annualFeeYearOnePlus) =>  new Promise((resolve, reject) => {
	try {
		resolve(round(rewardOneYear + annualRewardValue - annualFeeYearOnePlus, 2));
	}
	catch (e) {
		reject(e);
	}
});

const calcRewardFiveYears = (rewardOneYear,  annualRewardValue, annualFeeYearOnePlus) =>  new Promise((resolve, reject) => {
	try {
		resolve(round(rewardOneYear + ((annualRewardValue - annualFeeYearOnePlus) * 4), 2));
	}
	catch (e) {
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
	,calcRewardFiveYears };

