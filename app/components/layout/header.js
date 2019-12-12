import React from "react";
import Logo from 'assets/images/logo.png';
import { RESET_PASSWORD, GOTO_URL, USER_SIGNOUT, USER_RESET, SHOW_ALERT_MSG, ALERT_TYPE } from "utils/constants";
import AlertModal from "../common/alertmodal";
import { confirm } from 'utils/common';
import dataService from 'utils/dataservice';
class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onChangePassword = this.onChangePassword.bind(this);
  }

  async onChangePassword() {
    let isConfirm = false;
    isConfirm = await confirm({
      msg: 'Do you want to change password?'
    });
    if (isConfirm) {
      dataService.postRequest("forgot", { to: app.userAuth.username })
        .then(res => {
          if (res.status == 'success') {
            app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.SUCESS, msg: "Check your email to reset password!" });
          }
          else {
            app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: `${res.message}` });
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    // app.events.trigger(USER_RESET,  {status:"logout"});
    // app.events.trigger(GOTO_URL, { routerKey: RESET_PASSWORD });
  }

  async handleLogout() {
    let isConfirmed = false;
    isConfirmed = await confirm({
      msg: 'Are you sure you want to Logout?',
    });
    if (isConfirmed) {
      dataService.getRequest("logout")
        .then(res => {
          if (res.status == "success") {
            app.events.trigger(SHOW_ALERT_MSG, {
              visible: true,
              type: ALERT_TYPE.SUCCESS,
              msg: " Logout SUCCESS"
            });
            app.events.trigger(USER_SIGNOUT, res);
          }

          else {
            app.events.trigger(SHOW_ALERT_MSG, {
              visible: true,
              type: ALERT_TYPE.DANGER,
              msg: ` Logout Failed !!!`
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="header">
            <img className="header-logo" src={Logo} />
            <div className="d-flex align-items-center pr-2">
              <a className="pr-3 header-txt" onClick={this.onChangePassword} href="#">
                Change Password?
              </a>
              <a className="header-txt" href="#" onClick={this.handleLogout}>
                Logout <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
          <AlertModal />
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
