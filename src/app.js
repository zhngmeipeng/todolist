import Item from 'components/Item' ;
import Footer from 'components/Footer' ;
require('style/base.css') ;
require('style/index.css') ;
export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todosData:[],
			view:'all'
		}
		this.handleKeyDownPost = this.handleKeyDownPost.bind(this) ;
		this.onDestroy = this.onDestroy.bind(this) ;
		this.onClearCompleted  = this.onClearCompleted.bind(this) ;
		this.toggleAll = this.toggleAll.bind(this) ;
		this.onToggle = this.onToggle.bind(this) ;
		this.changeView = this.changeView.bind(this) ;
		this.itemEditDone = this.itemEditDone.bind(this) ;
	}
	
	itemEditDone(todo,value){
		let {todosData} = this.state;
		todosData.map(elt=>{
			if(todo.id===elt.id){
				elt.value = value ;
			}
			return elt ;
		})
	}
	
	changeView(view){
		this.setState({view})	
	}
	
	handleKeyDownPost(ev){
		if(ev.keyCode !=13) return ;
		let value = ev.target.value.trim() ;
		if(value===''){
			return ;
		}
		let todo = {} ;
		todo.id = new Date().getTime();
		todo.value = value ;
		todo.hasCompleted = false ;
		let {todosData} = this.state ;
		todosData.push(todo) ;
		this.setState({todosData}) ;
		ev.target.value = '' ;
	}
	
	
	toggleAll(ev){
		let {checked} = ev.target ;
		let {todosData} = this.state ;
		todosData = todosData.map(elt=>{
			elt.hasCompleted = checked ;
			return elt ;
		});
		this.setState({todosData}) ;
	}
	onToggle(todo){
		let {todosData} = this.state ;
		todosData = todosData.map(elt=>{
			if(elt.id===todo.id){
				elt.hasCompleted = !elt.hasCompleted ;
			}
			return elt ;
		}) ;
		this.setState({todosData});
	}
	
	onDestroy(todo){
		let {todosData} = this.state ;
		todosData = todosData.filter((elt)=>{
			return elt.id !== todo.id
		})
		this.setState({todosData}) ;
	}
	
	onClearCompleted(){
		let {todosData} = this.state ;
		todosData = todosData.filter((elt)=>{
			return !elt.hasCompleted ;
		})
		this.setState({todosData}) ;
	}
	
	render(){
		let {
			handleKeyDownPost,
			onDestroy,
			onClearCompleted,
			toggleAll,
			onToggle ,
			changeView,
			itemEditDone
			
		} = this ;
		let {todosData,view} = this.state ;
		
		let items = null ,
			footer = null,
			itembox = null
		
		let leftCount = todosData.length ;
		items = todosData.filter(elt=>{
			if(elt.hasCompleted) leftCount-- ;
			switch(view){
				case 'active':
					return !elt.hasCompleted ;
				case 'completed':
					return elt.hasCompleted;
				default:
					return true ;
					
			}
		})
		items = items.map((elt,i)=>{
			
			return (
				<Item {
					...{
						onDestroy,
						todo:elt,
						onToggle,
						itemEditDone
					}}
				key={i}
				/>
			)
		})
		if(todosData.length){
			itembox = (
				<section className="main">
					<input 
						type="checkbox" 
						className="toggle-all"
						checked={leftCount===0}
						onChange = {toggleAll}
						/>
					<ul className="todo-list">
						{items}
					</ul>
				</section>
			)
			footer=(
				<Footer
					{...{
						leftCount,
						onClearCompleted,
						changeView,
						view,
						showClearButton:leftCount<todosData.length
					}}
				/>)
		}
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input type="text" 
					onKeyDown = {handleKeyDownPost}
					className="new-todo"/>
				</header>
				{itembox}
				{footer}
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root') 
);
if(module.hot){
	module.hot.accept() ;
}
