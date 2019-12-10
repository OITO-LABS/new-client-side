import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {
  loadableComp,
  getCurrentPathWithQuery,
  resolveRouterPath,
  getUpdatedPageUrl,
  getRouterUrl
} from "utils/common";
import { getCookie } from "utils/cookie";
import { setToCache, getFromCache, removeFromCache } from "utils/querystring";
import {
  BEARER_KEY,
  GOTO_URL,
  LANDING,
  USER_TKEY,
  PATH_PREFIX,
  HOME,
  EMPLOYEE_LISTING,
  USER_SIGNIN, USER_SIGNOUT, USER_RESET, FORGOT_PASSWORD
} from "utils/constants";
import header from "components/layout/header";
import Footer from "components/layout/footer";
import Sidebar from "components/layout/sidebar";
import SidebarEmp from "components/layout/sidebar_emp";
import ComponentWrapper from "components/common/componentwrapper";
import { initApp, initPortalSettings } from "./appinitializer";
import dataService from "utils/dataservice";
import Loader from "components/common/loader";
import "assets/sass/home.scss";
// import NoRecordsFound from "../app/components/noRecordsFound";
import Login from "components/pages/login";
import ForgotPassword from "components/pages/forgotPassword";



initApp();

const NoMatchNonLogin = ({ location }) => (
  <Redirect to={resolveRouterPath(LANDING, { lang: app.selectedLocale })} />
);
const NoMatchLogin = ({ location }) => (
  <Redirect to={resolveRouterPath(HOME, { lang: app.selectedLocale })} />
);
const Header = ComponentWrapper(header, { nowrap: true });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appinit: false,
      login: false
    };
    this.loadPortalSettings();
    this.gotoUrl = this.gotoUrl.bind(this);
    this.userSignIn = this.userSignIn.bind(this);
    this.userSignOut = this.userSignOut.bind(this);
    this.userReset = this.userReset.bind(this);
    const ev = {};
    ev[GOTO_URL] = this.gotoUrl;
    ev[USER_SIGNIN] = this.userSignIn;
    ev[USER_SIGNOUT] = this.userSignOut;
    ev[USER_RESET] = this.userReset;
    app.events.subscribe(ev);
  }
  userSignIn([userAuth, source]) {
    // let d = new Date().getTime() - 100;
    // userAuth = { ...userAuth, ...(userAuth.customFields || {}) };
    app.userAuth.role="admin"


    
    // app.userAuth = userAuth;
    // app.empId = userAuth.employeeId;



    // this.setUserToken(userAuth, true);

    // let cookies=  getCookie('JSESSIONID');
    // console.log("-------------cookies get from serverside")
    // console.log(cookies);

    // if(cookies==""){
    this.setState({
      login: true
    }, () => { app.events.trigger(GOTO_URL, { routerKey: HOME }); })
    // }

  }
  setUserToken(userAuth, loginUser) {
    //setToCache(USER_TKEY, BEARER_KEY + userAuth.accessToken);
    //removeFromCache(LOGIN_USER_DATA);
    //loginUser && setToCache(LOGIN_USER_DATA,LOGIN_USER_DATA);
  }
  userSignOut([type]) {
    app.userAuth = null;
    // removeFromCache(USER_TKEY);
    app.empId = null;
    // app.isAdmin = false;
    this.setState({
      login: false
    }, () => { app.events.trigger(GOTO_URL, { routerKey: LANDING }); })

  }

  userReset([type]) {
    app.userAuth = null;
    // removeFromCache(USER_TKEY);
    app.empId = null;
    // app.isAdmin = false;
    this.setState({
      login: false
    }, () => { app.events.trigger(GOTO_URL, { routerKey: FORGOT_PASSWORD }); })
  }

  gotoUrl([urlInfo]) {
    let url = getRouterUrl(urlInfo);
    if (url) {
      app.history.push(url);
    }
  }
  loadPortalSettings(userToken) {
    dataService
      .getRequest("portalSettings", {})
      .then(res => {
        initPortalSettings(res);
        this.setState({ appinit: true });
      })
      .catch(err => {
        //this.handleError(err);
      });
    //comment below code when uncomment above code
    //initPortalSettings({});
    //this.setState({appinit:true});
  }
  componentDidMount() {
    //console.log(process.env.TOKEN_CHECK+'-----Main mouted------');
    //this.loadPortalSettings();
    this.mouted = true;
    // this.setState({
    //   login:true
    // },()=>{app.events.trigger(GOTO_URL, { routerKey: HOME });})

    // app.filteredRoutes=filterRows();

  }
  componentDidUpdate() {
    //console.log('-----Main updated------');
  }
  render() {
    if (!this.state.appinit) return <Loader inline />;
    console.log('-----' + this.state.login);
    return (
      <React.Fragment>
        {this.state.login ?
          <React.Fragment>
            <Loader />
            {/* <Collapse/> */}
            <Header pageQuery />
            <div className="row content-height">
              {app.userAuth.role == "admin" ?
                <div className="col-2"><Sidebar /></div>
                :
                <div className="col-2"><SidebarEmp /></div>
              }
              <div className="col-10">
                <Router>
                  <Switch>
                    {app.routes.filter(route => !route.skipLogin).map(route => {
                      let component = ComponentWrapper(
                        loadableComp(route.componentId),
                        route
                      );
                      return (
                        <Route {...route} key={route.name} component={component} />
                      );
                    })}
                    <Route component={NoMatchLogin} />
                  </Switch>
                </Router>
              </div>
            </div>
            <Footer />
          </React.Fragment>
          :
          <React.Fragment>
            <Router>
              <Switch>
                {app.routes.filter(route => route.skipLogin).map(route => {
                  let component = ComponentWrapper(
                    loadableComp(route.componentId),
                    route
                  );
                  return (
                    <Route {...route} key={route.name} component={component} />
                  );
                })}
                <Route component={NoMatchNonLogin} />
              </Switch>
            </Router>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("approot"));
