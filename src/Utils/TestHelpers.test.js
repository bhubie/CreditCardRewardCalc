import expect from 'expect';
import SpendatureCategory from './SpendatureCategory';
import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';

const defaultSpendatures = [new SpendatureCategory('Restaurants', 200),
	new SpendatureCategory('Groceries', 300),
	new SpendatureCategory('Air Travel', 50),
	new SpendatureCategory('Other Travel', 50),
	new SpendatureCategory('Gas', 80),
	new SpendatureCategory('Amazon', 200),
	new SpendatureCategory('Misc', 800)];
const defaultMonthlyTransactions = 50;

let MockCreditCard = {
	Institution: 'Amex',
	Name: 'Everyday',
	RewardType: 'Points',
	RewardCategories: [
		{
			Name: 'Restaurants',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Groceries',
			Factor: 2,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Air Travel',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Other Travel',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Gas',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Amazon',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		}
	],
	BaseFactor: 1,
	BaseBonus: 0,
	PointValue: 0.01,
	BonusReward: 20,
	BonusRewardMinTransaction: 20,
	WelcomeBonus: 100.00,
	TravelBonus: 0,
	AnnualFeeYearOne: 0,
	AnnualFeeYearOnePlus: 0,
	RewardOneYear: 0,
	RewardTwoYears: 0,
	RewardFiveYears: 0
};

