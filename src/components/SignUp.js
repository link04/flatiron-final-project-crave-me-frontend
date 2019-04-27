import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';

import { postUser, getUser } from '../thunks/userThunks';
import { getGenders } from '../thunks/genderThunks';
import { loadingManager } from '../actions/userActions';

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
  componentDidUpdate(prevProps) {
    if(this.props.user.email !== prevProps.email){
      this.props.history.push("/cravecontainer")
    }
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
  }

  checkForErrors = (title,inputName) => {
    let errors;
    if (this.props.user !== undefined && this.props.user.errors){

      if(this.props.user.errors[inputName] !== undefined){
        console.log(this.props.user.errors[inputName]);

        errors = this.props.user.errors[inputName].map((error, index) => {
         return <li key={index}>{title} {error}</li>;
       })
      }
    }
    return errors;
  }

  render(){
    const genders = this.props.genders.map(gender => {
      return (<option key={gender.id} value={gender.id} >{gender.name}</option>)
    })

    const interestedGenders = this.props.genders.map(gender => {
      return (<li key={'interest-'+ gender.id+''}>
        <label key={'interest-'+ gender.id+''} htmlFor={gender.name + "-interest"}>
          <input key={'interest-'+ gender.id+''}  onChange={ () => this.handleInterestedGendersChange()} id={gender.name + "-interest"} value={gender.id} name="interested_genders" type="checkbox"/>
          {gender.name}
        </label>
      </li>)
    })

    return(
      <form onSubmit={this.handleSubmit} >
        <fieldset id="forms__input">
          <legend>Welcome To CraveMe</legend>
          <h4>Sign Up</h4>
          <p><label htmlFor="full_name">Full Name</label> <input required onChange={this.handleChange} id="full_name" value={this.state.full_name} name="full_name" placeholder="Text Input" type="text"/></p>
          <p><label htmlFor="gender">I identify As:</label>
            <select id="gender" name="gender_id" value={this.state.gender} onChange={this.handleChange} required>
              <option value='' >Select Option</option>
              {genders}
            </select>
          </p>
          <div>
            <label htmlFor="interested_genders">Interested In:</label>
              <ul>
                {interestedGenders}
              </ul>
              {!this.state['interested_genders[]'].length > 0 ?
                <ul>
                  <li>Choose at least one interest.</li>
                </ul>
                :
                null
              }
          </div>

          <p><label htmlFor="email">Email Address</label> <input required onChange={this.handleChange} name="email" value={this.state.email} placeholder="name@email.com" type="email"/></p>
            <ul>
              {this.checkForErrors('Email','email')}
            </ul>
          <p><label htmlFor="image">Profile picture</label><input onChange={this.handleFileUploader} type='file'  name='image' required accept="image/png, image/jpeg" /></p>
          <p><label htmlFor="date_of_birth">Birth Date</label><input required onChange={this.handleChange} name="date_of_birth" type="date"  value={this.state.date_of_birth} /> </p>
            <ul>
              {this.checkForErrors('Age','age')}
            </ul>
          <p><label htmlFor="password">Password</label> <input required onChange={this.handleChange} name="password" value={this.state.password} placeholder="Type your Password" type="password"/></p>
            <ul>
              {this.checkForErrors('Password','password')}
            </ul>
          <p><label htmlFor="password_confirmation">Password Confirmation</label> <input required onChange={this.handleChange} value={this.state.password_confirmation} name="password_confirmation" placeholder="Password Confirmation" type="password"/></p>
            <ul>
              {this.checkForErrors('Password Confirmation','password_confirmation')}
            </ul>
        <input type="submit" value="Start Craving"/>
        <p>Already a member?<Link to={`/login`} className="active"> Log In</Link></p>
        </fieldset>
      </form>
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
