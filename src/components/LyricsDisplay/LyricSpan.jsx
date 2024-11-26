import React from 'react'
import styles from "./LyricsDisplay.module.css"
import { useSongContext } from 'common/contexts/SongContext';

export default function LyricSpan({ children, isRead, parentRef, time }) {
    const spanRef = React.useRef();
    const { goTo } = useSongContext();

    const adjustScroll = () => {
        const coords = spanRef.current.getBoundingClientRect();
        parentRef?.current.scrollTo({
            top: (coords.top - coords.height - 152) + parentRef.current.scrollTop,
            behavior: 'smooth'
        });
    }

    React.useEffect(() => {
        if (isRead) 
            adjustScroll();
    }, [isRead])

    return (
        <span className={(isRead ? styles.read : "") + (typeof children == 'string' && children.trim() == "" 
        ? ' ' + styles.empty : "")} ref={spanRef} onClick={() => {goTo(time); adjustScroll()}}>
            {children}
        </span>
    )
}
