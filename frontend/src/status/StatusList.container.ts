import { connect } from 'react-redux';
import { StatusListComponent, StatusListStateProps, StatusListDispatchProps } from './StatusList.component';
import { AppState } from '../root.reducer';
import { Dispatch } from 'redux';
import { Status } from './status.models';
import { statusService } from './status.service';
import { statusLoadAction } from './status.actions';

const mapStateToProps = (state: AppState): StatusListStateProps => ({
    linkId: state.authentication.user && state.authentication.user.linkId,
    statuses: state.statuses.statuses
});

const mapDispatchToProps = (dispatch: Dispatch): StatusListDispatchProps => ({
    removeStatus: (status: Status) => {
        statusService.removeStatus(status);

        const statuses = statusService.getStatuses();
        dispatch(statusLoadAction(statuses));
    },
    updateStatus: async (linkId: string, status: Status) => {
        await statusService.updateStatus(linkId, status);

        ga('send', 'event', 'status-update');
    }
});

export default connect<StatusListStateProps, StatusListDispatchProps, {}, AppState>(
    mapStateToProps, mapDispatchToProps
)(StatusListComponent);