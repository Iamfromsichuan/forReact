import React from 'react'

const height = window.screen.height;
let timeOut = null
let self = null

class List extends React.Component {
	constructor(){
		super()
		self = this
	}
	componentDidMount(){
		//组件加载完成之后  就绑定一个scroll事件  每200ms调用一次 loadMore 方法
		window.addEventListener('scroll',this.scrollLoad)
	}
	scrollLoad(){
		timeOut && window.clearTimeout(timeOut)
		timeOut = setTimeout(function(){
			self.loadMore()
		}, 200);
	}
	componentWillUnmount(){
		//组件销毁前  取消其绑定得事件，防止内存泄漏
		window.removeEventListener('scroll',this.scrollLoad)
	}
	loadMore(){
		//元素scrollContent 内就是一些列得li   通过判断滚轮得高度 + 当前屏幕得高度是否大于  元素scrollContent
		//得高度来  判断元素是否加载到最后一个   当页面加载到最后一个元素时  被拉伸上来那会，屏幕得高度加上
		//滚轮得高度大于 元素scrollContent得高度  就立即执行  加载其他元素
		let y = window.scrollY,
				h = document.getElementById("scrollContent").offsetHeight;
			if(height + y > h){
				this.props.onScroll();
			}
	}
	render(){
		/*
		* 这里的变量L  其实就一个一个li组件
		* */
		let L = this.props.list

		return(
			<div ref="scrollContent" id="scrollContent">
			  {
			  	//data此时放得时一个  商品列表  此时返回得是一个元素为L的数组
			  	this.props.data.map((item,i)=>{
			  		return <L data={item} key={i} pagename={this.props.pagename}/>
			  	})
			  }
			</div>
		)
	}
}

export default List
