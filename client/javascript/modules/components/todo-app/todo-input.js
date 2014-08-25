/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'TodoInput',

    render: function() {
        return (
            <div className='form-group'>
                <form onSubmit={this.props.handleSubmit}>
                    <input
                        className='form-control'
                        placeholder={this.props.placeholder}
                        onChange={this.props.handleChange}
                        value={this.props.text}
                    />
                </form>
            </div>
        );
    }
});
