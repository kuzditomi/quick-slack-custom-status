import { AxiosInstance } from "axios";
import axios from 'axios';
import { User } from "./authentication.models";

class AuthenticationService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            withCredentials: true
        });
    }

    async getUser(): Promise<User> {
        const response = await this.axios({
            url: '/api/me',
            method: 'GET'
        });

        const { name, workspaceId, workspaceName } = response.data;

        return {
            name,
            workspaceId,
            workspaceName
        };
    }

    async login(username: string, password: string): Promise<User> {
        await this.axios({
            method: 'POST',
            url: '/api/account/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                username,
                password
            }
        });

        const user = await this.getUser();

        return user;
    }

    async logout() {
        await this.axios({
            method: 'POST',
            url: '/api/auth/signout',
        });
    }
}

export const authenticationService = new AuthenticationService();
