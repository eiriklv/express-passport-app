/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'CommentForm',

    handleSubmit: function() {
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text) {
            return false;
        }

        // submit to server
        this.props.onCommentSubmit({
            author: this.props.user.name,
            text: text
        });

        // clear inputs
        this.refs.text.getDOMNode().value = '';
        return false;
    },

    render: function() {
        return (
            <form role='form' className='commentForm' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input type='text' className='form-control' placeholder='Add a comment...' ref='text' />
                </div>
                <button type='submit' className='btn btn-default'>Submit</button>
            </form>
        );
    }
});
