/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var Comment = require('./comment');

module.exports = React.createClass({
    displayName: 'CommentList',

    render: function () {
        var commentNodes = this.props.comments.map(function (comment) {
            return (
                <Comment key={comment._id} author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });

        return (
            <ul className='comment-list media-list'>
                {commentNodes}
            </ul>
        );
    }
});