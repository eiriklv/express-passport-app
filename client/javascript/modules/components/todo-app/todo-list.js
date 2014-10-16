/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var TodoItem = require('./todo-item');

module.exports = React.createClass({
    displayName: 'TodoList',

    render: function () {
        var count = 0;

        var createItem = function (item) {
            return (
                <TodoItem
                    handleComplete={this.props.handleComplete}
                    key={item.id}
                    text={item.text}
                    complete={item.complete}
                />
            );
        }.bind(this);

        return (
            <ul className='list-group'>
                {this.props.items.map(createItem)}
            </ul>
        );
    }
});
