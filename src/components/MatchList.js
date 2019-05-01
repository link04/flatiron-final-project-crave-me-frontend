import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MatchCard from './MatchCard';

const MatchList = (props) => {

      const userMatches = (sentProps) => {
        const mappedMatchesCards = [];
        sentProps.userMatches.forEach(match => {
          match.matched_craves.forEach(matched_crave => {
            if(matched_crave.user_data.id !== sentProps.user.id && matched_crave.accepted_match === null){
              mappedMatchesCards.push(<MatchCard  key={'matched_crave'+ matched_crave.id} matchData={matched_crave} />)
            }
          })
        })
        return mappedMatchesCards;
      }


    return(
      <div className="text-center p-4" >
        { props.userMatches > 0 || Object.keys({...props.user.last_crave}).length > 0  ?
          <>
            <h4>Actual Matches</h4>
            {props.userMatches !== undefined ? userMatches(props) : null}
          </>
          :
          <>
            <h4>You Have No Matches Yet</h4>
            <h6>Did you craved, already?</h6>
          </>
        }
      </div>
    )

}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    userMatches: state.userReducer.user.active_matches
  }
}

export default connect(mapStateToProps)(MatchList) ;
