/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'TodoDeleteButton',

    render: function() {
        return (
            <button onClick={this.props.handleDelete} className='btn btn-default'>
                <i className='fa fa-lg fa-check'></i> Clear completed
            </button>
        );
    }
});
