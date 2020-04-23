import React from 'react';
import './status-list.scss';
import { Status } from './status.models';

export interface StatusListStateProps {
    statuses: Status[];
}

export const StatusListComponent: React.FC<StatusListStateProps> = ({statuses}) => {
    const updateStatus = (status: Status) => {
        // console.log(status);
    };

    const removeStatus = (status: Status) => {
        // console.log(status);
    };

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
                                <button onClick={() => updateStatus(status)}>Update!</button>
                                <button onClick={() => removeStatus(status)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
