import React from 'react';
import './status-list.scss';
import { Status } from './status.models';

export interface StatusListStateProps {
    linkId?: string;
    statuses: Status[];
}

export interface StatusListDispatchProps {
    removeStatus(status: Status): void;
    updateStatus(linkId: string, status: Status): void;
}

export const StatusListComponent: React.FC<StatusListStateProps & StatusListDispatchProps> = ({linkId, statuses, removeStatus, updateStatus}) => {
    return (
        <div>
            <div className="status-list">
                {
                    statuses.map((status, index) => (
                        <div key={index} className="status-list-item">
                            <label className="status-text">
                                {status.text}
                            </label>
                            <span className="status-emoji">
                                ({status.emoji})
                            </span>
                            <div className="status-actions">
                                <button onClick={() => updateStatus(linkId || '', status)}>Update!</button>
                                <button onClick={() => removeStatus(status)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
