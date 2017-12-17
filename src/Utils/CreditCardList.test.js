import creditCardList from './CreditCards.json';
import expect from 'expect';
import { testCreditCard } from './TestHelpers.test.js';

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

describe('Amex Everyday Card', () => {
	const everyday = creditCardList.creditCards[0];
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

describe('Amex Everyday Preferred Card', () => {
	const everydayPreferred = creditCardList.creditCards[1];
	const expectedValues = {
		Institution: 'Amex',
		Name: 'Everyday Preferred',
		RewardType: 'Points',
		BaseFactor: 1,
		PointValue: 0.01,
		BonusReward: 0.50,
		BonusRewardMinTransaction: 30,
		WelcomeBonus: 150,
		TravelBonus: 0,
		AnnualFeeYearOne: 95,
		AnnualFeeYearOnePlus: 95,
		BaseBonus: 8,
		MonthlyRewardValue: 23.60,
		YearlyRewardValue: 283.20,
		AnnualRewardTotal: 424.80,
		RewardYearOne: 479.80,
		RewardYearTwo: 809.60,
		RewardYearFive: 1799.00,
		RewardCategories: [{
			Name: 'Restaurants',
			Factor: 1,
			Cap: 0,
			Bonus: 2
		}, {
			Name: 'Groceries',
			Factor: 3,
			Cap: 6000,
			Bonus: 9
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
			Factor: 2,
			Cap: 0,
			Bonus: 1.60
		}, {
			Name: 'Amazon',
			Factor: 1,
			Cap: 0,
			Bonus: 2
		}]
	};

	testCreditCard(everydayPreferred, expectedValues);
});

describe('Amex Blue Delta SkyMiles', () => {
	const blueDeltaSkyMiles = creditCardList.creditCards[2];
	const expectedValues = {
		Institution: 'Amex',
		Name: 'Blue Delta SkyMiles',
		RewardType: 'Airfare',
		BaseFactor: 1,
		PointValue: 0.01,
		BonusReward: 0,
		BonusRewardMinTransaction: 0,
		WelcomeBonus: 100,
		TravelBonus: 0,
		AnnualFeeYearOne: 0,
		AnnualFeeYearOnePlus: 0,
		BaseBonus: 8,
		MonthlyRewardValue: 19.30,
		YearlyRewardValue: 231.60,
		AnnualRewardTotal: 231.60,
		RewardYearOne: 331.60,
		RewardYearTwo: 563.20,
		RewardYearFive: 1258.00,
		RewardCategories: [{
			Name: 'Restaurants',
			Factor: 2,
			Cap: 0,
			Bonus: 4
		}, {
			Name: 'Groceries',
			Factor: 1,
			Cap: 0,
			Bonus: 3
		}, {
			Name: 'Air Travel',
			Factor: 2,
			Cap: 0,
			Bonus: 1
		}, {
			Name: 'Other Travel',
			Factor: 1,
			Cap: 0,
			Bonus: .5
		}, {
			Name: 'Gas',
			Factor: 1,
			Cap: 0,
			Bonus: .80
		}, {
			Name: 'Amazon',
			Factor: 1,
			Cap: 0,
			Bonus: 2
		}]
	};

	testCreditCard(blueDeltaSkyMiles, expectedValues);
});