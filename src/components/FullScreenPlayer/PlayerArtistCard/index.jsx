import React from 'react'
import { api, songsServer } from "config.json"
import styles from "./PlayerArtistCard.module.css"

function getCountryName(rawName) {
    switch (rawName) {
        case "colombia":
            return "Colômbia";
        case "cuba":
            return "Cuba";
        case "dominican-republic":
            return "República Dominicana";
        case "mexico":
            return "México";
        case "puerto-rico":
            return "Porto Rico";
        case "eua":
            return "EUA";
        default:
            return "Desconhecido";
    }
}

export default function PlayerArtistCard({ artistName }) {
    const [artist, setArtist] = React.useState();
    React.useEffect(() => {
        async function getArtist() {
            const a = await (await fetch(`${api}/artist?name=${artistName}`)).json();
            setArtist(a);
        }
        getArtist();
    }, [artistName])


    if (artist)
    return (
        <div className={styles.card}>
            <img src={`${songsServer}/${artist.source}`} alt={artist.name} />
            <img src={`/flags/${artist.country}.png`} alt="" id={styles.flag} />
            <span id={styles.artist_name}>{artist.name}</span>
            <span>{getCountryName(artist.country)}</span>
        </div>
    )
}
