import React from 'react';
import { useRouteError } from 'react-router-dom';
import SideBar from '../components/SideBar';
import './ErrorPage.css'

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <SideBar />
      <div id="error-page" className='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i><u>{error.statusText || error.message}</u></i>
        </p>
      </div>
    </>
  );
}

export default ErrorPage;