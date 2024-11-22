import { api, songsServer } from "config.json";
import React from 'react';

export const SongContext = React.createContext({
    name: "", setName: () => null,
    artists: [], setArtists: () => null,
    playing: false, setPlaying: () => null,
    duration: 0, setDuration: () => null,
    currentTime: 0, setCurrentTime: () => null,
    albumImage: "", setAlbumImage: () => null
});
SongContext.displayName = "Song Player";

export default function SongContextProvider({ children }) {
    const [name, setName] = React.useState("");
    const [artists, setArtists] = React.useState([]);
    const [albumImage, setAlbumImage] = React.useState("");
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [songUrl, setSongUrl] = React.useState(null);
    const [onEndedEvent, setEndedEvent] = React.useState(() => setPlaying(false));
    const [currentVolume, setCurrentVolume] = React.useState(null);
    const audioRef = React.useRef();

    const handleLoadedMetaData = () => {
        setCurrentTime(0);
        setDuration(audioRef.current.duration);
        if (currentVolume === null) {
            audioRef.current.volume = .25;
            setCurrentVolume(.25);
        }
        if (playing) audioRef.current.play();
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    return (
        <SongContext.Provider value={{
            playing, setPlaying, duration, setDuration,
            currentTime, setCurrentTime, songUrl, setSongUrl,
            name, setName, artists, setArtists, 
            albumImage, setAlbumImage, onEndedEvent,
            setEndedEvent, audioRef, currentVolume, setCurrentVolume
        }}>
            {children}
            <audio onLoadedMetadata={handleLoadedMetaData} onTimeUpdate={handleTimeUpdate}
            src={songUrl} ref={audioRef} onEnded={onEndedEvent}></audio>
        </SongContext.Provider>
    )
}

export function useSongContext() {
    const {
        playing, setPlaying, duration,
        currentTime, setCurrentTime, songUrl, setSongUrl,
        name, setName, artists, setArtists,
        albumImage, setAlbumImage, setEndedEvent, audioRef,
        currentVolume, setCurrentVolume
    } = React.useContext(SongContext);

    const [loading, setLoading] = React.useState(false);

    /** Coleta os dados da Api, a partir da id. 
     * @param {number} id Id da música.
    */
    async function fetchData(id) {
        if (id == null) return;
        setLoading(true);
        let song = await (await fetch(`${api}/song?id=${id}`)).json();
        loadSong(song);
        setLoading(false);
    }

    /** Carrega a música, a partir da id de uma música, e a toca.
     * @param {number} id Id da música.
     */
    async function playSongFromId(id) {
        fetchData(id)
        .then(play);
    }

    /** Carrega a música, a partir de um objeto de música, definindo
     * o nome, artistas no estado.
     * @param {object} song Objeto de música, contendo nome, artistas etc.
     */
    function loadSong(song) {
        setSongUrl(`${songsServer}/${song.source}`);
        setName(song.name);
        setArtists(song.artists);
        setAlbumImage(song.image);
        console.log("loading");
    }

    /** Carrega e toca uma música, a partir de um objeto de música.
     * @param {object} song Objeto de música, contendo o nome, foto etc.
     */
    function playSongFromObject(song) {
        loadSong(song);
        play();
    }

    /** Toca/Retoma a música. */
    function play() {
        audioRef.current.play();
        setPlaying(true);
    }

    /** Pausa a música. */
    function pauseSong() {
        audioRef.current.pause();
        setPlaying(false);
    }

    /** Vai para um determinado tempo da música.
     * @param {number} time Tempo desejado.
     */
    function goTo(time) {
        setCurrentTime(time);
        audioRef.current.currentTime = time;
    }

    /** Ajust o volume da música.
     * @param {number} volume Volume desejado, considerando
     * que 0 é o mais baixo, 0.5 é metade e 1 é o mais alto.
     */
    function setVolume(volume) {
        audioRef.current.volume = volume;
        setCurrentVolume(volume);
    }

    function isSongLoaded() {
        return audioRef.current?.src !== "";
    }

    return {
        name,
        song: {
            name, artists, duration, currentTime,
            songUrl, albumImage
        }, 
        playing, loading, 
        playSongFromId, playSongFromObject,
        pauseSong, play, goTo, loadSongFromId: fetchData, loadSong,
        currentVolume, setVolume, setOnEnd: setEndedEvent, isSongLoaded
    };
}
