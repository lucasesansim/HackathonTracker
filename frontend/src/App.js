import './App.css';
import { Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import SideBar from './components/SideBar';

function App() {
  const makeScreensAvailable = true;

  return (
    <div className="App">
      <SideBar />
      <Typography fontSize={25}>Hello there!</Typography>
      <Typography>...General Kenobi!</Typography>
      {makeScreensAvailable && <Outlet />}
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
