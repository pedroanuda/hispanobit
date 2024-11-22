import React from 'react';
import styles from './TopBar.module.css';
import SearchBar from './SearchBar';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
        <div className={styles.siteName}>
            <img src="/hispanoBitLogo.svg" alt="logo" />
            <span>hisPano<br/>BIT</span>
        </div>
        <SearchBar />
    </div>
  )
}
