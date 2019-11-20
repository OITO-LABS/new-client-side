import React, { Component } from 'react';
import { SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE } from "utils/constants";
import PropTypes from 'prop-types';
import Pagination from './common/pagination';
// import "assets/css/listTable.css";
// import {confirm} from 'utils/common';

class ListTable extends Component {
   constructor(props) {
      super(props)

      this.state = {
         
      }
      this.renderTableHeader = this.renderTableHeader.bind(this);
      this.renderTableData = this.renderTableData.bind(this);
      this.handleDetails = this.handleDetails.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
   }

   renderTableHeader() {

      return this.props.fields.map((item, index) => {
         return <th key={index}>{item.label.toUpperCase()}</th>
      })
   }


   handleDetails() {
      alert("this.handledetails clicked")
   }

   renderTableData() {
      const data = this.props.datas || [];
      const fields = this.props.fields || [];
      return data.map((data, index) => {
         return (
            <tr key={index}>
               
               {fields.map((item, i) => {
                  if (item.key == "index") {
                     return (
                        <td key={i}>{index + 1}</td>
                     )
                  }
                  else if (item.key !== "editDelete") {
                     if (i == 1) {
                        return (
                           <td key={i} onClick={()=>{this.props.detailsHandler(data)}}><a href="#">{data[item.key]}</a></td>
                        )
                     }
                     return (
                        <td key={i}>{data[item.key]}</td>
                     )
                  }
                  else if (item.key == "editDelete") {
                     return (
                        <td key={i}>
                           <button onClick={()=>{this.props.editHandler(data)}} className="btn btn-primary action"><i className="fas fa-edit"></i></button>
                           <button onClick={()=>{this.props.deleteHandler(data)}} className="btn btn-danger action"><i className="fas fa-trash"></i></button>
                        </td>
                     )
                  }
                  // return(
                  // item.key == 'index' ?<td key={i}>{index+1}</td> :<td key={i}>{data[item.key]}</td>
                  // )
               })}
            </tr>
         )
      })
   }

   onPageChange(paginationInfo){
      this.setState({
         activePage:paginationInfo.activePage
      })
      this.props.pageHandler(paginationInfo.activePage);
      // alert(paginationInfo.activePage);
   }

   render() {
      // readData();
      return (
         <div>
            <table className="table  list">
               <thead>
                  <tr>
                     {this.renderTableHeader()}
                  </tr>
               </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
            <Pagination totalItems={this.props.totalRecords||1} onPageChange={this.onPageChange}/>
         </div>
      );
   }
}
export default ListTable;

ListTable.propTypes = {
   totalRecords: PropTypes.number,
   recordsPerPage: PropTypes.number,
   activePage: PropTypes.number,
   datas: PropTypes.array,
   fields: PropTypes.array,
   pageHandler: PropTypes.func.isRequired,
   editHandler:PropTypes.func,
   deleteHandler:PropTypes.func
};

ListTable.defaultProps = {
   recordsPerPage: 10,
   activePage: 1,
};