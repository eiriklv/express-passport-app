/** @jsx React.DOM */

'use strict';

var React = require('react');

var Alert = require('react-bootstrap').Alert;

module.exports = React.createClass({
    displayName: 'FlashMessage',

    handleAlertDismiss: function () {
        this.getDOMNode().remove();
    },

    render: function () {
        return (
            <Alert onDismiss={this.handleAlertDismiss} bsStyle="warning">
                <strong>Message: </strong> {this.props.text}
            </Alert>
        );
    }
});