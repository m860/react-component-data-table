import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * Pagination - 页码
 *
 * @example <caption>从0开始分页</caption>
 *
 * <Pagination
 *    onPageChange={(pageInfo)=>{
 *						console.log('page change',pageInfo)
 *					}}
 *      total={23}/>
 *
 * @example <caption>从1开始分页</caption>
 * <Pagination
 *    startPageNumber={1}
 *    pageIndex={1}
 *    onPageChange={(pageInfo)=>{
 *		console.log('page change',pageInfo)
 *	}}
 *    total={100}/>
 *
 * */
export default class Pagination extends PureComponent {
	/**
	 * @property {?Number} startPageNumber [ 0 ] - 分页开始的起始页`0`或者`1`
	 * @property {?Number} pageIndex [ 0 ] - 当前页
	 * @property {?Number} pageSize [ 10 ] - 每页记录数
	 * @property {?Function} onPageChange [ ()=>null ] - 分页事件监听
	 * @property {Number} total - 总记录数
	 * @property {?Object} style - 样式
	 * @property {String} className [ pagination ] - css class样式,样式定义在`css/Pagination.css`
	 * @property {?Number} displayPageCount [ 5 ] - 最多可以显示多少页面
	 * @property {?Function} renderNextPage [ ()=>(">") ] - `>`按钮样式
	 * @property {?Function} renderPrevPage [ ()=>("<") ] - `<`按钮样式
	 * */
	static propTypes = {
		startPageNumber: PropTypes.number,
		pageIndex: PropTypes.number,
		pageSize: PropTypes.number,
		onPageChange: PropTypes.func,
		total: PropTypes.number.isRequired,
		style: PropTypes.object,
		className: PropTypes.any,
		displayPageCount: PropTypes.number,
		renderNextPage:PropTypes.func,
		renderPrevPage:PropTypes.func,
	};
	static defaultProps = {
		startPageNumber: 0,
		pageIndex: 0,
		pageSize: 10,
		onPageChange:()=>null,
		className: "pagination",
		displayPageCount: 5,
		renderNextPage:()=>(">"),
		renderPrevPage:()=>("<")
	};

	constructor(props) {
		super(props);
		this.state = {
			pageIndex: props.pageIndex,
			pageSize: props.pageSize,
			startPageNumber: props.startPageNumber
		};
	}

	/**
	 * 总页数
	 * @readonly
	 * */
	get totalPage() {
		if (this.props.total <= 0) {
			return 0;
		}
		return Math.ceil(this.props.total / this.props.pageSize);
	}

	/**
	 * 当前页码
	 * @readonly
	 * */
	get pageIndex() {
		return this.state.pageIndex;
	}

	/**
	 * 每页记录数
	 * @readonly
	 * */
	get pageSize() {
		return this.state.pageSize;
	}

	/**
	 * 起始分页页码
	 * @readonly
	 * */
	get startPageNumber() {
		return this.state.startPageNumber;
	}

	render() {
		const pages = Array.apply(null, {length: this.totalPage}).map(Number.call, value=> {
			return value + this.state.startPageNumber;
		});
		const lastPageIndex = pages[pages.length - 1];
		const disabledPrevButton = this.state.pageIndex === this.state.startPageNumber;
		const disabledNextButton = this.state.pageIndex === lastPageIndex;

		const dis = Math.floor(this.props.displayPageCount / 2);
		let begin = this.state.pageIndex - dis;
		let end = this.state.pageIndex + dis;
		if (begin < this.state.startPageNumber) {
			begin = this.state.startPageNumber;
		}
		if (end > lastPageIndex) {
			end = lastPageIndex;
		}
		let realDis = end - begin + 1;
		if (realDis !== this.props.displayPageCount) {
			if (begin === this.state.startPageNumber) {
				//append page
				while (end !== lastPageIndex
				&& (end - begin + 1) !== this.props.displayPageCount) {
					end++;
				}
			}
			if (end === lastPageIndex) {
				//prepend page
				while (begin !== this.state.startPageNumber
				&& (end - begin + 1) !== this.props.displayPageCount) {
					begin--;
				}
			}
		}
		const startIndex = pages.indexOf(begin);
		const stopIndex = pages.indexOf(end) + 1;
		const displayPages = stopIndex >= pages.length ? pages.slice(startIndex) : pages.slice(startIndex, stopIndex);
		const hasLeft = begin > this.state.startPageNumber;
		const hasRight = end < lastPageIndex;
		return (
			<ul className={this.props.className} style={this.props.style}>
				<li className={classnames(disabledPrevButton?"disabled":'')}>
					<a onClick={()=>{
						const prevIndex=this.state.pageIndex-1;
						const state=Object.assign({},this.state,{
							pageIndex:prevIndex
						});
						this.setState(state,()=>{
							this.props.onPageChange(Object.assign({},this.state));
						})
					}} href="javascript:void(0)">{this.props.renderPrevPage()}</a>
				</li>
				{hasLeft && <li>...</li>}
				{displayPages.map((num, i)=> {
					return (
						<li
							className={classnames(this.state.pageIndex===num?"cur":'')}
							key={num}>
							<a onClick={()=>{
								const state=Object.assign({},this.state,{
									pageIndex:num
								});
								this.setState(state,()=>{
									this.props.onPageChange(Object.assign({},this.state));
								});
							}} href="javascript:void(0)">{this.startPageNumber === 0 ? num + 1 : num}</a>
						</li>
					);
				})}
				{hasRight && <li>...</li>}
				<li className={classnames(disabledNextButton?"disabled":"")}>
					<a onClick={()=>{
						const nextIndex=this.state.pageIndex+1;
						const state=Object.assign({},this.state,{
									pageIndex:nextIndex
								});
						this.setState(state,()=>{
							this.props.onPageChange(Object.assign({},this.state));
						})
					}} href="javascript:void(0)">{this.props.renderNextPage()}</a>
				</li>
			</ul>
		);
	}
}