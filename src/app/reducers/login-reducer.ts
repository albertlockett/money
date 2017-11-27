import { UpdateFieldAction } from '../actions/actions';
import { actionTypes,  Action } from '../actions/login-actions';

export interface State {
  readonly username;
  readonly password;
}

const initialState: State = {
  username: '',
  password: ''
};

export const reducer = (
  state: State = { ...initialState },
  action?: Action
) => {

  switch(action.type) {
    
    case actionTypes.ATTEMPT_SUBMIT: {
      return { ...state, submitAttempted: true };
    }

    case actionTypes.RESET: {
      return { ...initialState };
    }

    case actionTypes.UPDATE_FORM_FIELD: {
      const updateFieldAction = action as UpdateFieldAction;
      return {
        ...state,
        [updateFieldAction.name] : updateFieldAction.value
      };
    }

    default: break;
  }
  

  return state;
};
