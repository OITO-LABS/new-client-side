import React, { Component } from 'react';
import { SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE } from "utils/constants";
import PropTypes from 'prop-types';
import Pagination from './common/pagination';
// import "assets/css/listTable.css";
import NoRecordsFound from './noRecordsFound';

class ListTable extends Component {
   constructor(props) {
      super(props)

      this.state = {

      }
      this.renderTableHeader = this.renderTableHeader.bind(this);
      this.renderTableData = this.renderTableData.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
   }

   renderTableHeader() {
      return this.props.fields.map((item, index) => {
         if (this.props.sortRequired) {
            if (index == 0 || item.key == "editDelete" || item.key == "status") {
               return <th key={index}>{item.label.toUpperCase()}</th>
            }
            else {
               return <th key={index}>{item.label.toUpperCase()}   <i className="fas fa-sort" onClick={() => { this.props.sortHandler(item) }}></i></th>
            }
         }
         else {
            return <th key={index}>{item.label.toUpperCase()}</th>
         }
      })
   }

   renderTableData() {
      const data = this.props.datas || [];
      const fields = this.props.fields || [];
      return data.map((data, index) => {
         return (
            <tr key={index}>
               {fields.map((item, i) => {
                  let activePage = this.state.activePage - 1 || 0;
                  let recordsPerPage = this.props.recordsPerPage;
                  let newIndex = index + 1
                  let indexValue = (activePage * recordsPerPage) + newIndex;
                  if (item.key == "index") {
                     return (
                        // <td key={i}>{index + 1}</td>
                        <td key={i}>{indexValue}</td>
                     )
                  }
                  else if (item.key !== "editDelete" && item.key !== "status" && item.key !== "approvel" && item.key !== "approvel") {
                     if (i == 1) {
                        return (
                           <td key={i} onClick={() => { this.props.detailsHandler(data) }}><a href="#">{data[item.key]}</a></td>
                        )
                     }
                     return (
                        <td key={i}>{data[item.key]}</td>
                     )
                  }

                  else if (item.key == "editDelete") {
                     return (
                        <td key={i}>
                           <button onClick={() => { this.props.editHandler(data) }} className="btn btn-primary action"><i className="fas fa-edit"></i></button>
                           <button onClick={() => { this.props.deleteHandler(data) }} className="btn btn-danger action"><i className="fas fa-trash"></i></button>
                        </td>
                     )
                  }

                  else if (item.key == "delete") {
                     return (
                        <td key={i}>
                           <button onClick={() => { this.props.deleteHandler(data) }} className="btn btn-danger action"><i className="fas fa-trash"></i></button>
                        </td>
                     )
                  }


                  else if (item.key == "status") {
                     if (data[item.key] == "Assigned") {
                        return (
                           <td key={i}>
                              <button onClick={() => this.props.unAssignHandler(data)} className="btn btn-warning">UnAssign</button>
                           </td>
                        )
                     } else if (data[item.key] == "Unassigned") {
                        return (
                           <td key={i}>
                              <button onClick={() => this.props.assignHandler(data)} className="btn btn-success">Assign</button>
                           </td>
                        )
                     } else if (data[item.key] == "Inactive") {
                        return (
                           <td key={i}>
                              <button onClick={() => this.props.activateHandler(data)} className="btn btn-success">Activate</button>
                           </td>
                        )
                     } else if (data[item.key] == "Disabled") {
                        return (
                           <td key={i}>
                              <button className="btn btn-disabled" >Disabled</button>
                           </td>
                        )
                     } else if (data[item.key] == "Active") {
                        return (
                           <td key={i}>
                              <button className="btn btn-success " ><i className="fas fa-check"></i></button>
                           </td>
                        )
                     }else if (data[item.key] == "Terminated") {
                        return (
                           <td key={i}>
                              <button className="btn btn-danger " ><i class="far fa-times"></i></button>
                           </td>
                        )
                     }

                  }

                  else if (item.key == "approvel") {
                     if (data[item.key] == "approved") {
                        return (
                           <td key={i}>
                              <button className="btn btn-success">Approved</button>
                           </td>
                        )
                     } else if (data[item.key] == "rejected") {
                        return (
                           <td key={i}>
                              <button className="btn btn-danger">Rejected</button>
                           </td>
                        )
                     } else if (data[item.key] == "pending") {
                        return (
                           <td key={i}>
                              <button className="btn btn-warning">Pending</button>
                           </td>
                        )
                     }
                  }
               })}
            </tr>
         )
      })
   }

   onPageChange(paginationInfo) {
      this.setState({
         activePage: paginationInfo.activePage
      })
      this.props.pageHandler(paginationInfo.activePage);
   }

   render() {
      return (
         <div>
            <table className="table  list text-center">
               <thead>
                  <tr>
                     {this.renderTableHeader()}
                  </tr>
               </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>

            {this.props.datas && this.props.datas.length < 1 && <NoRecordsFound />}

            <Pagination totalItems={this.props.totalRecords || 1} onPageChange={this.onPageChange} activePage={this.props.activePage} />
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
   editHandler: PropTypes.func,
   deleteHandler: PropTypes.func,
   sortRequired: PropTypes.bool
};

ListTable.defaultProps = {
   recordsPerPage: 10,
   activePage: 1,
   sortRequired: false
};