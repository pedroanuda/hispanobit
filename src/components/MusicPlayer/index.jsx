import { Slider } from "@mui/material";
import Drawer from "react-bottom-drawer";
import { api, songsServer } from "config.json";
import PlayButton from "icons/play-button.svg";
import PauseButton from "icons/pause-button.svg";
import PreviousButton from "icons/previous-button.svg";
import NextButton from "icons/next-button.svg";
import { useQueueContext } from "common/contexts/QueueContext";
import React from 'react';
import "./MusicPlayer.css";
import { useSongContext } from "common/contexts/SongContext";

/** Estilização do Slider. 
 * @type {import("@mui/material").SliderOwnProps} */
const sliderStyling = (t) => ({
    padding: ".5rem 0 .5rem 0",
    marginTop: "1rem",
    color: "#F2501D",
    height: 6,
    '& .MuiSlider-thumb': {
        width: "12px",
        height: "12px",
        color: "#E91B1B",
        '&:hover, &.Mui-focusVisible': {
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
        opacity: 1
    }
});

/**
 * @param {{
 *  open: boolean,
 *  onClose: () => void,
 *  id: number
 * }} props
 */
function MusicPlayer({ open, onClose }) {
    const [sliderValue, setSliderValue] = React.useState(0);
    const [changingSlider, setChangSlider] = React.useState(false);
    const { song, pauseSong, goTo, playing, loading, play, name } = useSongContext();
    const { goToPreviousSong, goToNextSong, queueIndex, queue } = useQueueContext();
    
    /** 
     * @param {number} time
     * @returns {string}
     */
    function formatTime(time) {
        return `${Math.floor(time / 60)}:` + `${Math.floor(time % 60)}`.padStart(2, "0");
    }

    const handleSliderChange = (e, newValue) => {
        setChangSlider(true);
        setSliderValue(newValue);
    }
    const handleSliderChanged = (e, newValue) => {
        goTo(newValue);
        setChangSlider(false);
    }
    const handlePlay = () => {
        if (!playing)
            play();
        else
            pauseSong();
    }

    return (
        <>
        <Drawer onClose={onClose} isVisible={open} className="drawer">
            <div className="playing-display">
                <span>TOCANDO</span>
                <span>AHORA</span>
            </div>
            <div>
                <img className="album-pic" src={song.albumImage} alt="musica" />
                <div className={"loading_cover" + (loading ? " visible" : "")}>
                    <span className="loading_spinner"></span>
                </div>
            </div>
            <div className="control-panel">
                <span className="song-name">{song.name}</span>
                <span className="song-artist">{song.artists.join(", ")}</span>
                <Slider className="slider" sx={sliderStyling} max={song.duration} value={changingSlider ? sliderValue : song.currentTime} 
                onChangeCommitted={handleSliderChanged} onChange={handleSliderChange} />
                <div className="time-feedback">
                    <span id="current-time">{changingSlider ? formatTime(sliderValue) : formatTime(song.currentTime)}</span>
                    <span id="song-duration">{formatTime(song.duration)}</span>
                </div>
                <div className="buttons">
                    <button id="previous-button" onClick={goToPreviousSong} disabled={queueIndex <= 0}>
                        <img src={PreviousButton} alt="Previous" />
                    </button>
                    <button id="play-button" onClick={handlePlay}>
                        <img src={playing ? PauseButton : PlayButton} alt="Play" />
                    </button>
                    <button id="next-button" onClick={goToNextSong} disabled={queueIndex >= queue.length - 1}>
                        <img src={NextButton} alt="Next" />
                    </button>
                </div>
            </div>
        </Drawer>
        </>
    )
}

export default MusicPlayer;