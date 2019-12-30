import React from "react";
import { PROFILE,GOTO_URL,APPLY_REIMBURSEMENT,EMPLOYEE_DETAILS,REIMBURSEMENT_EMPLOYEE_LISTING } from "utils/constants";
import "assets/sass/pages/_employeeRegister.scss";
import dataService from "utils/dataservice";
import { getCookie, setCookie, removeCookie } from "utils/cookie";


class SidebarEmp extends React.Component {

  constructor(props) {
    super(props);

    this.profile = this.profile.bind(this);
    this.assets = this.assets.bind(this);
    this.applyReimbursement = this.applyReimbursement.bind(this);
    this.reimbursement = this.reimbursement.bind(this);
  }

  profile() {
    app.events.trigger(GOTO_URL, { routerKey: PROFILE });
  }

  assets() {
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_DETAILS, params: { empId: getCookie("empId") } });
  }

  applyReimbursement() {
    app.events.trigger(GOTO_URL, { routerKey: APPLY_REIMBURSEMENT, params: { reimbursementId: -1} });
  }

  reimbursement() {
    app.events.trigger(GOTO_URL, { routerKey: REIMBURSEMENT_EMPLOYEE_LISTING, params: { empNo: app.userDetails.employeeDetails.empNo }  });
  }

  render() {
    return (
      <React.Fragment>
        <sidebar>
            {/* Sidebar   */}
            <nav id="sidebar" className="sidebar-navwrapper">
              <div className="sidebar-header">
                <h3 className="sidebar-txt">Welcome {app.userDetails.employeeDetails.firstName}</h3>
                <strong>WA</strong>
              </div>
              {/* Menu  */}
              <ul className="list-unstyled components">
                {/* Profile  */}
                <li className="active">
                  <a href="#" onClick={this.profile}>
                    <i className="fas fa-home"></i>
                    Profile
                  </a>
                </li>
                {/* Assets */}
                <li className="active">
                  <a href="#" onClick={this.assets}>
                    <i className="fas fa-home"></i>
                    Assets
                  </a>
                </li>
                 {/* Apply Reimbursement */}
                 <li>
                  <a href="#" onClick={this.applyReimbursement}>
                    <i className="fas fa-money-bill"></i>
                    Apply Reimbursement 
                  </a>
                </li>
                {/* Reimbursements */}
                <li>
                  <a href="#" onClick={this.reimbursement}>
                    <i className="fas fa-money-bill"></i>
                    Reimbursements 
                  </a>
                </li>
              </ul>
            </nav>

            {/* Sidebar Collapse Button  */}
            {/* <div className="collapse-btn">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn toggle-btn"
              >
                <i className="fas fa-align-left"></i>
              </button>
            </div> */}
          {/* </div> */}

        </sidebar>
        {/* <AlertModal /> */}
      </React.Fragment>
    );
  }
}

export default SidebarEmp;
