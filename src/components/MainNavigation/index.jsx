import React from 'react'
import styles from "./MainNavigation.module.css"
import SongBox from 'components/SongBox'
import { api, songsServer } from "config.json"

export default function MainNavigation() {
    const [songs, setSongs] = React.useState([]);
    
    React.useEffect(() => {
        getSongs();
    }, []);

    async function getSongs() {
        let damn = await (await fetch(`${api}/songs`)).json();
        setSongs(damn);
    }

    return (
    <div className={styles.mainNav}>
        <div className={styles.divisao_cat}>
            <h3 className={styles.titulo_cat}>Popular</h3>
            {songs.map((song, i) => (
                <SongBox id={song.id} name={song.name} picture={song.image} duration={10} classification={i+1} key={i} />
            ))}
        </div>
    </div>
    )
}
