/** @jsx React.DOM */

'use strict';

var React = require('react');

// sub-components
var ProductRow = require('./product-row');
var ProductCategoryRow = require('./product-category-row');

module.exports = React.createClass({
    displayName: 'ProductTable',

    render: function() {
        var rows = [];
        var lastCategory = null;

        this.props.products.forEach(function (product) {
            // remove products that are not a part of the filter (ship them by returning)
            if (product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }

            // if a new category arrives (and assuming the products are sorted) we print a new category row
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            // print a regular product row
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));

        return (
            <table className='table table-condensed'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});