import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

@inject('app')
@inject('speakers')
@inject('editSpeaker')
@observer
class SpeakersTable extends Component {

    renderSpeakerRows() {

        const { app, speakers, editSpeaker } = this.props;
        const { resultsPerPage, isLoading, currentPageSpeakers } = speakers;

        if (isLoading) {
            const placeholderRows = [];
            for (let i = 0; i < resultsPerPage; i++) {
                placeholderRows.push(
                    <tr key={`placeholder_${i}`} className="table__row">
                        <td colSpan="2" className="table__cell">
                            <div className="loading-placeholder table__content-placeholder"></div>
                        </td>
                    </tr>
                );
            }
            return placeholderRows;
        }

        let rows = currentPageSpeakers.map((speaker, index) => (
            <tr key={speaker.id} className="table__row">
                <td className="table__cell">{speaker.name}</td>
                <td className="table__cell">
                    <ul className="button-list">
                        <li className="button-list__item button-list__item--tiny-spacing">
                            <button className="button button--tiny" onClick={() => editSpeaker.show(speaker.id)}>
                                <i className="button__icon button__icon--tiny fa fa-pencil" />
                                <span>{app.currentUser !== null ? 'Edit' : 'View'}</span>
                            </button>
                        </li>
                    </ul>
                </td>
            </tr>
        ));

        if (rows.length === 0) {
            rows = (
                <tr className="table__row">
                    <td colSpan="2" className="table__cell table__cell--centered">No speakers to display.</td>
                </tr>
            );
        }

        return rows;
    }

    render() {

        const { sortAttribute, sortOrder, setSortAttribute } = this.props.speakers;

        return (
            <table className="table">
                <thead className="table__head">
                <tr className="table__row">
                    <th  className={classNames('table__head-cell', 'table__head-cell--sortable', { [`table__head-cell--sort-${sortOrder === 1 ? 'ascend' : 'descend'}`]: sortAttribute === 'name' })} onClick={() => setSortAttribute('name')}>
                        Name
                    </th>
                    <th className="table__head-cell table__head-cell--centered table__head-cell--small">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="table__body">
                    {this.renderSpeakerRows()}
                </tbody>
            </table>
        );
    }
}

export default SpeakersTable;
