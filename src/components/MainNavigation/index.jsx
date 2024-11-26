import React from 'react'
import styles from "./MainNavigation.module.css"

export default function MainNavigation({ children }) {
    return (
    <div className={styles.mainNav}>
        {children}
    </div>
    )
}
