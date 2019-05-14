import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect} from 'react-router-dom';

import { postUser, getUser } from '../thunks/userThunks';
import { getGenders } from '../thunks/genderThunks';
import { loadingManager } from '../actions/userActions';

import { Row, Col, Form, FormGroup, Input, CustomInput, InputGroup, FormFeedback, FormText, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class SignUp extends React.Component {

  state = {
    full_name:'',
    email:'',
    password:'',
    password_confirmation:'',
    gender_id:'',
    coordinates:'',
    date_of_birth:'',
    image:null,
    'interested_genders[]':[]
  }

  componentDidMount(){
    this.props.getGenders();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  handleInterestedGendersChange = event => {
    let interestedGendersCopy = [...this.state['interested_genders[]']];
    if (interestedGendersCopy.includes(event.target.value)) {
      interestedGendersCopy = interestedGendersCopy.filter(gender =>
        gender !== `${event.target.value}`
      )
    } else {
      interestedGendersCopy.push(event.target.value)
    }
    this.setState({
      'interested_genders[]': [...interestedGendersCopy]
    });
  }

  handleFileUploader = (e) => {
   this.setState({image: e.target.files[0]})
 }

  handleSubmit = event => {
    event.preventDefault();
    this.props.loadingManager();
    if(this.state['interested_genders[]'].length > 0)
      {
        let stateCopy = {...this.state};
        stateCopy.gender_id = parseInt(this.state.gender_id, 10);
        this.props.postUser(stateCopy);
      }
    this.props.loadingManager();
  }

  checkForErrors = (title,inputName) => {
    let errors;
    // un tested
    if (!!this.props.user && this.props.user.errors){

      if(this.props.user.errors[inputName] !== undefined){
        errors = this.props.user.errors[inputName].map((error, index) => {
         return <FormFeedback key={index}>{title} {error}</FormFeedback>
       })
      }
    }
    return errors;
  }

    geoFindMe = (userId) => {
        const success = (position) =>  {
          const coordinates = {
            coordinates: `${position.coords.latitude} ${position.coords.longitude}`
          }
            this.setState({coordinates: coordinates })
        }

        const error = () => {
          alert('Unable to retrieve your location, for acurate craving please try again.');
        }

        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser');
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
    }

  render(){
    const genders = this.props.genders.map(gender => {
      return (<option key={gender.id} value={gender.id} >{gender.name}</option>)
    })

    const interestedGenders = this.props.genders.map(gender => {
      return (<li key={'interest-'+ gender.id+''}>
        <label key={'interest-'+ gender.id+''} htmlFor={gender.name + "-interest"}>
          <input key={'interest-'+ gender.id+''}  onChange={ (event) => this.handleInterestedGendersChange(event)} id={gender.name + "-interest"} value={gender.id} name="interested_genders" type="checkbox"/>
          <br/>
         {gender.name}
        </label>
      </li>)
    })

    return(
      <div style={{width:'70vw', maxHeight:'80vh', overflowY:'auto' }} className="mx-auto text-center p-2 m-2" >
        <legend>Welcome To CraveMe</legend>
        <h5>Sign Up</h5>

        <Form autoComplete="off" onSubmit={this.handleSubmit} >
          { this.props.user.email ?
            <Redirect to='/'  />
             :
             null
          }
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input required onChange={this.handleChange} id="full_name" value={this.state.full_name} name="full_name" placeholder="Full Name" type="text"/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input invalid={!!this.checkForErrors('Email','email')} required onChange={this.handleChange} name="email" value={this.state.email} placeholder="Email: e.g name@email.com" type="email"/>
                {this.checkForErrors('Email','email')}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input type="select" id="gender" name="gender_id" value={this.state.gender} onChange={this.handleChange} required >
                  <option value=''>Select Gender</option>
                  {genders}
                  </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <InputGroup>
                  <Input className="form-control" invalid={!!this.checkForErrors('Age','age')}  required onChange={this.handleChange} id="date_of_birth" name="date_of_birth" type="date"  value={this.state.date_of_birth} />
                  <span className="input-group-text" ><FontAwesome name="calendar" /> </span>
                  {this.checkForErrors('','age')}
              </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <label htmlFor="interested_genders">Interested In:</label>
                <br/>
                  <ul className="interest-genders-ul ">
                    {interestedGenders}
                  </ul>
                  {!this.state['interested_genders[]'].length > 0 ?
                    <FormText color="text-danger">
                      <p className="text-danger">Choose at least one interest.</p>
                    </FormText>
                    :
                    null
                  }
            </FormGroup>
            </Col>
          </Row>
          <Row form   >
            <Col sm="12" md={{ size: 8, offset: 2 }} className="text-left">
              <FormGroup >
                {this.state.image !== null ?
                  <label>You choose {this.state.image.name}</label>
                  :
                  null
                }
                <CustomInput onChange={this.handleFileUploader} label={this.state.image === null? 'Choose Profile Image' : 'Image Selected'} type='file' id="image" name='image' required accept="image/png, image/jpeg" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm="12" md={{ size: 6, offset: 3 }} >
              <FormGroup>
                  <Input invalid={!!this.checkForErrors('Password','password')} required onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password" type="password"/>
                  {this.checkForErrors('Password','password')}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm="12" md={{ size: 6, offset: 3 }} >
              <FormGroup>
                <Input invalid={!!this.checkForErrors('Password Confirmation','password_confirmation')} required onChange={this.handleChange} value={this.state.password_confirmation} name="password_confirmation" placeholder="Password Confirmation" type="password"/>
                {this.checkForErrors('Password Confirmation','password_confirmation')}
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" className="m-2" color="primary">
            Sign Up <FontAwesome name="user-plus" />
          </Button>
        <p>Already a member?<Link to={`/login`} onClick={this.props.handleRedirectClick}  className="active"> Log In</Link></p>
      </Form>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  genders: state.genderReducer.genders
})

const mapDispatchToProps = dispatch => ({
  postUser: (user) => dispatch(postUser(user)),
  loadingManager: () => dispatch(loadingManager()),
  getGenders: () => dispatch(getGenders()),
  getUser: (user_id) => dispatch(getUser(user_id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
