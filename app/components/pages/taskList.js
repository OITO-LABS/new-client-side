import React from "react";
import FormField from "../common/formfield";

const TaskList = props => {
  return props.taskList.map((val, idx) => {
    let projectName = `projectName-${idx}`,
      task = `task-${idx}`,
      taskNotes = `taskNotes-${idx}`,
      taskStatus = `taskStatus-${idx}`;
    return (
      <tr key={val.index}>
        <td>
          {/* <input type="text"  name="projectName" data-id={idx} id={projectName} className="form-control " /> */}
          <FormField
            labelClassName="txt-label"
            fieldClassName="txt-input"
            mandatory
            // onChange={this.handleInputChange}
            name="billDate"
            type="date"
            // value={this.state.billDate}
            placeholder="Bill Date"
            // validator={validation}
          />
        </td>
        <td>
          {/* <input
            type="text"
            name="task"
            id={task}
            data-id={idx}
            className="form-control "
          /> */}
          <FormField
            labelClassName="txt-label"
            fieldClassName="txt-input"
            mandatory
            // onChange={this.handleInputChange}
            name="reimbursementDescription"
            // value={this.state.reimbursementDescription}
            placeholder="Reimbursement Description"
            // validator={validation}
          />
        </td>
        <td>
          {/* <textarea
            name="taskNotes"
            id={taskNotes}
            data-id={idx}
            className="form-control"
          ></textarea> */}
          <FormField
            labelClassName="txt-label"
            fieldClassName="txt-input"
            mandatory
            // onChange={this.handleInputChange}
            name="categoryName"
            // value={this.state.categoryName}
            placeholder="Category Name"
            // validator={validation}
          />
        </td>
        <td>
          {/* <select
            name="taskStatus"
            id={taskStatus}
            data-id={idx}
            className="form-control"
          >
            <option value="pending">Pending</option>
            <option value="In Progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="Hold">Hold</option>
          </select> */}
          <FormField
            labelClassName="txt-label"
            fieldClassName="txt-input"
            mandatory
            // onChange={this.handleInputChange}
            name="billNo"
            // value={this.state.billNo}
            placeholder="Bill Number"
            // validator={validation}
          />
        </td>
        <td>
          <FormField
            labelClassName="txt-label"
            fieldClassName="txt-input"
            mandatory
            // onChange={this.handleInputChange}
            name="cost"
            // value={this.state.cost}
            placeholder="Cost"
            // validator={validation}
          />
        </td>
        <td>
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="btn btn-primary text-center"
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => props.delete(val)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          )}
        </td>
      </tr>
    );
  });
};
export default TaskList;
