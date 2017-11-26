
export const actionTypes = {
  RESET: 'REGISTRATION_RESET',
  UPDATE_FORM_FIELD: 'REGISTRATION_UPDATE_FORM_FIELD'
};

// define types
export type RootAction = { type: string }
export type UpdateFieldAction = { type: string, name: string, value: string };

// define action creators
export const reset: (() => Action) = () => ({ type: actionTypes.RESET });

export const updateField: (
  (value: string, name: string) =>  UpdateFieldAction
) = (value, name) => ({
  name, value, type: actionTypes.UPDATE_FORM_FIELD, 
})

export type Action = RootAction | UpdateFieldAction;