import React from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import MatchCard from './MatchCard';

const MatchList = (props) => {

      const userMatches = (sentProps) => {
        if(Object.keys(sentProps.user).length > 0) {
          const mappedMatchesCards = [];
          sentProps.userMatches.forEach(match => {
            match.matched_craves.forEach(matched_crave => {
              if(matched_crave.user_data.id !== sentProps.user.id && matched_crave.accepted_match === null){
                mappedMatchesCards.push(<MatchCard  key={'matched_crave'+ matched_crave.id} matchData={matched_crave} />)
              }
            })
          })
          return mappedMatchesCards;
        } else {
          return []
        }
      }

    return(
      <div className="text-center p-4" >
        { userMatches(props).length > 0 ?
          <>
            {props.userMatches !== undefined ? userMatches(props) : null}
          </>
          :
          <>
            <h4>You Have No New Matches Yet</h4>
            <h6>Have you Craved, already?</h6>
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
