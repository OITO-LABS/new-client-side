import React from "react";
import Logo from 'assets/images/logo.png';
import AlertModal from "../common/alertmodal";
class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <div className="header">
            <img className="header-logo" src={Logo} />
            <div className="d-flex align-items-center pr-2">
              <a className="pr-3 header-txt" href="#">
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
