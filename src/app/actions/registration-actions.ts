
import { CommonAction, UpdateFieldAction } from './actions';

export const actionTypes = {
  ATTEMPT_SUBMIT: 'REGISTRATION_ATTEMPT_SUBMIT',
  RESET: 'REGISTRATION_RESET',
  UPDATE_FORM_FIELD: 'REGISTRATION_UPDATE_FORM_FIELD'
};

// define action creators
export const attemptSubmit: (
  () => Action
) = () => ({ type: actionTypes.ATTEMPT_SUBMIT });

export const reset: () => Action = () => ({ type: actionTypes.RESET });

export const updateField: (
  (value: string, name: string) =>  UpdateFieldAction
) = (value, name) => ({
  name, value, type: actionTypes.UPDATE_FORM_FIELD
});

export type Action = CommonAction;
