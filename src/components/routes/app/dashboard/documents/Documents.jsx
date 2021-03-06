import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DocumentsFilters from './DocumentsFilters';
import DocumentsTableControls from './DocumentsTableControls';
import DocumentsTable from './DocumentsTable';

@inject('app')
@inject('documents')
@inject('createDocument')
@inject('manageDocumentLabels')
@observer
class Documents extends Component {

    constructor() {
        super();
        this.toggleFilters = this.toggleFilters.bind(this);
        this.state = {
            filtersAreVisible: false
        };
    }

    componentWillMount() {

        this.props.documents.initializeState();
    }

    toggleFilters() {
        this.setState({
            filtersAreVisible: !this.state.filtersAreVisible
        });
    }

    render() {

        const { app, createDocument, manageDocumentLabels } = this.props;
        const { filtersAreVisible } = this.state;

        return (
            <div className="section data">
                <div className="section__header">
                    <div className="container">
                        <h1 className="section__heading">Documents</h1>
                        {app.currentUser !== null ? (
                            <div className="section__header-buttons">
                                <button className="button" onClick={manageDocumentLabels.show}>
                                    <i className="button__icon fa fa-tags" />
                                    <span>Manage Document Labels</span>
                                </button>
                                <button className="button" onClick={createDocument.show}>
                                    <i className="button__icon fa fa-plus" />
                                    <span>Create Document</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                {filtersAreVisible ? (
                    <div className="section__filter-header">
                        <DocumentsFilters />
                    </div>
                ) : null}
                <div className="section__navigation-header">
                    <div className="container">
                        <DocumentsTableControls toggleFilters={this.toggleFilters} filtersAreVisible={filtersAreVisible} />
                    </div>
                </div>
                <div className="section__body">
                    <div className="container">
                        <DocumentsTable />
                    </div>
                </div>
                <div className="section__navigation-header">
                    <div className="container">
                        <DocumentsTableControls />
                    </div>
                </div>
            </div>
        );
    }
}

export default Documents;
