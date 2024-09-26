import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComingSoonPage from './pages/ComingSoonPage';
import QueueContextProvider from 'common/contexts/QueueContext';
import './index.css'
import SongContextProvider from 'common/contexts/SongContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ComingSoonPage />)
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
