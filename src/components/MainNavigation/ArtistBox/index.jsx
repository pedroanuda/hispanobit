import React from 'react';
import styles from "./ArtistBox.module.css";
import { songsServer } from "config.json";

export default function ArtistBox({ name, picture }) {
    return (
        <div className={styles.box}>
            <img src={`${songsServer}/${picture}`} alt={`${name} Picture`} onDragStart={e => e.preventDefault()} />
            <span>{name}</span>
        </div>
    )
}