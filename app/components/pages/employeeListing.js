import React from 'react';
import { FLIP_LOADER, GOTO_URL,SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE ,EMPLOYEE_REG,EMPLOYEE_UPDATE} from 'utils/constants';
import SearchAndButtonBar from "../searchAndButtonBar";
import ListTable from "../listTable";
import { confirm } from 'utils/common';
import { fileURLToPath } from 'url';
// import { FLIP_LOADER,ALERT_TYPE,SHOW_ALERT_MSG,SHOW_ALERT } from 'utils/constants';


class EmployeeListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      searchValue: ""
    }
    this.gettingData = this.gettingData.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    // this.gettingData();
  }



  gettingData() {
    const data = { activePage: this.state.activePage, searchValue: this.state.searchValue }
    fetch('http://localhost:4000', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData)
        this.setState({
          totalRecords: jsonData.totalrecords,
          datas: jsonData.datas
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }


  handlePage(pagenum) {
    this.setState({
      activePage: pagenum
    }, () => { this.gettingData() })
  }

  handleSearch(value) {
    this.setState({
      activePage: 1,
      searchValue: value
    }, () => { this.gettingData() })
  }

  handleEdit() {
    // console.log(data);
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_UPDATE });
  }

  async handleDelete(data) {
      // alert(data);
      console.log(data);
    let isConfirmed = false;
    isConfirmed = await confirm({
      msg: 'Are you sure you want to delete this from emplist'
    });
    if (isConfirmed) {
      // alert("successfully deleted");
      app.events.trigger(SHOW_ALERT_MSG, {
        visible: true,
        type: ALERT_TYPE.SUCESS,
        msg: 'some message'
      });

    }
  }

  handleRegister(){
    app.events.trigger(GOTO_URL,{ routerKey: EMPLOYEE_REG});
  }

  render() {
    return (
      <div>
        <SearchAndButtonBar
          button1name="Register a employee"
          button2name="export"
          handleRegister={this.handleRegister}
          searchHandler={this.handleSearch}
        />
        <ListTable totalRecords={100} recordsPerPage={10} activePage={1} pageHandler={this.handlePage} editHandler={this.handleEdit} deleteHandler={this.handleDelete} />
      </div>
    );
  }
}

export default EmployeeListing;
