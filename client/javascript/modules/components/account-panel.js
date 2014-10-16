/** @jsx React.DOM */

'use strict';

var React = require('react');

var Panel = require('react-bootstrap').Panel;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    displayName: 'SocialAccount',

    render: function() {
        var title = (
            <h3>{this.props.title}</h3>
        );

        var buttonHref = this.props.data ?
            '/auth/' + this.props.service + '/unlink':
            '/auth/' + this.props.service + '/connect';

        var buttonText = this.props.data ?
            'Unlink Account':
            'Connect Account';

        return(
            <Panel header={title} bsStyle={this.props.skin}>
                <div className='text-center'>
                    <Button href={buttonHref} bsStyle={this.props.skin}>
                        {buttonText}
                    </Button>
                </div>
            </Panel>
        );
    }
});
