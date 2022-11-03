import './App.css';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function App() {
  const location = useLocation();
  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth" />
  }

  return (
    <div className="App">
      <div className={classes.appContainer}>
        <SideBar />
        {/* In case user is in home screen '/', 
          * no outlet will be there, so a Dashboard would be best in these cases,
          * yet, such Dashboard wasn't required for now, so leaving a kind message :) */}
        <div>
          { 
            location.pathname !== '/'
            ? <Outlet />
            : <h1>Dashboard is still in development. Do come again soon!</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
