'use strict'

import React from 'react';
import { Task } from './../Task/Task.jsx';

const _ = {
	get: require('lodash/get')
};

class TasksList extends React.Component {

	constructor() {
		super();

		this.onDeleteTask                = this.onDeleteTask.bind(this);
		this.onChangeTaskText            = this.onChangeTaskText.bind(this);
		this.onExitTaskEditMode          = this.onExitTaskEditMode.bind(this);
		this.onSaveTaskChanges           = this.onSaveTaskChanges.bind(this);
		this.onEnterTaskEditMode         = this.onEnterTaskEditMode.bind(this);
		this.onChangeTaskCompletedStatus = this.onChangeTaskCompletedStatus.bind(this);
	}


	onChangeTaskCompletedStatus(e, id) {
		this.props.onChangeTaskCompletedStatus && this.props.onChangeTaskCompletedStatus(e, id);
	}


	onEnterTaskEditMode(id) {
		this.props.onEnterTaskEditMode && this.props.onEnterTaskEditMode(id);
	}


	onSaveTaskChanges(id) {
		this.props.onSaveTaskChanges && this.props.onSaveTaskChanges(id);
	}


	onExitTaskEditMode(id) {
		this.props.onExitTaskEditMode && this.props.onExitTaskEditMode(id);
	} 


	onChangeTaskText(e, id) {
		this.props.onChangeTaskText && this.props.onChangeTaskText(e, id);
	}


	onDeleteTask(id) {
		this.props.onDeleteTask && this.props.onDeleteTask(id);
	}


	renderTasks() {
		return _.get(this, 'props.tasks', []).map((task, index) => {
			return (
				<Task
					key={`task_${index}`}
					id={task.id}
					text={task.text}
					nextText={task.nextText}
					completed={task.completed}
					editMode={task.editMode}
					onChangeText={this.onChangeTaskText}
					onEnterEditMode={this.onEnterTaskEditMode}
					onDelete={this.onDeleteTask}
					onExitEditMode={this.onExitTaskEditMode}
					onSaveChanges={this.onSaveTaskChanges}
					onChangeCompletedStatus={this.onChangeTaskCompletedStatus}
				/>
			);
		}).reverse();
	}


	render() {
		return (
			<div className="tasks-list">
				{this.renderTasks()}
			</div>
		);
	}

}

export { TasksList }; 