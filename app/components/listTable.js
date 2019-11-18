import React, { Component } from 'react';
import "assets/css/listTable.css";
import { SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE } from "utils/constants";
import PropTypes from 'prop-types';
import Pagination from './common/pagination';
// import {confirm} from 'utils/common';

class ListTable extends Component {
   constructor(props) {
      super(props)

      this.state = {
         datas: [
            {
               "firstName": "abhishek",
               "lastName":"Murali", 
               "email": "abhishek@gmail.com",
               "designation": "intern",
               "dob":"1974-04-18",
               "contactNo":97412983352, 
               "emergencyContactName":"Muralimohan",
               "emergencyContact":9384326738,
               "healthCardNo":"OITO101INT001",
               "bloodGroup":"A-",
               "status":"Y",
               "empNo":"INT001"
            },
            {
               "firstName": "preeti",
               "lastName":"Murali", 
               "email": "preeti@gmail.com",
               "designation": "intern",
               "dob":"1974-04-18",
               "contactNo":97412983352, 
               "emergencyContactName":"Muralimohan",
               "emergencyContact":9384326738,
               "healthCardNo":"OITO101INT001",
               "bloodGroup":"A-",
               "status":"Y",
               "empNo":"INT001"
            },
            {
               "firstName": "arun",
               "lastName":"Murali", 
               "email": "arun2@gmail.com",
               "designation": "intern",
               "dob":"1974-04-18",
               "contactNo":97412983352, 
               "emergencyContactName":"Muralimohan",
               "emergencyContact":9384326738,
               "healthCardNo":"OITO101INT001",
               "bloodGroup":"A-",
               "status":"Y",
               "empNo":"INT001"
            },
            {
               "firstName": "gayatri",
               "lastName":"Murali", 
               "email": "gayatri@gmail.com",
               "designation": "intern",
               "dob":"1974-04-18",
               "contactNo":97412983352, 
               "emergencyContactName":"Muralimohan",
               "emergencyContact":9384326738,
               "healthCardNo":"OITO101INT001",
               "bloodGroup":"A-",
               "status":"Y",
               "empNo":"INT001"
            }
         ],
         fields: [
            { label: "si no", key: "index" },
            { label: "employee id", key: "empNo" },
            { label: "NAME", key: "firstName" },
            { label: "email", key: "email" },
            { label: "contact no", key: "contactNo" },
            { label: "action", key: "editDelete" }
         ]
      }
      this.renderTableHeader = this.renderTableHeader.bind(this);
      this.renderTableData = this.renderTableData.bind(this);
      this.handleDetails = this.handleDetails.bind(this);
      // this.readData = this.readData.bind(this);
      this.onPageChange = this.onPageChange.bind(this);


   }


   // componentDidMount() {
   //    this.readData();
   // }

   // readData(){
   //    this.setState({
   //       datas:this.props.datas,
   //       fields:this.props.fields,
   //       activePage: this.props.activePage,
   //       totalRecords: this.props.totalRecords,
   //       recordsPerPage: this.props.recordsPerPage
   //    })
   // }

   renderTableHeader() {
      return this.state.fields.map((item, index) => {
         return <th key={index}>{item.label.toUpperCase()}</th>
      })
   }


   handleDetails() {
      alert("this.handledetails clicked")
   }

   renderTableData() {
      return this.state.datas.map((student, index) => {
         return (
            <tr key={index}>
               {this.state.fields.map((item, i) => {
                  if (item.key == "index") {
                     return (
                        <td key={i}>{index + 1}</td>
                     )
                  }
                  else if (item.key !== "editDelete") {
                     if (i == 1) {
                        return (
                           <td key={i} onClick={this.handleDetails}><a href="#">{student[item.key]}</a></td>
                        )
                     }
                     return (
                        <td key={i}>{student[item.key]}</td>
                     )
                  }
                  else if (item.key == "editDelete") {
                     return (
                        <td key={i}>
                           <button onClick={()=>{this.props.editHandler(student)}} className="btn btn-primary action"><i className="fas fa-edit"></i></button>
                           <button onClick={()=>{this.props.deleteHandler(student)}} className="btn btn-danger action"><i className="fas fa-trash"></i></button>
                        </td>
                     )
                  }
                  // return(
                  // item.key == 'index' ?<td key={i}>{index+1}</td> :<td key={i}>{student[item.key]}</td>
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
            <Pagination totalItems={300} onPageChange={this.onPageChange}/>
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