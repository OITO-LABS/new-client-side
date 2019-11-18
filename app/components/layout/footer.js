import React from "react";
import {
  GOTO_URL,
  SCROLL_TO_TOP,
  WIN_SCROLL,
  SHOW_ALERT_MSG,
  ALERT_TYPE,
  LANDING,
  PATH_CHANGED
} from "utils/constants";
import {
  gotoUrl,
  moveToTop,
  resolveRouterPath,
  translate,
  getRouterUrl
} from "utils/common";
import { setCookie, getCookie } from "utils/cookie";
import dataService from "utils/dataservice";
import AlertMessage from "components/common/alertmessage";
import Logo from "assets/images/logo.png";
const cacheKey = new Date().getTime();
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.pathChanged = this.pathChanged.bind(this);
    this.moveToTop = this.moveToTop.bind(this);
    this.monitorPageScroll = this.monitorPageScroll.bind(this);
    this.state = { showBtnTop: "none" };
    app.events.subscribe(
      {
        [PATH_CHANGED]: this.pathChanged,
        [SCROLL_TO_TOP]: this.moveToTop,
        [WIN_SCROLL]: this.monitorPageScroll
      },
      this,
      -1
    );
  }
  componentDidMount() {
    this.init = true;
    //console.log('-----footer mouted------');
  }
  componentDidUpdate() {
    //console.log('-----footer updated------');
  }
  monitorPageScroll() {
    let showBtn =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
        ? "block"
        : "none";
    this.setState({ showBtnTop: showBtn });
  }
  moveToTop() {
    moveToTop();
  }
  pathChanged([oldPath, newPath]) {
    this.moveToTop();
    //this.setState({className:app.pageInfo.className})
    //console.log('-----footer------pathChanged '+app.pageInfo.className);
  }
  render() {
    //console.log('-----footer------ > '+app.pageInfo.className);
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="">
            <div className="footer-txt">
              <p><a  className="heading-txt" href="#">About Us</a></p>
              <p><a href="#">Our Company</a></p>
              <p><a href="#">Our Services</a></p>
              <p><a href="#">Our Team</a></p>
            </div>
            <div className="footer-txtpara">
              <p>Office OitoLabs Technologies Pvt. Ltd 3rd Floor,   Amstor Annex Building Technopark,   Trivandrum
                 Kerala, India- 695 581 Phone- +914712700648</p>
            </div>
           </div>
        </footer>
        <button
          onClick={this.moveToTop}
          className="move-to-top"
          style={{ display: this.state.showBtnTop }}
        >
          <i className="fas fa-arrow-circle-up"></i>
        </button>
        <AlertMessage />
      </React.Fragment>
    );
  }
}

export default Footer;
