import {resolveApiUrl,validUToken} from 'utils/common';
import {SESSION_EXPIRED,METHOD_GET,METHOD_POST,METHOD_PUT,METHOD_DELETE,CACHE,FLIP_LOADER,AUTH_KEY,USER_TKEY} from 'utils/constants';
import {setToCache,getFromCache,removeFromCache} from './querystring';
import {setCookie,getCookie} from 'utils/cookie';
const FORM_DATA = 'form-data';
const excludeParams = ['nameIdfier'];
const defaultOpt = {
  method:METHOD_GET,
  mode: "cors",
  credentials: "include",
  headers: {
      "Content-Type": "application/json; charset=utf-8"
  }
}

const defaultPostOpt = {
    ...defaultOpt,
    method: METHOD_POST
}

const defaultFormDataOpt = {
  ...defaultPostOpt,
  bodyType:FORM_DATA,
  headers: {
    "Content-Type": "multipart/form-data; charset=utf-8"
  }
}

class DataService {

    // async function
    toggleLoader(lk,enable,params={}){
      let loader = params['loader'] == undefined || !!params['loader'];
      delete params['loader'];
      if(enable && loader){
        params['lk'] = 'lk'+new Date().getTime();
        app.events.trigger(FLIP_LOADER,{status:true,lk:params['lk']});
      }
      else if(!enable && lk){
        app.events.trigger(FLIP_LOADER,{status:false,lk:lk});
      }
    }

    async deleteRequest(urlkey,params={},options={}){
      //options = {...options,method:METHOD_DELETE};
      return this.getRequest(urlkey,params,{...defaultOpt,...options,method:METHOD_DELETE});
    }

    async formDataRequest(urlkey,params={},options={}){
      //options = {...options,method:METHOD_POST};
      return this.postRequest(urlkey,params,{...defaultFormDataOpt,...options,method:METHOD_POST});
    }

    async getRequest(urlkey,params={},options={}){
      let data = {};
      this.toggleLoader(null,true,params);
      let opt = {...defaultOpt,...options}
      if(app.apis){
        data = await this._sendRequest(urlkey,params,opt);
      }
      else{
        data = await app.apiConfig.then(res=>{
              return this._sendRequest(urlkey,params,opt);
          })
      }
      //console.log('-------urlkey---------'+urlkey);
      return data;
    }

    async putRequest(urlkey,params={},options={}){
      options = {...options,method:METHOD_PUT};
      return this.postRequest(urlkey,params,options);
    }
    
    async postRequest(urlkey,params={},options={}){
        if(process.env.POST_METHOD == METHOD_GET){
          return this.getRequest(urlkey,params,{...options,method:METHOD_GET});
        } 
        this.toggleLoader(null,true,params);
        let data = {};
        options = {...defaultPostOpt,...options};
        //options['body'] = JSON.stringify(params);
        if(app.apis){
          data = await this._sendRequest(urlkey,params,options);
        }
        else{
          data = await app.apiConfig.then(res=>{
                return this._sendRequest(urlkey,params,options);
            })
        }
        //console.log('-------urlkey---------'+urlkey);
        return data;
    }

    async _sendRequest(urlkey,params,bodyOpt={method:METHOD_GET,mode: "cors",}){
        let cacheKey = params[CACHE];
        let skipErrorTracking = params['skipErrorTracking'];
        let skipSessionExpiy = !!params['skipSessionExpiy'];
        let lk = params.lk;
        let skipToken = !!params.skipToken;
        let userToken = params.userToken;
        //let formData = params.formData;
        delete params['lk'];
        delete params[CACHE];
        delete params['userToken'];
        delete params['skipToken'];
        delete params['skipErrorTracking'];
        delete params['skipSessionExpiy'];
        //delete params['formData'];

        params = {...app.pageParams,...params};
        let paramsToBody = bodyOpt.method == METHOD_POST || bodyOpt.method == METHOD_PUT || !!bodyOpt.paramsToBody;
        let url = resolveApiUrl(urlkey,params,!paramsToBody,excludeParams);
        if(bodyOpt.bodyType == FORM_DATA){
          // delete bodyOpt.headers['Content-Type'];
          let formData = new FormData();
          Object.keys(params).forEach(k=>{
            formData.append(k,params[k]);
          })
          bodyOpt['body'] = formData;
        } else if(paramsToBody){
            bodyOpt['body'] = JSON.stringify(params);
        }
        let authToken = '';//userToken || getFromCache(USER_TKEY);
        let tokenCheck = false;//!skipToken && process.env.TOKEN_CHECK == 'true';
        if(tokenCheck && authToken){
            bodyOpt.headers = bodyOpt.headers || {};
            bodyOpt.headers[AUTH_KEY] = authToken;
            //console.log('append token ')
        }
        else{
          delete bodyOpt.headers[AUTH_KEY];
        }
        //console.log(tokenCheck+'|-------'+urlkey+'---------|'+authToken);
        let data = await (await (fetch(url,bodyOpt)
        .then(res => {
          let contentType = res.headers.get("content-type");
          let sessionExp = res.headers.has(SESSION_EXPIRED);
          authToken = res.headers.get(AUTH_KEY);
          authToken && setToCache(USER_TKEY,authToken);
          //console.log('-------header------ '+sessionExp)
          !skipSessionExpiy && sessionExp && app.events.trigger(SESSION_EXPIRED);
          let jres = res;
          if(contentType && contentType.includes("application/json")) {
            jres = res.json();
          }          
          this.toggleLoader(lk,false);
          if(res.ok && !sessionExp){
            //cacheKey && res.ok && setToCache(cacheKey,jres);
            return jres;            
          }
          else{
            //return jres.then(err => {throw err;});
            return jres.then(Promise.reject.bind(Promise));
          }
          
        })
        .catch(err => {
          //console.log('Error in data service: ', err);
          //err && !skipErrorTracking && app.ba.trackError('Data Fetching',(ERRORS[err.errorCode] || err.errorCode),{url,...err});
          //cacheKey && removeFromCache(cacheKey);
          this.toggleLoader(lk,false);
          throw err;
        })
      ))
      return data
    }
}
    
export default new DataService()
