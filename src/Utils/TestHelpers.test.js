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

export { MockCreditCard };