import React, { useEffect, useRef } from 'react';
import './Menu.css'; // Ensure this import is correct
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/actions';

function Menu() {
    const isOpen = useSelector((state) => state.isMenuOpen);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const handleToggleMenu = (event) => {
        event.stopPropagation(); // Prevent event bubbling
        console.log('Toggling menu');
        dispatch(toggleMenu());
    };

    const handleLinkClick = () => {
        if (isOpen) {
            console.log('Link clicked, closing menu');
            dispatch(toggleMenu());
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (isOpen) {
                    console.log('Click outside detected, closing menu');
                    dispatch(toggleMenu());
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, dispatch]);

    return (
        <div className="menu-container" ref={menuRef}>
            <button onClick={handleToggleMenu} className="menu-button">
                ☰
            </button>
            {isOpen && (
                <ul className="menu-list">
                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/profits-calculator" onClick={handleLinkClick}>Profits Calculator</Link></li>
                </ul>
            )}
        </div>
    );
}

export default Menu;
