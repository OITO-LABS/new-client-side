import React from "react";
import Logo from 'assets/images/logo.png';
import {RESET_PASSWORD,GOTO_URL} from "utils/constants";
import AlertModal from "../common/alertmodal";
class Header extends React.Component {
  constructor(props) {
    super(props)
  
   this.onReset = this.onReset.bind(this);
  }
  
  onReset() {
    app.events.trigger(GOTO_URL, { routerKey: RESET_PASSWORD });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="header">
            <img className="header-logo" src={Logo} />
            <div className="d-flex align-items-center pr-2">
              <a className="pr-3 header-txt" onClick={this.onReset} href="#">
                Change Password?
              </a>
              <a className="header-txt" href="#">
                Logout <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
          <AlertModal/>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
