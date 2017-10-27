# react-component-data-table

<!-- badge -->

[![npm version](https://img.shields.io/npm/v/react-component-data-table.svg)](https://www.npmjs.com/package/react-component-data-table)
[![npm license](https://img.shields.io/npm/l/react-component-data-table.svg)](https://www.npmjs.com/package/react-component-data-table)
[![npm download](https://img.shields.io/npm/dm/react-component-data-table.svg)](https://www.npmjs.com/package/react-component-data-table)
[![npm download](https://img.shields.io/npm/dt/react-component-data-table.svg)](https://www.npmjs.com/package/react-component-data-table)

<!-- endbadge -->

## Screen Shot

<img src="https://raw.githubusercontent.com/m860/react-component-data-table/master/src/screenshot/data-table-radio-and-checkbox.png"/>

<img src="https://raw.githubusercontent.com/m860/react-component-data-table/master/src/screenshot/data-table-empty.png"/>

<img src="https://raw.githubusercontent.com/m860/react-component-data-table/master/src/screenshot/data-table-pagination.gif"/>

<img src="https://raw.githubusercontent.com/m860/react-component-data-table/master/src/screenshot/data-table-pagination2.gif"/>

<img src="https://raw.githubusercontent.com/m860/react-component-data-table/master/src/screenshot/data-table-fixed-head.gif"/>

## Install

```shell
$ npm i react-component-data-table --save
```

## Import

```javascript
//如果需要自定义样式,请替换为自己的样式文件即可
import 'react-component-data-table/asstes/css/DataTable.css'
import {DataTable,Pagination,DataTableWithPagination} from 'react-component-data-table'
```

## Change Log

### 1.3.0

-   优化bodyHeight的计算,当`fixedHead=true`时
-   调整了部分样式
-   添加排序

### 1.2.0

-   添加了属性`fixedHead`,是否固定head,默认是不固定.如果为`true`,body的高度有容器的高度计算得出,不需要指定body的高度
-   调整了默认样式

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## DataTable

**Extends PureComponent**

DataTable - 数据表

**Parameters**

-   `props`  

**Examples**

_Simple_

```javascript
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
```

_Empty_

```javascript
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
```

_Radio DataTable_

```javascript
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
```

_Checkbox DataTable_

```javascript
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
```

_Sort DataTable_

```javascript
class SortDataTable extends React.PureComponent {
 	...
 	onSortChange(sort) {
		if (sort) {
			let ds = [...this.state.dataSource];
			ds.sort((a, b)=> {
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
				style={{height:300}}>
				<DataTable
					dataSource={this.state.dataSource}
					renderDataEmpty={()=>''}
					onSortChange={this.onSortChange.bind(this)}
					columns={[{
						name:"Name",
						render:rowData=>rowData['name']
					 },{
						name:"Age",
						render:rowData=>rowData['age'],
						sort:{
							field:'age',
						}
					 }]}></DataTable>
			</div>
		);
	}
 	...
 }
```

### propTypes

**Properties**

-   `columns` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
    -   `columns[].name` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `columns[].className` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
    -   `columns[].style` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
    -   `columns[].render` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** 
    -   `columns[].sort` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
        -   `columns[].sort.field` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
        -   `columns[].sort.defaultType` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** value is one of the none,asc,desc
-   `dataSource` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?** \[ \[] ]
-   `style` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
-   `className` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** [ data-table ] - data-table是DataTable的默认className,样式定义在/css/DataTable.css.如果要使用默认样式需要引用默认的样式文件`import 'css/DataTable.css'`
-   `renderDataEmpty` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** [ (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>) ]
-   `fixedHead` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** [false] - 是否固定head
-   `onSortChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** [()=>null] - 当sort变化时调用

## DataTableWithPagination

**Extends PureComponent**

带分页的DataTable,由DataTable和Pagination组合的复合组件

### getGlobalRowIndex

获取DataTable全局数据索引

**Parameters**

-   `localRowIndex` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 当前分页中的数据索引

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 全局数据索引

### refresh

刷新当前页数据

Returns **void** 

### propTypes

[...DataTable.propTypes](#datatableproptypes)
[...Pagination.propTypes](#paginationproptypes)

**Properties**

-   `style` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 
-   `className` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `dataTableStyle` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** DataTable样式
-   `dataTableClassName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** DataTable css class
-   `paginationStyle` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Pagination 样式
-   `paginationClassName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** Pagination css class
-   `showIndex` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** [ true ] - 是否显示索引列

## Pagination

**Extends PureComponent**

Pagination - 页码

**Parameters**

-   `props`  

**Examples**

_从0开始分页_

```javascript
<Pagination
   onPageChange={(pageInfo)=>{
					console.log('page change',pageInfo)
				}}
     total={23}/>
```

_从1开始分页_

```javascript
<Pagination
   startPageNumber={1}
   pageIndex={1}
   onPageChange={(pageInfo)=>{
	console.log('page change',pageInfo)
}}
   total={100}/>
```

### totalPage

总页数

### pageIndex

当前页码

### pageSize

每页记录数

### startPageNumber

起始分页页码

### refresh

刷新当前页数据

Returns **void** 

### propTypes

**Properties**

-   `startPageNumber` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** [ 0 ] - 分页开始的起始页`0`或者`1`
-   `pageIndex` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** [ 0 ] - 当前页
-   `pageSize` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** [ 10 ] - 每页记录数
-   `onPageChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** [ ()=>null ] - 分页事件监听
-   `total` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 总记录数
-   `style` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 样式
-   `className` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** [pagination] - css class样式,样式定义在`css/Pagination.css`
-   `displayPageCount` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** [5] - 最多可以显示多少页面
-   `renderNextPage` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** [()=>(<img style={{width:20,height:20,transform:'rotate(180deg)'}} src={require('../assets/img/angle-left.svg')}/>)] - `>`按钮样式
-   `renderPrevPage` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** [()=>(<img style={{width:20,height:20}} src={require('../assets/img/angle-left.svg')}/>)] - `<`按钮样式
