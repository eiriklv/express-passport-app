/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactAsync = require('react-async');

module.exports = React.createClass({
    displayName: 'Header',

    getInitialState: function () {
        return this.props.user;
    },

    componentWillReceiveProps: function(nextProps) {
        console.log('updating header');
    },

    componentDidMount: function() {
        this.setActiveNavigationLink();
    },

    shouldComponentUpdate: function() {
        return false;
    },

    setActiveNavigationLink: function () {
        document.getElementById('nav-' + document.body.id).className = 'active';
    },

    render: function() {
        return (
            <nav className='navbar navbar-default' role='navigation'>
                <div className='container'>

                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <a className='navbar-brand' href='#'>Home</a>
                    </div>

                    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>

                        <ul className='nav navbar-nav'>
                            <li id='nav-home'><a href='/'>Home</a></li>
                            <li id='nav-profile'><a href='/profile'>Profile</a></li>

                            <li className='dropdown'>
                                <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Logged in: {this.state.fullname} <span className='caret'></span></a>
                                <ul className='dropdown-menu' role='menu'>
                                    <li><a href='#'>Email: {this.state.email}</a></li>
                                    <li><a href='/logout'>Log out</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});