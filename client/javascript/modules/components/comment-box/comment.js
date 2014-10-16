/** @jsx React.DOM */

'use strict';

var React = require('react');
var marked = require('marked');

module.exports = React.createClass({
    displayName: 'Comment',

    render: function() {
        var rawMarkup = marked(this.props.children.toString());

        var imageStyle = {
            width: '64px',
            height: '64px'
        };

        return (
            <li className='comment media'>
                <a className='pull-left' href='#'>
                    <img className='media-object' alt='64x64' src='http://placehold.it/64x64' style={imageStyle} />
                </a>
                <div className='media-body'>
                    <h4 className='media-heading'>{this.props.author}</h4>
                    <p>
                        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
                    </p>
                </div>
            </li>
        );
    }
});
