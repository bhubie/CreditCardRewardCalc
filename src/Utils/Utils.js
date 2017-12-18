const formatAsDollar = (number) => {
	if (isNaN(number)) {
		return number;
	}
    
	return '$' + Number(number).toFixed(2);

};

export { formatAsDollar };