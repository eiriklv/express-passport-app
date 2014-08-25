/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var ProfilePicture = require('./profile-picture');
var ProfileLink = require('./profile-link');

module.exports = React.createClass({
    displayName: 'Avatar',

    render: function () {
        return (
            <div className='well'>
                <ProfilePicture username={this.props.username} />
                <ProfileLink username={this.props.username} />
            </div>
        );
    }
});
