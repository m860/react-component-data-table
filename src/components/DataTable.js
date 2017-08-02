/**
 * Created by jean.h.ma on 5/9/17.
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

/**
 * 数据Table
 */
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
			width: "100%"
		},
		renderDataEmpty: (definedColumn)=>(<tr>
			<td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td>
		</tr>)
	};

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
				{this.props.dataSource.length > 0 && this.props.dataSource.map((rowData, rowDataIndex)=> {
					return (
						<tr key={rowDataIndex}>
							{this.props.columns.map((column, columnIndex)=> {
								return (
									<td key={columnIndex}
										className={column.className}
										style={column.style}>{column.render(rowData, rowDataIndex, column, columnIndex)}</td>
								);
							})}
						</tr>
					);
				})}
				{this.props.dataSource.length <= 0 && this.props.renderDataEmpty(this.props.columns)}
				</tbody>
			</table>
		);
	}
}