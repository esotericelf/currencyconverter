import React, { useState } from 'react';
import './Menu.css'; // Ensure this import is correct

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <button onClick={toggleMenu} className="menu-button">
                ☰
            </button>
            {isOpen && (
                <ul className="menu-list">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            )}
        </div>
    );
}

export default Menu;
