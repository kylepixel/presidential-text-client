import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import SpeakersFilters from './SpeakersFilters';
import SpeakersTableControls from './SpeakersTableControls';
import SpeakersTable from './SpeakersTable';

@inject('speakers')
@inject('createSpeaker')
@observer
class Speakers extends Component {

    constructor() {
        super();
        this.toggleFilters = this.toggleFilters.bind(this);
        this.state = {
            filtersAreVisible: false
        };
    }

    componentWillMount() {

        this.props.speakers.initializeState();
    }

    toggleFilters() {
        this.setState({
            filtersAreVisible: !this.state.filtersAreVisible
        });
    }

    render() {

        const { speakers, createSpeaker } = this.props;
        const { filtersAreVisible } = this.state;

        return (
            <div className="section data">
                <div className="section__header">
                    <div className="container">
                        <h1 className="section__heading">Speakers</h1>
                        <div className="section__header-buttons">
                            <button className="button" onClick={createSpeaker.show}>
                                <i className="button__icon fa fa-plus" />
                                <span>Create Speaker</span>
                            </button>
                        </div>
                    </div>
                </div>
                {filtersAreVisible ? (
                    <div className="section__filter-header">
                        <div className="container">
                            <SpeakersFilters />
                        </div>
                    </div>
                ) : null}
                <div className="section__navigation-header">
                    <div className="container">
                        <SpeakersTableControls toggleFilters={this.toggleFilters} filtersAreVisible={filtersAreVisible} />
                    </div>
                </div>
                <div className="section__body">
                    <div className="container">
                        <SpeakersTable />
                    </div>
                </div>
                <div className="section__navigation-header">
                    <div className="container">
                        <SpeakersTableControls />
                    </div>
                </div>
            </div>
        );
    }
}

export default Speakers;
