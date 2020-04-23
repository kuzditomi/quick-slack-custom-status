import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StatusAdderDispatchProps, StatusAdderComponent } from './StatusAdder.component';
import { statusService } from './status.service';
import { statusLoadAction } from './status.actions';

const mapDispatchToProps = (dispatch: Dispatch): StatusAdderDispatchProps => ({
    addStatus: (text: string, emoji: string) => {
        statusService.addStatus(text, emoji);

        const statuses = statusService.getStatuses();
        dispatch(statusLoadAction(statuses));
    }
});

export default connect<{}, StatusAdderDispatchProps, {}, {}>(
    null, mapDispatchToProps
)(StatusAdderComponent);