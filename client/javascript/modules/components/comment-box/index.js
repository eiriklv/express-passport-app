/** @jsx React.DOM */

'use strict';

var React = require('react');

// mixins
var SetIntervalMixin = require('../../mixins/set-interval');

// sub-components
var CommentList = require('./comment-list');
var CommentForm = require('./comment-form');

module.exports = React.createClass({
    displayName: 'CommentBox',

    mixins: [SetIntervalMixin],

    getInitialState: function() {
        return {comments: this.props.comments || []};
    },

    loadCommentsFromServer: function() {
        this.props.api.comments.get(null, function(err, comments) {
            if (err) {
                console.error(err.toString());
            } else {
                this.setState({comments: comments});
            }
        }.bind(this));
    },

    postComment: function(comment) {
        this.props.api.comments.create(comment, function(err, comment) {
            if (err) {
                console.error(err.toString());
            } else {
                var comments = this.state.comments;
                var newComments = comments.concat([comment]);
                this.setState({comments: newComments});
            }
        }.bind(this));
    },

    handleCommentSubmit: function(comment) {
        this.postComment(comment);
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        this.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className='comment-box panel panel-default'>

                <div className='panel-heading'>
                    <h3 className='panel-title'>Comments ({this.state.comments.length})</h3>
                </div>

                <div className='panel-body'>
                    <CommentList comments={this.state.comments} />
                    <CommentForm user={this.props.user} onCommentSubmit={this.handleCommentSubmit} />
                </div>

            </div>
        );
    }
});
