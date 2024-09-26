import { api } from "config.json";
import React from 'react';
import { useSongContext } from "./SongContext";

export const QueueContext = React.createContext({
    queue: [],
    setQueue: () => null,
    currentSong: null,
    setCurrentSong: () => null,
    currentIndex: 0,
    setCurrentIndex: () => null
});
QueueContext.displayName = 'Queue';

export default function QueueContextProvider({ children }) {
    const [queue, setQueue] = React.useState([]);
    const [currentSong, setCurrentSong] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
        <QueueContext.Provider value={{queue, setQueue, currentSong, setCurrentSong, currentIndex, setCurrentIndex}}>
            { children }
        </QueueContext.Provider>
    )
}

export function useQueueContext() {
    const {
        queue, setQueue, 
        currentSong, setCurrentSong, 
        currentIndex, setCurrentIndex
    } = React.useContext(QueueContext);
    const { loadSong, pauseSong, setOnEnd, playing, play, goTo } = useSongContext();

    // Effect sujeito à mudança.
    React.useEffect(() => {
        setOnEnd(() => () => {
            if (currentIndex <= queue.length - 1)
                goToNextSong();
            else
            pauseSong();
        })
    }, [queue]);

    // Caso o currentIndex mude, é carregada a nova música etc.
    React.useEffect(() => {
        if (queue[currentIndex] == undefined) 
            return;
        setCurrentSong(queue[currentIndex]);
        loadSong(queue[currentIndex]);
    }, [currentIndex]);

    /** Adiciona música à fila, a partir da id.
     * @param {number} id Id da música.
     */
    async function addToQueueFromId(id) {
        let song = await (await fetch(`${api}/song?id=${id}`)).json();

        addToQueue(song);
    }

    /** Adiciona música à fila.
     * @param {object} song Música a ser adicionada.
     */
    function addToQueue(song) {
        if (queue.length == 0) {
            setCurrentSong(song);
            loadSong(song);
        }

        setQueue(previous => [...previous, song]);
    }

    /** Avança para a próxima música na fila. */
    function goToNextSong() {
        if (queue.length - 1 <= currentIndex) return;
        let wasPlaying = playing;
        setCurrentIndex(previous => previous + 1);
        goTo(0);

        if (wasPlaying) play();
    }

    /** Retrocede para a música anterior na fila. */
    function goToPreviousSong() {
        if (currentIndex <= 0 || currentIndex > queue.length - 1) return;
        setCurrentIndex(previous => previous - 1);
        goTo(0);
    }

    return { queue, currentSong, addToQueueFromId, addToQueue, queueIndex: currentIndex, goToNextSong, goToPreviousSong }
}
