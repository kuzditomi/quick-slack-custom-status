import { Status } from './status.models';

const STORAGE_KEY = 'slack-statuses';
const defaultStatus: Status = {
    id: genUUID(),
    text: 'Coffee break',
    emoji: ':coffee:'
};

class StatusService {
    getStatuses(): Status[] {
        const statusesJson = localStorage.getItem(STORAGE_KEY);

        if (!statusesJson) {
            return [defaultStatus];
        }

        try {
            const statuses = JSON.parse(statusesJson);

            return statuses;
        } catch {
            return [defaultStatus];
        }
    }
}

function genUUID() {
    // Reference: https://stackoverflow.com/a/2117523/709884
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
        const c = Number.parseInt(s, 10);
        // tslint:disable-next-line: no-bitwise
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

export const statusService = new StatusService();