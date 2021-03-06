'use strict';

var React = require('react/addons');
//noinspection JSUnusedGlobalSymbols
var BootstrapModal = require('../bootstrap/BootstrapModal');

var EditDashboardModal = React.createClass({
    getInitialState() {
        return {
            id: this.props.id,
            name: this.props.name,
            pattern: this.props.pattern
        };
    },
    _onPatternChange(event) {
        this.setState({pattern: event.target.value});
    },
    _onNameChange(event) {
        this.setState({name: event.target.value});
    },
    render() {
        var header = <h2>{this.props.create ? "Create" : "Edit"} Grok Pattern {this.state.name}</h2>;
        var body = (
            <fieldset>
                <label>Name:</label>
                <input type="text" onChange={this._onNameChange} value={this.state.name} required/>
                <label>Pattern:</label>
                <textarea onChange={this._onPatternChange} value={this.state.pattern} required></textarea>
            </fieldset>
        );
        return (
            <span>
                <button onClick={this.openModal} className={this.props.create ? "btn btn-small btn-success" : "btn btn-small"}>
                    <i className="icon-edit"></i> {this.props.create ? "Create pattern" : "Edit"}
                </button>
                <BootstrapModal ref="modal" onCancel={this._closeModal} onConfirm={this._save} cancel="Cancel" confirm="Save">
                   {header}
                   {body}
                </BootstrapModal>
            </span>
        );
    },
    _closeModal() {
        this.refs.modal.close();
    },
    openModal() {
        this.refs.modal.open();
    },
    _saved() {
        this._closeModal();
        if (this.props.create) {
            this.setState({name: "", pattern: ""});
        }
    },
    _save() {
        var pattern = this.state;
        this.props.savePattern(pattern, this._saved);
    }
});

module.exports = EditDashboardModal;
