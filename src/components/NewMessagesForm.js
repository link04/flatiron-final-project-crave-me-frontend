import React from 'react';
import { API_ROOT, ATUTHORIZED_HEADERS } from '../constants';
import {connect} from 'react-redux';
import { postMessage } from '../thunks/conversationThunks'

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
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
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
