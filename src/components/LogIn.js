import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Link, Redirect} from 'react-router-dom';

import { loginUser } from '../thunks/userThunks';
import { loadingManager } from '../actions/userActions';

class LogIn extends React.Component {

  state = {
    email:'',
    password:'',
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
    this.props.loadingManager();
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


  render(){

    return(
      <div className="container" >
        <form onSubmit={this.handleSubmit} >
            { this.props.user.email ?
               <Redirect to='/'  />
               :
               null
            }
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
      </div>

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
