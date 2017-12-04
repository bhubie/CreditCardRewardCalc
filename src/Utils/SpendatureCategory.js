class SpendatureCategory {
	constructor (category, monthlyValue) {
		this.category = category;
		this.monthlyValue = monthlyValue;
		this.yearlyValue = monthlyValue * 12;
	}

	updateYearlyValue(monthlyValue) {
		this.yearlyValue = monthlyValue * 12;
	}
	
	
}

export default SpendatureCategory;