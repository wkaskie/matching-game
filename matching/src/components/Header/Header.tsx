import * as React from 'react';
import './Header.scss';

export const Header = () => {
    return (
        <div className="Header">
            <div className="Header__button button">
                Leaderboard
            </div>
            <div className="Header__button button">
                Account
            </div>
        </div>
    )
}