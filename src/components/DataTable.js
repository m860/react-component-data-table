import React, {PureComponent} from "react";
import PropTypes from "prop-types";

/**
 * DataTable - 数据表
 *
 * @example <caption>Simple</caption>
 *
 * class SimpleDataTableDemo extends React.PureComponent{
 *	render(){
 *		const dataSource=[
 *			{name:"name1",sex:"male"},
 *			{name:"name2",sex:"female"}
 *		];
 *		const columns=[
 *			{name:"Name",render:rowData=>rowData['name']},
 *			{name:"Sex",render:rowData=>rowData['sex']},
 *		];
 *		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
 *	}
 * }
 *
 * @example <caption>Empty</caption>
 *
 * class EmptyDataTableDemo extends React.PureComponent{
 *	render(){
 *		const dataSource=[];
 *		const columns=[
 *			{name:"Name",render:rowData=>rowData['name']},
 *			{name:"Sex",render:rowData=>rowData['sex']},
 *		];
 *		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
 *	}
 * }
 *
 * @example <caption>Radio DataTable</caption>
 *
 * class RadioDataTableDemo extends React.PureComponent{
 *	render(){
 *		const dataSource=[
 *			{name:"name1",sex:"male"},
 *			{name:"name2",sex:"female"}
 *		];
 *		const columns=[
 *			{name:"",render:rowData=>{
 *				return <input type="radio" value={rowData['name']} name="radio-data-table"/>
 *			}},
 *			{name:"Name",render:rowData=>rowData['name']},
 *			{name:"Sex",render:rowData=>rowData['sex']},
 *		];
 *		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
 *	}
 * }
 *
 * @example <caption>Checkbox DataTable</caption>
 *
 * class CheckboxDataTableDemo extends React.PureComponent{
 *	render(){
 *		const dataSource=[
 *			{name:"name1",sex:"male"},
 *			{name:"name2",sex:"female"}
 *		];
 *		const columns=[
 *			{name:"",render:rowData=>{
 *				return <input type="checkbox" value={rowData['name']}/>
 *			}},
 *			{name:"Name",render:rowData=>rowData['name']},
 *			{name:"Sex",render:rowData=>rowData['sex']},
 *		];
 *		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
 *	}
 * }
 *
 */
export default class DataTable extends PureComponent {
	/**
	 * @property {Array<Object>} columns
	 * @property {String} columns[].name
	 * @property {?String} columns[].className
	 * @property {?Object} columns[].style
	 * @property {Function} columns[].render
	 *
	 * @property {?Array} dataSource [ [] ]
	 *
	 * @property {?Object} style
	 *
	 * @property {?String} className [ data-table ] - data-table是DataTable的默认className,样式定义在/css/DataTable.css.如果要使用默认样式需要引用默认的样式文件`import 'css/DataTable.css'`
	 *
	 * @property {?Function} renderDataEmpty [ (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>) ]
	 *
	 * */
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
		className: 'data-table',
		style: {
			width: "100%"
		},
		renderDataEmpty: (definedColumn)=>(<tr>
			<td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td>
		</tr>)
	};

	/**
	 * @private
	 *
	 * render data source
	 * */
	_renderDataSource() {
		if (this.props.dataSource.length > 0) {
			return this.props.dataSource.map((rowData, rowDataIndex)=> {
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