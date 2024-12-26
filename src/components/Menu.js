import React, { useEffect, useRef } from 'react';
import './Menu.css'; // Ensure this import is correct
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/actions';

function Menu() {
    const isOpen = useSelector((state) => state.isMenuOpen);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            if (isOpen) {
                dispatch(toggleMenu());
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="menu-container" ref={menuRef}>
            <button onClick={handleToggleMenu} className="menu-button">
                ☰
            </button>
            {isOpen && (
                <ul className="menu-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profits-calculator">Profits Calculator</Link></li>
                </ul>
            )}
        </div>
    );
}

export default Menu;
