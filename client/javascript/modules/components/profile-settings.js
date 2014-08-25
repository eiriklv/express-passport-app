/** @jsx React.DOM */

'use strict';

var React = require('react');

var ReactAsync = require('react-async');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Form = require('react-bootstrap').Form;
var Input = require('react-bootstrap').Input;

// Our custom component is managing whether the Modal is visible
module.exports = React.createClass({
    mixins: [OverlayMixin, ReactAsync.Mixin],

    getInitialStateAsync: function (callback) {
        callback(null, {
            submittable: true,
            submitText: 'Submit',
            isModalOpen: false,
            inputs: {}
        });
    },

    componentDidMount: function () {
        this.props.api.profile.get(function (err, user) {
            this.setState({
                inputs: {
                    id: user._id,
                    email: user.email,
                    fullname: user.fullname
                }
            });
        }.bind(this));
    },

    handleToggle: function () {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            inputs: this.state.inputs
        });
    },

    handleChange: function (field) {
        return function (event) {
            this.state.inputs[event.target.id] = event.target.value;
            this.setState(this.state);
        }.bind(this);
    },

    handleSubmit: function (event) {
        event.preventDefault();

        if (this.state.submittable) {
            this.setState({
                submittable: false,
                submitText: 'Wait..'
            });

            console.log('submitting');
            console.log(this.state.inputs);

            setTimeout(function () {
                this.setState({
                    submittable: true,
                    submitText: 'Submit'
                });
            }.bind(this), 5000);
        }
    },

    render: function () {
        return (
            <div className='container'>
                <div className='well text-center'>
                    <Button onClick={this.handleToggle} bsStyle="primary">Edit Profile</Button>
                </div>
            </div>
        );
    },

    // This is called by the `OverlayMixin` when this component
    // is mounted or updated and the return value is appended to the body.
    renderOverlay: function () {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <Modal title="Edit Profile" onRequestHide={this.handleToggle}>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            id='fullname'
                            value={this.state.inputs.fullname}
                            onChange={this.handleChange('fullname')}
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            id='email'
                            value={this.state.inputs.email}
                            onChange={this.handleChange('email')}
                            type="text"
                            className="form-control"
                            placeholder="Type your email here"
                        />
                    </div>
                    <div className="form-group">
                        <label>Old Password</label>
                        <input
                            id='oldPassword'
                            value={this.state.inputs.oldPassword}
                            onChange={this.handleChange('oldPassword')}
                            type="password"
                            className="form-control"
                            placeholder="Enter your old password here"
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            id='newPassword'
                            value={this.state.inputs.newPassword}
                            onChange={this.handleChange('newPassword')}
                            type="password"
                            className="form-control"
                            placeholder="Type your new password here"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            id='confirmPassword'
                            value={this.state.inputs.confirmPassword}
                            onChange={this.handleChange('confirmPassword')}
                            type="password"
                            className="form-control"
                            placeholder="Confirm your new password here"
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <Button onClick={this.handleSubmit}>{this.state.submitText}</Button>
                    <Button onClick={this.handleToggle}>Close</Button>
                </div>
            </Modal>
        );
    }
});
