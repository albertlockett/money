import { actionTypes, Action, UpdateFieldAction } from '../actions/registration-actions';

export interface State {
  readonly confirmPassword: string;
  readonly password: string;
  readonly username: string;
  readonly submitAttempted: false;
};

const initialState: State = {
  confirmPassword: '',
  password: '',
  username: '',
  submitAttempted: false
}

export const reducer = (
  state: State = { ...initialState }, action?: Action
) => {

  if(!action) {
    return state;
  }

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
  }


  return state;

};