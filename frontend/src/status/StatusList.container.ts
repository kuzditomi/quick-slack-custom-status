import { connect } from 'react-redux';
import { StatusListComponent, StatusListStateProps } from './StatusList.component';
import { AppState } from '../root.reducer';

const mapStateToProps = (state: AppState): StatusListStateProps => ({
    statuses: state.statuses.statuses
});

export default connect<StatusListStateProps, {}, {}, AppState>(
    mapStateToProps
)(StatusListComponent);