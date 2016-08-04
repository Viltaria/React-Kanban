import React from 'react';

import Board from './Board.jsx';
import MyInput from './MyInput.jsx';

function hideAForm(status, props) {
  if(status === 'Queue') return props.hideEditFormQueue();
  if(status === 'In Progress') return props.hideEditFormInProgress();
  if(status === 'Done') return props.hideEditFormDone();
  return props.hideForm();
}
var Form = React.createClass({
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    if(data.id.length < 2) req.open('POST', '/', true);
    if(data.id.length > 1) req.open('PUT', '/edit/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    this.props.updateBoard();
    hideAForm(data.status, this.props);
  },
  //these two methods disable the back button while editing
  back () {
    hideAForm('', this.props);
  },
  shouldIback () {
    if(this.props.status === undefined) {
      return '↩';
    }
  },
  checkValues () {
      // add id to the form to determine if it's new or an update
    var state = this.props.status;
    if(state) {
      return [state.title, state.priority, state.createdBy, state.assignedTo, state.status, state._id];
    } else {
      return ['','','','','',''];
    }
  },
  render() {
    var values = this.checkValues();
    return (
      <div className="formDiv">
        <Formsy.Form id="form" onSubmit={this.submit} className="input">
          <MyInput value={values[0]} name="title" title="Title" required />
          <MyInput value={values[1]} name="priority" title="Priority" validations="isIn:['low','medium','high','blocker','Low','Medium','High','Blocker']" validationError="Please choose either low, medium, high, or blocker." required />
          <MyInput value={values[2]} name="createdby" title="Created By" required />
          <MyInput value={values[3]} name="assignedto" title="Assigned To" required />
          <MyInput value={values[4]} name="status" type="hidden" />
          <MyInput value={values[5]} name="id" type="hidden" />
          <button type="submit" > Submit </button>
        </Formsy.Form>
        <div className="center">
          <span onClick={this.back} className="backArrow">{this.shouldIback()}</span>
        </div>
      </div>
    );
  }
});

Formsy.addValidationRule('isIn', function (values, value, array) {
  return array.indexOf(value) >= 0;
}); //validation for priority, checks if input is in array passed in

export default Form;