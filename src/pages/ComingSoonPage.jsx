import { useQueueContext } from "common/contexts/QueueContext";
import MusicPlayer from "../components/MusicPlayer";
import React from 'react';
import MiniPlayer from "components/MiniPlayer";

export default function ComingSoonPage() {
  const [playerOpen, setPlayerOpen] = React.useState(false);
  const closePlayer = React.useCallback(() => setPlayerOpen(false), []);
  const openPlayer = React.useCallback(() => setPlayerOpen(true), []);
  const { addToQueueFromId } = useQueueContext();

  return (
    <div style={{textAlign: "center"}}>
    <h1>HispanoBit</h1>
    <h3>Chegando em breve!</h3>
    <button onClick={() => addToQueueFromId(0)}>La Gozadera</button>
    <button onClick={() => addToQueueFromId(3)}>La Bicicleta</button>
    <MusicPlayer open={playerOpen} onClose={closePlayer}/>
    <MiniPlayer mainPlayerHandleOpen={openPlayer} />
    </div>
  )
}
