/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'TodoItem',

    handleComplete: function (e) {
        e.preventDefault();
        this.props.handleComplete(this.props);
    },

    render: function () {
        var itemStyle = {
            textDecoration: 'line-through'
        };

        return (
            <li className='list-group-item'>
                <a className='btn' onClick={this.handleComplete}><i className='fa fa-lg fa-check-circle'></i></a>
                <span style={this.props.complete ? itemStyle : {}}>
                    {this.props.text}
                </span>
            </li>
        );
    }
});
