import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

import Immutable from 'immutable';
import {connect} from 'react-redux';

var Board =  React.createClass({
  componentDidMount() {
    this.updateBoard();
  },
  updateBoard () {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
    req.open('GET', '/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.props.updateBoard(JSON.parse(data.currentTarget.response));
  },
  renderForm () {
    this.props.renderForm();
  },
  renderEditFormQueue (state) {
    this.props.renderEditFormQueue(state);
  },
  renderEditFormInProgress (state) {
    this.props.renderEditFormInProgress(state);
  },
  renderEditFormDone (state) {
    this.props.renderEditFormDone(state);
  },
  hideForm () {
    this.props.hideForm();
  },
  hideEditFormQueue () {
    this.props.hideEditFormQueue();
  },
  hideEditFormInProgress () {
    this.props.hideEditFormInProgress();
  },
  hideEditFormDone () {
    this.props.hideEditFormDone();
  },
  render() {
    return (
      <div>
        <Column editFormsBeingShown={this.props.editFormsBeingShown} showEditFormQueueState={this.props.showEditFormQueueState} showEditFormInProgressState={this.props.showEditFormInProgressState}  showEditFormDoneState={this.props.showEditFormDoneState} showEditFormQueue={this.props.showEditFormQueue} showEditFormInProgress={this.props.showEditFormInProgress} showEditFormDone={this.props.showEditFormDone} renderEditFormQueue={this.renderEditFormQueue} hideEditFormQueue={this.hideEditFormQueue} renderEditFormInProgress={this.renderEditFormInProgress} hideEditFormInProgress={this.hideEditFormInProgress} renderEditFormDone={this.renderEditFormDone} hideEditFormDone={this.hideEditFormDone} showForm={this.props.showForm} hideForm={this.hideForm} updateBoard={this.updateBoard} data={this.props.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});
var mapStateToProps = (state) => {
  var s = state.boardReducer.toJS();
  return {
    data: s.data,
    showForm: s.showForm,
    showEditFormQueue: s.showEditFormQueue,
    showEditFormQueueState: s.showEditFormQueueState,
    showEditFormInProgress: s.showEditFormInProgress,
    showEditFormInProgressState: s.showEditFormInProgressState,
    showEditFormDone: s.showEditFormDone,
    showEditFormDoneState: s.showEditFormDoneState,
    editFormsBeingShown: s.editFormsBeingShown,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => {
      dispatch({
        type: 'UPDATE_BOARD',
        data,
      })
    },

    renderForm: () => {dispatch({type: 'SHOW_FORM'})},
    renderEditFormQueue: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_QUEUE',
        status,
      })
    },
    renderEditFormInProgress: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_INPROGRESS',
        status,
      })
    },
    renderEditFormDone: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_DONE',
        status,
      })
    },
    hideForm: () => {dispatch({type:'HIDE_FORM'})},
    hideEditFormQueue: () => {dispatch({type:'HIDE_EDIT_FORM_QUEUE'})},
    hideEditFormInProgress: () => {dispatch({type:'HIDE_EDIT_FORM_INPROGRESS'})},
    hideEditFormDone: () => {dispatch({type:'HIDE_EDIT_FORM_DONE'})},
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);