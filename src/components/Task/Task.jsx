'use strict'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const _ = {
	get: require('lodash/get')
};

class Task extends React.Component {

	constructor() {
		super();

		this.onClickDelete           = this.onClickDelete.bind(this);
		this.onChangeTaskText        = this.onChangeTaskText.bind(this);
		this.onClickExitEditMode     = this.onClickExitEditMode.bind(this);
		this.onClickSaveChanges      = this.onClickSaveChanges.bind(this);
		this.onClickEnterEditMode    = this.onClickEnterEditMode.bind(this);
		this.onChangeCompletedStatus = this.onChangeCompletedStatus.bind(this);

	}


	onChangeCompletedStatus(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onChangeCompletedStatus && this.props.onChangeCompletedStatus(e, id);
	}


	onClickEnterEditMode(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onEnterEditMode && this.props.onEnterEditMode(id);
	}


	onClickSaveChanges(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onSaveChanges && this.props.onSaveChanges(id);
	}


	onClickExitEditMode(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onExitEditMode && this.props.onExitEditMode(id);
	}


	onChangeTaskText(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onChangeText && this.props.onChangeText(e, id);
	}


	onClickDelete(e) {
		let id = e.currentTarget.getAttribute('data-id');

		this.props.onDelete && this.props.onDelete(id);
	}


	renderEditMode() {
		return (
			<div className="row">
				<div className="col-md-1">.</div>
				<div className="col-md-9">
					<textarea 
						className="form-control" 
						value={_.get(this, 'props.nextText')}
						onChange={this.onChangeTaskText}
						data-id={_.get(this, 'props.id')}
					/>
				</div>
				<div className="col-md-2">
					<button
						data-id={_.get(this, 'props.id')}
						className="btn"
						onClick={this.onClickSaveChanges}
					>
						<FontAwesomeIcon icon={faSave} />
					</button>
					<button
						data-id={_.get(this, 'props.id')}
						className="btn"
						onClick={this.onClickExitEditMode}
					>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>
			</div>
		);
	}


	renderCommonMode() {
		return (
			<div className="row">
				<div className="col-md-1">
					<div className="form-check">
						<input 
							className="form-check-input position-static" 
							type="checkbox" 
							defaultChecked={false}
							id="blankCheckbox" 
							value={_.get(this, 'props.completed')} 
							aria-label="..."
							onChange={this.onChangeCompletedStatus}
							data-id={_.get(this, 'props.id')}
						/>
					</div>
				</div>
				<div className="col-md-9"><p className="card-text">{_.get(this, 'props.text')}</p></div>
				<div className="col-md-2">
					{
						_.get(this, 'props.completed', false) ? null : (
							<button
								data-id={_.get(this, 'props.id')}
								className="btn"
								onClick={this.onClickEnterEditMode}
							>
								<FontAwesomeIcon icon={faPencilAlt} />
							</button>
						)	
					}
					<button
						data-id={_.get(this, 'props.id')}
						className="btn"
						onClick={this.onClickDelete}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</div>
		);
	}


	render() {
		return (
			<div className="task" data-id={_.get(this, 'props.id')}>
				<div className={`card ${_.get(this, 'props.completed', false) ? 'bg-secondary' : '' }`}>
					<div className="card-body">
						{
							_.get(this, 'props.editMode')
								? this.renderEditMode()
								: this.renderCommonMode()
						}
					</div>
				</div>
			</div>
		);
	}
}

export { Task };