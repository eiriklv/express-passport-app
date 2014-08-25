/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ClientScripts',

    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return (
            <div>
                <script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js'></script>
                <script src='//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'></script>
                <script src='//cdn.jsdelivr.net/alertify.js/0.3.11/alertify.js'></script>
            </div>
        );
    }
});
