import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from '../../../../Modal.jsx';
import Select from 'react-select';

@inject('app')
@inject('documents')
@inject('editDocument')
@observer
class EditDocumentModal extends Component {

    constructor() {

        super();
        this.state = {
            fileInputKey: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
        this.handleLabelsChange = this.handleLabelsChange.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const { name, value } = event.target;
        this.props.editDocument.setFormData(name, value);
    }

    handleSpeakerChange(value) {

        this.props.editDocument.setFormData('speaker', value);
    }

    handleLabelsChange(value) {

        this.props.editDocument.setFormData('labels', value);
    }

    handleFileInputChange(event) {

        const { value, files } = event.target;

        if (value === '' || files.length === 0) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            this.props.editDocument.setFormData('textContent', text);
            //TODO: this isn't working
            this.setState({
                fileInputKey: this.state.fileInputKey++
            });
        };
        reader.readAsText(files[0]);
    }

    handleSubmit(event) {

        event.preventDefault();

        this.props.editDocument.submit();
    }

    render() {

        const { app } = this.props;
        const { documentLabelOptions, speakerOptions } = this.props.documents;
        const { isVisible, isLoading, formData, formErrors, isSubmitting, hide } = this.props.editDocument;

        formData.title;
        formData.speaker;
        formData.date;
        formData.textContent;
        formData.labels;//TODO: these are needed to trigger re-render
        formErrors.title;
        formErrors.speaker;
        formErrors.date;
        formErrors.textContent;

        const renderContent = () => (
            <form id="form-edit-document" className="form" onSubmit={this.handleSubmit}>
                <label className="form__label">
                    <span>Title</span>
                    {formErrors.title ? (
                        <span className="form__error">{formErrors.title}</span>
                    ) : null}
                    <input className="form__text-input" type="text" name="title" disabled={app.currentUser === null} value={formData.title} onChange={this.handleChange} />
                </label>
                <label className="form__label">
                    <span>Speaker</span>
                    {formErrors.speaker ? (
                        <span className="form__error">{formErrors.speaker}</span>
                    ) : null}
                    <Select name="speaker" placeholder="" disabled={app.currentUser === null} value={formData.speaker} options={speakerOptions} onChange={this.handleSpeakerChange} />
                </label>
                <label className="form__label">
                    <span>Date</span>
                    {formErrors.date ? (
                        <span className="form__error">{formErrors.date}</span>
                    ) : null}
                    <input className="form__text-input" type="text" name="date" placeholder="YYYY-MM-DD" disabled={app.currentUser === null} value={formData.date} onChange={this.handleChange} />
                </label>
                <label className="form__label">
                    <span>Document Labels</span>
                    <Select name="labels" placeholder="" multi={true} options={documentLabelOptions} disabled={app.currentUser === null} value={formData.labels.peek()} onChange={this.handleLabelsChange} />
                </label>
                <label className="form__label">
                    <span>Text Content</span>
                    {formErrors.textContent ? (
                        <span className="form__error">{formErrors.textContent}</span>
                    ) : null}
                    <textarea className="form__textarea-input" name="textContent" rows="10" disabled={app.currentUser === null} value={formData.textContent} onChange={this.handleChange} />
                </label>
                {app.currentUser !== null ? (
                    <label className="form__label form__label--small">
                        Import from File
                        <input key={this.state.fileInputKey} className="form__file-select" type="file" accept="text/plain" onChange={this.handleFileInputChange} />
                    </label>
                ) : null}
            </form>
        );

        const renderFooter = () => (
            <div className="button-list button-list--right">
                <div className="button-list__item">
                    <button className="button button" onClick={hide}>Cancel</button>
                </div>
                <div className="button-list__item">
                    <button className="button button--primary" form="form-edit-document">Save</button>
                </div>
            </div>
        );

        return (
            <Modal
                isVisible={isVisible}
                title={`${app.currentUser !== null ? 'Edit' : 'View'} Document`}
                renderContent={renderContent}
                renderFooter={app.currentUser && renderFooter}
                isLoading={isLoading || isSubmitting}
                closeFunction={hide} />
        );
    }
}

export default EditDocumentModal;
