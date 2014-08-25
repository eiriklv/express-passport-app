/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var TodoList = require('./todo-list');
var TodoInput = require('./todo-input');
var TodoDeleteButton = require('./todo-delete-button');

module.exports = React.createClass({
    displayName: 'TodoApp',

    getInitialState: function() {
        return {items: [], index: 0, text: ''};
    },

    onChange: function (e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function (e) {
        // you should not be able to input empty todo's
        if (this.state.text.length < 1) return false;

        var currentIndex = this.state.index;

        e.preventDefault(); // could also use return false

        var nextItems = this.state.items.concat([{
            id: this.props.type + '-' + currentIndex,
            text: this.state.text,
            complete: false
        }]);

        var nextText = '';

        this.setState({items: nextItems, text: nextText, index: currentIndex + 1});
    },

    handleDelete: function () {
        var todoList = this.state.items;

        // remove the completed items
        for (var i = todoList.length - 1; i >= 0; i--) {
            if (todoList[i].complete) todoList.splice(i, 1);
        }

        this.setState({items: todoList});
    },

    handleComplete: function (childProps) {
        var newList = this.state.items;

        // set the requested item as complete
        newList.map(function (item, index, list) {
            if (childProps.key == item.id) {
                list[index].complete = !list[index].complete;
            }
        });

        this.setState({items: newList});
    },

    render: function() {
        var count = this.state.items.length;
        var title = this.props.title;

        return (
            <div className={'panel panel-' + this.props.skin}>
                <div className='panel-heading'>
                    <h3 className='panel-title'>{title} ({count} item{count == 1 ? '' : 's'})</h3>
                </div>
                <div className='panel-body' style={{backgroundColor: 'whitesmoke'}}>
                    <TodoInput
                        handleSubmit={this.handleSubmit}
                        handleChange={this.onChange}
                        handleDelete={this.handleDelete}
                        items={this.state.items.length + 1}
                        text={this.state.text}
                        placeholder={this.props.placeholder}
                    />

                    <TodoDeleteButton handleDelete={this.handleDelete} />
                </div>

                <TodoList
                    items={this.state.items}
                    handleComplete={this.handleComplete}
                />
            </div>
        );
    }
});
