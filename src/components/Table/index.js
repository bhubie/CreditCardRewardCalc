import { h, Component } from 'preact';
import style from './style.css';
import { TableColumnHeader } from './TableColumnHeader/index.js';
import { formatAsCurrency } from '../../Utils/Utils.js';

export default class Table extends Component {

	onHeaderClick(prevSortActive, nextSortActive) {
		let columnHeaders = this.state.columnHeaders;
		
		if (columnHeaders[nextSortActive].allowSorting && prevSortActive !== nextSortActive){
			columnHeaders[nextSortActive].sortDirection = this.setSortDirection(columnHeaders[nextSortActive].sortDirection);
			this.setState({
				columnHeaders,
				sortActiveIndex: nextSortActive
			});
		}
		else if (columnHeaders[nextSortActive].allowSorting && prevSortActive === nextSortActive){
			columnHeaders[nextSortActive].sortDirection = this.setSortDirection(columnHeaders[nextSortActive].sortDirection);
			
			this.setState({
				columnHeaders
			});
		}
	}

	setSortDirection(currentDirection) {
		if (currentDirection === 'Asc') {
			return 'Desc';
		}
		else if (currentDirection === 'Desc') {
			return 'Asc';
		}

		throw 'Unknown Sort Direction Passed In';
	}

	setSortActiveIndex(defaultHeader, headers) {
		let index = 0;
		let i;
		for (i = 0; i < headers.length; i++) {
			if (headers.name === defaultHeader) {
				index = i;
				break;
			}
		}
		return index;
	}

	constructor(props) {
		super(props);
		this.state = {
			sortActiveIndex: this.setSortActiveIndex(this.props.defaultSortColumn, this.props.columnHeaders),
			columnHeaders: this.props.columnHeaders
		};

		this.onHeaderClick = this.onHeaderClick.bind(this);
	}

	renderRows(data, sortedColumn) {
		let rows;
		if (sortedColumn.sortDirection === 'Asc') {
			rows = data.sort((a, b) => {
				if (a[sortedColumn.name] < b[sortedColumn.name]) {
					return -1;
				}
				if (a[sortedColumn.name] > b[sortedColumn.name]) {
					return 1;
				}
				return 0;
			});
		}
		else {
			rows = data.sort((a, b) => { 
				if (a[sortedColumn.name] > b[sortedColumn.name]) {
					return -1;
				}
				if (a[sortedColumn.name] < b[sortedColumn.name]) {
					return 1;
				}
				return 0;
			});
		}

		console.log('Sorting rows!!');
		console.log(rows);
		const headers = this.state.columnHeaders;

		return rows.map((item, index) => (<tr key={index}>
			{headers.map((header) =>
				(<td class={header.isNumber ? style.tableColumnNumber : style.tableColumnString}>
					{formatAsCurrency(item[header.name])}
				</td>))}
		</tr>));
	}

	render() {
		
		let tableColumnHeaders = this.state.columnHeaders.map((header, index) => (
			<TableColumnHeader allowSorting={header.allowSorting}
				sortDirection={header.sortDirection}
				onHeaderClick={this.onHeaderClick}
				sortActiveIndex={this.state.sortActiveIndex} index={index}
			>
				{header.friendlyName}
			</TableColumnHeader>
		));
		
		
		let rows = this.renderRows(this.props.tableData, this.state.columnHeaders[this.state.sortActiveIndex]);
		
		return (
			<table class={`${style.table} ${style.tableBordered}`} id="creditCardTable">
				<thead>
					{tableColumnHeaders}
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}