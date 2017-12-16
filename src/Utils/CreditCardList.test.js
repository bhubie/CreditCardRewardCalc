import creditCardList from './CreditCards.json';
import expect from 'expect';
import SpendatureCategory from './SpendatureCategory';
import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';
import { testCreditCard } from './TestHelpers.test.js';

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

	const expectedValues = {
		Institution: 'Amex',
		Name: 'Everyday',
		RewardType: 'Points',
		BaseFactor: 1,
		PointValue: 0.01,
		BonusReward: 0.20,
		BonusRewardMinTransaction: 20,
		WelcomeBonus: 100,
		TravelBonus: 0,
		AnnualFeeYearOne: 0,
		AnnualFeeYearOnePlus: 0,
		BaseBonus: 8,
		MonthlyRewardValue: 19.80,
		YearlyRewardValue: 237.60,
		AnnualRewardTotal: 285.12,
		RewardYearOne: 385.12,
		RewardYearTwo: 670.24,
		RewardYearFive: 1525.6,
		RewardCategories: [{
			Name: 'Restaurants',
			Factor: 1,
			Cap: 0,
			Bonus: 2
		}, {
			Name: 'Groceries',
			Factor: 2,
			Cap: 0,
			Bonus: 6
		}, {
			Name: 'Air Travel',
			Factor: 1,
			Cap: 0,
			Bonus: .5
		}, {
			Name: 'Other Travel',
			Factor: 1,
			Cap: 0,
			Bonus: .5
		}, {
			Name: 'Gas',
			Factor: 1,
			Cap: 0,
			Bonus: .8
		}, {
			Name: 'Amazon',
			Factor: 1,
			Cap: 0,
			Bonus: 2
		}]
	};

	testCreditCard(everyday, expectedValues);

});