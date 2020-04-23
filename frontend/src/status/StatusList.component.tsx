import React from 'react';
import { statusService } from './status.service';

export const StatusListComponent: React.FC = () => {
    const statuses = statusService.getStatuses();

    return (
        <div>
            {
                statuses.map((status, index) => (
                    <div key={index} className="status">
                        {status.text} ({status.emoji})
                    </div>
                ))
            }
        </div>
    );
};
