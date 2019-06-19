'use strict'

import React         from 'react';
import { TasksList } from './components/TasksList/TasksList.jsx';
import produce       from 'immer';
import { addTask }   from './redux/actions/actions.js';

const _ = {
	get:   require('lodash/get'),
	merge: require('lodash/merge')
};

class App extends React.Component {

	constructor(props) {
		super(props);

		this.store = this.props.store;

		this.onClickAddTask              = this.onClickAddTask.bind(this);
		this.onChangeTaskText            = this.onChangeTaskText.bind(this);
		this.onExitTaskEditMode          = this.onExitTaskEditMode.bind(this);
		this.onSaveTaskChanges           = this.onSaveTaskChanges.bind(this);
		this.onEnterTaskEditMode         = this.onEnterTaskEditMode.bind(this);
	}


	componentDidMount() {
		this.unsubscribe = this.store.subscribe(() => this.forceUpdate());
	}


	componentWillUnmount() {
		this.unsubscribe();
	}


	onClickAddTask() {
		this.store.dispatch(addTask('Введите текст'));
	}


	onEnterTaskEditMode(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { 
						editMode: true,
						nextText: task.text
					});
				});
			})
		);
	}


	onChangeTaskText(e, id) {
		let nextText = e.target.value;

		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { nextText });
				});
			})
		);
	}


	onSaveTaskChanges(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign(
						{},
						task, 
						{
							editMode: false,
							text: task.nextText,
						}
					);
				});
			})
		);
	}


	onExitTaskEditMode(id) {
		this.setState(
			produce(state => {
				state.tasks = state.tasks.map(task => {
					if (id !== task.id)
						return task;

					return Object.assign({}, task, { editMode: false });
				});
			})
		);
	}


	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<button 
								className="btn btn-primary btn-lg btn-block"
								onClick={this.onClickAddTask}
							>
								Добавить задачу
							</button>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<TasksList store={this.store} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
