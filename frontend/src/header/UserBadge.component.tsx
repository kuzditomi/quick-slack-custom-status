import React from "react";
import { User } from '../auth/authentication.models';

export interface UserBadgeStateProps {
    user?: User;
}

export interface UserBadgeDispatchProps {
    logout: () => void;
}

export const UserBadgeComponent: React.FC<UserBadgeStateProps & UserBadgeDispatchProps> = ({ user, logout }) => {
    return (
        <div className="user">
            hello {user?.name}! <button onClick={() => { logout(); }}>Logout</button>
        </div>
    );
};
