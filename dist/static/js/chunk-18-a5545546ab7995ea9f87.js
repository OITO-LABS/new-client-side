(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{nPWx:function(e,p,t){"use strict";t.r(p);var n=t("q1tI"),r=t.n(n),a=t("Bbg3");p.default=class extends r.a.Component{constructor(e){super(e),this.appInfo=this.appInfo.bind(this),this.upperClick=this.upperClick.bind(this)}appInfo(){app.events.trigger(a.p,{routerKey:a.c})}upperClick(){app.events.trigger(a.p,{routerKey:a.B})}componentDidMount(){app.events.trigger(a.o,{status:!1,reset:!0})}render(){return r.a.createElement("div",{className:"home-page"},r.a.createElement("a",{href:"#",onClick:this.appInfo},"App Info"),r.a.createElement("a",{href:"#",onClick:this.upperClick},"upper bar"))}}}}]);