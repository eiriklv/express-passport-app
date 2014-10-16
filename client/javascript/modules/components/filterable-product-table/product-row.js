/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ProductRow',

    render: function() {
        var name = this.props.product.stocked ? this.props.product.name : <span style={{color: 'red'}}>{this.props.product.name}</span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});
