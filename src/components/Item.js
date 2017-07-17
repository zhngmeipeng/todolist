
let propTypes = {
	todo:PT.object ,
	onDestroy:PT.func,
	onToggle:PT.func,
	itemEditDone:PT.func
}

export default class Item extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inEdit :false,
			val:''
		}
		this.onEdit = this.onEdit.bind(this) ;
		this.onBlur = this.onBlur.bind(this) ;
		this.onEnter = this.onEnter.bind(this) ;
		this.inputChange = this.inputChange.bind(this) ;
		this.itemEditDone = this.itemEditDone.bind(this) ;
	}
	
	inputChange(ev){
		this.setState({
			val:ev.target.value
		})
	}
	
	itemEditDone(){
		this.setState({
			inEdit:false
		})
		let {itemEditDone,todo} = this.props ;
		itemEditDone(todo,this.state.val)
	}
	onBlur(){
		this.itemEditDone()
	}
	onEnter(ev){
		if(ev.keyCode!==13) return ;
		this.itemEditDone(this.state.value)
	}
	onEdit(){
		let {value} = this.props.todo ;
		this.setState({
			inEdit:true,
			val:value
		},()=>{
			this.refs.editInput.focus()
		})
	}
	
	render(){
		let {onEdit,onBlur,onEnter,inputChange} = this;
		let {todo,onDestroy,onToggle} = this.props ;
		let {inEdit,val} = this.state ;
		let itemClassName = todo.hasCompleted?'completed':'' ;
		if(inEdit) itemClassName = 'editing' ;   
		return (
				<li className = {itemClassName}>
					<div className="view">
						<input 
							type="checkbox" 
							className="toggle"
							checked = {todo.hasCompleted}
							onChange={elt=>onToggle(todo)}
							/>
						<label onDoubleClick={onEdit}>
							{todo.value}
						</label>
						<button onClick={ev=>{onDestroy(todo)}} className="destroy"></button>
					</div>
					<input type="text" 
					value={val}
					onBlur={onblur}
					onKeyDown = {onEnter}
					onChange = {inputChange}
					ref = "editInput"
					className="edit"/>
				</li>
			)
		
	}
}

Item.proTypes = propTypes