import React from 'react';

import Board from './Board.jsx';
import MyInput from './MyInput.jsx';

var Form = React.createClass({
  // getInitialState() {
  //   return {
  //     canSubmit: false, //Submit button disabled by default
  //     title: '',
  //     priority: '',
  //     createdBy: '',
  //     assignedTo: '',
  //     status: '',
  //   };
  // },
  // componentDidMount() {
  //   this.setState({
  //     title: this.props.title,
  //     priority: this.props.priority,
  //     createdBy: this.props.createdBy,
  //     assignedTo: this.props.assignedTo,
  //     status: this.props.status,
  //   });
  // },
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    if(data.id.length < 2) req.open('POST', '/', true);
    if(data.id.length > 1) req.open('PUT', '/edit/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    this.props.updateBoard();
    try {
      this.props.hideEditFormQueue();
    } catch (e) {
      try {
        this.props.hideEditFormInProgress();
      } catch(e) {
        try {
          this.props.hideEditFormDone();
          //put code in here
        }
      }
    }
  },
  enableButton() { //triggered by onValid input by Formsy, enabled submit button
    this.setState({
      canSubmit: true,
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },
  //these two methods disable the back button while editing
  back () {
    try {
      this.props.hideForm();
    } catch(e) {
      try {
        this.props.hideEditFormQueue();
      } catch(e) {
        try {
          this.props.hideEditFormInProgress();
        } catch(e) {
          this.props.hideEditFormDone();
        }
      }
    }
  },
  shouldIback () {
    if(this.props.status === undefined) {
      return '↩';
    }
  },
  checkValues () {
    if(this.props.status) {
      // add id to the form to determine if it's new or an update
      return [this.props.status.title,this.props.status.priority,this.props.status.createdBy,this.props.status.assignedTo,this.props.status.status,this.props.status._id];
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
          <MyInput value={values[4]} name="this.props.status" type="hidden" />
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