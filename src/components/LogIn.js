import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Link, Redirect} from 'react-router-dom';

import { loginUser } from '../thunks/userThunks';
import { loadingManager, removeUser } from '../actions/userActions';

import { Row, Col, Form, FormGroup, Input, FormFeedback, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

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
         return <FormFeedback key={index} >{error}</FormFeedback>;
       })
      }
    }
    return errors;
  }


  render(){

    return(
      <div style={{width:'70vw'}} className="mx-auto text-center p-2 m-2" >
        <legend>Welcome To CraveMe</legend>
          <p>Match with users located wtihin 6 miles of your location and with who you have at least two craved meals in common.</p>
        <h5>Log In</h5>
        <Form autoComplete="off" onSubmit={this.handleSubmit} >
            { this.props.user.email ?
               <Redirect to='/'  />
               :
               null
            }
          <Row form>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
               <Input invalid={!!this.checkForErrors('password')} required onChange={this.handleChange} name="email" value={this.state.email} placeholder="Email: e.g. name@email.com" type="email" />
                   {this.checkForErrors('password')}
             </FormGroup>
             <FormGroup>
              <Input invalid={!!this.checkForErrors('password')} required onChange={this.handleChange} name="password" value={this.state.password} placeholder="Password" type="password" />
                  {this.checkForErrors('password')}
            </FormGroup>
            <Button type="submit" className="m-2" color="primary">
              Log In <FontAwesome name="sign-in" />
            </Button>
            <p>Need an account?<Link to={`/signup`} onClick={this.props.handleRedirectClick} className="active"> Sign Up</Link></p>
           </Col>
         </Row>

        </Form>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  user: state.userReducer.user
})

const mapDispatchToProps = dispatch => ({
  loadingManager: () => dispatch(loadingManager()),
  loginUser: (user) => dispatch(loginUser(user)),
  cleanUserObject: () => dispatch(removeUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
