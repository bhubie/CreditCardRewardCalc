import { h } from 'preact';
import { IconArrowDown } from '../../Icons/IconArrowDown.js';
import style from './style';
const TableColumnHeader = ({ allowSorting, sortDirection, onHeaderClick, children, index, sortActiveIndex }) => {

	const handleClick = () => {
		onHeaderClick(sortActiveIndex, index);
	};

	let icon;
	if (allowSorting && sortActiveIndex === index){
		const arrowClass = (sortDirection === 'Asc') ? style.Asc : style.Desc;
		icon = <IconArrowDown id={arrowClass} className={style.SortArrow} />;
	}
	else {
		const arrowClass = style.Hidden;
		icon = <IconArrowDown id={arrowClass} className={arrowClass} />;
	}
	return ( <th  onClick={handleClick} className={style.TableHeader}>
		{children}
		{icon}
	</th>
	);
};
	
export { TableColumnHeader };