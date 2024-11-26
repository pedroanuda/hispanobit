import { api, songsServer } from "config.json"
import ArtistBox from "components/MainNavigation/ArtistBox";
import SongBox from "components/SongBox";
import React from "react";

export default function Home() {
    const [songs, setSongs] = React.useState([]);
    const [artists, setArtists] = React.useState([]);
    
    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let damn = await (await fetch(`${api}/songs`)).json();
        let damn2 = await (await fetch(`${api}/artists`)).json()
        setSongs(damn);
        setArtists(damn2)
    }

    return (
        <div style={{display: 'flex', gap: '1.5rem', padding: '1rem'}}>
            <div className='horiz_div' style={{flex: 2}}>
                <div className='divisao_cat'>
                    <h3 className='titulo_cat'>Popular</h3>
                    {songs.map((song, i) => (
                        <SongBox id={song.id} name={song.name} picture={song.image} duration={10} classification={i+1} key={i} />
                    ))}
                </div>
            </div>
            <div className='horiz_div' style={{flex: 1}}>
                <div className='divisao_cat'>
                    <h3 className='titulo_cat'>Artistas</h3>
                    {artists.map((artist, i) => {
                        if (i < 4) return (
                            <ArtistBox key={i} name={artist.name} picture={artist.source} />
                        );
                        return;
                    })}
                </div>
            </div>
        </div>
    )
}