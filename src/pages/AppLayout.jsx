import FullScreenPlayer from 'components/FullScreenPlayer'
import MainNavigation from 'components/MainNavigation'
import MiniPlayer from 'components/MiniPlayer'
import TopBar from 'components/TopBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const [fullOn, setFullOn] = React.useState(false);
  const fullScrRef = React.useRef();

  const onFullscreen = () => {
    fullScrRef.current.requestFullscreen();
  }

  const onFullscreenChange = e => {
    if (document.fullscreenElement)
      setFullOn(true);
    else
      setFullOn(false);
  }

  document.onfullscreenchange = onFullscreenChange;

  return (
    <>
        <TopBar />
        <MainNavigation>
          <Outlet />
        </MainNavigation>
        <MiniPlayer onFullscreen={onFullscreen} />
        <FullScreenPlayer ref={fullScrRef} style={{display: fullOn ? 'flex' : 'none'}}/>
    </>
  )
}
