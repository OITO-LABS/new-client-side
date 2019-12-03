import React from "react";
import Logo from 'assets/images/logo.png';
import {RESET_PASSWORD,GOTO_URL,USER_SIGNOUT,SHOW_ALERT_MSG, ALERT_TYPE} from "utils/constants";
import AlertModal from "../common/alertmodal";
import { confirm } from 'utils/common';
// import dataService from 'utils/dataservice';
class Header extends React.Component {
  constructor(props) {
    super(props)
  
   this.onReset = this.onReset.bind(this);
   this.onReset = this.onReset.bind(this);
  }
  
  onReset() {
    app.events.trigger(GOTO_URL, { routerKey: RESET_PASSWORD });
  }
  async handleLogout(){
    let isConfirmed = false;
    isConfirmed = await confirm({
      msg: 'Are you sure you want to Logout?',
    });
    if (isConfirmed) {
      // const deleteData = { empNo: data.empNo }
                  app.events.trigger(USER_SIGNOUT,  {status:"logout"});

    //   dataService.getRequest("employeeDelete", { empNo: data.empNo })
    //     .then(res => {
    //       if(res.status=="success"){
    //         app.events.trigger(SHOW_ALERT_MSG, {
    //           visible: true,
    //           type: ALERT_TYPE.SUCESS,
    //           msg: " Logout SUCCESS"
    //         });

    //         app.events.trigger(USER_SIGNOUT,  res);
    //       }
    //       else{
    //         app.events.trigger(SHOW_ALERT_MSG, {
    //           visible: true,
    //           type: ALERT_TYPE.DANGER,
    //           msg: ` Logout Failed  ${res.message}`
    //         });
    //       }
    //     }).catch(res => {
    //       console.log(res);
    //     });
    }

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
              <a className="header-txt" href="#" onClick={this.handleLogout}>
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
