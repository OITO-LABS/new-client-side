(window.webpackJsonp=window.webpackJsonp||[]).push([[2,9,10,12,17],{"4zIB":function(e,t,a){"use strict";a.r(t),a.d(t,"DetailsTable",function(){return l});var s=a("q1tI"),i=a.n(s);a("hlrv");class l extends s.Component{constructor(e){super(e),this.state={},this.renderTableData1=this.renderTableData1.bind(this),this.renderTableData2=this.renderTableData2.bind(this)}renderTableData1(){const e=this.props.fields||[],t=this.props.data||[];return i.a.createElement("tbody",null,e.map((e,a)=>{if(a%2==0)return i.a.createElement("tr",{key:a},i.a.createElement("td",{className:"field"},e.label),i.a.createElement("td",{className:"value"},t[e.key]))}))}renderTableData2(){const e=this.props.fields||[],t=this.props.data||[];return i.a.createElement("tbody",null,e.map((e,a)=>{if(a%2==1)return i.a.createElement("tr",{key:a},i.a.createElement("td",{className:"field"},e.label),i.a.createElement("td",{className:"value"},t[e.key]))}))}render(){return i.a.createElement("div",{className:"row multiple-table"},i.a.createElement("div",{className:"col-6 detailsTable"},i.a.createElement("table",{className:"table table-bordered"},i.a.createElement("thead",null),this.renderTableData1())),i.a.createElement("div",{className:"col-6 detailsTable"},i.a.createElement("table",{className:"table table-bordered"},i.a.createElement("thead",null),this.renderTableData2())))}}t.default=l},"6pf8":function(e,t,a){"use strict";a.r(t),a.d(t,"EmployeeDetails",function(){return h});var s=a("q1tI"),i=a.n(s),l=a("Bbg3"),n=a("UJ58"),r=a("4zIB"),c=a("gePh"),o=a("qcPu");class h extends s.Component{constructor(e){super(e),this.state={employeeFields:[{label:"First Name",key:"firstName"},{label:"Last Name",key:"lastName"},{label:"Employee ID",key:"empNo"},{label:"Designation",key:"designation"},{label:"Email ",key:"email"},{label:"Contact NO ",key:"contactNo"},{label:"Emergency Contact Person ",key:"emergencyContactName"},{label:"Emergency Contact No ",key:"emergencyContact"},{label:"Health Card Number ",key:"healthCardNo"},{label:"Blood Group ",key:"bloodGroup"},{label:"dob",key:"dob"}],assetFields:[{label:"si no",key:"index"},{label:"asset-key",key:"assetKey"},{label:"asset-category",key:"productCategory"},{label:"model",key:"model"}]}}componentDidMount(){app.events.trigger(l.o,{status:!1,reset:!0});this.props.match.params.empId;o.a.getRequest("getEmpDetails",{empId:this.props.match.params.empId}).then(e=>{this.setState({data:e})}).catch(e=>{console.error(e)}),o.a.getRequest("assetsOfEmployee",{empId:this.props.match.params.empId}).then(e=>{this.setState({assets:e})}).catch(e=>{console.error(e)})}render(){return i.a.createElement("div",null,i.a.createElement(n.default,{heading:"Employee-Details"}),i.a.createElement(r.default,{data:this.state.data,fields:this.state.employeeFields}),i.a.createElement(n.default,{heading:"Assets In Hand "}),i.a.createElement(c.default,{totalRecords:1,fields:this.state.assetFields,datas:this.state.assets}))}}t.default=h},Kmxm:function(e,t,a){"use strict";a.r(t);var s=a("q1tI"),i=a.n(s),l=a("17x9"),n=a.n(l),r=(a("0oA5"),a("Bbg3"));class c extends i.a.Component{constructor(e){super(e),this.minNavItems=7,this.setProperties();let t={};t.pages=this.calculatePages(t),this.state=t}setProperties(){this.deepPaginationLimit=this.props.deepPaginationLimit||0,this.limitedPageNav=this.deepPaginationLimit>0,this.activePage=this.props.activePage,this.maxNavItems=this.props.maxNavItems<this.minNavItems?this.minNavItems:this.props.maxNavItems,this.totalItems=this.props.totalItems,this.itemsPerPage=this.props.itemsPerPage,"mini"==this.props.type&&(this.maxNavItems=1,this.itemsPerPage=1),this.totalPages=Math.floor(this.totalItems/this.itemsPerPage)+(this.totalItems%this.itemsPerPage==0?0:1),this.p={activePage:this.activePage,totalItems:this.totalItems}}prevPage(){return this.activePage>1}nextPage(){return this.activePage<this.totalPages}isPropertyChanged(){return this.props.totalItems!=this.p.totalItems||this.props.activePage!=this.p.activePage}changePage(e,t){if(e){let e=this.state;this.activePage=this.activePage+t,this.activePageChange(),this.props.onPageChange&&(e={totalPages:this.totalPages,totalItems:this.totalItems,itemsPerPage:this.itemsPerPage,activePage:this.activePage},this.props.onPageChange(e)),app.events.trigger(r.x)}}activePageChange(){let e=this.calculatePages();this.setState({pages:e})}isPageAccessable(e){return!this.limitedPageNav||e<=this.deepPaginationLimit}getPageData(e,t,a=!0,s){let i=[];for(let l=e;l<=t;l++)a&&!this.isPageAccessable(l)&&(a=!1),i.push({index:i.length,no:l,text:s||l,link:a,active:this.activePage==l});return i}calculatePages(e){if("mini"==this.props.type)return this.getPageData(this.activePage,this.activePage);if(this.maxNavItems>=this.totalPages)return this.getPageData(1,this.totalPages);let t=this.maxNavItems<9?1:this.maxNavItems>20?3:2,a=this.totalPages,s=this.activePage,i=[1,this.totalPages],l=1,n=Math.floor((this.maxNavItems-t)/2),r=a-(this.maxNavItems-n-t)+1,c=a;if(this.limitedPageNav){let e=s+Math.floor(this.maxNavItems/2);return l=1,(n=this.maxNavItems)<e&&(l=(n=e<=this.totalPages?e:this.totalPages)-this.maxNavItems+1),this.getPageData(l,n)}if(!i.includes(s)){let e=n==s?1:2;if(n==s||s==n+1)n+=e=s-n+1,r+=e;else if(r==s||r-1==s)n-=e=r-s+1,r-=e;else if(n<s&&r>s){e=2;let a=1,i=1,l=1,o=t>1?2:1;return s-n<3?(a=1,n-=2,r+=2,i=1,t>2&&(l=2)):r-s<3?(i=1,n-=2,r+=2,a=1,o=1,l=t>1?2:1,t>2&&(o=2)):(a=1,n-=2,r+=2,i=1,t>2&&(l=2)),[...this.getPageData(1,n),...this.getPageData(n+1,n+a,!1,"..."),...this.getPageData(s-l,s+o),...this.getPageData(r-i,r-1,!1,"..."),...this.getPageData(r,c)]}}return[...this.getPageData(1,n),...this.getPageData(n+1,n+t,!1,"..."),...this.getPageData(r,c)]}calculatePagesOld(e){let t=this.activePage,a=this.maxNavItems>=this.totalPages,s=a?this.totalPages:this.maxNavItems,i=[],l=a?0:s<9?1:s>20?3:2,n=this.totalPages,r=(Math.floor(n/3),Math.floor((s-l)/2)),c=Math.floor(r/2),o=Math.floor(c/2),h=1,m=r,d=n-r+1,g=n,p=m+1,u=d-1;if(!a&&t>=p&&t<=u){let e=t-c,a=t-o,i=t-r;e+s-1<=n&&(h=e,p=(m=e+r-1)+1),a+s-1<=n?(h=a,p=(m=a+r-1)+1):i+s-1<=n?(h=i,p=(m=i+r-1+l-(l>1?1:0))+1,l=l>1?1:0):d-l<=t?(m-=l,u=(d-=l)-1):t-m+h<d-1&&(h=t-m+h,m=t,u=(d-=1)-1)}let P=s-(m-h+l+g-d+2);P>0&&(t<=m?p=(m+=P)+1:u=(d-=P)-1);let b=0,v=0;for(v=h;v<=m;v++)i.push({index:i.length,no:v,text:v,link:!0,active:t==v}),b++;for(v=0;v<l;v++)i.push({index:i.length,no:v,text:"...",link:!1,active:!1}),b++;for(v=d;b<s&&v<=g;v++)i.push({index:i.length,no:v,text:v,link:!0,active:t==v}),b++;return i}componentDidUpdate(){this.isPropertyChanged()&&(this.setProperties(),this.activePageChange())}render(){return i.a.createElement("div",{className:"bxpagn "+(this.props.className||"")},i.a.createElement("nav",null,i.a.createElement("ul",{className:"pagination justify-content-center"+(this.totalPages<2?" d-none":"")},i.a.createElement("li",{className:"page-item "+(this.prevPage()?"":"disabled")},i.a.createElement("a",{onClick:()=>this.changePage(this.prevPage(),-1),className:"page-link cu-pointer"},i.a.createElement("i",{className:"fas fa-chevron-left"}))),this.state.pages.map((e,t)=>i.a.createElement("li",{key:t,className:"page-item "+(e.active?"active":e.link?"":"disabled")},i.a.createElement("a",{onClick:()=>this.changePage(e.link,e.no-this.activePage),className:"page-link cu-pointer"},i.a.createElement("span",{className:"number-font"},e.text)))),i.a.createElement("li",{className:"page-item "+(this.nextPage()?"":"disabled")},i.a.createElement("a",{onClick:()=>this.changePage(this.nextPage(),1),className:"page-link cu-pointer"},i.a.createElement("i",{className:"fas fa-chevron-right"}))))))}}c.propTypes={activePage:n.a.number,maxNavItems:n.a.number,totalItems:n.a.number.isRequired,itemsPerPage:n.a.number,onPageChange:n.a.func},c.defaultProps={activePage:1,maxNavItems:10,itemsPerPage:10},t.default=c},UJ58:function(e,t,a){"use strict";a.r(t),a.d(t,"Heading",function(){return l});var s=a("q1tI"),i=a.n(s);a("bBnu");class l extends s.Component{constructor(e){super(e),this.state={}}render(){return i.a.createElement("div",{className:"row heading-row"},i.a.createElement("h4",null,this.props.heading))}}t.default=l},bBnu:function(e,t,a){},gePh:function(e,t,a){"use strict";a.r(t);var s=a("q1tI"),i=a.n(s),l=(a("Bbg3"),a("17x9")),n=a.n(l),r=a("Kmxm");class c extends s.Component{constructor(e){super(e),this.state={},this.renderTableHeader=this.renderTableHeader.bind(this),this.renderTableData=this.renderTableData.bind(this),this.handleDetails=this.handleDetails.bind(this),this.onPageChange=this.onPageChange.bind(this)}renderTableHeader(){return this.props.fields.map((e,t)=>i.a.createElement("th",{key:t},e.label.toUpperCase()))}handleDetails(){alert("this.handledetails clicked")}renderTableData(){const e=this.props.datas||[],t=this.props.fields||[];return e.map((e,a)=>i.a.createElement("tr",{key:a},t.map((t,s)=>{if("index"==t.key)return i.a.createElement("td",{key:s},a+1);if("editDelete"!==t.key&&"status"!==t.key)return 1==s?i.a.createElement("td",{key:s,onClick:()=>{this.props.detailsHandler(e)}},i.a.createElement("a",{href:"#"},e[t.key])):i.a.createElement("td",{key:s},e[t.key]);if("editDelete"==t.key)return i.a.createElement("td",{key:s},i.a.createElement("button",{onClick:()=>{this.props.editHandler(e)},className:"btn btn-primary action"},i.a.createElement("i",{className:"fas fa-edit"})),i.a.createElement("button",{onClick:()=>{this.props.deleteHandler(e)},className:"btn btn-danger action"},i.a.createElement("i",{className:"fas fa-trash"})));if("status"==t.key){if("0"==e[t.key])return i.a.createElement("td",{key:s},i.a.createElement("button",{onClick:()=>this.props.unAssignHandler(e),className:"btn btn-warning"},"UnAssign"));if("1"==e[t.key])return i.a.createElement("td",{key:s},i.a.createElement("button",{onClick:()=>this.props.assignHandler(e),className:"btn btn-success"},"Assign"))}})))}onPageChange(e){this.setState({activePage:e.activePage}),this.props.pageHandler(e.activePage)}render(){return i.a.createElement("div",null,i.a.createElement("table",{className:"table  list"},i.a.createElement("thead",null,i.a.createElement("tr",null,this.renderTableHeader())),i.a.createElement("tbody",null,this.renderTableData())),i.a.createElement(r.default,{totalItems:this.props.totalRecords||1,onPageChange:this.onPageChange}))}}t.default=c,c.propTypes={totalRecords:n.a.number,recordsPerPage:n.a.number,activePage:n.a.number,datas:n.a.array,fields:n.a.array,pageHandler:n.a.func.isRequired,editHandler:n.a.func,deleteHandler:n.a.func},c.defaultProps={recordsPerPage:10,activePage:1}},hlrv:function(e,t,a){}}]);