import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComingSoonPage from './pages/ComingSoonPage';
import QueueContextProvider from 'common/contexts/QueueContext';
import SongContextProvider from 'common/contexts/SongContext';
import AppLayout from 'pages/AppLayout';
import "./fonts/PixelifySans.ttf"
import './index.css'
import FullScreenPlayer from 'components/FullScreenPlayer';
import Artist from 'pages/Artist';
import Home from 'pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<AppLayout />),
    children: [
      {
        index: true,
        element: (<Home />)
      },
      {
        path: 'artist/:artist',
        element: (<Artist />)
      }
    ]
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
