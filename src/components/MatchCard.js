import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const MatchCard = (props) => {

  const menuChoicesFilterAndMapper = (filterParam) => {
      const menuChoices = props.menuChoices.filter(choice => {
        return choice.id === filterParam
      })
      return menuChoices[0].name;
    }

    return(
      <div className="text-center p-4  justify-content-center" >

        <div className="card mb-9" >
          <div className="row no-gutters justify-content-center">
              <div className="col-md-3">
                <img src={require('../assets/images/would-eat.png')} className="card-img" alt="Read heart with fork and knife." />
              </div>

              <div className="col-md-3">
                <img src="https://wrappixel.com/demos/admin-templates/pixeladmin/plugins/images/users/1.jpg" className="card-img" alt="..." />

              </div>
              <div className="col-md-3">
              <img src={require('../assets/images/would-not-eat.png')} className="card-img" alt="Black heart with fork and knife." />
              </div>
            </div>
            <div class="card-footer">
              <p className="card-text"><h5>Mario Perez</h5> and you Craved: KFC, IceCream </p>
            </div>
        </div>

      </div>
    )

}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(MatchCard) ;
