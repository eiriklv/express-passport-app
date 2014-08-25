/** @jsx React.DOM */

'use strict';

var React = require('react');

var FlashMessage = require('./flash-message');

var count = 0;

module.exports = React.createClass({
    displayName: 'FlashMessages',

    getMessages: function (count) {
        var data = this.props.messages || {};
        var keys = Object.keys(data);

        return keys.map(function (key) {
            return <FlashMessage key={count++} text={data[key]} />
        });
    },

    render: function () {
        return (
            <div className='container'>
                {this.getMessages(0)}
            </div>
        );
    }
});