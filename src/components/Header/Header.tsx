import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import userAvatar from '../../images/avatar.svg';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Awesome Kanban Board</h1>

      <div className={styles.userMenu} ref={menuRef} onClick={toggleMenu}>
        <div className={styles.avatar}>
          <img src={userAvatar} className={styles.avatarImage} alt="User Avatar" />
        </div>
        <div className={`${styles.arrowDown} ${isOpen ? styles.open : ''}`}></div>

        {isOpen && (
          <div className={styles.dropdown}>
            <Link to="/profile" className={styles.menuItem}>
              Profile
            </Link>
            <Link to="/settings" className={styles.menuItem}>
              Settings
            </Link>
            <button className={styles.menuItem} onClick={() => alert('Logout clicked')}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}