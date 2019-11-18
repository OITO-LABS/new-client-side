import React from "react";
import 'assets/css/_sidebar.css';
class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <sidebar>
        
          {/* <div className="wrapper"> */}
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
                  <a
                    href="#homeSubmenu"
                    // data-toggle="collapse"
                    // aria-expanded="false"
                  >
                    <i className="fas fa-home"></i>
                    Dashboard
                  </a>
                </li>
                {/* Asset List  */}
                <li>
                  <a
                    href="#pageSubmenu"
                    // data-toggle="collapse"
                    // aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    <i className="fas fa-cog"></i>
                    Asset List
                  </a>
                  {/* <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                      <a href="#">List</a>
                    </li>
                    <li>
                      <a href="#">Add</a>
                    </li>
                    <li>
                      <a href="#">Assigned Assets</a>
                    </li>
                  </ul> */}
                </li>
                {/* Add Assets  */}
                <li>
                  <a href="#">
                    <i className="fas fa-user-cog"></i>
                    Add Assets 
                  </a>
                </li>
                {/* Employee  */}
                {/* <li>
                  <a href="#">
                    <i className="fas fa-users"></i>
                    Employee
                  </a>
                </li> */}
                {/* Reimbursement  */}
                <li>
                  <a href="#">
                    <i className="fas fa-wallet"></i>
                    Reimbursement
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
