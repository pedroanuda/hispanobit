import React from 'react'
import styles from "./MainBanner.module.css"

export default function MainBanner() {
  return (
    <div style={{padding: '1rem 1rem 0 1rem', boxSizing: 'border-box'}}>
        <div className={styles.banner}>
            <div className={styles.content}>
                <div>
                    <h2>Playlist da Hispanidad</h2>
                    <span>Conheça todas as músicas tocadas na Hispanidad</span>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.focused}>Play</button>
                    <button>Seguir</button>
                </div>
            </div>
        </div>
    </div>
  )
}
