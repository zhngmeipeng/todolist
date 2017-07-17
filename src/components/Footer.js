let propTypes = {
	leftCount:PT.number,
	showClearButton:PT.bool,
	onClearCompleted:PT.func,
	changeView:PT.func
}


export default class Footer extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		let {leftCount,showClearButton,onClearCompleted,view,changeView} = this.props ;
		let clearBtn = null ;
		if(showClearButton){
			clearBtn = (
				<button className="clear-completed"
					onClick = {onClearCompleted}
				>
					clear all completed
				</button>
			)
		}
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{leftCount}</strong>
					<span>item left</span>
				</span>
				<ul className="filters">
					<li>
						<a 
							className={view=='all'?'selected':''}
							onClick = {ev=>changeView('all')}
						href="#/all">All</a>
					</li>
					<li>
						<a 
						className={view=='active'?'selected':''}
						onClick = {ev=>changeView('active')}
						href="#/Active">Active</a>
					</li>
					<li>
						<a 
						className={view=='completed'?'selected':''}
						onClick = {ev=>changeView('completed')}
						href="#/Completed">Completed</a>
					</li>
				</ul>
				{clearBtn}
			</footer>
		)
	}
}
