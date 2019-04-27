import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import { loginUser, getUser } from '../thunks/userThunks';
import { loadingManager } from '../actions/userActions';

class LogIn extends React.Component {

  state = {
    email:'',
    password:'',
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.email !== prevProps.email){
      this.props.history.push("/cravecontainer")
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.loadingManager();
    this.props.loginUser(this.state);
  }

  checkForErrors = (inputName) => {
    let errors;
    if (!!this.props.user && this.props.user.errors){
      if(!!this.props.user.errors[inputName]){
        errors = this.props.user.errors[inputName].map((error, index) => {
         return <li key={index}>{error}</li>;
       })
      }
    }
    return errors;
  }

  userLogged = () => {
    if(!!localStorage.token){
      this.props.history.push("/cravecontainer")
    }
  }

  render(){

    return(
      <form onSubmit={this.handleSubmit} >
        <fieldset>
          <legend>Welcome To CraveMe</legend>
          <h4>Log In</h4>
          <p><label htmlFor="email">Email Address</label> <input required onChange={this.handleChange} name="email" value={this.state.email} placeholder=" e.g. name@email.com" type="email"/></p>
          <p><label htmlFor="password">Password</label> <input required onChange={this.handleChange} name="password" value={this.state.password} placeholder="Type Password" type="password"/></p>
            <ul>
              {this.checkForErrors('password')}
            </ul>
         <input type="submit" value="Log In" />
         <p>Lacking an account?<Link to={`/signup`} className="active"> Sing Up</Link></p>
        </fieldset>
      </form>
    )
  };
};

const mapStateToProps = state => ({
  user: state.userReducer.user
})

const mapDispatchToProps = dispatch => ({
  loadingManager: () => dispatch(loadingManager()),
  loginUser: (user) => dispatch(loginUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
