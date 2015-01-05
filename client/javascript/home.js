/**
 * @jsx React.DOM
 */
'use strict';

// config
var config = require('client/config');
var api = require('client/modules/api')(config);

// dependencies
var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');
var io = require('socket.io-client');
var sockets = require('client/modules/sockets/home');

// common components
var Head = require('client/modules/components/common/head');
var Header = require('client/modules/components/common/header');
var ClientScripts = require('client/modules/components/common/client-scripts');

// custom components
var TodoApp = require('client/modules/components/todo-app');
var CommentBox = require('client/modules/components/comment-box');
var Avatar = require('client/modules/components/avatar');
var Counter = require('client/modules/components/counter');
var LikeButton = require('client/modules/components/like-button');
var Ticker = require('client/modules/components/ticker');
var Time = require('client/modules/components/time');
var FilterableProductTable = require('client/modules/components/filterable-product-table');

var App = React.createClass({

    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function(callback) {
        callback(null, this.props); // set the input props as state (equal to 'return this.props' in getInitialState, but async)
    },

    componentDidMount: function() {
        // intialize socket.io
        sockets(io);
        console.log(config);
    },

    render: function() {
        return (
            <html>

                <Head title={this.state.title} description={this.state.description} />

                <body id="home">

                    <Header user={this.state.user} />

                    <div className="container">
                        <div className="jumbotron text-center">
                            <h1>React Demo Components</h1>
                        </div>
                    </div>

                    <div className="MainPage container">

                        <Counter initialCount={10} />

                        <Time startTime={this.state.startTime} />

                        <LikeButton liked={false} />

                        <Ticker offset={0} interval={1000} />

                        <TodoApp
                            type='todo'
                            title='TODO'
                            skin='warning'
                            placeholder='What do you need to do?'
                        />

                        <TodoApp
                            type='focus'
                            title='FOCUS AREAS'
                            skin='success'
                            placeholder='What do you need to focus on?'
                        />

                        <TodoApp
                            type='goal'
                            title='GOALS'
                            skin='info'
                            placeholder='What are your goals?'
                        />

                        <TodoApp
                            type='motivation'
                            title='MOTIVATIONS'
                            skin='danger'
                            placeholder='What are your motivations?'
                        />

                        <CommentBox user={this.state.user} api={api} pollInterval={3000} />

                        <FilterableProductTable
                            skin='danger'
                            title='Filterable Product Table'
                            products={this.state.products}
                        />

                    </div>

                    <ClientScripts />

                </body>

            </html>
        );
    }
});

module.exports = App;

if (typeof window !== 'undefined') {
    if (config.environment == 'development') {
        window.React = require('react');
    }

    window.onload = function() {
        React.renderComponent(App(), document);
    }
}
