import React from 'react';
import {connect} from 'react-redux';

// import { getMenuChoices } from '../actions/menuChoiceActions';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { postCrave } from '../thunks/craveThunks';

class CraveForm extends React.Component {

  state = {
    user_id: 0,
    other: '',
    main_course_id: 0,
    dessert_id: 0,
    drink_id: 0
  }

  handleInputChange = (event) =>  {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = (event) =>  {
    event.preventDefault();
    this.setState({user_id: this.props.userId},
      () => this.props.postCrave(this.state));
  }

  menuChoicesFilterAndMapper = (filterParam) => {
    const menuChoices = this.props.menuChoices.filter(choice => {
      return choice.category === filterParam
    })
    return menuChoices.map(choice => {
      return (<option key={choice.id} value={choice.id} >{choice.name}</option>)
    })
  }

  render(){


    return(
      <div className="text-center p-4">
        <h5>Create Crave</h5>
          <form onSubmit={this.handleSubmit} >
            <fieldset id="forms__input">
              <p><label htmlFor="main_course">Main Course: </label>
              <br/>
                <select id="main_course" name="main_course_id" onChange={this.handleInputChange} required>
                  <option value='' >Choose Main Course</option>
                  {this.menuChoicesFilterAndMapper('main_course')}
                </select>
              </p>
              <p><label htmlFor="dessert">Dessert: </label>
              <br/>
                <select id="dessert" name="dessert_id" onChange={this.handleInputChange} required>
                  <option value='' >Choose Dessert</option>
                  {this.menuChoicesFilterAndMapper('dessert')}
                </select>
              </p>
              <p><label htmlFor="drink_id">Drink: </label>
              <br/>
                <select id="drink" name="drink_id" onChange={this.handleInputChange} required>
                  <option value='' >Choose Drink</option>
                  {this.menuChoicesFilterAndMapper('drink')}
                </select>
              </p>
              <p><label htmlFor="other">Other not included crave?</label>
              <br/>
               <input required onChange={this.handleInputChange} name="other" id="other" value={this.state.other} name="other" placeholder="Text Input" type="text"/></p>
            <input type="submit" value="Start Craving"/>
            </fieldset>
          </form>
      </div>
    );
  };
}

  const mapStateToProps = state => {
    return {
      menuChoices: state.menuChoiceReducer.menuChoices,
      userId: state.userReducer.user.id,
      user: state.userReducer.user
    };
  }

  const mapDispatchToProps = dispatch => ({
    postCrave: (crave) => dispatch(postCrave(crave))
  })

export default connect(mapStateToProps,mapDispatchToProps)(CraveForm)
