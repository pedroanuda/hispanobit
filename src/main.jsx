import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComingSoonPage from './pages/ComingSoonPage';
import QueueContextProvider from 'common/contexts/QueueContext';
import SongContextProvider from 'common/contexts/SongContext';
import HomePage from 'pages/HomePage';
import "./fonts/PixelifySans.ttf"
import './index.css'
import FullScreenPlayer from 'components/FullScreenPlayer';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<HomePage />)
  },
  {
    path: "/test",
    element: (<FullScreenPlayer />)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SongContextProvider>
      <QueueContextProvider>
        <RouterProvider router={router} />
      </QueueContextProvider>
    </SongContextProvider>
  </StrictMode>,
)
