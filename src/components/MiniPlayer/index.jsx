import { BrowserView, MobileView } from 'react-device-detect';
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
import styles from "./MiniPlayer.module.css";
import React from 'react';
import { Slider } from '@mui/material';

/** Estilização do Slider. 
 * @type {import("@mui/material").SliderOwnProps} */
 const sliderStyling = (t) => ({
    padding: ".5rem 0 .5rem 0",
    color: "#424242",
    height: 5,
    '&:hover': {
        color: "#F2501D",
    },
    '& .MuiSlider-thumb': {
        display: 'none'
    },
    '&:hover .MuiSlider-thumb': {
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

export default function MiniPlayer({ mainPlayerHandleOpen, onFullscreen }) {
    const { goToNextSong, goToPreviousSong, queueIndex, queue } = useQueueContext();
    const { song, playing, pauseSong, play, goTo, setVolume, isSongLoaded, currentVolume } = useSongContext();
    const [changingSlider, setChangSlider] = React.useState(false);
    const [sliderValue, setSliderValue] = React.useState(0);
    const [soundValue, setSoundValue] = React.useState(0.25);

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

    const formatTime = (time) => 
        `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

    function handlePausePlayClick(event) {
        event.stopPropagation();

        if (playing)
            pauseSong();
        else
            play();
    }

    return (
        <>
        <MobileView>
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
                    <img src={playing ? PauseButton : PlayButton} />
                </button>
                <progress max={song?.duration} value={song?.currentTime} className={styles.progressbar}/>
            </div>
        </MobileView>
        <BrowserView>
            <div className={styles.miniplayer + " " + styles.desktop}>
                <div className={styles.mainInfo + " " + styles.desktop}>
                    <img src={song?.albumImage} />
                    <div className={styles.textInfo}>
                        <span className={styles.songTitle}>{song?.name}</span>
                        <span className={styles.songArtists}>{song?.artists?.join(", ")}</span>
                    </div>
                </div>
                <div className={styles.miniplayerButtons}>
                    <button className={styles.miniPreviousButton} onClick={goToPreviousSong} disabled={queueIndex <= 0}>
                        <img src={PreviousButton} alt="Previous" />
                    </button>
                    <button className={styles.miniPlayButton} onClick={handlePausePlayClick} disabled={!isSongLoaded()} >
                        <img src={playing ? PauseButton : PlayButton} alt="Play" />
                    </button>
                    <button className={styles.miniNextButton} onClick={goToNextSong} disabled={queueIndex >= queue.length - 1}>
                        <img src={NextButton} alt="Next" />
                    </button>
                </div>
                <div className={styles.slideDiv}>
                    <span>{changingSlider ? formatTime(sliderValue) : formatTime(song.currentTime)}</span>
                    <Slider sx={sliderStyling} max={song.duration} value={changingSlider ? sliderValue : song.currentTime} 
                    onChangeCommitted={handleSliderChanged} onChange={handleSliderChange} />
                    <span>{formatTime(song.duration)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={styles.soundDiv}>
                        <img src={Voice} alt="" />
                        <Slider sx={sliderStyling} max={1} value={currentVolume}
                        onChange={handleSoundChange} step={0.01}/>
                    </div>
                    <button className={styles.miniButton} style={{marginLeft: '1rem'}} disabled={!isSongLoaded()} onClick={onFullscreen}>
                        <img src={Decompress} alt="Tela Cheia" />
                    </button>
                </div>
            </div>
        </BrowserView>
        </>
    )
}
