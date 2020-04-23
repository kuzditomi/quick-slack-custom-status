import { actionCreator } from '../actions';
import { Status } from './status.models';

export enum StatusActionTypes {
    STATUSES_LOAD = 'status/load',
}

export const statusLoadAction = actionCreator<StatusActionTypes.STATUSES_LOAD, Status[]>(StatusActionTypes.STATUSES_LOAD);

export type StatusActions = ReturnType<typeof statusLoadAction>;