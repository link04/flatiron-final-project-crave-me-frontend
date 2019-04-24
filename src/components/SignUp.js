import React from 'react';
import { postUser } from '../thunks/userThunks'
import { connect } from 'react-redux';

class SignUp extends React.Component {

  state = {
    full_name:'',
    email:'',
    password:'',
    password_confirmation:'',
    // gender: null,
    coordinates:'',
    date_of_birth:'',
    image:null,
    interested_genders:[]
  }

  handleChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  handleFileUploader = (e) => {
   this.setState({
     user: {
       ...this.state.user,
       image: e.target.files[0]
     }
   })
 }

  handleSubmit = event => {
    event.preventDefault();
    debugger
    this.props.postUser(this.state);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} >
        <fieldset id="forms__input">
          <legend>Input fields</legend>
          <p><label htmlFor="full_name">Full Name</label> <input onChange={this.handleChange} id="full_name" value={this.state.full_name} name="full_name" placeholder="Text Input" type="text"/></p>
          <p><label htmlFor="password">Password</label> <input onChange={this.handleChange} name="password" value={this.state.password} placeholder="Type your Password" type="password"/></p>
          <p><label htmlFor="password_confirmation">Password Confirmation</label> <input onChange={this.handleChange} value={this.state.password_confirmation} name="password_confirmation" placeholder="Password Confirmation" type="password"/></p>
          <p><label htmlFor="email">Email Address</label> <input onChange={this.handleChange} name="email" value={this.state.email} placeholder="name@email.com" type="email"/></p>
          <p><label htmlFor="image">Profile picture</label><input onChange={this.handleFileUploader} type='file'  name='image' required accept="image/png, image/jpeg" /></p>
          <p><label htmlFor="date_of_birth">Birth Date</label><input onChange={this.handleChange} name="date_of_birth" type="date" name="date_of_birth" value={this.state.date_of_birth} /> </p>
          <input type="submit" />

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


const mapDispatchToProps = dispatch => ({
  postUser: (user) => dispatch(postUser(user))
})

export default connect(null, mapDispatchToProps)(SignUp);
