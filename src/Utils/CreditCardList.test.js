import creditCardList from './CreditCards.json';
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


let validateCreditCardSpendatureCategory = (rewardCategory) => {

	it(`should contain a Category Name`, () => {
		creditCardList.creditCards.forEach(rewardCategory => {
			expect(rewardCategory.Name).toBeDefined();
		});
	});

	it(`should contain a Factor`, () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(rewardCategory.Factor).toBeDefined();
			expect(typeof rewardCategory.Factor).toBe('number');
		});
	});

	it('should contain a Cap', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(rewardCategory.Cap).toBeDefined();
			expect(typeof rewardCategory.Cap).toBe('number');
		});
	});

	it('should contain a Bonus', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(rewardCategory.Bonus).toBeDefined();
			expect(typeof rewardCategory.Bonus).toBe('number');
		});
	});
};

describe('CreditCardList.json', () => {

	it('should contain a node called creditCards', () => {
		expect(creditCardList.creditCards).toBeDefined();
	});

	it('should contain an Institution', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.Institution).toBeDefined();
			expect(creditCard.Institution).not.toBe('');
		});
	});

	it('should contain a Name', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.Name).toBeDefined();
			expect(creditCard.Name).not.toBe('');
		});
	});

	it('should contain a RewardType', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.RewardType).toBeDefined();
			expect(creditCard.RewardType).not.toBe('');
		});
	});

	it('should contain a BaseFactor', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.BaseFactor).toBeDefined();
			expect(typeof creditCard.BaseFactor).toBe('number');
		});
	});

	it('should contain a BaseBonus', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.BaseBonus).toBeDefined();
			expect(typeof creditCard.BaseBonus).toBe('number');
		});
	});

	it('should contain a PointValue', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.PointValue).toBeDefined();
			expect(typeof creditCard.PointValue).toBe('number');
		});
	});

	it('should contain a BonusReward', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.BonusReward).toBeDefined();
			expect(typeof creditCard.BonusReward).toBe('number');
		});
	});

	it('should contain a BonusRewardMinTransaction', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.BonusRewardMinTransaction).toBeDefined();
			expect(typeof creditCard.BonusRewardMinTransaction).toBe('number');
		});
	});

	it('should contain a WelcomeBonus', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.WelcomeBonus).toBeDefined();
			expect(typeof creditCard.WelcomeBonus).toBe('number');
		});
	});

	it('should contain a TravelBonus', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.TravelBonus).toBeDefined();
			expect(typeof creditCard.TravelBonus).toBe('number');
		});
	});

	it('should contain a AnnualFeeYearOne', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.AnnualFeeYearOne).toBeDefined();
			expect(typeof creditCard.AnnualFeeYearOne).toBe('number');
		});
	});

	it('should contain a AnnualFeeYearOnePlus', () => {
		creditCardList.creditCards.forEach(creditCard => {
			expect(creditCard.AnnualFeeYearOnePlus).toBeDefined();
			expect(typeof creditCard.AnnualFeeYearOnePlus).toBe('number');
		});
	});

	describe('Credit Card Reward Categories', () => {
		it('should contain a category Array', () => {
			creditCardList.creditCards.forEach(creditCard => {
				expect(creditCard.RewardCategories).toBeDefined();
			});
		});

		it('should have at least one reward category', () => {
			creditCardList.creditCards.forEach(creditCard => {
				let length = creditCard.RewardCategories.length;
				expect(length).toBeGreaterThanOrEqual(1);
			});
		});

		creditCardList.creditCards.forEach(creditCard => {
			creditCard.RewardCategories.forEach(rewardCategory => {
				describe(`Credit Card Reward Category - ${rewardCategory.Name}`, () => {
					validateCreditCardSpendatureCategory(rewardCategory);
				});
				
			});
		});
	});
});

