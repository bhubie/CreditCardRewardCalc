import creditCardList from './CreditCards.json';
import expect from 'expect';
import { testCreditCard } from './TestHelpers.js';
import ExpenditureCategory from './ExpenditureCategory';

const defaultExpenditures = [new ExpenditureCategory('Restaurants', 200),
	new ExpenditureCategory('Groceries', 300),
	new ExpenditureCategory('Air Travel', 50),
	new ExpenditureCategory('Other Travel', 50),
	new ExpenditureCategory('Gas', 80),
	new ExpenditureCategory('Amazon', 200),
	new ExpenditureCategory('Misc', 800)];
const defaultMonthlyTransactions = 50;

let validateCreditCardExpenditureCategory = (rewardCategory) => {

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
					validateCreditCardExpenditureCategory(rewardCategory);
				});
				
			});
		});
	});
});

describe('American Express', () => {
	describe('Everyday Card', () => {
		const everyday = creditCardList.creditCards[0];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Amex EveryDay®',
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
	
		testCreditCard(everyday, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Everyday Preferred Card', () => {
		const everydayPreferred = creditCardList.creditCards[1];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Amex EveryDay® Preferred',
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
	
		testCreditCard(everydayPreferred, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Blue Delta SkyMiles', () => {
		const blueDeltaSkyMiles = creditCardList.creditCards[2];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Blue Delta SkyMiles®',
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
	
		testCreditCard(blueDeltaSkyMiles, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Gold Delta SkyMiles', () => {
		const goldDeltaSkyMiles = creditCardList.creditCards[3];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Gold Delta SkyMiles®',
			RewardType: 'Airfare',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 600,
			TravelBonus: 0,
			AnnualFeeYearOne: 0,
			AnnualFeeYearOnePlus: 95,
			BaseBonus: 8,
			MonthlyRewardValue: 17.30,
			YearlyRewardValue: 207.60,
			AnnualRewardTotal: 207.60,
			RewardYearOne: 807.60,
			RewardYearTwo: 920.20,
			RewardYearFive: 1258.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
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
	
		testCreditCard(goldDeltaSkyMiles, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Platinum Delta SkyMiles', () => {
		const platinumDeltaSkyMiles = creditCardList.creditCards[4];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Platinum Delta SkyMiles®',
			RewardType: 'Airfare',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 700,
			TravelBonus: 0,
			AnnualFeeYearOne: 195,
			AnnualFeeYearOnePlus: 195,
			BaseBonus: 8,
			MonthlyRewardValue: 17.30,
			YearlyRewardValue: 207.60,
			AnnualRewardTotal: 207.60,
			RewardYearOne: 712.60,
			RewardYearTwo: 725.20,
			RewardYearFive: 763.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
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
	
		testCreditCard(platinumDeltaSkyMiles, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Delta Reserve', () => {
		const reserveDeltaSkyMiles = creditCardList.creditCards[5];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Delta Reserve®',
			RewardType: 'Airfare',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 400,
			TravelBonus: 0,
			AnnualFeeYearOne: 450,
			AnnualFeeYearOnePlus: 450,
			BaseBonus: 8,
			MonthlyRewardValue: 17.30,
			YearlyRewardValue: 207.60,
			AnnualRewardTotal: 207.60,
			RewardYearOne: 157.60,
			RewardYearTwo: -84.80,
			RewardYearFive: -812.0,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
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
	
		testCreditCard(reserveDeltaSkyMiles, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Premier Rewards Gold', () => {
		const premierRewardsGold = creditCardList.creditCards[6];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Premier Rewards Gold',
			RewardType: 'Points',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 500,
			TravelBonus: 100,
			AnnualFeeYearOne: 0,
			AnnualFeeYearOnePlus: 195,
			BaseBonus: 8,
			MonthlyRewardValue: 23.60,
			YearlyRewardValue: 283.20,
			AnnualRewardTotal: 383.20,
			RewardYearOne: 883.20,
			RewardYearTwo: 1071.40,
			RewardYearFive: 1636.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 2,
				Cap: 0,
				Bonus: 4
			}, {
				Name: 'Groceries',
				Factor: 2,
				Cap: 0,
				Bonus: 6
			}, {
				Name: 'Air Travel',
				Factor: 3,
				Cap: 0,
				Bonus: 1.50
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
	
		testCreditCard(premierRewardsGold, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Platinum Card', () => {
		const platinumCard = creditCardList.creditCards[7];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Platinum Card®',
			RewardType: 'Points',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 600,
			TravelBonus: 200,
			AnnualFeeYearOne: 550,
			AnnualFeeYearOnePlus: 550,
			BaseBonus: 8,
			MonthlyRewardValue: 20.80,
			YearlyRewardValue: 249.60,
			AnnualRewardTotal: 449.60,
			RewardYearOne: 499.60,
			RewardYearTwo: 399.20,
			RewardYearFive: 98.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
			}, {
				Name: 'Groceries',
				Factor: 1,
				Cap: 0,
				Bonus: 3
			}, {
				Name: 'Air Travel',
				Factor: 5,
				Cap: 0,
				Bonus: 2.50
			}, {
				Name: 'Other Travel',
				Factor: 5,
				Cap: 0,
				Bonus: 2.50
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
	
		testCreditCard(platinumCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Green Card', () => {
		const greenCard = creditCardList.creditCards[8];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Green Card',
			RewardType: 'Points',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 250,
			TravelBonus: 0,
			AnnualFeeYearOne: 0,
			AnnualFeeYearOnePlus: 95,
			BaseBonus: 8,
			MonthlyRewardValue: 17.80,
			YearlyRewardValue: 213.60,
			AnnualRewardTotal: 213.60,
			RewardYearOne: 463.60,
			RewardYearTwo: 582.20,
			RewardYearFive: 938.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
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
				Factor: 2,
				Cap: 0,
				Bonus: 1
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
	
		testCreditCard(greenCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Blue Cash Preferred', () => {
		const blueCashPreferredCard = creditCardList.creditCards[9];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Blue Cash Preferred®',
			RewardType: 'Cash',
			BaseFactor: 1,
			PointValue: 0.01,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 250,
			TravelBonus: 0,
			AnnualFeeYearOne: 95,
			AnnualFeeYearOnePlus: 95,
			BaseBonus: 8,
			MonthlyRewardValue: 33.40,
			YearlyRewardValue: 400.80,
			AnnualRewardTotal: 400.80,
			RewardYearOne: 555.80,
			RewardYearTwo: 861.60,
			RewardYearFive: 1779.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 2
			}, {
				Name: 'Groceries',
				Factor: 6,
				Cap: 6000,
				Bonus: 18
			}, {
				Name: 'Air Travel',
				Factor: 1,
				Cap: 0,
				Bonus: .50
			}, {
				Name: 'Other Travel',
				Factor: 1,
				Cap: 0,
				Bonus: .50
			}, {
				Name: 'Gas',
				Factor: 3,
				Cap: 0,
				Bonus: 2.40
			}, {
				Name: 'Amazon',
				Factor: 1,
				Cap: 0,
				Bonus: 2
			}]
		};
	
		testCreditCard(blueCashPreferredCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Starwood Preferred Guest', () => {
		const starwoodPreferredGuestCard = creditCardList.creditCards[10];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Starwood Preferred Guest®',
			RewardType: 'Hotel',
			BaseFactor: 1,
			PointValue: 0.018,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 300,
			TravelBonus: 0,
			AnnualFeeYearOne: 0,
			AnnualFeeYearOnePlus: 95,
			BaseBonus: 14.40,
			MonthlyRewardValue: 33.84,
			YearlyRewardValue: 406.08,
			AnnualRewardTotal: 406.08,
			RewardYearOne: 706.08,
			RewardYearTwo: 1017.16,
			RewardYearFive: 1950.40,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 1,
				Cap: 0,
				Bonus: 3.60
			}, {
				Name: 'Groceries',
				Factor: 1,
				Cap: 0,
				Bonus: 5.40
			}, {
				Name: 'Air Travel',
				Factor: 1,
				Cap: 0,
				Bonus: .90
			}, {
				Name: 'Other Travel',
				Factor: 5,
				Cap: 0,
				Bonus: 4.50
			}, {
				Name: 'Gas',
				Factor: 1,
				Cap: 0,
				Bonus: 1.44
			}, {
				Name: 'Amazon',
				Factor: 1,
				Cap: 0,
				Bonus: 3.60
			}]
		};
	
		testCreditCard(starwoodPreferredGuestCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Hilton Honors', () => {
		const hiltonHonorsCard = creditCardList.creditCards[11];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Hilton Honors',
			RewardType: 'Hotel',
			BaseFactor: 1,
			PointValue: 0.006,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 500,
			TravelBonus: 0,
			AnnualFeeYearOne: 0,
			AnnualFeeYearOnePlus: 0,
			BaseBonus: 4.80,
			MonthlyRewardValue: 25.80,
			YearlyRewardValue: 309.60,
			AnnualRewardTotal: 309.60,
			RewardYearOne: 809.60,
			RewardYearTwo: 1119.20,
			RewardYearFive: 2048.00,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 5,
				Cap: 0,
				Bonus: 6
			}, {
				Name: 'Groceries',
				Factor: 5,
				Cap: 0,
				Bonus: 9
			}, {
				Name: 'Air Travel',
				Factor: 1,
				Cap: 0,
				Bonus: .30
			}, {
				Name: 'Other Travel',
				Factor: 7,
				Cap: 0,
				Bonus: 2.10
			}, {
				Name: 'Gas',
				Factor: 5,
				Cap: 0,
				Bonus: 2.40
			}, {
				Name: 'Amazon',
				Factor: 1,
				Cap: 0,
				Bonus: 1.20
			}]
		};
	
		testCreditCard(hiltonHonorsCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
	
	describe('Hilton Honors Surpass', () => {
		const hiltonHonorsSurpassCard = creditCardList.creditCards[12];
		const expectedValues = {
			Institution: 'American Express',
			Name: 'Hilton Honors Surpass',
			RewardType: 'Hotel',
			BaseFactor: 1,
			PointValue: 0.006,
			BonusReward: 0,
			BonusRewardMinTransaction: 0,
			WelcomeBonus: 450,
			TravelBonus: 0,
			AnnualFeeYearOne: 75,
			AnnualFeeYearOnePlus: 75,
			BaseBonus: 4.80,
			MonthlyRewardValue: 30.78,
			YearlyRewardValue: 369.36,
			AnnualRewardTotal: 369.36,
			RewardYearOne: 744.36,
			RewardYearTwo: 1038.72,
			RewardYearFive: 1921.80,
			RewardCategories: [{
				Name: 'Restaurants',
				Factor: 6,
				Cap: 0,
				Bonus: 7.20
			}, {
				Name: 'Groceries',
				Factor: 6,
				Cap: 0,
				Bonus: 10.80
			}, {
				Name: 'Air Travel',
				Factor: 1,
				Cap: 0,
				Bonus: .30
			}, {
				Name: 'Other Travel',
				Factor: 12,
				Cap: 0,
				Bonus: 3.60
			}, {
				Name: 'Gas',
				Factor: 6,
				Cap: 0,
				Bonus: 2.88
			}, {
				Name: 'Amazon',
				Factor: 1,
				Cap: 0,
				Bonus: 1.20
			}]
		};
	
		testCreditCard(hiltonHonorsSurpassCard, expectedValues, defaultExpenditures, defaultMonthlyTransactions);
	});
});