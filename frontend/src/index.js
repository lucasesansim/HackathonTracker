import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Hackathons from './pages/Hackathons';
import TopDevelopers from './pages/TopDevelopers';
import HackathonDetail from './pages/HackathonDetail';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "hackathons",
        element: <Hackathons />,
      },
      {
        path: "topDevelopers",
        element: <TopDevelopers />,
      },
      {
        path: "hackathons/:hackathonId",
        element: <HackathonDetail />,  // Check https://reactrouter.com/en/main/route/loader to load API even while going to that screen!
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
