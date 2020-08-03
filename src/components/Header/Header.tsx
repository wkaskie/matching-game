import * as React from 'react';
import './Header.scss';

interface Props {
    self: number;
}

export const Header = ({self}: Props) => {
    return (
        <div className="Header">
            <div className="Header__button button">
                Leaderboard
            </div>
            <div className="Header_title">
                <h2>Welcome Player {self}!</h2>
            </div>
            <div className="Header__button button">
                Account
            </div>
        </div>
    )
}