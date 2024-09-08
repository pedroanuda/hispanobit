import Drawer from "react-bottom-drawer";
import React from 'react';
import { api } from "config.json";
import "./MusicPlayer.css";

/**
 * @param {{
 *  open: boolean,
 *  onClose: () => void,
 *  id: number
 * }} props
 */
function MusicPlayer({ open, onClose, id }) {
    const [name, setName] = React.useState("");
    const [artists, setArtists] = React.useState([""]);
    const [image, setImage] = React.useState("");

    React.useEffect(() => {
        async function fetchData() {
            let song = await (await fetch(`${api}/song?id=${id}`)).json();
            setName(song.name);
            setArtists(song.artists);
            setImage(song.image);
        }
        fetchData();
    }, [id]);

    return (
        <Drawer onClose={onClose} isVisible={open} className="drawer">
            <div className="playing-display">
                <span>TOCANDO</span>
                <span>AHORA</span>
            </div>
            <img className="album-pic" src={image} alt="musica" />
            <div className="control-panel">
                <span className="song-name">{name}</span>
                <span className="song-artist">{artists.join(", ")}</span>
            </div>
        </Drawer>
    )
}

export default MusicPlayer;