import { Status } from './status.models';
import { AxiosInstance } from 'axios';
import axios from 'axios';

const STORAGE_KEY = 'slack-statuses';
const defaultStatus: Status = {
    id: genUUID(),
    text: 'Coffee break',
    emoji: ':coffee:'
};

class StatusService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            withCredentials: true
        });
    }

    addStatus(text: string, emoji: string) {
        const statuses = this.getStatuses();
        statuses.push({
            id: genUUID(),
            text,
            emoji
        });
        this.saveStatuses(statuses);
    }

    removeStatus(status: Status) {
        const statuses = this.getStatuses();

        const newStatuses = statuses.filter(s => s.id !== status.id);

        this.saveStatuses(newStatuses || []);
    }

    async updateStatus(linkId: string, status: Status) {
        await axios({
            method: 'POST',
            url: '/api/slack/status',
            params: {
                linkId,
                statustext: status.text,
                statusemoji: status.emoji
            }
        });
    }

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

    private saveStatuses(statuses: Status[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses || []));
    }
}

// tslint:disable
function genUUID() {
    // Reference: https://stackoverflow.com/a/2117523/709884
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
        const c = Number.parseInt(s, 10);
        // eslint-disable-next-line
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}
// tslint:enable


export const statusService = new StatusService();