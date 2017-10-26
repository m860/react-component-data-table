"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var DataTable = function (_PureComponent) {
	_inherits(DataTable, _PureComponent);

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
	function DataTable(props) {
		_classCallCheck(this, DataTable);

		var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

		_this.state = {
			bodyHeight: 0
		};
		return _this;
	}

	_createClass(DataTable, [{
		key: "updateBodyHeight",
		value: function updateBodyHeight() {
			if (this.props.fixedHead) {
				this.setState(Object.assign({}, this.state, {
					bodyHeight: this.parentHeight - this.tableHeadHeight
				}));
			}
		}

		/**
   * @private
   *
   * render data source
   * */

	}, {
		key: "_renderDataSource",
		value: function _renderDataSource() {
			var _this2 = this;

			if (this.props.dataSource.length > 0) {
				return this.props.dataSource.map(function (rowData, rowDataIndex) {
					return _react2.default.createElement(
						"tr",
						{ key: rowDataIndex },
						_this2.props.columns.map(function (column, columnIndex) {
							return _react2.default.createElement(
								"td",
								{ key: columnIndex,
									className: column.className,
									style: column.style },
								column.render(rowData, rowDataIndex, column, columnIndex)
							);
						})
					);
				});
			}
			return this.props.renderDataEmpty(this.props.columns);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"table",
				{
					ref: "table",
					className: (0, _classnames2.default)('data-table', this.props.fixedHead && "data-table-fixed-head", this.props.className),
					style: this.props.style },
				_react2.default.createElement(
					"thead",
					{ ref: "thead" },
					_react2.default.createElement(
						"tr",
						null,
						this.props.columns.map(function (column, index) {
							return _react2.default.createElement(
								"th",
								{ key: index },
								column.name
							);
						})
					)
				),
				_react2.default.createElement(
					"tbody",
					{ style: this.props.fixedHead ? { height: this.state.bodyHeight } : {} },
					this._renderDataSource()
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.updateBodyHeight();
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.updateBodyHeight();
		}
	}, {
		key: "parentStyle",
		get: function get() {
			var table = this.refs['table'];
			if (table) {
				var parent = table.parentNode;
				if (parent) {
					return window.getComputedStyle(parent);
				}
			}
			return null;
		}
	}, {
		key: "parentHeight",
		get: function get() {
			if (this.parentStyle) {
				var height = parseFloat(this.parentStyle.height);
				if (!isNaN(height)) {
					return height;
				}
			}
			return 0;
		}
	}, {
		key: "tableHeadHeight",
		get: function get() {
			var thead = this.refs['thead'];
			if (thead) {
				var style = window.getComputedStyle(thead);
				var height = parseFloat(style.height);
				if (!isNaN(height)) {
					return height;
				}
			}
			return 0;
		}
	}]);

	return DataTable;
}(_react.PureComponent);

DataTable.propTypes = {
	columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.string.isRequired,
		className: _propTypes2.default.any,
		style: _propTypes2.default.object,
		render: _propTypes2.default.func.isRequired
	})).isRequired,
	dataSource: _propTypes2.default.array,
	style: _propTypes2.default.object,
	className: _propTypes2.default.any,
	renderDataEmpty: _propTypes2.default.func,
	fixedHead: _propTypes2.default.bool
};
DataTable.defaultProps = {
	dataSource: [],
	fixedHead: false,
	renderDataEmpty: function renderDataEmpty(definedColumn) {
		return _react2.default.createElement(
			"tr",
			null,
			_react2.default.createElement(
				"td",
				{ colSpan: definedColumn.length, style: { textAlign: "center" } },
				"NO DATA"
			)
		);
	}
};
exports.default = DataTable;