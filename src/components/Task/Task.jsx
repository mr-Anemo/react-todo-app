'use strict'

import React                                     from 'react';
import { FontAwesomeIcon }                       from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faSave, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import produce                                   from 'immer';

const _ = {
	get: require('lodash/get')
};

class Task extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			editMode: void 0,
		};

		this.id = this.props.id;

		this.onClickDelete           = this.onClickDelete.bind(this);
		this.onChangeTaskText        = this.onChangeTaskText.bind(this);
		this.onClickExitEditMode     = this.onClickExitEditMode.bind(this);
		this.onClickSaveChanges      = this.onClickSaveChanges.bind(this);
		this.onClickEnterEditMode    = this.onClickEnterEditMode.bind(this);
		this.onChangeCompletedStatus = this.onChangeCompletedStatus.bind(this);

	}


	onClickEnterEditMode(e) {
		this.setState(
			produce(state => {
				state.editMode = {
					text: _.get(this, 'props.text')
				};
			})
		);
	}


	onClickExitEditMode() {
		this.setState(
			produce(state => {
				state.editMode = void 0;
			})
		);
	}


	onChangeTaskText(e) {
		let value = e.target.value;

		this.setState(
			produce(state => {
				state.editMode.text = value;
			})
		);
	}


	onClickSaveChanges() {
		this.props.onSaveChanges && this.props.onSaveChanges(this.id, { text: _.get(this, 'state.editMode.text', _.get(this, 'props.text')) });
		
		this.setState(
			produce(state => {
				state.editMode = void 0;
			})
		);
	}


	onChangeCompletedStatus() {
		this.props.onChangeCompletedStatus && this.props.onChangeCompletedStatus(this.id);
	}


	onClickDelete() {
		this.props.onDelete && this.props.onDelete(this.id);
	}


	renderEditMode() {
		return (
			<div className="row">
				<div className="col-md-1">.</div>
				<div className="col-md-9">
					<textarea 
						className="form-control" 
						value={_.get(this, 'state.editMode.text')}
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
							_.get(this, 'state.editMode')
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