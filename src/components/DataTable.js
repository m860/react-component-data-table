import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Sort from './Sort'

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
 * @example <caption>Sort DataTable</caption>
 *
 *  class SortDataTable extends React.PureComponent {
 *  	...
 *  	onSortChange(sort) {
 *			if (sort) {
 *				let ds = [...this.state.dataSource];
 *				ds.sort((a, b)=> {
 *					if (sort.type === 'asc') {
 *						if (a[sort.field] < b[sort.field]) {
 *							return 1;
 *						}
 *						return 0;
 *					}
 *					else if (sort.type === 'desc') {
 *						if (a[sort.field] > b[sort.field]) {
 *							return 1;
 *						}
 *						return 0;
 *					}
 *					else {
 *						//nothing
 *					}
 *				});
 *				this.setState(
 *					Object.assign({}, this.state, {
 *						dataSource: ds
 *					})
 *				)
 *			}
 *		}
 *		render() {
 *			return (
 *				<div
 *					style={{height:300}}>
 *					<DataTable
 *						dataSource={this.state.dataSource}
 *						renderDataEmpty={()=>''}
 *						onSortChange={this.onSortChange.bind(this)}
 *						columns={[{
 *							name:"Name",
 *							render:rowData=>rowData['name']
 *						 },{
 *							name:"Age",
 *							render:rowData=>rowData['age'],
 *							sort:{
 *								field:'age',
 *							}
 *						 }]}></DataTable>
 *				</div>
 *			);
 *		}
 *  	...
 *  }
 *
 */
export default class DataTable extends PureComponent {
	/**
	 * @property {Array<Object>} columns
	 * @property {String} columns[].name
	 * @property {?String} columns[].className
	 * @property {?Object} columns[].style
	 * @property {Function} columns[].render
	 * @property {?Object} columns[].sort
	 * @property {String} columns[].sort.field
	 * @property {?String} columns[].sort.defaultType - value is one of the none,asc,desc
	 * @property {?Array} dataSource [ [] ]
	 * @property {?Object} style
	 * @property {?String} className [ data-table ] - data-table是DataTable的默认className,样式定义在/css/DataTable.css.如果要使用默认样式需要引用默认的样式文件`import 'css/DataTable.css'`
	 * @property {?Function} renderDataEmpty [ (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>) ]
	 * @property {?Boolean} fixedHead [false] - 是否固定head
	 * @property {?Function} onSortChange [()=>null] - 当sort变化时调用
	 * */
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			className: PropTypes.any,
			style: PropTypes.object,
			render: PropTypes.func.isRequired,
			sort: PropTypes.shape({
				field: PropTypes.string.isRequired,
				defaultType: PropTypes.oneOf(['asc', 'desc', 'none'])
			})
		})).isRequired,
		dataSource: PropTypes.array,
		style: PropTypes.object,
		className: PropTypes.any,
		renderDataEmpty: PropTypes.func,
		fixedHead: PropTypes.bool,
		onSortChange: PropTypes.func
	};
	static defaultProps = {
		dataSource: [],
		fixedHead: false,
		renderDataEmpty: (definedColumn) => (<tr>
			<td colSpan={definedColumn.length} style={{textAlign: "center"}}>NO DATA</td>
		</tr>),
		onSortChange: () => null
	};

	constructor(props) {
		super(props);
		this.state = {
			bodyHeight: 0,
			activeSort: null
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
			return this.props.dataSource.map((rowData, rowDataIndex) => {
				return (
					<tr key={rowDataIndex}>
						{this.props.columns.map((column, columnIndex) => {
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
				className={this.props.className}
				style={this.props.style}>
				<thead ref="thead">
				<tr>
					{this.props.columns.map((column, index) => {
						return (
							<th key={index}>
								<div>
									<div>{column.name}</div>
									<div>{column.sort && <Sort {...column.sort} onChange={type => {
										this.setState(
											Object.assign({}, this.state, {
												activeSort: {
													...column.sort,
													type
												}
											}), () => {
												this.props.onSortChange(this.state.activeSort);
											}
										)
									}}/>}</div>
								</div>
							</th>
						);
					})}
				</tr>
				</thead>
				<tbody style={this.props.fixedHead ? {height: this.state.bodyHeight} : {}}>
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