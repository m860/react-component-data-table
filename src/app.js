import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import DataTable from './components/DataTable'
import './sass/DataTable.sass'
import './sass/Pagination.sass'
import Pagination from './components/Pagination'
import DataTableWithPagination from './components/DataTableWithPagination'

class SimpleDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class EmptyDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[];
		const columns=[
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class RadioDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="radio" value={rowData['name']} name="radio-data-table"/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class CheckboxDataTableDemo extends React.PureComponent{
	render(){
		const dataSource=[
			{name:"name1",sex:"male"},
			{name:"name2",sex:"female"}
		];
		const columns=[
			{name:"",render:rowData=>{
				return <input type="checkbox" value={rowData['name']}/>
			}},
			{name:"Name",render:rowData=>rowData['name']},
			{name:"Sex",render:rowData=>rowData['sex']},
		];
		return <DataTable columns={columns} dataSource={dataSource}></DataTable>
	}
}

class SimplePagination extends React.PureComponent{
	render(){
		return (
			<div>
				<Pagination total={100}/>
			</div>
		);
	}
}

class DataTableWithPaginationDemo extends React.PureComponent{
	constructor(props){
		super(props);
		this.dataSource=[{
			name:"name",
			age:1
		},{
			name:"name",
			age:2
		},{
			name:"name",
			age:3
		},{
			name:"name",
			age:4
		},{
			name:"name",
			age:5
		},{
			name:"name",
			age:6
		},{
			name:"name",
			age:7
		},{
			name:"name",
			age:8
		},{
			name:"name",
			age:9
		},{
			name:"name",
			age:10
		},{
			name:"name",
			age:11
		}];
		this.state={
			dataSource:this.dataSource.slice(0,3),
			pageIndex:0,
			pageSize:3
		};
	}
	render(){
		return (
			<div>
				<DataTableWithPagination dataSource={this.state.dataSource}
										 dataTableClassName="abc"
										 pageSize={this.state.pageSize}
										 total={this.dataSource.length}
										 columns={[{
										 	name:"Name",
										 	render:rowData=>rowData['name']
										 },{
										 	name:"Age",
										 	render:rowData=>rowData['age']
										 }]}
										 onPageChange={({pageIndex,pageSize})=>{
										 	const ds=this.dataSource.slice(pageIndex*pageSize,pageIndex*pageSize+pageSize);
										 	const state=Object.assign({},this.state,{
										 		pageIndex,pageSize,dataSource:ds
										 	});
										 	this.setState(state);
										 }}
										 pageIndex={this.state.pageIndex}></DataTableWithPagination>
			</div>
		);
	}
}

class Example extends Component {
	render() {
		return (
			<div style={{paddingBottom:"50px"}}>
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
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));