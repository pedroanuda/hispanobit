import React from 'react'
import styles from "./SongBox.module.css"
import { useSongContext } from 'common/contexts/SongContext'
import { Menu, MenuItem } from '@mui/material';
import { useQueueContext } from 'common/contexts/QueueContext';
import { Dots } from 'icons';

/** 
 * @param {Object} songInfo Informações da música.
 * @param {number} songInfo.id Id da música.
 * @param {string} songInfo.name Nome da música.
 * @param {number} songInfo.duration Duração da música (em segundos).
 * @param {string} songInfo.picture Foto de capa da música (url).
 * @param {number | null} songInfo.classification Classificação da música. Se não posta,
 * aparecerá sem classificação.
 */
export default function SongBox({ id, name, picture, classification }) {
    const { addToQueueFromId } = useQueueContext();
    const { playSongFromId, getSongDuration } = useSongContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [duration, setDuration] = React.useState(0);
    const menuOpened = Boolean(anchorEl);

    React.useEffect(() => {
        getSongDuration(id, buffer => {
            setDuration(buffer.duration);
        })
    }, [])

    const onKeyUpCallback = e => {
        if (e.keyCode == 13)
            playSongFromId(id);
    }

    const handleMenuClick = e => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }

    const closeMenu = e => {
        e.stopPropagation();
        setAnchorEl(null);
    }

    return (
    <div className={styles.box} onClick={() => playSongFromId(id)} role={"button"} tabIndex={0} onKeyUp={onKeyUpCallback}>
        <div>
            <img src={picture} alt="" />
            {classification !== null && (
                <span className={styles.classif}>{classification}</span>
            )}
            <span className={styles.songName}>{name}</span>
        </div>
        <div>
            <span>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</span>
            <button onClick={handleMenuClick} className={styles.buttonSt}>
                <img src={Dots} alt="Menu" />
            </button>
        </div>
        <Menu anchorEl={anchorEl} open={menuOpened} onClose={closeMenu}>
            <MenuItem onClick={e => {closeMenu(e); addToQueueFromId(id)}}>Adicionar à fila</MenuItem>
        </Menu>
    </div>
    )
}
