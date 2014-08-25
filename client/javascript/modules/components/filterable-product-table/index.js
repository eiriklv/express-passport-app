/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var SearchBar = require('./search-bar');
var ProductTable = require('./product-table');

module.exports = React.createClass({
    displayName: 'FilterableProductTable',

    getInitialState: function () {
        return {
            filterText: '',
            inStockOnly: false
        };
    },

    handleUserInput: function (filterText, inStockOnly) {
        // refresh the state so that the children are re-rendered with new data (new props)
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render: function() {
        return (
            <div className={'panel panel-' + this.props.skin}>
                <div className='panel-heading'>
                    {this.props.title}
                </div>

                <div className='panel-body'>
                    <SearchBar
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                        onUserInput={this.handleUserInput}
                    />
                    <ProductTable
                        products={this.props.products}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                    />
                </div>
            </div>
        );
    }
});