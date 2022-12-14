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
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
        element: <HackathonDetail />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
reportWebVitals();
