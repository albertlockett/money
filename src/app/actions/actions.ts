export type RootAction = { type: string };
export type UpdateFieldAction = { type: string, name: string, value: string };
export type CommonAction = RootAction | UpdateFieldAction;
