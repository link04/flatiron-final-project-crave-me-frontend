import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MatchCard from './MatchCard';

const MatchList = (props) => {

  const menuChoicesFilterAndMapper = (filterParam) => {
      const menuChoices = props.menuChoices.filter(choice => {
        return choice.id === filterParam
      })
      return menuChoices[0].name;
    }

    return(
      <div className="text-center p-4">
        <h4>Actual Matches</h4>
        <MatchCard />

      </div>
    )

}

const mapStateToProps = state => {
  return {
    userCrave: state.userReducer.user.last_crave,
    menuChoices: state.menuChoiceReducer.menuChoices,
  }
}

export default connect(mapStateToProps)(MatchList) ;
