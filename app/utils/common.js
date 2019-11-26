import React from 'react'
import Loadable from 'react-loadable';
import queryString from './querystring';//import {setToCache,getFromCache,removeFromCache} from 'utils/querystring';
import {setCookie, getCookie} from 'utils/cookie';
import validator from 'validator';
import {SHOW_ALERT,COOKIE_ID,ALERT_TYPE} from 'utils/constants';

const dynaParamSep = ':';
const mobWidth = 767;
const tabletMaxWidth =1023;
const _CONF = {
  confirm:function(result){
  }
}
export function confirm(options={title:'app.lbl.warning?',msg:''}){
  let conf = Object.create(_CONF);
  const promise =  new Promise(function (resolve) {
    //console.log('resolve b ');
    conf.confirm = function(result){
      //console.log('resolve end b '+result);
      resolve(result);
      //console.log('resolve end a '+result);
    }
  });
  app.events.trigger(SHOW_ALERT,{...options,type:ALERT_TYPE.CONFIRM,callBack:function(result){
    //console.log('result bcb => '+result);0
    conf.confirm(result);
    //console.log('result acb => '+result);
  }});

  return promise;
}
function pageReload(){
  let reloaded = queryString.getFromCache('reloaded') || '';
  if(reloaded!='11'){
    reloaded=reloaded+'1';
    queryString.setToCache('reloaded',reloaded);
    try {
      //Cache.delete().then(()=>{
        //console.log('cache-cleared----');
        location.reload(true);
      //});
    } catch (error) {
      //console.log(error);
      //console.log('error in cache-clear----');
      location.reload(true);
    }
  }else{
    console.log('reloaded =>'+reloaded);
    queryString.removeFromCache('reloaded');
  }
}
function loading(props) {
  //console.log('loader------');
  if (props.error) {
    //location.reload();
    //console.log(props);
    console.log(props.error);
    //app.ba.logUIError('dynamic page load',props.error);
    pageReload();//commented temp
    return <div>{translate('app.error')} <button onClick={ props.retry }>{translate('app.retry')}</button></div>;
  } else if (props.timedOut) {
    //location.reload();
    pageReload();
    return <div>{translate('app.taking_long_time')}<button onClick={ props.retry }>{translate('app.retry')}</button></div>;
  } else if (props.pastDelay) {
    return <div>{translate('app.loading')}</div>;
  } else {
    return null;
  }
}

