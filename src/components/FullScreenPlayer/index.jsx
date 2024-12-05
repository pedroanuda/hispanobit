import React from 'react'
import styles from "./FullScreenPlayer.module.css"
import { Slider } from '@mui/material';
import { useQueueContext } from 'common/contexts/QueueContext';
import { useSongContext } from 'common/contexts/SongContext';
import { 
    Play as PlayButton,
    Pause as PauseButton,
    Previous as PreviousButton,
    Next as NextButton,
    Voice,
    Decompress
 } from "icons";
import LyricsDisplay from 'components/LyricsDisplay';
import PlayerArtistCard from './PlayerArtistCard';

/** Estilização do Slider. 
 * @type {import("@mui/material").SliderOwnProps} */
 const sliderStyling = (t) => ({
    padding: ".5rem 0 .5rem 0",
    color: "#424242",
    height: 5,
    '&:hover, &:active': {
        color: "#F2501D",
    },
    '& .MuiSlider-thumb': {
        display: 'none'
    },
    '&:is(:hover, :active) .MuiSlider-thumb': {
        display: 'block',
        width: "9px",
        height: "9px",
        '&:hover, &.Mui-focusVisible': {
            color: "#E91B1B",
            boxShadow: `0px 0px 0px 8px #E91B1B40`
        },
        '&.Mui-active': {
            boxShadow: `0px 0px 0px 12px #E91B1B40`,
            width: "16px",
            height: "16px"
        }
    },
    '& .MuiSlider-rail': {
        color: "#D9D9D9",
        opacity: 1,
        height: 5
    },
    '& .MuiSlider-track': {
        height: 4
    }
});

const FullScreenPlayer = React.forwardRef(({ style }, ref ) => {
    const { goToNextSong, goToPreviousSong, queue, queueIndex } = useQueueContext();
    const { playing, play, pauseSong, currentVolume, setVolume, song, goTo } = useSongContext();
    const [sliderValue, setSliderValue] = React.useState(0);
    const [changingSlider, setChangSlider] = React.useState(false);
    const [soundValue, setSoundValue] = React.useState(currentVolume);

    const handleSliderChange = (e, newValue) => {
        setChangSlider(true);
        setSliderValue(newValue);
    }
    const handleSliderChanged = (e, newValue) => {
        goTo(newValue);
        setChangSlider(false);
    }

    const handleSoundChange = (e, newValue) => {
        setSoundValue(newValue);
        setVolume(newValue);
    }

    const formatTime = time => 
        `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`

    const handlePausePlayClick = e => {
        e.preventDefault();

        if (playing)
            pauseSong();
        else
            play();
    }

    return (
    <div className={styles.container} style={style} ref={ref}>
        <div style={{display: "flex", gap: '1rem', marginBottom: '2rem', overflow: 'hidden'}}>
            <LyricsDisplay songName={song.name} />
            <div className={styles.artistsSection}>
                <h3>{song.artists.length > 1 ? "Artistas" : "Artista"}</h3>
                <div>
                    {song.artists.map((artist, i)  => (
                        <PlayerArtistCard artistName={artist} key={i} />
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.songInfo}>
            <img src={song.albumImage} alt="" />
            <div>
                <h4>{song.name}</h4>
                <span>{song.artists.join(", ")}</span>
            </div>
        </div>
        <div className={styles.slideDiv}>
            <span>{changingSlider ? formatTime(sliderValue) : formatTime(song.currentTime)}</span>
            <Slider sx={sliderStyling} value={changingSlider ? sliderValue : song.currentTime} max={song.duration}
            onChange={handleSliderChange} onChangeCommitted={handleSliderChanged}/>
            <span>{formatTime(song.duration)}</span>
        </div>
        <div className={styles.controlsDiv}>
            <div className={styles.mainControls}>
                <button className={styles.miniPreviousButton} onClick={goToPreviousSong} disabled={queueIndex <= 0}>
                    <img src={PreviousButton} alt="Previous" />
                </button>
                <button className={styles.miniPlayButton} onClick={handlePausePlayClick}>
                    <img src={playing ? PauseButton : PlayButton} alt="Play" />
                </button>
                <button className={styles.miniNextButton} onClick={goToNextSong} disabled={queueIndex >= queue.length - 1}>
                    <img src={NextButton} alt="Next" />
                </button>
            </div>
            <div className={styles.rightControls}>
                <div className={styles.soundDiv}>
                    <img src={Voice} alt="" />
                    <Slider sx={sliderStyling} max={1} value={currentVolume}
                    onChange={handleSoundChange} step={0.01}/>
                </div>
                <button className={styles.miniButton} style={{marginLeft: '1rem'}} onClick={() => document.exitFullscreen()}>
                    <img src={Decompress} alt="Sair da Tela Cheia" />
                </button>
            </div>
        </div>
    </div>
    )
});

FullScreenPlayer.displayName = 'FullScreenPlayer';
export default FullScreenPlayer;
