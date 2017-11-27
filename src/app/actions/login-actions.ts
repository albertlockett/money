import { CommonAction, UpdateFieldAction } from './actions';

export const actionTypes = {
  ATTEMPT_SUBMIT: 'LOGIN_ATTEMPT_SUBMIT',
  RESET: 'LOGIN_RESET',
  UPDATE_FORM_FIELD: 'LOGIN_UPDATE_FORM_FIELD',
  SET_ERROR: 'LOGIN_SET_ERROR'
};

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
