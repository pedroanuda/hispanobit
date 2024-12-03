import React from 'react';
import { songsServer } from "config.json"
import lrcParser from 'lrc-parser';
import { useSongContext } from 'common/contexts/SongContext';
import styles from "./LyricsDisplay.module.css";
import LyricSpan from './LyricSpan';
import { MusicIcon } from 'icons';

export default function LyricsDisplay({ songName = "" }) {
    const [lyrics, setLyrics] = React.useState([]);
    const [sName, setSName] = React.useState(false);
    const { song } = useSongContext();
    const ref = React.useRef();

    async function getLyrics () {
        if (songName === "") {
            setSName("");
            return;
        }
        try {
            const l = await (await fetch(`${songsServer}/lyrics/${song.name}.lrc`)).text();
            const data = lrcParser(l);
            setLyrics(data.scripts);
            setSName(songName);
        }
        catch (e)
        {
            setSName(false);
        }
    }
    React.useEffect(() => {getLyrics()}, [songName]);

    return (
        <div className={styles.display} ref={ref} style={{display: !sName ? 'none' : 'flex'}}>
            <div className={styles.displayTitle}>
                <span>Letra 
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="inherit">
                    <path d="M 18.003 37.566 L 29.846 37.566 L 29.846 9.933 L 45.996 9.933 L 45.996 18.068 L 34.153 18.068 L 34.153 54.067 L 18.003 54.067 L 18.003 37.566 Z" style={{fill: 'inherit'}}/>
                    </svg>
                </span>
                <img src="/hispanoBitLogo.svg" alt="" id={styles.hsLogo} />
            </div>
            {lyrics.map((line, i) => {
                const isRead = song.currentTime >= line.start;

                return (
                <LyricSpan isRead={isRead} key={i} parentRef={ref} time={line.start}>
                    {line.text}
                </LyricSpan>
            )})}
        </div>
    )
}