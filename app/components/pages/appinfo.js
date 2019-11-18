import React from 'react';
import Pagination from 'components/common/pagination';
import FormField from 'components/common/formfield';
import FormMsg from 'components/common/formmessage';
import { FLIP_LOADER,ALERT_TYPE,SHOW_ALERT_MSG,SHOW_ALERT, } from 'utils/constants';

class HomePage extends React.Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
    app.events.trigger(FLIP_LOADER,{status:false,reset:true});
  }
  render(){
    //console.log('HomePage---------- render');
    const p = '<Pagination totalItems={100} itemsPerPage={10} activePage={2} maxNavItems={5} onPageChange={this.pageChange}/>';
    const f = '<FormField label="field label"  name="fullName" mandatory  nameAlias = {"abc_fullName"} extraPops={{autoComplete: "new-password" }} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} value={this.state.fullName} placeholder="place holder name" validator={validation} />';
    return(
        <div className="home-page display-4">
          <h1>App Info</h1>
          <h2>Utility components</h2>
          <ul>
            <li>common.js :: used to keep all utility functions</li>
	    <li>contants.js :: used to keep all constants</li>
            <li>cookie.js :: utility for cookie operation</li>
	    <li>dataservice.js :: utility for all server side get/post/update/delete operations</li>
            <li>querystring.js :: utility for all local storage cache operations</li>
            <li>eventsubpub.js :: utility for inter components communications via events 
            <br/> To subscribe events in the page level(it will unsubscribe on router change) :: app.events.subscribe({JSON.stringify({'eventname1':'handler1','eventname2':'handler2'})},this);
<br/> To subscribe globally(use only in the top level components(don't use in the route level inner components)) :: app.events.subscribe({JSON.stringify({'eventname1':'handler1','eventname2':'handler2'})},this,-1);
           </li>
           <br/>
          </ul>
          <h2>Components</h2>
          <ul>
            <li>
              Alert message : app.events.trigger(SHOW_ALERT_MSG, {JSON.stringify({
                visible: true,
                type: 'ALERT_TYPE.SUCESS',
                msg: 'message'
              })}); 
               <a href="#" onClick={()=>app.events.trigger(SHOW_ALERT_MSG, {
                visible: true,
                type: ALERT_TYPE.SUCESS,
                msg: 'some message'
              })}> click here </a>
            </li>
            <li>Alert Modal: app.events.trigger(SHOW_ALERT, {JSON.stringify({callBack:'callbackhandler', title: 'title', msg: '<h1>Welcome</h1>', modelClass: 'modal-dialog modal-confirm modal-md', hideModalCloseBtn: true })});
              <a href="#" onClick={()=>app.events.trigger(SHOW_ALERT, {title: 'Hello!!!',msg: '<h1>Welcome</h1>', modelClass: 'modal-dialog modal-confirm modal-md'})}> click here </a>
            </li>
            <li>Pagination : {p} <br/>

              <Pagination totalItems={100} itemsPerPage={10} activePage={2} maxNavItems={7}/>

              with default options: <Pagination totalItems={100} />
              <Pagination totalItems={15} activePage={2}/>
              
              <br/>
            </li>

            <li>
              Form Fields: {f}
              <FormField
                            label='field label'
                            name="fullName" 
                            mandatory
                            nameAlias = {"abc_fullName"}
                            extraPops={{autoComplete: "new-password" }}
                            onChange={()=>true} 
                            value={"test"} 
                            placeholder='Place holder.name'
                 />
            </li>
            <li>
              Form Mesage: showing error/success messages in the form
                <FormMsg error="some error"/>
                <FormMsg msg={"ok message"} type="success"/>

            </li>
            <li>
              Form validator : define validations rule in the field<br/>
              validationRules = {JSON.stringify([
            {
              field: 'newPassword',
              aliasField:'newPassword',
              method: 'isEmpty',
              args:[{ignore_whitespace:true}],
              validWhen: false,
              message: 'app.login.password_requrd'
            },
            {
                field: 'newPassword',
                aliasField:'newPassword',
                method: this.checkPswdRulesMatched,
                validWhen: true,
                message: 'app.login.pswd_rules_invalid'
            },
            
            {
              field: 'cpassword',
              aliasField:'cpassword',
              method: 'isEmpty',
              args:[{ignore_whitespace:true}],
              validWhen: false,
              message: 'app.login.confirm_password_required'
            },
            {
              field: 'cpassword',
              aliasField:'cpassword',
              method: this.passwordMatch,   
              args:['eq','newPassword'],
              validWhen: true,
              message: 'app.login.password_doesnot_match'
            }
        ])};
            </li>
          </ul>
        </div>
    );
  }
}

  export default HomePage;