const testCreditCard = (creditCard, expectedValues) => {
	it(`should have an institution named ${expectedValues.Institution}`, () => {
		expect(creditCard.Institution).toBe(expectedValues.Institution);
	});

	it(`should be named ${expectedValues.Name}`, () => {
		expect(creditCard.Name).toBe(expectedValues.Name);
	});

	it(`should have a reward type of ${expectedValues.RewardType}`, () => {
		expect(creditCard.RewardType).toBe(expectedValues.RewardType);
	});

	it(`should have a base factor of ${expectedValues.BaseFactor}`, () => {
		expect(creditCard.BaseFactor).toBe(expectedValues.BaseFactor);
	});

	it(`should have a point value of ${expectedValues.PointValue}`, () => {
		expect(creditCard.PointValue).toBe(expectedValues.PointValue);
	});

	it(`should have a bonuse reward of ${expectedValues.BonusReward}`, () => {
		expect(creditCard.BonusReward).toBe(expectedValues.BonusReward);
	});

	it(`should have a Bonus Reward Min Transaction of ${expectedValues.BonusRewardMinTransaction}`, () => {
		expect(creditCard.BonusRewardMinTransaction).toBe(expectedValues.BonusRewardMinTransaction);
	});

	it(`should have a Welcome Bonus of ${expectedValues.WelcomeBonus}`, () => {
		expect(creditCard.WelcomeBonus).toBe(expectedValues.WelcomeBonus);
	});

	it(`should have a travel bonus of ${expectedValues.TravelBonus}`, () => {
		expect(creditCard.TravelBonus).toBe(expectedValues.TravelBonus);
	});

	it(`should have an Annual Fee Year One of ${expectedValues.AnnualFeeYearOne}`, () => {
		expect(creditCard.AnnualFeeYearOne).toBe(expectedValues.AnnualFeeYearOne);
	});

	it(`should have an Annual Fee Year One Plus of ${expectedValues.AnnualFeeYearOnePlus}`, () => {
		expect(creditCard.AnnualFeeYearOnePlus).toBe(expectedValues.AnnualFeeYearOnePlus);
	});

	it(`should have a calculated base bonus of ${expectedValues.BaseBonus}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		expect(baseBonus).toBe(expectedValues.BaseBonus);
	});

	it(`should have a calculated monthly reward value of ${expectedValues.MonthlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		expect(monthlyRewardValue).toBe(expectedValues.MonthlyRewardValue);
	});

	it(`should have a calculated yearly reward value of ${expectedValues.YearlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		expect(yearlyRewardValue).toBe(expectedValues.YearlyRewardValue);
	});

	it(`should have an annual reward total of ${expectedValues.AnnualRewardTotal}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		expect(annualRewardTotal).toBe(expectedValues.AnnualRewardTotal);
	});

	it(`should have a reward year one of ${expectedValues.RewardYearOne}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		expect(rewardYearOne).toBe(expectedValues.RewardYearOne);
	});

	it(`should have a reward year two of ${expectedValues.RewardYearTwo}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		
		const rewardYearTwo = await calcRewardTwoYears(rewardYearOne, annualRewardTotal, creditCard.AnnualFeeYearOnePlus);
		expect(rewardYearTwo).toBe(expectedValues.RewardYearTwo);
	});

	it(`should have a reward year five of ${expectedValues.RewardYearFive}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		
		const rewardYearFive = await calcRewardFiveYears(rewardYearOne, annualRewardTotal, creditCard.AnnualFeeYearOnePlus);
		
		expect(rewardYearFive).toBe(expectedValues.RewardYearFive);
	});

	describe('Reward Categories', () => {
		
		describe('Reward Category Restaurants', () => {
			let restuarants = creditCard.RewardCategories.filter(category => category.Name === 'Restaurants')[0];
			let restaurantValues = expectedValues.RewardCategories.filter(category => category.Name === 'Restaurants')[0];
			
			it(`should have a factor of ${restaurantValues.Factor}`, () => {
				expect(restuarants.Factor).toBe(restaurantValues.Factor);
			});
		
			it(`should have a cap of ${restaurantValues.Cap}`, () => {
				expect(restuarants.Cap).toBe(restaurantValues.Cap);
			});
		
			it(`should calculate a bonus of ${restaurantValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[0].monthlyValue,
				defaultSpendatures[0].yearlyValue, restuarants.Cap, restuarants.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(restaurantValues.Bonus);
				}));
		});
		
		describe('Reward Category Groceries', () => {
			let groceries = creditCard.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			let groceryValues = expectedValues.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			
			it(`should have a factor of ${groceryValues.Factor}`, () => {
				expect(groceries.Factor).toBe(groceryValues.Factor);
			});
		
			it(`should have a cap of ${groceryValues.Cap}`, () => {
				expect(groceries.Cap).toBe(groceryValues.Cap);
			});
		
			it(`should calculate a bonus of ${groceryValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[1].monthlyValue,
				defaultSpendatures[1].yearlyValue, groceries.Cap, groceries.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(groceryValues.Bonus);
				}));
		});
		
		describe('Reward Category Air Travel', () => {
			let airTravel = creditCard.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			let airTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			
			it(`should have a factor of ${airTravelValues.Factor}`, () => {
				expect(airTravel.Factor).toBe(airTravelValues.Factor);
			});
		
			it(`should have a cap of ${airTravelValues.Cap}`, () => {
				expect(airTravel.Cap).toBe(airTravelValues.Cap);
			});
		
			it(`should calculate a bonus of ${airTravelValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[2].monthlyValue,
				defaultSpendatures[2].yearlyValue, airTravel.Cap, airTravel.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(airTravelValues.Bonus);
				}));
		});
		
		describe('Reward Category Other Travel', () => {
			let otherTravel = creditCard.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			let otherTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Other Travel')[0];

			it(`should have a factor of ${otherTravelValues.Factor}`, () => {
				expect(otherTravel.Factor).toBe(otherTravelValues.Factor);
			});
		
			it(`should have a cap of ${otherTravelValues.Cap}`, () => {
				expect(otherTravel.Cap).toBe(otherTravelValues.Cap);
			});
		
			it(`should calculate a bonus of ${otherTravelValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[3].monthlyValue,
				defaultSpendatures[3].yearlyValue, otherTravel.Cap, otherTravel.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(otherTravelValues.Bonus);
				}));
		});
		
		describe('Reward Category Gas', () => {
			let gas = creditCard.RewardCategories.filter(category => category.Name === 'Gas')[0];
			let gasValues = expectedValues.RewardCategories.filter(category => category.Name === 'Gas')[0];
			
			it(`should have a factor of ${gasValues.Factor}`, () => {
				expect(gas.Factor).toBe(gasValues.Factor);
			});
		
			it(`should have a cap of ${gasValues.Cap}`, () => {
				expect(gas.Cap).toBe(gasValues.Cap);
			});
		
			it(`should calculate a bonus of ${gasValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[4].monthlyValue,
				defaultSpendatures[4].yearlyValue, gas.Cap, gas.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(gasValues.Bonus);
				}));
		});
		
		describe('Reward Category Amazon', () => {
			let amazon = creditCard.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			let amazonValues = expectedValues.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			
			it(`should have a factor of ${amazonValues.Factor}`, () => {
				expect(amazon.Factor).toBe(amazonValues.Factor);
			});
		
			it(`should have a cap of ${amazonValues.Cap}`, () => {
				expect(amazon.Cap).toBe(amazonValues.Cap);
			});
		
			it(`should calculate a bonus of ${amazonValues.Bonus}`, () => calcCategoryBonus(defaultSpendatures[5].monthlyValue,
				defaultSpendatures[5].yearlyValue, amazon.Cap, amazon.Factor,
				creditCard.PointValue, creditCard.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(amazonValues.Bonus);
				}));
		});
	});


};

export { MockCreditCard, testCreditCard };