import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import DataTable from './components/DataTable'
import './assets/sass/data-table.sass'
import Pagination from './components/Pagination'
import DataTableWithPagination from './components/DataTableWithPagination'

class SimpleDataTableDemo extends React.PureComponent {
	render() {
		const dataSource = [
			{name: "name1", sex: "male"},
			{name: "name2", sex: "female"}
		];
		const columns = [
			{name: "Name", render: rowData => rowData['name']},
			{name: "Sex", render: rowData => rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource} className="data-table"></DataTable>
	}
}

class EmptyDataTableDemo extends React.PureComponent {
	render() {
		const dataSource = [];
		const columns = [
			{name: "Name", render: rowData => rowData['name']},
			{name: "Sex", render: rowData => rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource} className="data-table"></DataTable>
	}
}

class RadioDataTableDemo extends React.PureComponent {
	render() {
		const dataSource = [
			{name: "name1", sex: "male"},
			{name: "name2", sex: "female"}
		];
		const columns = [
			{
				name: "", render: rowData => {
					return <input type="radio" value={rowData['name']} name="radio-data-table"/>
				}
			},
			{name: "Name", render: rowData => rowData['name']},
			{name: "Sex", render: rowData => rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource} className="data-table"></DataTable>
	}
}

class CheckboxDataTableDemo extends React.PureComponent {
	render() {
		const dataSource = [
			{name: "name1", sex: "male"},
			{name: "name2", sex: "female"}
		];
		const columns = [
			{
				name: "", render: rowData => {
					return <input type="checkbox" value={rowData['name']}/>
				}
			},
			{name: "Name", render: rowData => rowData['name']},
			{name: "Sex", render: rowData => rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource} className="data-table"></DataTable>
	}
}

class SimplePagination extends React.PureComponent {
	render() {
		return (
			<div>
				<Pagination total={100} className="pagination"/>
			</div>
		);
	}
}

class DataTableWithPaginationDemo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dataSource = [{
			name: "name",
			age: 1
		}, {
			name: "name",
			age: 2
		}, {
			name: "name",
			age: 3
		}, {
			name: "name",
			age: 4
		}, {
			name: "name",
			age: 5
		}, {
			name: "name",
			age: 6
		}, {
			name: "name",
			age: 7
		}, {
			name: "name",
			age: 8
		}, {
			name: "name",
			age: 9
		}, {
			name: "name",
			age: 10
		}, {
			name: "name",
			age: 11
		}];
		this.state = {
			dataSource: this.dataSource.slice(0, 3),
			pageIndex: 0,
			pageSize: 3
		};
	}

	render() {
		return (
			<div>
				<button type="button" onClick={() => {
					this.refs['dt'].refresh();
				}}>refresh
				</button>
				<DataTableWithPagination dataSource={this.state.dataSource}
										 renderDataEmpty={() => ''}
										 dataTableClassName="data-table"
										 paginationClassName="pagination"
										 pageSize={this.state.pageSize}
										 total={this.dataSource.length}
										 paginationStyle={{marginTop: 5}}
										 columns={[{
											 name: "Name",
											 render: rowData => rowData['name']
										 }, {
											 name: "Age",
											 render: rowData => rowData['age']
										 }]}
										 onPageChange={({pageIndex, pageSize}) => {
											 const ds = this.dataSource.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
											 const state = Object.assign({}, this.state, {
												 pageIndex, pageSize, dataSource: ds
											 });
											 this.setState(state);
										 }}
										 ref="dt"
										 pageIndex={this.state.pageIndex}></DataTableWithPagination>
			</div>
		);
	}
}

class FixedHead extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dataSource = [{
			name: "name",
			age: 1
		}, {
			name: "name",
			age: 2
		}, {
			name: "name",
			age: 3
		}, {
			name: "name",
			age: 4
		}, {
			name: "name",
			age: 5
		}, {
			name: "name",
			age: 6
		}, {
			name: "name",
			age: 7
		}, {
			name: "name",
			age: 8
		}, {
			name: "name",
			age: 9
		}, {
			name: "name",
			age: 10
		}, {
			name: "name",
			age: 11
		}];
		this.state = {
			dataSource: this.dataSource.slice(0, 3),
			pageIndex: 0,
			pageSize: 3
		};
	}

	render() {
		return (
			<div
				style={{height: 300}}>
				<DataTable
					className="data-table data-table-fixed-head"
					style={{width: 400}}
					fixedHead={true}
					dataSource={this.dataSource}
					renderDataEmpty={() => ''}
					columns={[{
						name: "Name",
						render: rowData => rowData['name']
					}, {
						name: "Age",
						render: rowData => rowData['age']
					}]}></DataTable>
			</div>
		);
	}
}

class SortDataTable extends React.PureComponent {
	constructor(props) {
		super(props);
		this.dataSource = [{
			name: "name",
			age: 1
		}, {
			name: "name",
			age: 2
		}, {
			name: "name",
			age: 3
		}, {
			name: "name",
			age: 4
		}, {
			name: "name",
			age: 5
		}, {
			name: "name",
			age: 6
		}, {
			name: "name",
			age: 7
		}, {
			name: "name",
			age: 8
		}, {
			name: "name",
			age: 9
		}, {
			name: "name",
			age: 10
		}, {
			name: "name",
			age: 11
		}];
		this.state = {
			dataSource: this.dataSource.slice(0, 3),
			pageIndex: 0,
			pageSize: 3
		};
	}

	onSortChange(sort) {
		if (sort) {
			let ds = [...this.state.dataSource];
			ds.sort((a, b) => {
				if (sort.type === 'asc') {
					if (a[sort.field] < b[sort.field]) {
						return 1;
					}
					return 0;
				}
				else if (sort.type === 'desc') {
					if (a[sort.field] > b[sort.field]) {
						return 1;
					}
					return 0;
				}
				else {
					//nothing
				}
			});
			this.setState(
				Object.assign({}, this.state, {
					dataSource: ds
				})
			)
		}
	}

	render() {
		return (
			<div
				style={{height: 300}}>
				<DataTable
					className="data-table"
					dataSource={this.state.dataSource}
					renderDataEmpty={() => ''}
					onSortChange={this.onSortChange.bind(this)}
					columns={[{
						name: "Name",
						render: rowData => rowData['name']
					}, {
						name: "Age",
						render: rowData => rowData['age'],
						sort: {
							field: 'age',
							className:"data-table-sort"
						}
					}]}></DataTable>
			</div>
		);
	}
}

class Example extends Component {
	render() {
		return (
			<div style={{paddingBottom: "50px"}}>
				<h5>Simple DataTable</h5>
				<SimpleDataTableDemo/>
				<h5>Empty DataTable</h5>
				<EmptyDataTableDemo/>
				<h5>Radio DataTable</h5>
				<RadioDataTableDemo/>
				<h5>Checkbox DataTable</h5>
				<CheckboxDataTableDemo/>
				<h5>Simple Pagination</h5>
				<SimplePagination/>
				<h5>DataTableWithPaginationDemo</h5>
				<DataTableWithPaginationDemo></DataTableWithPaginationDemo>
				<h5>Data Table Of Fixed Head</h5>
				<FixedHead/>
				<h5>Sort Data Table</h5>
				<SortDataTable/>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));