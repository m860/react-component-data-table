import React,{PureComponent} from "react";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

/**
 * 带分页的DataTable,由DataTable和Pagination组合的复合组件
 * */
export default class DataTableWithPagination extends PureComponent {
	/**
	 * {@link DataTable.propTypes ...DataTable.propTypes}
	 * {@link Pagination.propTypes ...Pagination.propTypes}
	 * @property {?Object} style
	 * @property {?String} className
	 * @property {?Object} dataTableStyle - DataTable样式
	 * @property {?String} dataTableClassName - DataTable css class
	 * @property {?Object} paginationStyle - Pagination 样式
	 * @property {?String} paginationClassName - Pagination css class
	 * @property {?Boolean} showIndex [ true ] - 是否显示索引列
	 * */
	static propTypes = {
		...DataTable.propTypes,
		...Pagination.propTypes,
		style: PropTypes.object,
		className: PropTypes.any,
		dataTableStyle: DataTable.propTypes.style,
		dataTableClassName: DataTable.propTypes.className,
		paginationStyle: Pagination.propTypes.style,
		paginationClassName: Pagination.propTypes.className,
		showIndex: PropTypes.bool
	};
	static defaultProps = {
		showIndex: true
	};

	/**
	 * 获取DataTable全局数据索引
	 * @param {Number} localRowIndex - 当前分页中的数据索引
	 * @return {Number} - 全局数据索引
	 * */
	getGlobalRowIndex(localRowIndex:Number):Number{
		const pagination=this.refs['pagination'];
		if(pagination) {
			const index = this.refs['pagination'].pageIndex * this.refs['pagination'].pageSize;
			if (this.refs['pagination'].startPageNumber === 0) {
				return index + localRowIndex + 1;
			}
			return index + localRowIndex;
		}
		return localRowIndex+1;
	}

	/**
	 * 刷新当前页数据
	 * @return {void}
	 * */
	refresh():void{
		this.refs['pagination'].refresh();
	}

	render() {
		const dataTablePropKeys = Object.keys(DataTable.propTypes).concat(["dataTableStyle", "dataTableClassName"]);
		const paginationPropKeys = Object.keys(Pagination.propTypes).concat(["paginationStyle", "paginationClassName"]);
		let dataTableOption = {};
		dataTablePropKeys.filter(f=>f !== "style" || f !== "className").forEach(k=> {
			if(k==="dataTableStyle"){
				dataTableOption['style']=this.props[k];
			}
			else if(k==="dataTableClassName"){
				dataTableOption['className']=this.props[k];
			}
			else {
				dataTableOption[k] = this.props[k];
			}
		});
		let paginationOption = {};
		paginationPropKeys.filter(f=>f !== "style" || f !== "className").map(k=> {
			if(k==="paginationStyle"){
				paginationOption['style'] = this.props[k];
			}
			else if(k==="paginationClassName"){
				paginationOption['className'] = this.props[k];
			}
			else {
				paginationOption[k] = this.props[k];
			}
		});
		if (this.props.showIndex) {
			dataTableOption.columns = [{
				name: "#",
				style:{width:"20px"},
				render: (rowData, rowIndex)=> {
					return this.getGlobalRowIndex(rowIndex);
				}
			}, ...dataTableOption.columns];
		}
		return (
			<div style={this.props.style} className={this.props.className}>
				<DataTable {...dataTableOption}/>
				<Pagination {...paginationOption} ref="pagination"/>
			</div>
		);
	}
}