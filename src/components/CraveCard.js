import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import moment from 'moment';

const CraveCard = (props) => {

  const menuChoicesFilterAndMapper = (filterParam) => {
      const menuChoices = props.menuChoices.filter(choice => {
        return choice.id === filterParam
      })
      return menuChoices[0].name;
    }

    return(
      <div className="text-center p-4">
       {
         // <h4>Your Current Crave</h4>
       }
         <Card>
           {
             // <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
           }
          <CardBody>
            <CardSubtitle>Main Course:</CardSubtitle>
            <CardTitle style={{color:'#85a2b6'}}>{menuChoicesFilterAndMapper(props.userCrave.main_course_id)}</CardTitle>
            <CardSubtitle >Dessert:</CardSubtitle>
            <CardTitle style={{color:'#85a2b6'}}>{menuChoicesFilterAndMapper(props.userCrave.dessert_id)}</CardTitle>
            <CardSubtitle >Drink</CardSubtitle>
            <CardTitle style={{color:'#85a2b6'}}>{menuChoicesFilterAndMapper(props.userCrave.drink_id)}</CardTitle>
            <CardSubtitle >Other Crave:</CardSubtitle>
            <CardTitle style={{color:'#85a2b6'}}>{props.userCrave.other}</CardTitle>
            <CardTitle >Crave Expires: { moment(props.userCrave.created_at).add(24, 'hours').format('LLL') }</CardTitle>
          </CardBody>
        </Card>
      </div>
    )

}

const mapStateToProps = state => {
  return {
    userCrave: state.userReducer.user.last_crave,
    menuChoices: state.menuChoiceReducer.menuChoices,
  }
}

export default connect(mapStateToProps)(CraveCard) ;
