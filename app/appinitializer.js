import routes from './routes';
import * as CONST from 'utils/constants';
import {moveToTop,getUID,setLang,setPageTitle,isMobileResp,resolveApiUrl,isTabletResp,toggleGlobalLoader} from 'utils/common';
import {getCookie,setCookie} from 'utils/cookie';
import eventSubPub from 'utils/eventsubpub';

const defaultLang = 'en';
window.app = window.app || {pageParams : {lang:defaultLang},globalLoader:'',sessionTimeout:(30*60*1000)};
  async function loadConfig(){

    try { 
        let response = await fetch(pageConfig['CONFIG_PATH']+"?bno="+pageConfig['BUILD_NO']);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        //console.log('before response');
        let data = await response.json();
        setApis(data);
        return data;
      } catch(err) {
        // catches errors both in fetch and response.json
        //alert(err);
        console.log(err);
        loadConfigFallback();
      }
    console.log('loadConfig---e');
    return null;
}
function setApis(data){
    //console.log(apis);
    window.app = { ...window.app, ...data,apis:data.apis,env:pageConfig['BUILD_ENV'] };
    app.pageParams = {...app.pageParams};
}
function loadConfigFallback(){

    fetch(pageConfig['CONFIG_PATH']+"?bno="+pageConfig['BUILD_NO'])
      .then(res => res.json())
      .then((data) => {
            setApis(data);
        },
        (error) => {
            console.log( "error -> "+error );
        }
    );
    
    console.log('loadConfigFallback---e');
}
function addUtils(){
    String.prototype.equalsIgnoreCase = function(another){
        return !!another && another.toUpperCase() == this.toUpperCase() ;
    }
    Array.prototype.pushShift = function(item,maxLength)
    {
        let l = this.length + 1;
        if(l > 0 && maxLength > 0 && l>maxLength){
            while(l>maxLength){
                this.shift();
                l--;
            }
        }
        this.push(item);
        return this;
    }
    Array.prototype.distinct = function(keepLast=false)
    {
        let meth = keepLast?'lastIndexOf':'indexOf';
        return this.filter((value,index,self)=>self[meth](value) == index);
    }

    Array.prototype.remove = function(item)
    {
        let index = this.indexOf(item);
        return index > -1 && this.splice(index,1);
    }
}
export function initApp(){
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    addUtils();
    //moveToTop();
    //toggleGlobalLoader({reset:true});
    app.apiConfig = loadConfig();
    //app.homePage = location.pathname == '' || location.pathname == '/';
    //console.log(location.pathname);
    //console.log('app.apiConfig '+app.apiConfig);
    //app.pageParams = {lang:defaultLang};
    getUID();
    
    app.testData = process.env.TEST_DATA == 'true';
    app.defaultLocale = defaultLang;
    app.selectedLocale = defaultLang;
    app.routes = routes;
    app.pageUris = {};
    app.routesMap = {};
    app.pageInfo = {query:{},params:{}};
    routes.forEach(function(route){
        app.pageUris[route.path] = route.name;
        app.routesMap[route.name] = route;
        // app.pageInfo[route.query,route.params] = route;
    });
    
    app.events = Object.create(eventSubPub);
    app.mobile = isMobileResp();
    app.tablet = isTabletResp();
    app.windowWidth = window.innerWidth;
    //app.userId = 100;
    console.log('-----------app initialized--------');
}

export function initPortalSettings(portsetting={}){
    window.app = { ...window.app, ...portsetting };
    app.translations = app.translations || [];
    app.phoneCountryCodes = app.phoneCountryCodes || ['+91'];
    setPageTitle();
    //set application basic config
}

