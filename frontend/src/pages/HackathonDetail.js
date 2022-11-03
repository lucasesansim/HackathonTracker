import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getHackathon } from '../store/actions';
import { HACKATHONS_ERRORED, HACKATHON_REQUESTED, HACKATHON_RETRIEVED } from '../store/types';

const useStyles = makeStyles({
  card: {
    margin: '16px',
    minWidth: 1300
  },
  loader: {
    margin: '32px'
  },
  nameContainer: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '12px'
  }
});

const HackathonDetail = () => {
  const params = useParams();
  const { hackathonId } = params;

  const [hackathon, setHackathon] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
	const dispatch = useDispatch()
	const status = useSelector(state => state.status);
	const stateCurrentHackathons = useSelector(state => state.hackathons.hackathon);
	const prevStatusRef = useRef();
  let prevUserStatus = '';

  useEffect(() => {
		// dispatch(login({email: 'rooth@gmail.com', password: 'rootrooth'}));
		dispatch(getHackathon(hackathonId));

    // No stale deps, this hook is meant to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (prevUserStatus && prevUserStatus !== status) {
      if (status === HACKATHON_REQUESTED) {
				setLoading(true);
			}
			if (status === HACKATHON_RETRIEVED) {
				setLoading(false);
				setHackathon(stateCurrentHackathons);
			}
			if (status === HACKATHONS_ERRORED) {
				setLoading(false);
				alert('explosion occured'); // Future versions: Implement better error feedback
			}
		}
		prevStatusRef.current = status;
    // There aren't stale deps on this useEffect, as this depends on status mostly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, prevStatusRef]);

	prevUserStatus = prevStatusRef.current;

  console.log(hackathonId);
  return (
    <div className=''>
      <h1>Hackathon Detail</h1>
    </div>
  );
}

export default HackathonDetail;