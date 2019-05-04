import React from 'react';
import { API_ROOT, ATUTHORIZED_HEADERS } from '../constants';
import {connect} from 'react-redux';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id, user_id: nextProps.user_id,});
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: ATUTHORIZED_HEADERS,
      body: JSON.stringify({message:this.state})
    });
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

export default connect(mapStateToProps)(NewMessageForm);