export function isInViewport(elem,padding = 25) {
  if(!elem) return false;
  //const padding = 25;
  var bounding = elem.getBoundingClientRect();
  //console.log(bounding);
  return (
      (bounding.top + padding) >= 0 &&
      (bounding.left + padding) >= 0 &&
      (bounding.bottom - padding) <= (window.innerHeight || document.documentElement.clientHeight) &&
      (bounding.right - padding) <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getUID(){
  let cid = queryString.getFromCache(COOKIE_ID);
  !cid && (cid=new Date().getTime().toString(16).toUpperCase()) && queryString.setToCache(COOKIE_ID,cid);
  return cid;
}

export function gotoUrl(url,history){
  history = history || app.history;
  if(history){
    history.push(url)
  }
  else{
    window.location.href = url;
  }  
}

export function loadableComp(compId,loaderfn=loading){
  return Loadable({
    loader: () => import('components/'+compId),
    loading: loaderfn,
    compId:compId
  });
}

export function getQuery(querystr,fromPage=false){
  //const queryString = require('components/querystring');
  return fromPage?queryString.parseUrl(window.location.href).query:queryString.parse(querystr);
}

export function getUpdatedPageUrl(key,value,query,url){
  query = query || queryString.parseUrl(window.location.href).query;
  query[key] = value;

  return getPageUrlWithQuery(url,query);
}

export function getPageUrlWithQuery(url,query){
  let q = queryString.stringify(query,{removeEmptyValueKeys:true});
  return (url?(url+(q?'?':'')):'')+q;
}
export function resolveApiUrl(urlKey,params={},appendParams=true,excludeParams=[]){
  //let urlMap = urlKeyMapByService(urlKey);
  return resolveUrl((app.apis[urlKey] || urlKey),params,app.apis.baseurl,appendParams,excludeParams)
}

export function resolveRouterPath(pathKey,params={}){
  return resolveUrl((app.routesMap[pathKey]? app.routesMap[pathKey].path:pathKey),params,null,false);
}

export function getCurrentPathWithQuery(params={}){
  let url = resolveRouterPath(app.pageInfo.path,params,null,false);
  return getPageUrlWithQuery(url,app.pageInfo.query);
}

function resolveUrl(uri,params={},baseurl,appendParams=true,excludeParams=[]){
  //if(!app.apis[urlKey]) return urlKey;
  params = {...app.pageParams,...app.pageInfo.params,...params,env:app.env};
  
  excludeParams = excludeParams || [];
  let url = [];
  let slash = true;
  uri = replaceDynaParams(uri,params);
  if(params.mobileResponsiveUrl){
    delete params.mobileResponsiveUrl;
    uri = mobileResponsiveUrl(uri);
  }
  if(uri.startsWith('http://')){
    uri = uri.substring(6);
    url = ['http://'];
  }else if(uri.startsWith('https://')){
    uri = uri.substring(7);
    url = ['https://'];
  }else if(baseurl && baseurl.trim().length){
    url.push(baseurl)
  }
  slash = url.length == 0;
  for (let urlPart of uri.split('/')) {
      let urlPart2 = urlPart.slice(1);
      if(urlPart.charAt(0) == dynaParamSep && params[urlPart2]){
          urlPart = params[urlPart2]+'';
          delete params[urlPart2];
      }
      urlPart && urlPart.length && url.push(urlPart);
  } 
  delete params['env'];
  let p = appendParams?Object.keys(params).map(key => {
      let v = excludeParams.includes(key)?null:params[key];
      return v? (key+'='+v):'';
  }).filter(x => x.length > 0).join('&'):'';
  url = (slash?'/':'') + url.join('/') + (p.length?('?'+p):'');
  return url;
}


export function getRouterUrl(urlInfo)
{
  let {url,routerKey,params,query,hash} = urlInfo;
  if(routerKey){
      params = params || {};
      url = resolveRouterPath(routerKey,params);
  }
  if(query){
      url = getPageUrlWithQuery(url,query);
  }
  if(hash){
    let urlPart = url.split('#');
    url = urlPart[0]+'#'+hash;
  }
  return url;
}

export function translate(resourceKey,params){
  resourceKey = resourceKey + '';
  resourceKey = app.translations[(resourceKey).trim()] || resourceKey;
  return replaceDynaParams(resourceKey,params).trim();
}

export function replaceDynaParams(url,params)
{
  if(params&&url.match(/{:(\w)*}/g)){
    url.match(/{:(\w)*}/g).forEach(m=>{
      let key = m.length > 3? m.substring(2,m.length-1):m;
      params[key]!=undefined && (url = url.replace(m,params[key]));
    });
  }

  return url;
}

export function setPageTitle(title){
  return document.title = (title?title+' - ':'')+translate('OITO-TRV Management-System');
}

export function withRelativePath(uri){
  return !uri || uri.startsWith('http://') || uri.startsWith('https://')?uri:(uri.startsWith(pageConfig['PUBLIC_PATH'])?'':pageConfig['PUBLIC_PATH'])+uri;
}

let cbtimer = null;
export function isValidRange(value,min,max,cb,clearTimer,cbinterval=1000)
{
  value = parseFloat(value+'');
  let valid = !isNaN(value);
  if(min && parseFloat(min+'') > value){
    valid = false
  }
  if(max && parseFloat(max+'') < value){
    valid = false
  }
  let res = {valid,processing:false,value};
  if(cb){
    clearTimer && cbtimer && clearTimeout(cbtimer);
    //oldTimer && clearTimeout(oldTimer);
    cbtimer = setTimeout(()=>cb(valid,value),cbinterval);
    res.timer = cbtimer;
    res.processing = true;
    //console.log('v-----------'+value);
  }
  return res;
}
export function formtNumber(num,lang,opt={}){
  return Number(num).toLocaleString(lang||'en',opt);
}
export function withDecimal(value,decimalPlace=0){
  const e = 0.0000000000001;
  value = parseFloat(value);
  if(value < e || decimalPlace < 1) return value;
  decimalPlace = decimalPlace || 0;
  let p = Math.pow(10,decimalPlace);
  value = (value*p)+e;
  return parseInt(value)/p;
}
export function round(value,decimalPlace){
  value = parseFloat(value);
  decimalPlace = decimalPlace || 1;
  let p = Math.pow(10,decimalPlace);
  return Math.round(value*p)/p;
}
export function withLink(content,url,props={}){
   if(!url || url.trim().length == 0) return(content);
  return(<a {...props} href={url}>{content}</a>)
}

export function isInArray(arr,value){  
 return(arr.includes(value+'') || (validator.isInt(value)?arr.includes(parseInt(value)):false));
}


export function isMobileResp()
{
  return window.innerWidth <= mobWidth;
}

export function isTabletResp() {
  return window.innerWidth > mobWidth && window.innerWidth <= tabletMaxWidth;
}

export function mobileResponsiveUrl(url)
{
  if(isMobileResp() && url){
    let imgpart = url.split('/');
    imgpart[imgpart.length-1] = 'mobile-'+imgpart[imgpart.length-1];
    url = imgpart.join('/');
  }  
  return url;
}


export function moveToTop(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.scrollTo(0,0);
}

export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'K' : Math.sign(num)*Math.abs(num);
}
export function getNonCacheUrl(url,uid)
{
  return(url + (url.includes('?')?'&':'?')+'b-uid='+pageConfig['BUILD_NO']+(uid?'&uid='+uid:''));
}
