import React, { Component } from "react";
import {FLIP_LOADER,GOTO_URL,SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE,ASSET_LISTING} from "utils/constants";
import FormField from "../common/formfield";
import dataService from "utils/dataservice";
import FormValidator from '../common/formvalidator';

class assetRegistration extends Component {
  constructor(props) {
    super(props);
    this.validateFieldData = this.validateFieldData.bind(this);
    this.validator = new FormValidator([
      {
        field: "assetKey",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Asset Key is empty"
      },
      {
        field: 'model', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Model is empty'
      },
      {
        field: 'macId', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'MAC Id is empty'
      },
      {
        field: 'simNo', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'SIM Number is empty'
      },
      {
        field: 'msisdnNo', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'MSISDN Number is empty'
      },
      {
        field: 'productCategory', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Product Category is empty'
      },
    ]);

    this.state = {
      ...this.getStateData(this.props)
    };

    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    {
      this.props.match.params.assetKey == -1
        ? ""
        : dataService
            .getRequest("getAsset", {
              assetKey: this.props.match.params.assetKey
            })
            // .then(res => res.json())
            .then(result => {
              this.setState({
                ...this.getStateData(result)
              });
            })
            .catch(error => {
              console.error(error);
            });
    }
  }

  getStateData(assetdata) {
    return {
      assetKey: assetdata.assetKey || "",
      model: assetdata.model || "",
      macId: assetdata.macId || "",
      simNo: assetdata.simNo || "",
      msisdnNo: assetdata.msisdnNo || "",
      productCategory: assetdata.productCategory || ""
    };
  }

  validateFieldData(value, args, state, validation, field) {
    return this.fieldData[field] && !!this.fieldData[field][args.propName];
  }

  handleInputChange(event, fieldData = {}) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    this.fieldData[field] = fieldData;
    event &&
      this.setState({
        [field]: event.target.type == "checkbox" ? event.target.checked : value
      });
  }

  submit() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    // Submit data if validation is successful
    if (validation.isValid) {
      dataService
        .postRequest("assetregistered", { ...this.getStateData(this.state) })
        .then(res => {
          app.events.trigger(SHOW_ALERT_MSG, {
            visible: true,
            type: ALERT_TYPE.SUCESS,
            msg: res
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  update() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      dataService
        .putRequest(
          "updateAsset",
          { assetKey: this.props.match.params.assetKey },
          { ...this.getStateData(this.state) }
        )
        .then(res => {
          app.events.trigger(SHOW_ALERT_MSG, {
            visible: true,
            type: ALERT_TYPE.SUCESS,
            msg: res
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  cancel() {
    app.events.trigger(GOTO_URL, { routerKey: ASSET_LISTING });
  }

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    var assetKey = this.props.match.params.assetKey;
    return (
      <div className="form-wrapper">
        <div className="d-flex justify-content-sm-around">
          {/* Input details first block  */}
          <div className="p-2 w-25 mt-5">
            <FormField
              label="Asset Key"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              mandatory
              disabled = {assetKey !='-1'}
              name="assetKey"
              onChange={this.handleInputChange}
              value={this.state.assetKey}
              placeholder="Asset Key"
              validator={validation}
            />
            <FormField
              label="Model"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              mandatory
              onChange={this.handleInputChange}
              name="model"
              value={this.state.model}
              placeholder="Model"
              validator={validation}
            />
            <FormField
              label="MAC Id"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              onChange={this.handleInputChange}
              name="macId"
              value={this.state.macId}
              placeholder="MAC Id"
              validator={validation}
            />
            <FormField
              label="Sim Number"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              onChange={this.handleInputChange}
              name="simNo"
              value={this.state.simNo}
              placeholder="Sim Number"
              validator={validation}
            />
            <FormField
              label="MSISDN Number"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              onChange={this.handleInputChange}
              name="msisdnNo"
              value={this.state.msisdnNo}
              placeholder="MSISDN Number"
              validator={validation}
            />
            <FormField
              type="select"
              label="Product Category"
              labelClassName="txt-label"
              fieldClassName="select-input"
              mandatory
              name="productCategory"
              nameAlias={"abc_fullName"}
              onChange={this.handleInputChange}
              options={[
                { value: "Mouse", label: "Mouse" },
                { value: "Wifi", label: "Wifi" },
                { value: "Modem", label: "Modem" },
                { value: "Adapter", label: "Adapter" },
                { value: "Laptop", label: "Laptop" },
                { value: "Headset", label: "Headset" }
              ]}
              value={this.state.productCategory}
              placeholder="Product Category"
              validator={validation}
            />
          </div>
        </div>

        {/* Button wrapper for Submit, Update and Cancel*/}
        <div className="btn-wrapper">
          {assetKey == "-1" ? (
            <button
              type="button"
              className="btn submit-btn"
              onClick={this.submit}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="btn submit-btn"
              onClick={this.update}
            >
              Update
            </button>
          )}
          <button
            type="button"
            className="btn cancel-btn"
            onClick={this.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default assetRegistration;
