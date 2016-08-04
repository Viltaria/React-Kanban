import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Form from './Form.jsx';

var Card = React.createClass({
  dragStart(event) {
    var cardData = {
      id: this.props.data._id,
      status: this.props.data.status,
    };
    event.dataTransfer.setData('text', JSON.stringify(cardData));
  },
  handleStatusLeft () {
    var newStatus = this.props.data.status.replace(/\s/g, '');;
    newStatus = {Queue: 'Done', Done: 'In Progress', InProgress: 'Queue'}[newStatus];
    this.createPutRequest('status', newStatus);
  },
  handleStatusRight () {
    var newStatus = this.props.data.status.replace(/\s/g, '');
    newStatus = {Queue: 'In Progress', InProgress: 'Done', Done: 'Queue'}[newStatus];
    this.createPutRequest('status', newStatus);
  },
  cyclePriority(){
    var newPriority = this.props.data.priority.toLowerCase();
    if('low medium high blocker'.includes(newPriority)) {
     newPriority = 'blocker';
    }
   newPriority =  {low: 'Medium', medium: 'High', high: 'Blocker', blocker: 'Low'}[newPriority];
    this.createPutRequest('priority', newPriority);
  },
  createPutRequest (fieldName, fieldValue) {
    var myRequest = {
      id : this.props.data._id || 0,
    };
    myRequest[fieldName] = fieldValue;
    var req = new XMLHttpRequest();
    req.open('PUT', `/edit/`);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify(
      myRequest
    ));
  },
  deleteItem () {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/delete/');
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify({
      "id":`${this.props.data._id}`,
    }))
  },
  editItem () { //on edit button click
     console.log(`Queue: ${this.props.data.status=='Queue'}, In Progress: ${this.props.data.status=='In Progress'}, Done: ${this.props.data.status=='Done'}`);
    if(this.props.editFormsBeingShown === 0) {
      if(this.props.data.status=='Queue') this.props.renderEditFormQueue(this.props.data);
      if(this.props.data.status=='In Progess') this.props.renderEditFormInProgress(this.props.data);
      if(this.props.data.status=='Done') this.props.renderEditFormDone(this.props.data);
    }
  },
  timestamp () {
    var date = new Date(this.props.data.updatedAt);
    return date.toLocaleTimeString('en-US', { hour12: false });
  },
  render() {
    return (
       <div key={this.props.data._id} className={`card ${this.props.data.priority}`} data-id={this.props.data._id} data-status={this.props.data.status} data-updatedat={this.props.data.updatedAt} draggable="true" onDragStart={this.dragStart}>
        <span onClick={this.deleteItem} className="close">&#120;</span>
        <span onClick={this.editItem} className="edit">&#9998;</span>
        <span className="timestamp">{this.timestamp()}</span>
        <span className="title small">{this.props.data.title}</span>
        <span className="assigned-to small">Assignee: {this.props.data.assignedTo}</span>
        <span className="created-by small">Assignor: {this.props.data.createdBy}</span>
        <span className="priority small" onClick={this.cyclePriority}>Priority: {this.props.data.priority}</span>
        <span className="status small" onClick={this.handleStatusRight}>Status: {this.props.data.status}</span>
        <button onClick={this.handleStatusLeft}>&larr;</button>
        <button onClick={this.handleStatusRight}>&rarr;</button>
      </div>
    )
  }
});


export default Card;


