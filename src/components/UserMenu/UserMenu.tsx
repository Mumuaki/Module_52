import React, { useState } from 'react';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.root}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className={styles.avatar} aria-hidden="true" />
        <span className={open ? styles.arrowUp : styles.arrowDown} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <button type="button" className={styles.item} role="menuitem">
            Profile
          </button>
          <button type="button" className={styles.item} role="menuitem">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}