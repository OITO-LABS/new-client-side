import React from "react";
import {FLIP_LOADER,GOTO_URL,APP_INFO,UPPER_BAR,EMPLOYEE_LISTING,EMPLOYEE_REG} from "utils/constants";
import SearchAndButtonBar from "components/searchAndButtonBar";
import ListTable from "components/listTable";

// import AlertModal from "../common/alertmodal";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.appInfo = this.appInfo.bind(this);
    this.upperClick = this.upperClick.bind(this);
    this.empList = this.empList.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  appInfo() {
    app.events.trigger(GOTO_URL, { routerKey: APP_INFO });
  }

  // **********upper bar func********

  upperClick() {
    app.events.trigger(GOTO_URL, { routerKey: UPPER_BAR });
  }
  empList() {
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_LISTING });
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
  }
  handleRegister(){
    app.events.trigger(GOTO_URL,{ routerKey: EMPLOYEE_REG});
  }


  render() {
    //console.log('HomePage---------- render');
    return (
      <div className="home-page">
       
        <a href="#" onClick={this.appInfo}>
          App Info
        </a>
        <a href="#" onClick={this.upperClick}>
          upper bar
        </a>
        
        <SearchAndButtonBar
          button1name="Register a employee"
          button2name="export"
          handleRegister={this.handleRegister}
        />
        {/* <div className="col-12"> */}
          <ListTable />
        {/* </div> */}
        {/* <AlertModal/> */}
      </div>
    );
  }
}

export default HomePage;
