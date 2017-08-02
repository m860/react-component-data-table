/**
 * Created by jean.h.ma on 5/9/17.
 */
import React,{PureComponent} from "react";
import PropTypes from "prop-types";

export default class DataTable extends PureComponent {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			className: PropTypes.any,
			style: PropTypes.object,
			render: PropTypes.func.isRequired
		})).isRequired,
		dataSource: PropTypes.array,
		style: PropTypes.object,
		className: PropTypes.any,
		renderDataEmpty: PropTypes.func
	};
	static defaultProps = {
		dataSource: [],
		className: 'pure-table pure-table-striped',
		style: {
			width:"100%"
		},
		renderDataEmpty: (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>)
	};

	_renderDataSource() {
		if (this.props.dataSource.length > 0) {
			return this.props.dataSource.map((rowData, rowDataIndex)=> {
				return (
					<tr key={rowDataIndex}>
						{this.props.columns.map((column, columnIndex)=> {
							return (
								<td key={columnIndex}
									className={column.className}
									style={column.style}>{column.render(rowData, rowDataIndex,column, columnIndex)}</td>
							);
						})}
					</tr>
				);
			});
		}
		return this.props.renderDataEmpty(this.props.columns);
	}

	render() {
		return (
			<table className={this.props.className} style={this.props.style}>
				<thead>
				<tr>
					{this.props.columns.map((column, index)=> {
						return (
							<th key={index}>{column.name}</th>
						);
					})}
				</tr>
				</thead>
				<tbody>
				{this._renderDataSource()}
				</tbody>
			</table>
		);
	}
}