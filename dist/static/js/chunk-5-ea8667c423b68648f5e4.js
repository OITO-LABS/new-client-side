(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{ltjX:function(r,e,s){"use strict";s.r(e);var t=s("q1tI"),o=s.n(t),i=s("0oA5");e.default=class extends o.a.PureComponent{render(){if(!this.props.error&&!this.props.msg)return null;let r="error"==(this.props.type||"error");return o.a.createElement("div",{className:(this.props.htmFor?"":r?"is-invalid ":"is-valid ")+(r?"invalid-feedback":"valid-feedback")+" "+this.props.className,dangerouslySetInnerHTML:{__html:Object(i.o)(this.props.msg||this.props.error)}})}}}}]);