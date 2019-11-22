import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_BILL_LISTING } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
export class ReimbursementBillListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: [
        { label: "si no", key: "index" },
        { label: "Bill no", key: "billNo" },
        { label: "bill date", key: "billDate" },
        { label: "reimbursement description", key: "reimbursementDescription" },
        { label: "category name", key: "categoryName" },
        { label: "cost", key: "cost" },
      ],
      // datas: [
      //   {
      //     "billDate": "2019-11-11T18:30:00.000+0000",
      //     "reimbursementDescription": "Travel Expense",
      //     "categoryName": "Travel",
      //     "billNo": 14351,
      //     "cost": 16000
      //   },
      //   {
      //     "billDate": "2019-11-12T18:30:00.000+0000",
      //     "reimbursementDescription": "Food Expense",
      //     "categoryName": "Food",
      //     "billNo": 3042253,
      //     "cost": 2000
      //   }
      // ]
    }
    this.pageHandler = this.pageHandler.bind(this);
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });

    dataService.getRequest("reimbursementBill", { reimbursementId: this.props.match.params.reimbursementId })
      .then(res => {
        this.setState({
          datas: res
        });
      })
      .catch(error => {
        console.error(error);
      });

  }
  pageHandler(data) {

  }
  render() {
    return (
      <div>
        <ListTable
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
        />

      </div>
    );
  }
}

export default ReimbursementBillListing;
