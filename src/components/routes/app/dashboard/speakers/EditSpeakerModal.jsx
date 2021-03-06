import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from '../../../../Modal.jsx';
import Select from 'react-select';

@inject('app')
@inject('speakers')
@inject('editSpeaker')
@observer
class EditSpeakerModal extends Component {

    constructor() {

        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLabelsChange = this.handleLabelsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const { name, value } = event.target;
        this.props.editSpeaker.setFormData(name, value);
    }

    handleTermChange(event, index) {

        const { name, value } = event.target;
        this.props.editSpeaker.setTermData(index, name, value);
    }

    handleLabelsChange(value) {

        this.props.editSpeaker.setFormData('labels', value);
    }

    handleSubmit(event) {

        event.preventDefault();

        this.props.editSpeaker.submit();
    }

    render() {

        const { app } = this.props;
        const { speakerLabelOptions } = this.props.speakers;
        const { isVisible, isLoading, formData, terms, formErrors, removeTerm, addTerm, isSubmitting, hide } = this.props.editSpeaker;

        formData.name;
        for (let i = 0; i < terms.length; i++) {
            terms[i].startDate;
            terms[i].endDate;
        }
        formData.labels;//TODO: these are needed to trigger re-render
        formErrors.name;
        formErrors.terms;

        const renderContent = () => (
            <form id="form-edit-speaker" className="form" onSubmit={this.handleSubmit}>
                <label className="form__label">
                    <span>Name</span>
                    {formErrors.name ? (
                        <span className="form__error">{formErrors.name}</span>
                    ) : null}
                    <input className="form__text-input" type="text" name="name" disabled={app.currentUser === null} value={formData.name} onChange={this.handleChange} />
                </label>
                <label className="form__label">
                    <span>Terms</span>
                    {formErrors.terms ? (
                        <span className="form__error">{formErrors.terms}</span>
                    ) : null}
                    <div className="repeater">
                        <ul className="repeater__list">
                            {terms.map((term, index) => (
                                <li key={index} className="repeater__item">
                                    <input className="form__text-input form__text-input--small form__text-input--inline form__text-input--no-clearance" type="text" name="startDate" placeholder="YYYY-MM-DD" disabled={app.currentUser === null} value={term.startDate} onChange={(event) => this.handleTermChange(event, index)} />
                                    <span style={{ marginRight: '8px' }}>to</span>
                                    <input className="form__text-input form__text-input--small form__text-input--inline form__text-input--no-clearance" type="text" name="endDate" placeholder="YYYY-MM-DD" disabled={app.currentUser === null} value={term.endDate} onChange={(event) => this.handleTermChange(event, index)} />
                                    {app.currentUser !== null ? (
                                        <button className="repeater__remove-button" type="button" onClick={(event) => { event.preventDefault(); removeTerm(index); }}>
                                            <i className="fa fa-minus-circle" />
                                        </button>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                        {app.currentUser !== null ? (
                            <button className="button button--tiny repeater__add-button" type="button" onClick={addTerm}>
                                <i className="button__icon fa fa-plus" />
                                <span>Add Term</span>
                            </button>
                        ) : null}
                    </div>
                </label>
                <label className="form__label">
                    <span>Speaker Labels</span>
                    <Select name="labels" placeholder="" multi={true} options={speakerLabelOptions} disabled={app.currentUser === null} value={formData.labels.peek()} onChange={this.handleLabelsChange} />
                </label>
            </form>
        );

        const renderFooter = () => (
            <div className="button-list button-list--right">
                <div className="button-list__item">
                    <button className="button button" onClick={hide}>Cancel</button>
                </div>
                <div className="button-list__item">
                    <button className="button button--primary" form="form-edit-speaker">Save</button>
                </div>
            </div>
        );

        return (
            <Modal
                isVisible={isVisible}
                title="Edit Speaker"
                renderContent={renderContent}
                renderFooter={app.currentUser && renderFooter}
                isLoading={isLoading || isSubmitting}
                closeFunction={hide} />
        );
    }
}

export default EditSpeakerModal;
