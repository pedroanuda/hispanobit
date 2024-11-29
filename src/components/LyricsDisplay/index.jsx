import React from 'react';
import { songsServer } from "config.json"
import lrcParser from 'lrc-parser';
import { useSongContext } from 'common/contexts/SongContext';
import styles from "./LyricsDisplay.module.css";
import LyricSpan from './LyricSpan';

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