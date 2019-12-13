import React from 'react';
import { Alert } from 'reactstrap';
import { CLOSE_ALERT,PATH_CHANGED,SHOW_ALERT_MSG, ALERT_TYPE } from 'utils/constants';
import {translate} from 'utils/common';

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.closeAlert = this.closeAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    let evt = {};
    evt[SHOW_ALERT_MSG] = this.setAlertMessage;
    evt[PATH_CHANGED] = this.closeAlert;
    evt[CLOSE_ALERT] = this.closeAlert;
    this.subId = app.events.subscribe(evt, this,-1);
    this.style = {position:'fixed',bottom:0,zIndex:1051};
    this.state = {style:this.style, visible: false, type: ALERT_TYPE.SUCCESS, msg: '' };
    this.timer = null;
    this.delay = 10000;
    this.floatingTime = 100;
    this.floatingTimer = null;
  }  
  componentWillUnmount(){
    app.events.unsubscribe(this.subId);
  }
  setAlertMessage([data]) {
    if(data.showAfter){
      this.showAfter(data);
      return;
    }
    let style = this.getStyle(true,!data.floatig,data.msg.length);
    this.setState({
      visible: data.visible ? data.visible : false,
      type: data.type || ALERT_TYPE.SUCCESS,
      msg: data.msg ? data.msg : '',
      style
    }, () => {
      data.floatig && this.setFloatingTimer();
      this.setAutoCloseTimer(data.delay);
      if (data.msg && data.visible && !data.disableScroll) {
        //document.body.scrollTop = 0;
        //document.documentElement.scrollTop = 0;
      }
    })
  }
  setFloatingTimer(){
    this.floatingTimer && clearTimeout(this.floatingTimer);
    this.floatingTimer = setTimeout(()=> {
      this.setStyle(true);
    }, this.floatingTime);
  }
  setStyle(timer){
    let style = this.getStyle();
    this.setState({style},()=>{
      timer && this.setFloatingTimer();
    });
  }
  getStyle(init,fixedPosition,msgLength=0){
    let style = init?{...this.style}:{...this.state.style};
    let left = window.innerWidth * 0.45 - (msgLength>50?msgLength*0.7:0);
    let bottom = window.innerHeight * 0.4;
    if(fixedPosition){
       style.left = left;
       style.bottom = bottom;
    }
    else{
       style.left = init?left:style.left;
       style.bottom = init?120:(style.bottom+1);
    }

    return style;
  }
  showAfter(data){

    setTimeout(()=>{
      delete data.showAfter;
      //alert('excealert');
      this.setAlertMessage([data]);
    },data.showAfter);
  }
  setAutoCloseTimer(delay) {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout( ()=> {
      this.closeAlert();
    }, delay ? delay : this.delay);
  }
  closeAlert() {
    this.floatingTimer && clearTimeout(this.floatingTimer);
    this.floatingTimer = null;
    this.state.visible && this.setState({ visible: false });
  }
  componentWillUnmount(){
    this.floatingTimer && clearTimeout(this.floatingTimer);
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      this.state.msg && <Alert className="toast" style={this.state.style} color={this.state.type} isOpen={this.state.visible} toggle={this.closeAlert}>
        {ALERT_TYPE.SUCCESS == this.state.type && <i className="far fa-check-circle"></i>}
        {ALERT_TYPE.WARNING == this.state.type && <i className="fas fa-info-circle"></i>}
        {ALERT_TYPE.DANGER == this.state.type &&   <i className="fas fa-exclamation-circle"></i> }
        {translate(this.state.msg)}
      </Alert>
    );
  }
}

export default AlertMessage;
