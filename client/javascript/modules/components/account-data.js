/** @jsx React.DOM */

'use strict';

var React = require('react');

var AccountPanel = require('./account-panel');

module.exports = React.createClass({
    displayName: 'AccountData',

    render: function() {
        return (
            <div>
                <AccountPanel
                    data={this.props.user.facebook}
                    service='facebook'
                    title='Facebook'
                    skin='primary'
                />

                <AccountPanel
                    data={this.props.user.google}
                    service='google'
                    title='Google'
                    skin='danger'
                />

                <AccountPanel
                    data={this.props.user.instagram}
                    service='instagram'
                    title='Instagram'
                    skin='warning'
                />
            </div>
        );
    }
});
