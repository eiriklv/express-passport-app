/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ProfilePicture',

    render: function () {
        return (
            <img src={'http://graph.facebook.com/' + this.props.username + '/picture'} />
        );
    }
});
