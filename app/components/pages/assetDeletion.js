import React, { Component } from "react";
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, ASSET_LISTING } from "utils/constants";
import FormField from "../common/formfield";
import dataService from "utils/dataservice";
import Heading from "../heading";
import FormValidator from '../common/formvalidator';

class AssetDeletion extends Component {
    constructor(props) {
        super(props);
        this.validateFieldData = this.validateFieldData.bind(this);
        this.validator = new FormValidator([
            {
                field: 'enableStatus',
                method: 'isEmpty',
                args: [{ ignore_whitespace: true }],
                validWhen: false,
                message: 'Select A Status',
            },
            {
                field: 'updatedDate',
                method: 'isEmpty',
                args: [{ ignore_whitespace: true }],
                validWhen: false,
                message: 'updated date is empty'
            }]

        )
        this.state = {
            ...this.getStateData(this.props),
            validation: this.validator.valid(),
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.fieldData = {};
    }

    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
        
    }

    getStateData(assetdata) {
        return {
            enableStatus: assetdata.enableStatus || "",
            updatedDate: assetdata.updatedDate || "",
        };
    }


    validateFieldData(value, args, state, validation, field) {
        return this.fieldData[field] && !!this.fieldData[field][args.propName];
    }

    handleDelete() {
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        var updatedDate = this.state.updatedDate;
        var enableStatus= this.state.enableStatus;

        if (validation.isValid) {
            dataService.deleteRequest("assetDelete", { enableStatus: enableStatus, updatedDate: updatedDate, assetId: this.props.assetId })
                .then(res => {
                    if (res.status == "success") {
                        app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.SUCCESS, msg: "Successfully Assigned" });
                        setTimeout(() => {
                            app.events.trigger(GOTO_URL, { routerKey: ASSET_LISTING });
                        }, 3000)
                    }
                    else {
                        app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: `${res.message}` });
                    }
                })
                .catch(err => { console.log(err) });
        }
    }

    cancel() {
        app.events.trigger(GOTO_URL, { routerKey: ASSET_LISTING });
    }

    handleInputChange(event, fieldData = {}) {
        let field = fieldData.field || event.target.name;
        let value = fieldData.value || event.target.value || "";
        this.fieldData[field] = value;
        event && this.setState({
            [field]: event.target.type == "checkbox" ? event.target.checked : value
        });
    }

    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        var assetId = this.props.match.params.assetId;

        return (
            <React.Fragment>
                <div className="form-wrapper">
                    <Heading heading="ASSET DELETION" />

                    <div className="d-flex justify-content-sm-around">
                        <div className="p-2 w-25 mt-5">
                            <FormField
                                type="select"
                                label="Status"
                                labelClassName="txt-label"
                                fieldClassName="select-input"
                                mandatory
                                name="enableStatus"
                                nameAlias={"enableStatus"}
                                onChange={this.handleInputChange}
                                options={[
                                    { value: "Disabled", label: "Disable" },
                                    { value: "Inactive", label: "Inactivate" }
                                ]}
                                value={this.state.enableStatus}
                                placeholder="status"
                                validator={validation}
                            />
                            <FormField
                                label="Updated Date"
                                labelClassName="txt-label"
                                fieldClassName="txt-input"
                                mandatory
                                onChange={this.handleInputChange}
                                name="updatedDate"
                                type="date"
                                value={this.state.updatedDate}
                                placeholder="Updated Date"
                                validator={validation}
                            />
                        </div>
                    </div>

                    <div className="btn-wrapper">
                        <div className="btn-wrapper">
                            <button type="button" className="btn submit-btn" onClick={this.handleDelete}>Delete</button>
                            <button type="button" className="btn cancel-btn" onClick={this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AssetDeletion;
