/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

// Our custom component is managing whether the Modal is visible
module.exports = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function () {
        return {
            isModalOpen: false
        };
    },

    handleToggle: function () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        return (
            <div className='container'>
                <div className='well'>
                    <Button onClick={this.handleToggle} bsStyle="primary">Edit Profile</Button>
                </div>
            </div>
        );
    },

    // This is called by the `OverlayMixin` when this component
    // is mounted or updated and the return value is appended to the body.
    renderOverlay: function () {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <Modal title="Modal heading" onRequestHide={this.handleToggle}>
                <div className="modal-body">
                    This modal is controlled by our custom trigger component.
                </div>
                <div className="modal-footer">
                    <Button onClick={this.handleToggle}>Close</Button>
                </div>
            </Modal>
        );
    }
});
