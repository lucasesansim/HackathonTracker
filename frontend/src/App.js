import './App.css';
import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  const makeScreensAvailable = true;
  return (
    <div className="App">
      {/* Un componente con el menu, y otro componente con el contenido de la pagina */}
      <nav>
        <ul>
          <li>
            <Link to={`hackathons`}>Hackathons</Link>
          </li>
          <li>
            <Link to={`topDevelopers`}>Top Developers</Link>
          </li>
          {/* <li>
            <Link to={`hackathons/3`}>Hackathon 3</Link>
          </li> */}
        </ul>
      </nav>
      <Typography fontSize={25}>Hello there!</Typography>
      <Typography>...General Kenobi!</Typography>
      {makeScreensAvailable && <Outlet />}
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
