import React from 'react';
import {FLIP_LOADER,GLOADER_CONFIG} from 'utils/constants';
//import {toggleGlobalLoader} from 'utils/common';
import Image from './image';

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: !!this.props.inline,counter:0};
        this.toggleLoader = this.toggleLoader.bind(this);    
        //app.events.subscribe({[FLIP_LOADER] : this.toggleLoader},this,-1);
        this.initEvents();
        this.counter = 0;
        this.setStyle();
        //console.log('loader init');
    }
    setStyle(){
        let bottom = window.innerHeight * 0.5;
        this.style = {position:'fixed',bottom};
        //let url = mobileResponsiveUrl(GLOADER_CONFIG.img[app.globalLoader]);
        //console.log('url => '+url);
        this.pageStyle = {};
        //this.bgimg = GLOADER_CONFIG.img[app.globalLoader];
    }
    initEvents(){
        if(!this.props.inline && (!this.eventInited || (this.eventKey && !app.events.hasEvent(this.eventKey))) && app.events){
            this.eventKey = app.events.subscribe({[FLIP_LOADER] : this.toggleLoader},this,-1);
            this.eventInited = true;
            //console.log('initEvent');
        }
    }
    componentDidUpdate(){
        this.initEvents();
        //console.log('loader update');
    }
    componentWillMount(){
        this.eventKey = null;
    }
    toggleLoader([params]){
        //params = params && params.constructor == Array?params[0]:params;
        //let{counter} = this.state;
        let counter = this.counter;
        //console.log(counter+' oc ' +this.state.counter + ' ' +params.status);
        if(params.reset){
            counter = 0;
            //toggleGlobalLoader({reset:!!params.recheck});
        }
        if(params.status){
            counter++;
        }
        else{
            counter--;
        }
        if(counter<0){
            counter = 0;
        }
        let status = counter > 0 || !!app.globalLoader;
        this.counter = counter;
        this.setStyle();
        //console.log('reset>'+params.reset+' - '+counter + ' status '+status+' -org-'+params.status);
        this.setState({show: status,counter});
    }

    setBodyClass(){
        let cls = document.body.className || "";
        cls = cls.replace(/\bb-loader\b|\bg-loader\b/g,"").trim();
        if(this.state.show){
            cls = cls + ' b-loader'+(app.globalLoader?' g-loader':'');
        }
        document.body.className = cls;
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        let inline = !!nextProps.inline;
        console.log(prevState.counter+' derived state> '+inline);
        return inline?{show: inline}:{show: prevState.counter >0};
    }*/
    
    render(){
        this.setBodyClass();
        return(
            <React.Fragment>
                {!this.state.show && <React.Fragment/>}
                {this.state.show && <div className={"bg-loader "+(this.bgimg?'bg-loader-img':'')} style={this.pageStyle}>
                    {this.bgimg && <Image responsiveUrl cls="img-fluid" src={this.bgimg} alt="loader image"/>}
                    <div className="loader" style={this.style}></div>
                </div>}
            </React.Fragment>
            // <div className={this.props.class}>               
            // </div>
        )
    }
}
export default Loader;