describe('American Express Everyday Card', () => {
	let everyday = creditCardList.creditCards[0];

	it('should have an institution named Amex', () => {
		expect(everyday.Institution).toBe('Amex');
	});

	it('should be named Evertday', () => {
		expect(everyday.Name).toBe('Everyday');
	});

	it('should have a reward type of Points', () => {
		expect(everyday.RewardType).toBe('Points');
	});

	it('should have a reward type of Points', () => {
		expect(everyday.RewardType).toBe('Points');
	});

	it('should have a base factor of one', () => {
		expect(everyday.BaseFactor).toBe(1);
	});

	it('should have a point value of 0.01', () => {
		expect(everyday.PointValue).toBe(0.01);
	});

	it('should have a bonuse reward of 0.20', () => {
		expect(everyday.BonusReward).toBe(0.20);
	});

	it('should have a Bonus Reward Min Transaction of 20', () => {
		expect(everyday.BonusRewardMinTransaction).toBe(20);
	});

	it('should have a Welcome Bonus', () => {
		expect(everyday.WelcomeBonus).toBe(100.00);
	});

	it('should have a travel bonus of 0', () => {
		expect(everyday.TravelBonus).toBe(0);
	});

	it('should have an Annual Fee Year One of 0', () => {
		expect(everyday.AnnualFeeYearOne).toBe(0);
	});

	it('should have an Annual Fee Year One Plus of 0', () => {
		expect(everyday.AnnualFeeYearOnePlus).toBe(0);
	});

	//TODO Reward Category validation
	describe('Reward Categories', () => {

		describe('Reward Category Restaurants', () => {
			let restuarants = everyday.RewardCategories.filter(category => category.Name === 'Restaurants')[0];
			it('should have a factor of 1', () => {
				expect(restuarants.Factor).toBe(1);
			});

			it('should have a cap of 0', () => {
				expect(restuarants.Cap).toBe(0);
			});

			it('should calculate a bonus of 2', () => calcCategoryBonus(defaultSpendatures[0].monthlyValue,
				defaultSpendatures[0].yearlyValue, restuarants.Cap, restuarants.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(2);
				}));
		});

		describe('Reward Category Groceries', () => {
			let groceries = everyday.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			it('should have a factor of 2', () => {
				expect(groceries.Factor).toBe(2);
			});

			it('should have a cap of 0', () => {
				expect(groceries.Cap).toBe(0);
			});

			it('should calculate a bonus of 6', () => calcCategoryBonus(defaultSpendatures[1].monthlyValue,
				defaultSpendatures[1].yearlyValue, groceries.Cap, groceries.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(6);
				}));
		});

		describe('Reward Category Air Travel', () => {
			let airTravel = everyday.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			it('should have a factor of 1', () => {
				expect(airTravel.Factor).toBe(1);
			});

			it('should have a cap of 0', () => {
				expect(airTravel.Cap).toBe(0);
			});

			it('should calculate a bonus of .5', () => calcCategoryBonus(defaultSpendatures[2].monthlyValue,
				defaultSpendatures[2].yearlyValue, airTravel.Cap, airTravel.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(.5);
				}));
		});

		describe('Reward Category Other Travel', () => {
			let otherTravel = everyday.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			it('should have a factor of 1', () => {
				expect(otherTravel.Factor).toBe(1);
			});

			it('should have a cap of 0', () => {
				expect(otherTravel.Cap).toBe(0);
			});

			it('should calculate a bonus of .5', () => calcCategoryBonus(defaultSpendatures[3].monthlyValue,
				defaultSpendatures[3].yearlyValue, otherTravel.Cap, otherTravel.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(.5);
				}));
		});

		describe('Reward Category Gas', () => {
			let gas = everyday.RewardCategories.filter(category => category.Name === 'Gas')[0];
			it('should have a factor of 1', () => {
				expect(gas.Factor).toBe(1);
			});

			it('should have a cap of 0', () => {
				expect(gas.Cap).toBe(0);
			});

			it('should calculate a bonus of .8', () => calcCategoryBonus(defaultSpendatures[4].monthlyValue,
				defaultSpendatures[4].yearlyValue, gas.Cap, gas.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(.8);
				}));
		});

		describe('Reward Category Amazon', () => {
			let amazon = everyday.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			it('should have a factor of 1', () => {
				expect(amazon.Factor).toBe(1);
			});

			it('should have a cap of 0', () => {
				expect(amazon.Cap).toBe(0);
			});

			it('should calculate a bonus of 2', () => calcCategoryBonus(defaultSpendatures[5].monthlyValue,
				defaultSpendatures[5].yearlyValue, amazon.Cap, amazon.Factor,
				everyday.PointValue, everyday.BaseFactor)
				.then((bonus) => {
					expect(bonus).toBe(2);
				}));
		});
	});

	it('should have a calculated base bonus of 8', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		expect(baseBonus).toBe(8);
	});

	it('should have a calculated monthly reward value of 19.80', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		expect(monthlyRewardValue).toBe(19.80);
	});

	it('should have a calculated yearly reward value of 237.6', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		expect(yearlyRewardValue).toBe(237.60);
	});

	it('should have an annual reward total of 285.12', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, everyday.BonusRewardMinTransaction,
			yearlyRewardValue, everyday.BonusReward, everyday.TravelBonus);
		
		expect(annualRewardTotal).toBe(285.12);
	});

	it('should have a reward year one of 385.12', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, everyday.BonusRewardMinTransaction,
			yearlyRewardValue, everyday.BonusReward, everyday.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, everyday.WelcomeBonus,
			everyday.AnnualFeeYearOne);
		expect(rewardYearOne).toBe(385.12);
	});

	it('should have a reward year two of 670.24', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, everyday.BonusRewardMinTransaction,
			yearlyRewardValue, everyday.BonusReward, everyday.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, everyday.WelcomeBonus,
			everyday.AnnualFeeYearOne);
		
		const rewardYearTwo = await calcRewardTwoYears(rewardYearOne, annualRewardTotal, everyday.AnnualFeeYearOnePlus);
		expect(rewardYearTwo).toBe(670.24);
	});

	it('should have a reward year five of 1525.60', async () => {
		const baseBonus = await calcBaseBonus(everyday.BaseFactor, everyday.PointValue, defaultSpendatures[6].monthlyValue);
		
		everyday.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, everyday.RewardCategories
			,everyday.PointValue, everyday.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(everyday.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, everyday.BonusRewardMinTransaction,
			yearlyRewardValue, everyday.BonusReward, everyday.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, everyday.WelcomeBonus,
			everyday.AnnualFeeYearOne);
		
		const rewardYearFive = await calcRewardFiveYears(rewardYearOne, annualRewardTotal, everyday.AnnualFeeYearOnePlus);
		
		expect(rewardYearFive).toBe(1525.6);
	});
});