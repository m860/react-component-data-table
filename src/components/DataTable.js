import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classnames from 'classnames'

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
	 * @property {?Array} dataSource [ [] ]
	 * @property {?Object} style
	 * @property {?String} className [ data-table ] - data-table是DataTable的默认className,样式定义在/css/DataTable.css.如果要使用默认样式需要引用默认的样式文件`import 'css/DataTable.css'`
	 * @property {?Function} renderDataEmpty [ (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>) ]
	 * @property {?Boolean} fixedHead [false] - 是否固定head
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
		renderDataEmpty: PropTypes.func,
		fixedHead: PropTypes.bool
	};
	static defaultProps = {
		dataSource: [],
		fixedHead: false,
		renderDataEmpty: (definedColumn)=>(<tr>
			<td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td>
		</tr>)
	};

	constructor(props) {
		super(props);
		this.state = {
			bodyHeight: 0
		};
	}

	get parentStyle() {
		const table = this.refs['table'];
		if (table) {
			const parent = table.parentNode;
			if (parent) {
				return window.getComputedStyle(parent);
			}
		}
		return null;
	}

	get parentHeight() {
		if (this.parentStyle) {
			const height = parseFloat(this.parentStyle.height);
			if (!isNaN(height)) {
				return height;
			}
		}
		return 0;
	}

	get tableHeadHeight() {
		const thead = this.refs['thead'];
		if (thead) {
			const style = window.getComputedStyle(thead);
			const height = parseFloat(style.height);
			if (!isNaN(height)) {
				return height;
			}
		}
		return 0;
	}

	updateBodyHeight() {
		if (this.props.fixedHead) {
			const diff = this.parentHeight - this.tableHeadHeight;
			if (diff !== this.state.bodyHeight) {
				this.setState(
					Object.assign({}, this.state, {
						bodyHeight: diff
					})
				)
			}
		}
	}

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
			<table
				ref="table"
				className={classnames('data-table',this.props.fixedHead&&"data-table-fixed-head",this.props.className)}
				style={this.props.style}>
				<thead ref="thead">
				<tr>
					{this.props.columns.map((column, index)=> {
						return (
							<th key={index}>{column.name}</th>
						);
					})}
				</tr>
				</thead>
				<tbody style={this.props.fixedHead?{height:this.state.bodyHeight}:{}}>
				{this._renderDataSource()}
				</tbody>
			</table>
		);
	}

	componentDidMount() {
		this.updateBodyHeight();
	}

	componentDidUpdate() {
		this.updateBodyHeight();
	}
}