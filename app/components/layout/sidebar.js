import React from "react";
import { PROFILE,EMPLOYEE_REG,EMPLOYEE_LISTING,GOTO_URL,ADD_ASSETS,ASSET_LISTING,APPLY_REIMBURSEMENT,REIMBURSEMENT_LISTING,INACTIVE_ASSET_LISTING } from "utils/constants";
import "assets/sass/pages/_employeeRegister.scss";
import dataService from "utils/dataservice";

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      results:''
    }
    this.profile = this.profile.bind(this);
    this.empReg = this.empReg.bind(this);
    this.empList = this.empList.bind(this);
    this.addAssets = this.addAssets.bind(this);
    this.viewAssets = this.viewAssets.bind(this);
    this.applyReimbursement = this.applyReimbursement.bind(this);
    // this.viewReimbursements = this.viewReimbursements.bind(this);
    this.viewInactiveAssets=this.viewInactiveAssets.bind(this);
  }
  
  componentDidMount() {
    dataService.getRequest("getEmpDetails", { empId: app.empId })
      .then(result => {
        this.setState({
          results:result.employeeDetails
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  profile() {
    app.events.trigger(GOTO_URL, { routerKey: PROFILE });
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
  viewInactiveAssets(){
    app.events.trigger(GOTO_URL, { routerKey: INACTIVE_ASSET_LISTING });
  }

  render() {
    let data = this.state.results;
    return (
      <React.Fragment>
        <sidebar>
            {/* Sidebar   */}
            <nav id="sidebar" className="sidebar-navwrapper">
              <div className="sidebar-header">
                <h3 className="sidebar-txt">Welcome </h3>
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
                {/* Register Employee  */}
                <li>
                  <a href="#" onClick={this.empReg}  className="dropdown-toggle">
                    <i className="fas fa-cog"></i>
                    {/* <i className="far fa-registered"></i> */}
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
                    <i className="fas fa-th-list"></i>
                    Add Assets
                  </a>
                </li>
                {/* View Assets  */}
                <li>
                  <a href="#" onClick={this.viewAssets}>
                    <i className="fab fa-accusoft"></i>
                   Active Assets 
                  </a>
                </li>
                {/* View inactive Assets  */}
                <li>
                  <a href="#" onClick={this.viewInactiveAssets}>
                  <i className="fas fa-wrench"></i>
                   Inactive Assets 
                  </a>
                </li>
                 {/* Apply Reimbursement */}
                 <li>
                  <a href="#" onClick={this.applyReimbursement}>
                    <i className="fas fa-money-bill"></i>
                    Apply Reimbursement 
                  </a>
                </li>
                {/* Reimbursement */}
                <li>
                  <a href="#" onClick={this.viewReimbursements}>
                    <i className="fas fa-money-bill-wave-alt"></i>
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
