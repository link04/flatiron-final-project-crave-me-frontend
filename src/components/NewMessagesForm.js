import React from 'react';
import {connect} from 'react-redux';
import { postMessage } from '../thunks/conversationThunks';
import FontAwesome from 'react-fontawesome';

import '../assets/css/conversation-messages.css';


class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id, user_id: nextProps.user_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postMessage(this.state)
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit} id="new-message-form"  >
          <div className="input_msg_write">
            <input type="text" value={this.state.text} onChange={this.handleChange} className="write_msg"
             placeholder="Type a message" required/>
           <button type="submit" form="new-message-form"   className="msg_send_btn" >
              <FontAwesome name='paper-plane' aria-hidden="true" />
            </button>
          </div>
      </form>
    );
  };
}

const mapStateToProps = state => {
  return { user: state.userReducer.user }
}

const mapDispatchToProps = dispatch => ({
  postMessage: (message) => dispatch(postMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm);
