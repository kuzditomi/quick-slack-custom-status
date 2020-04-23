import { Status } from './status.models';
import { StatusActions, StatusActionTypes } from './status.actions';

export interface StatusState {
    statuses: Status[];
}

const initialState: StatusState = {
    statuses: []
};

export const statusReducer = (state: StatusState = initialState, action: StatusActions): StatusState => {
    switch (action.type) {
        case StatusActionTypes.STATUSES_LOAD:
            return {
                ...state,
                statuses: action.payload || []
            };
        default:
            return state;
    }
};