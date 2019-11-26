import React from "react";
import {DASHBOARD,EMPLOYEE_REG,EMPLOYEE_LISTING,GOTO_URL,ADD_ASSETS,ASSET_LISTING,APPLY_REIMBURSEMENT,REIMBURSEMENT_LISTING} from "utils/constants";
import "assets/sass/pages/_employeeRegister.scss"

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.dashboard = this.dashboard.bind(this);
    this.empReg = this.empReg.bind(this);
    this.empList = this.empList.bind(this);
    this.addAssets = this.addAssets.bind(this);
    this.viewAssets = this.viewAssets.bind(this);
    this.applyReimbursement = this.applyReimbursement.bind(this);
    // this.viewReimbursements = this.viewReimbursements.bind(this);
  }
  
  dashboard() {
    app.events.trigger(GOTO_URL, { routerKey: DASHBOARD });
  }

  empReg() {
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_REG,params:{empId:-1} });
  }

  empList() {
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_LISTING });
  }

  addAssets() {
    app.events.trigger(GOTO_URL, { routerKey: ADD_ASSETS,params:{assetId:-1} });
  }

  viewAssets() {
    app.events.trigger(GOTO_URL, { routerKey: ASSET_LISTING });
  }

  applyReimbursement() {
    app.events.trigger(GOTO_URL, { routerKey: APPLY_REIMBURSEMENT });
  }

  viewReimbursements() {
    app.events.trigger(GOTO_URL, { routerKey: REIMBURSEMENT_LISTING });
  }

  render() {
    return (
      <React.Fragment>
        <sidebar>
            {/* Sidebar   */}
            <nav id="sidebar" className="sidebar-navwrapper">
              <div className="sidebar-header">
                <h3 className="sidebar-txt">Welcome Admin!</h3>
                <strong>WA</strong>
              </div>
              {/* Menu  */}
              <ul className="list-unstyled components">
                {/* Dashboard  */}
                <li className="active">
                  <a href="#" onClick={this.dashboard}>
                    <i className="fas fa-home"></i>
                    Dashboard
                  </a>
                </li>
                {/* Register Employee  */}
                <li>
                  <a href="#" onClick={this.empReg}  className="dropdown-toggle">
                    <i className="fas fa-cog"></i>
                    Register
                  </a>
                </li>
                {/* View Employee */}
                <li>
                  <a href="#" onClick={this.empList}>
                    <i className="fas fa-users"></i>
                    Employees
                  </a>
                </li>
                {/* Add Assets  */}
                <li>
                  <a href="#" onClick={this.addAssets}>
                    <i class="fas fa-th-list"></i>
                    Add Assets
                  </a>
                </li>
                {/* View Assets  */}
                <li>
                  <a href="#" onClick={this.viewAssets}>
                    <i class="fab fa-accusoft"></i>
                    Assets 
                  </a>
                </li>
                 {/* Apply Reimbursement */}
                 <li>
                  <a href="#" onClick={this.applyReimbursement}>
                    <i class="fas fa-money-bill"></i>
                    Apply Reimbursement 
                  </a>
                </li>
                {/* Reimbursement */}
                <li>
                  <a href="#" onClick={this.viewReimbursements}>
                    <i class="fas fa-money-bill-wave-alt"></i>
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

export default Sidebar;
