import React from 'react';
import { postUser } from '../thunks/userThunks';
import { getUser } from '../thunks/userThunks';
import { getGenders } from '../thunks/genderThunks';
import { loadingManager } from '../actions/userActions';

import { connect } from 'react-redux';

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

    // this.props.loadingManager();
    // this.props.getUser(2);
    // console.log(this.props.user);
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
    }
    , () => console.log(this.state['interested_genders[]']));

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
      } else {

      }

  }

  checkForErrors = () => {
    let errors;
    if (this.props.user !== undefined && this.props.user.errors){
       errors = this.props.user.errors.map((error, index) => {
        return <li key={index}>{error}</li>;
      })
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
          <input key={'interest-'+ gender.id+''}  onChange={this.handleInterestedGendersChange} id={gender.name + "-interest"} value={gender.id} name="interested_genders" type="checkbox"/>
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
          <p><label htmlFor="image">Profile picture</label><input onChange={this.handleFileUploader} type='file'  name='image' required accept="image/png, image/jpeg" /></p>
          <p><label htmlFor="date_of_birth">Birth Date</label><input required onChange={this.handleChange} name="date_of_birth" type="date"  value={this.state.date_of_birth} /> </p>
          <p><label htmlFor="password">Password</label> <input required onChange={this.handleChange} name="password" value={this.state.password} placeholder="Type your Password" type="password"/></p>
          <p><label htmlFor="password_confirmation">Password Confirmation</label> <input required onChange={this.handleChange} value={this.state.password_confirmation} name="password_confirmation" placeholder="Password Confirmation" type="password"/></p>
          <input type="submit" />
          <ul>
            {this.checkForErrors()}
          </ul>
        </fieldset>




      {/*

       <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__select">
          <legend>Select menus</legend>
          <p><label for="select">Select</label> <select id="select">
              <optgroup label="Option Group">
                <option>
                  Option One
                </option>
                <option>
                  Option Two
                </option>
                <option>
                  Option Three
                </option>
              </optgroup>
          </select></p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__checkbox">
          <legend>Checkboxes</legend>
          <ul>
            <li><label for="checkbox1"><input onChange={this.handleChange} checked="checked" id="checkbox1" name="checkbox" type="checkbox" /> Choice A</label></li>
            <li><label for="checkbox2"><input onChange={this.handleChange} id="checkbox2" name="checkbox" type="checkbox"/> Choice B</label></li>
            <li><label for="checkbox3"><input onChange={this.handleChange} id="checkbox3" name="checkbox" type="checkbox"/> Choice C</label></li>
          </ul>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__textareas">
          <legend>Textareas</legend>
          <p><label for="textarea">Textarea</label>
            <textarea cols="48" id="textarea" placeholder="Enter your message here" rows="8"></textarea></p>
        </fieldset>
        <p><a href="#top">[Top]</a></p>
        <fieldset id="forms__html5">
          <fieldset id="forms__action">
            <legend>Action buttons</legend>
            <p><input onChange={this.handleChange} type="submit" value="input type=submit"/> <input onChange={this.handleChange} type="button" value="input type=button"/> <input onChange={this.handleChange} type="reset" value="input type=reset"/> <input onChange={this.handleChange} disabled="" type="submit" value="input disabled"/></p>
            <p><button type="submit">&lt;button type=submit&gt;</button> <button type="button">&lt;button type=button&gt;</button> <button type="reset">&lt;button type=reset&gt;</button> <button disabled="" type="button">&lt;button disabled&gt;</button></p>
          </fieldset>
          <p><a href="#top">[Top]</a></p>
        </fieldset> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
