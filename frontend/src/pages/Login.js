import { LoadingButton } from '@mui/lab';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../store/actions';
import { LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCESSFUL } from '../store/types';

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
    height: '150px',
    justifyContent: 'space-evenly'
  },
  loginButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  loginButton: {
    width: '100%'
  }
});

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })
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
      if (status === LOGIN_REQUESTED) {
				setLoading(true);
			}
			if (status === LOGIN_SUCCESSFUL) {
				setLoading(false);
			}
			if (status === LOGIN_FAILED) {
        setLoading(false);
        console.log(error.status)
				if (error.status === 400) {
          alert('Are you sure you introduced an email and password of minimum of 6 characters?? hmm?');
        } else if (error.status === 401) {
          alert('BZZZT! Wrong credentials, try again! This time with the correct ones!');
        }
			}
		}
		prevStatusRef.current = status;
    // There aren't stale deps on this useEffect, as this depends on status mostly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, prevStatusRef]);

	prevUserStatus = prevStatusRef.current;

  const handleLogin = () => {
    dispatch(login({ email: user.email, password: user.password }));
  }

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      if (user.email !== '' && user.password !== '') {
        handleLogin();
      }
    }
  }

  if (authState.isLoggedIn) {
    return <Navigate to="/" />
  }

  // console.log(authState)
  return (
    <div id="login-page" className={classes.container}>
      <Card>
        <CardContent>
          <Typography variant="h5" align='left'>
            Login
          </Typography>
          <div className={classes.textFieldContainer}>
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
              disabled={user.email === '' || user.password === ''}
              className={classes.loginButton}
              onClick={handleLogin}
              loading={loading}
            >
              Login
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;