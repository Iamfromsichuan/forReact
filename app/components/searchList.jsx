import React from 'react'
import List from './common/scrollList.jsx'
import Pro from './common/pro.jsx'
import Send from '../utils/model.js'
import {Header} from './header/header.jsx'

class SearchList extends React.Component{
	constructor(){
		super()
		this.state  = {
			productList :[]
		}
	}
	getMore(){
		let self = this
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	componentWillMount() {
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	render(){
		/*
		* 此组件的onScroll  便是通过子传父的方式   调用了父级的 发起数据请求的方法，
		* 其实就是利用事件的冒泡原理  减少 同一个事件对同一类作用元素的多次绑定
		* */
		return(
			<div>
				<Header title='搜索结果'  pagename={'searchlist'} {...this.props}/>
				<div className="content">
					<List
						list={Pro}
						pagename={'searchlist'}
						data={this.state.productList}
						onScroll = {this.getMore.bind(this)}
					/>
				</div>
			</div>
		)
	}
}
/*
* 在vue中  我们将Controller 以及 根级相应属性  全都放在一个vue的实例中，而视图就放在template中
* 而我们react中却是将视图放在   render函数的返回值中，返回的就是一个react视图组件
*然后react将Controller放在类的属性中，在render函数中通过bind（this）去获取类的属性 或者方法然后调用
* 而在vue中  template中的视图组件直接可以获取vue实例中的属性，也能直接调用vue实例的方法
* 在vue中  直接通过赋值的方式  就能修改vue实例中data内的属性
* 而在react中  在render函数返回的视图中  直接通过  this.state.属性名就可以获取值  但是对于直接通过
* this.state.name = 的方式设置的值 虽然能够赋值  但是这种赋值的方式却不能被render返回的组件所察觉，并不会发生视图的相应
* 只能通过  this.setState({name : ""})的方式  才能够修改状态机中的状态  引起视图的改变
 * */
export default SearchList
