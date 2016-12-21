/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import  * as messagesActions from './messagesActions';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }
    handleOnSubmit(event) {
        event.preventDefault();
        this.props.addMessage(this.state.message, userId)
    }
    render() {
        var messages = this.props.messages ? this.props.messages.map(function(item, i){
            return <li  key={i}>{item.user} : {item.text}</li>
        }): []
        return (
            <div style={{margin: '0 auto', maxWidth:'1024'}}>
                <h1>Chat</h1>
                <div style={{border: '1px solid ',height: 450}}>
                <ul>{messages}</ul>
                </div>
                <from onSubmit={this.handleOnSubmit}>
                    <input type="text"
                           onChange={(event)=>{this.setState({message: event.target.value})}}
                           placeholder="Type your message here..."
                           style={{border:'1px solid ', width: '100%'}}/>
                    <input value="שלח"
                          disabled={false}
                          type="submit"/>
                </from>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        state: state,
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(messagesActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);