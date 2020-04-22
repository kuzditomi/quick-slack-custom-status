import React from "react";
import './header.scss';
import { Link } from "react-router-dom";
import UserBadge from "./UserBadge.container";

export interface HeaderStateProps {
    isLoggedIn: boolean;
}

export const Header: React.FC<HeaderStateProps> = ({ isLoggedIn }) => (
    <header>
        <Link to="/">
            <h1>Quick slack status update</h1>
        </Link>

        <ul>
            <li>
                {
                    isLoggedIn ? (
                        <>
                            <Link to="/">How does it work?</Link>
                            <UserBadge />
                        </>
                    ) : (
                            <Link to="/login">Log in</Link>
                        )
                }
            </li>
        </ul>
    </header >
);