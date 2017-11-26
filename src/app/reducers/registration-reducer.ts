import { actionTypes, Action, UpdateFieldAction } from '../actions/registration-actions';

export interface State {
  readonly confirmPassword: string;
  readonly password: string;
  readonly username: string;
};

const initialState: State = {
  confirmPassword: '',
  password: '',
  username: ''
}

export const reducer = (
  state: State = { ...initialState }, action?: Action
) => {

  if(!action) {
    return state;
  }

  switch(action.type) {

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