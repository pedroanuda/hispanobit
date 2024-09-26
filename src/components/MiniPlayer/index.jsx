
import { useSongContext } from 'common/contexts/SongContext';
import playButton from "icons/play-button.svg";
import pauseButton from "icons/pause-button.svg";
import styles from "./MiniPlayer.module.css";
import React from 'react';

export default function MiniPlayer({ mainPlayerHandleOpen }) {
    const { song, playing, pauseSong, play } = useSongContext();

    function handlePausePlayClick(event) {
        event.stopPropagation();

        if (playing)
            pauseSong();
        else
            play();
    }

    return (
        <div className={styles.miniplayer} onClick={() => mainPlayerHandleOpen(song?.id)}
        style={song.duration == 0 ? {display: 'none'} : {display: 'flex'}}>
            <div className={styles.mainInfo}>
                <img src={song?.albumImage} />
                <div className={styles.textInfo}>
                    <span className={styles.songTitle}>{song?.name}</span>
                    <span className={styles.songArtists}>{song?.artists?.join(", ")}</span>
                </div>
            </div>
            <button onClick={handlePausePlayClick}>
                <img src={playing ? pauseButton : playButton} />
            </button>
            <progress max={song?.duration} value={song?.currentTime} className={styles.progressbar}/>
        </div>
    )
}
