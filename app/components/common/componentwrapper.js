import React from 'react';
import {getQuery,setPageTitle} from 'utils/common';
import {PATH_CHANGED,FLIP_LOADER} from 'utils/constants';

const WrappedComponent = (Component,routeInfo={})=>{
  return class ComponentWrapper extends React.Component {
    render(){
      //console.log(' routeInfo.name '+routeInfo.name);
      let path = this.props.match?this.props.match.path:location.pathname;
      let query = this.props.pageQuery?getQuery('',true):getQuery(this.props.location.search);
      let hash = !this.props.pageQuery && this.props.location.hash?this.props.location.hash.substring(1):'';
      let prevPageInfo = {...app.pageInfo};
      app.history = this.props.history;
      app.pageInfo.query = query;
      app.pageInfo.params = {};
      this.pathChanged = false;
      //app.homePage = routeInfo.name == LANDING;
      if(path!=this.path){
        //toggleGlobalLoader({reset:true,routeInfo});
        app.pageInfo.prevPageInfo = {...prevPageInfo,prevPageInfo:null};
        app.pageInfo.oldPath = app.pageUris[app.pageInfo.path]?app.pageInfo.path:'';
        app.pageInfo.path = path;
        app.pageInfo.className = routeInfo.className;
        app.pageInfo.routerKey = routeInfo.name;
        this.path = path;
        this.currentCtxKey = app.events.generateNewCtxKey(true);
        //console.log('path changed');
        this.pathChanged = true;
      }
      let params = {};
      if(this.props.match && this.props.match.params){
        params = {...this.props.match.params};
        app.pageInfo.params = {...this.props.match.params};
      }
      if(this.props.location){
        //params = {...params,...this.props.location};
      }
       
      const content = routeInfo.nowrap?<Component {...this.props}  hash={hash}  query={query} {...params} {...(routeInfo.params || {})}/>: 
                      <div className="container"> <Component {...this.props}  hash={hash} query={query} {...params} {...(routeInfo.params || {})}/></div>;
    return(
      routeInfo.path?<main className={"content-wrap "+routeInfo.className}>
        {content}
      </main>:content
      );

    }
    componentDidMount() {
      //console.log('router did mount');
      this.path = this.path || '';
      if(this.pathChanged){
        setPageTitle();
        //console.log('path changed ev');
        app.events.trigger(PATH_CHANGED,app.pageInfo.oldPath,this.path);//old & new path
      }
    }

    componentWillUnmount() {
      //console.log('router going to change(unmount)' + this.path);
      //console.log(' unmount currentCtxKey '+this.currentCtxKey);
      //setTimeout(function(){
        //console.log('---------unsubscribeUnMoutedCTx-----')
        app.events.trigger(FLIP_LOADER,{status:true,reset:true,recheck:true});
        app.events.unsubscribeUnMoutedCTx();
      //},0);
    }

    componentDidUpdate() {
      //console.log('router did update')
    }
  }
}

  export default WrappedComponent;
