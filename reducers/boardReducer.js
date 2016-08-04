import Immutable from 'immutable';

var initialState = Immutable.Map({
  showForm:false,
  showEditFormQueue:false,
  showEditFormQueueState: {},
  showEditFormInProgress:false,
  showEditFormInProgressState: {},
  showEditFormDone:false,
  showEditFormDoneState: {},
  isEditing: false,
  data: [],
});

var boardReducer = (state = initialState, action) => {
  var newState = state;
  switch(action.type) {
    case 'UPDATE_BOARD':
      return newState.set("data", action.data);
    case 'SHOW_FORM':
      return newState.update("showForm", bool => bool = true);
    case 'HIDE_FORM':
      return newState.update("showForm", bool => bool = false);
    case 'TOGGLE_EDIT_FORM_QUEUE':
      return toggleVisibility(newState, 'Queue', action);
    case 'TOGGLE_EDIT_FORM_INPROGRESS':
      return toggleVisibility(newState, 'InProgress', action);
    case 'TOGGLE_EDIT_FORM_DONE':
      return toggleVisibility(newState, 'Done', action);
    default:
      return newState;
  }
};
function toggleVisibility (newState, status, action) {
  newState = newState.update(`showEditForm${status}`, bool => bool = !bool);
  if(action.status) newState = newState.set(`showEditForm${status}State`, action.status);
  newState = newState.update("isEditing", bool => bool = !bool);
  return newState;
}

export default boardReducer;