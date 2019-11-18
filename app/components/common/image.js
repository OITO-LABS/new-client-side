import React from 'react';
import { isInViewport,withRelativePath,getNonCacheUrl,isMobileResp,mobileResponsiveUrl } from 'utils/common';
import {WIN_SCROLL} from 'utils/constants';
class Image extends React.Component {

    constructor(props) {
        super(props);
        this.fallbackImage = this.fallbackImage.bind(this);
        let preLoaderImg = null;//DEFAULT_IMG_CONFIG[this.props.preLoaderImg];
        this.noImg = null;//DEFAULT_IMG_CONFIG[this.props.noImg || 'list'] || DEFAULT_IMG_CONFIG['list'];
        this.state = {preLoaderImg,path:this.props.path,src:this.props.src, url: this.setResUrl() }; 
        this.imgRef = React.createRef();
        if(preLoaderImg){
            this.onScroll = this.onScroll.bind(this);
            let evt = {};
            evt[WIN_SCROLL] = this.onScroll;
            this.subKey = app.events.subscribe(evt, this);
        }    
        //console.log('img init');
    }
    onScroll(){
        if(!this.visible && this.subKey){
            this.visible = this.visible || isInViewport(this.imgRef.current,100);
            //console.log(this.visible+'-----'+this.state.url);
            if(this.visible){
                this.setState({preLoaderImg:false});
                app.events.unsubscribe(this.subKey);
                this.subKey = null;
            }
        }
    }
    setResUrl()
    {
        let url =  (this.props.path ? withRelativePath(this.props.path) : this.props.src);
        this.fallbackUrls = [...(this.props.fallbackUrls || [])];
        if(url && this.props.responsiveUrl && isMobileResp()){
            //let imgpart = url.split('/');
            //imgpart[imgpart.length-1] = 'mobile-'+imgpart[imgpart.length-1];
            this.fallbackUrls.push(url);
            url = mobileResponsiveUrl(url);
        }
        this.noImg && this.fallbackUrls.push(this.noImg);
        return (!url && this.props.defaultImage)?this.noImg:url;
    }

    fallbackImage() {
        this.fallbackUrls.length > 0 && this.setState({ url: this.fallbackUrls.shift()})
    }

    componentDidUpdate() {
        if (this.props.path != this.state.path || this.props.src != this.state.src) {
            this.setState({error:false, path: this.props.path, src: this.props.src, url: this.setResUrl() });
        }
        //console.log('img componentDidUpdate');
        !!this.state.preLoaderImg && this.onScroll();
    }
    componentDidMount(){
        !!this.state.preLoaderImg && setTimeout(()=>this.onScroll(),500);
        //console.log('img componentDidMount');
    }
    componentWillUnmount(){
        this.subKey=null;
        this.imgRef=null;
    }

    render() {
        if (!this.state.url) return null;
        if(this.state.preLoaderImg) return(<img ref={this.imgRef} src={this.state.preLoaderImg} alt='Pre loader Image'/>)
        return (
            <img
                src={this.props.noCache?getNonCacheUrl(this.state.url,this.props.uid):this.state.url}
                onError={this.fallbackImage}
                ref={this.imgRef}
                className={this.props.cls || ''}
                alt={this.props.alt || 'No Image'}
                onClick={this.props.onClick}
            />
        )
    }

}

export default Image
