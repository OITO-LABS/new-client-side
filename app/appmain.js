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
  PATH_PREFIX
} from "utils/constants";
import header from "components/layout/header";
import Footer from "components/layout/footer";
import Sidebar from "components/layout/sidebar";
import ComponentWrapper from "components/common/componentwrapper";
import { initApp, initPortalSettings } from "./appinitializer";
import dataService from "utils/dataservice";
import Loader from "components/common/loader";
import "assets/sass/home.scss";
// import NoRecordsFound from "../app/components/noRecordsFound";
// import Login from "components/pages/login";


initApp();

const NoMatch = ({ location }) => (
  <Redirect to={resolveRouterPath(LANDING, { lang: app.selectedLocale })} />
);
const Header = ComponentWrapper(header, { nowrap: true });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { appinit: false };
    this.loadPortalSettings();
    this.gotoUrl = this.gotoUrl.bind(this);
    //this.userSignIn = this.userSignIn.bind(this);
    //this.userSignOut = this.userSignOut.bind(this);
    const ev = {};
    ev[GOTO_URL] = this.gotoUrl;
    //ev[USER_SIGNIN] = this.userSignIn;
    //ev[USER_SIGNOUT] = this.userSignOut;
    app.events.subscribe(ev);
  }
  userSignIn([userAuth, source]) {
    let d = new Date().getTime() - 100;
    userAuth = { ...userAuth, ...(userAuth.customFields || {}) };
    app.userAuth = userAuth;
    app.userId = userAuth.userId;
    this.setUserToken(userAuth, true);
  }
  setUserToken(userAuth, loginUser) {
    setToCache(USER_TKEY, BEARER_KEY + userAuth.accessToken);
    //removeFromCache(LOGIN_USER_DATA);
    //loginUser && setToCache(LOGIN_USER_DATA,LOGIN_USER_DATA);
  }
  userSignOut([type]) {
    app.userAuth = null;
    removeFromCache(USER_TKEY);
    app.userId = null;
    app.isAdmin = false;
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
  }
  componentDidUpdate() {
    //console.log('-----Main updated------');
  }
  render() {
    if (!this.state.appinit) return <Loader inline />;
    return (
      <React.Fragment>
      {/* <Login/> */}
        <Loader />
        {/* <Collapse/> */}
        <Header pageQuery /> 
        <div className="row content-height">
          <div className="col-2"><Sidebar/></div>
          <div className="col-10">
            <Router>
              <Switch>
                {app.routes.map(route => {
                  let component = ComponentWrapper(
                    loadableComp(route.componentId),
                    route
                  );
                  return (
                    <Route {...route} key={route.name} component={component} />
                  );
                })}
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </div>
        </div>
          <Footer />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("approot"));
