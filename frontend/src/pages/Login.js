import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, register } from '../store/actions';
import { 
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESSFUL,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCESSFUL
} from '../store/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    height: '92vh',
    alignItems: 'center'
  },
  textFieldContainer: {
    display: 'flex',
    flexFlow: 'column',
    margin: '16px',
    height: '200px',
    justifyContent: 'space-evenly'
  },
  loginButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  loginButton: {
    width: '100%'
  },
  loginOrRegister: {
    paddingLeft: 0
  }
});

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
	const classes = useStyles();
  const status = useSelector(state => state.status);
  const error = useSelector(state => state.error);
  const authState = useSelector(state => state.auth);
	const prevStatusRef = useRef();
  let prevUserStatus = '';

	useEffect(() => {
		if (prevUserStatus && prevUserStatus !== status) {
      if (status === LOGIN_REQUESTED || status === REGISTER_REQUESTED) {
				setLoading(true);
			}

			if (status === LOGIN_SUCCESSFUL) {
				setLoading(false);
			}
      if (status === REGISTER_SUCCESSFUL) {
        setLoading(false);
      }

			if (status === LOGIN_FAILED) {
        setLoading(false);
				if (error.status === 400) {
          alert('Are you sure you introduced an email and password of minimum of 6 characters?? hmm?');
        } else if (error.status === 401) {
          alert('BZZZT! Wrong credentials, try again! This time with the correct ones!');
        }
			}
      if (status === REGISTER_FAILED) {
        setLoading(false);
        if (error.status === 400) {
          alert('Invalid or repeated credentials. Please try again.');
        } 
      }
		}
		prevStatusRef.current = status;
    // There aren't stale deps on this useEffect, as this depends on status mostly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, prevStatusRef]);

	prevUserStatus = prevStatusRef.current;

  const handleSubmit = () => {
    if (
      mode === 'login'
      && user.email !== ''
      && user.password !== ''
    ) {
      dispatch(login(user));
    } else if (
      mode === 'register'
      && user.email !== ''
      && user.password !== ''
      && user.name !== ''
    ) {
      dispatch(register(user));
    }
  }

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
  }

  if (authState.isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div id="login-page" className={classes.container}>
      <Card>
        <CardContent>
          <Typography variant="h5" align='left'>
            { mode === 'login' ? 'Login' : 'Register' }
          </Typography>
          <div className={classes.textFieldContainer}>
            { mode === 'register' && (
                <TextField
                  required
                  id="required"
                  label="Username"
                  variant="outlined"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
              />
            )}
            <TextField
              required
              id="required"
              label="Email"
              variant="outlined"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              value={user.password}
              onKeyPress={handleEnterKey}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
            
          </div>
          <div className={classes.loginButtonContainer}>
            <LoadingButton
              variant="contained"
              disabled={
                user.email === ''
                || user.password === ''
                || (mode === 'register' && user.name === '')
              }
              className={classes.loginButton}
              onClick={handleSubmit}
              loading={loading}
            >
              { mode === 'login' ? 'Login' : 'Register' }
            </LoadingButton>
          </div>
          {/* Wouldn't normally mix using inline styling vs classes */}
          <CardActions style={{ paddingLeft: 0 }}>
            <Button size="small" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              { mode === 'login' ? 'Signup first' : 'Login with my account' }
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;