import React from 'react';
import PropTypes from 'prop-types';
import {translate} from 'utils/common';
import {SCROLL_TO_TOP} from 'utils/constants';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.minNavItems = 7;
    this.setProperties();
    let stateProps = {};
    stateProps.pages = this.calculatePages(stateProps);
    this.state = stateProps;
  }
  setProperties(){
    this.deepPaginationLimit = this.props.deepPaginationLimit || 0;
    this.limitedPageNav = this.deepPaginationLimit > 0;
    this.activePage = this.props.activePage;
    this.maxNavItems = this.props.maxNavItems < this.minNavItems? this.minNavItems:this.props.maxNavItems;
    this.totalItems = this.props.totalItems;
    this.itemsPerPage = this.props.itemsPerPage;
    if(this.props.type == 'mini'){
      this.maxNavItems = 1;
      this.itemsPerPage = 1;
    }
    this.totalPages = Math.floor(this.totalItems/this.itemsPerPage) + (this.totalItems%this.itemsPerPage == 0? 0:1);
    this.p = {activePage:this.activePage,totalItems:this.totalItems};
  }
  prevPage(){
    return this.activePage > 1;
  }
  nextPage(){
    return this.activePage < this.totalPages /* && this.isPageAccessable(this.activePage+1) */;
  }
  isPropertyChanged(){
    return this.props.totalItems != this.p.totalItems || this.props.activePage != this.p.activePage;
  }
  changePage(active,step){
    if(active /* && this.isPageAccessable(this.activePage + step) */){
      let stateProps = this.state;
      this.activePage = this.activePage + step;
      this.activePageChange();
      if(this.props.onPageChange){
        stateProps = {totalPages:this.totalPages,totalItems:this.totalItems,itemsPerPage:this.itemsPerPage,activePage:this.activePage};
        this.props.onPageChange(stateProps);
      }
      app.events.trigger(SCROLL_TO_TOP);
    }
  }
  activePageChange(){
      let pages = this.calculatePages();
      this.setState({pages:pages});
  }
  isPageAccessable(pageNo)
  {
    return this.limitedPageNav? pageNo<=this.deepPaginationLimit:true;
  }
  getPageData(start,end,link=true,text)
  {
    let pages = [];
    for(let i = start;i<=end;i++){
      if(link && !this.isPageAccessable(i))
      {
        link = false;
      }
      pages.push({index:pages.length,no:i,text:(text||i),link:link,active:(this.activePage == i)});
    } 
    return pages;
  }
  calculatePages(props){
    if(this.props.type == 'mini'){
      return this.getPageData(this.activePage,this.activePage);
    }
    if(this.maxNavItems>=this.totalPages){
      return this.getPageData(1,this.totalPages);
    }
    let dotPages = this.maxNavItems < 9? 1:this.maxNavItems>20?3:2;
    let totalPages = this.totalPages;
    let currentPageNo = this.activePage;
    let pageIndex = [1,this.totalPages];
    let leftStart = 1;
    let leftEnd = Math.floor((this.maxNavItems - dotPages)/2);
    let firstSecCount = leftEnd;
    let lastSecCount = this.maxNavItems - leftEnd - dotPages;
    let rightStart = totalPages - lastSecCount + 1;
    let rightEnd = totalPages; 
    //console.log(this.maxNavItems+'-'+((this.maxNavItems - dotPages)/2)+' leftEnd '+leftEnd + ' rightStart '+rightStart); 
    if(this.limitedPageNav){
      let mid = Math.floor(this.maxNavItems/2);
      let tEnd = currentPageNo + mid;
      leftStart = 1;
      leftEnd = this.maxNavItems;
      if(leftEnd < tEnd)
      {
        leftEnd = (tEnd<=this.totalPages?tEnd:this.totalPages);
        leftStart = leftEnd - this.maxNavItems + 1;
      }
      return this.getPageData(leftStart,leftEnd);
    }
    else if(!pageIndex.includes(currentPageNo))//not in start or end
    {
      let step = leftEnd==currentPageNo ? 1:2;
      if(leftEnd==currentPageNo || currentPageNo==(leftEnd + 1))//left endge
      {
        step = currentPageNo - leftEnd + 1;
        //reset left end,right start
        leftEnd = leftEnd + step;//show extra one item
        rightStart = rightStart + step;//remove one item
        //console.log('type 1 leftEnd'+leftEnd+' rightStart'+rightStart);
      }
      else if(rightStart == currentPageNo || (rightStart-1) == currentPageNo)//right start
      {
        step = rightStart - currentPageNo + 1;
        //reset left end,right start
        leftEnd = leftEnd - step;//remove one item
        rightStart = rightStart - step;//show extra one item
        //console.log('type 2 leftEnd'+leftEnd+' rightStart'+rightStart);
      }
      else if(leftEnd<currentPageNo && rightStart>currentPageNo) //hidden part
      {
        step = 2;
        let ldot = 1,rdot = 1,mStart=1,mEnd=dotPages>1?2:1;
        if((currentPageNo - leftEnd) < 3){ 
           ldot = 1;
           leftEnd = leftEnd - 2;
           rightStart = rightStart + 2;
           rdot = 1;
           if(dotPages>2){
              mStart = 2;
            }
           //console.log('type 3-1 leftEnd'+leftEnd+' rightStart'+rightStart+' ldot'+ldot +' rdot'+rdot);
        }
        else if((rightStart - currentPageNo) < 3){ 
          rdot = 1;
          leftEnd = leftEnd - 2;
          rightStart = rightStart + 2;
          ldot = 1;
          mEnd = 1;
          mStart=dotPages>1?2:1;
          if(dotPages>2){
            mEnd = 2;
          }
          //console.log('type 3-2 leftEnd'+leftEnd+' rightStart'+rightStart+' ldot'+ldot +' rdot'+rdot);
       }
       else{
          ldot = 1;
          leftEnd = leftEnd - 2;
          rightStart = rightStart + 2;
          rdot = 1;
          //mEnd = 2;
          if(dotPages>2){
            mStart = 2;
          }
          //console.log('type 3-3 leftEnd'+leftEnd+' rightStart'+rightStart+' ldot'+ldot +' rdot'+rdot);
       }
        return  [...this.getPageData(1,leftEnd),
                 ...this.getPageData(leftEnd+1,leftEnd+ldot,false,'...'),
                 ...this.getPageData(currentPageNo-mStart,currentPageNo+mEnd),
                 ...this.getPageData(rightStart-rdot,rightStart-1,false,'...'),
                 ...this.getPageData(rightStart,rightEnd)]
      }       
    }
    //console.log('final leftEnd'+leftEnd+' rightStart'+rightStart);
    return  [...this.getPageData(1,leftEnd),
             ...this.getPageData(leftEnd+1,leftEnd+dotPages,false,'...'),
             ...this.getPageData(rightStart,rightEnd)];
  }
  calculatePagesOld(props){
    let a = this.activePage;
    let all = this.maxNavItems>=this.totalPages;
    let mxI = all?this.totalPages:this.maxNavItems;
    let pages = [];
    let h = all? 0:mxI<9?1:mxI>20?3:2;
    let e = this.totalPages;
    let pm = Math.floor(e/3);
    let m = Math.floor((mxI-h)/2);
    let m1 = Math.floor((m)/2);
    let m2 = Math.floor((m1)/2);
    let s = 1; 
    let me = m;//<=
    let lps = e - m + 1;
    let lpe = e;
    let phs = me + 1;
    let phe = lps-1;
    let helc  = phe - phs;//hidden el count
    if(!all && a>=phs && a<=phe){//in hidden
      let ns = a - m1;
      let ns0 = a - m2;
      let ns1 = a - m;
      if((ns+mxI-1)<=e){
        s = ns;
        me = ns + m-1;
        phs = me + 1;
        //console.log('-------re-positioned to end-------');
      }
      if((ns0+mxI-1)<=e){
        s = ns0;
        me = ns0 + m-1;
        phs = me + 1;
        //console.log('-------re-positioned to end-------');
      }
      else if((ns1+mxI-1)<=e){
        s = ns1;
        me = ns1 + m-1 + h - (h>1?1:0);
        phs = me + 1;
        h = h>1?1:0;
        //console.log('-------with '+h+' hidden-------');
      }
      else if((lps-h) <=a){
        me  = me - h;
        lps = lps - h;
        phe = lps-1;
      }
      else if((a-me+s) <(lps-1)){
        s  = a-me+s;
        me = a;
        lps = lps - 1;
        phe = lps-1;
      }
      else{
        //console.log('-------not handled-------');
      }
    }
    let t = me - s + h + lpe - lps + 2;
    let d = mxI-t;
    if(d>0){
      if(a<=me){
        me = me + d;
        phs = me + 1;
        //console.log('change me '+me);
      }
      else{
        lps = lps - d;
        phe = lps-1;
        //console.log('change lps '+lps);
      }
    }
    else if(d<0){
      //console.log('some calculation logic error');
    }
    let count = 0,i=0;
    for(i = s;i<=me;i++){
      pages.push({index:pages.length,no:i,text:i,link:true,active:(a == i)});
      count++;
    } 
    //console.log('count after F: '+count);
    for(i = 0;i<h;i++){
      pages.push({index:pages.length,no:i,text:'...',link:false,active:false});
      count++;
    } 
    //console.log('count after H: '+count);
    for(i = lps;count<mxI&&i<=lpe;i++){
      pages.push({index:pages.length,no:i,text:i,link:true,active:(a == i)});
      count++;
    } 
    //console.log('count after L: '+count);
    //console.log(t+' e='+e+' mxI='+mxI+' s='+s+' a='+a+' me='+me+' h='+h+' lps='+lps+' lpe='+lpe);
    return pages;
  }
  componentDidUpdate() {
    //console.log('-----Pagination updated------'+this.isPropertyChanged());
    if(this.isPropertyChanged()){
      this.setProperties();
      this.activePageChange();
    }
  }
  render(){
    return(
      <div className={"bxpagn "+(this.props.className || '')}>
          <nav>
              <ul className={"pagination justify-content-center"+(this.totalPages<2?" d-none":"")}>
                  <li className={"page-item "+(this.prevPage()?'':'disabled')}>
                      <a onClick ={()=>this.changePage(this.prevPage(),-1)} className="page-link cu-pointer"><i className="fas fa-chevron-left"></i></a>
                  </li>
                  {this.state.pages.map((page,i)=> {
                      return(<li key={i} className={"page-item "+(page.active?'active':page.link?'':'disabled')}>
                          {<a onClick ={()=>this.changePage(page.link,page.no-this.activePage)} className="page-link cu-pointer"><span className="number-font">{page.text}</span></a>}
                        </li>)
                    })}
                  <li className={"page-item "+(this.nextPage()?'':'disabled')}>
                      <a onClick ={()=>this.changePage(this.nextPage(),1)} className="page-link cu-pointer"><i className="fas fa-chevron-right"></i></a>
                  </li>
              </ul>
          </nav>
      </div>
    )
  }
}

Pagination.propTypes = {
    activePage:PropTypes.number,
    maxNavItems:PropTypes.number,
    totalItems:PropTypes.number.isRequired,
    itemsPerPage:PropTypes.number,
    onPageChange:PropTypes.func
}

Pagination.defaultProps = {
    activePage:1,
    maxNavItems:10,
    itemsPerPage:10
} 


export default Pagination;