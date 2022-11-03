import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopDevelopers } from '../store/actions';
import { 
  TOP_DEVELOPERS_ERRORED,
  TOP_DEVELOPERS_REQUESTED,
  TOP_DEVELOPERS_RETRIEVED
} from '../store/types';

const TopDevelopers = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

	const dispatch = useDispatch()
	const status = useSelector(state => state.status);
  /* rowData isn't set to state.developers.topDevelopers initially because in current implementation,
   * because in case there are old top developers stored in state, they would be displayed, 
   * and later they would refresh and display new ones, which would not be good in terms of UX*/
	const stateCurrentTopDevelopers = useSelector(state => state.developers.topDevelopers);
	const prevStatusRef = useRef();
  let prevUserStatus = '';

  useEffect(() => {
		// dispatch(login({email: 'rooth@gmail.com', password: 'rootrooth'}));
		dispatch(getTopDevelopers());
	}, []);

	useEffect(() => {
		if (prevUserStatus && prevUserStatus !== status) {
      if (status === TOP_DEVELOPERS_REQUESTED) {
				setLoading(true);
			}
			if (status === TOP_DEVELOPERS_RETRIEVED) {
				setLoading(false);
				setRowData([...stateCurrentTopDevelopers]);
			}
			if (status === TOP_DEVELOPERS_ERRORED) {
				setLoading(false);
				alert('explosion occured'); // Implement better error feedback in future versions
			}
		}
		prevStatusRef.current = status;
    // There aren't stale deps on this useEffect, as this depends on status mostly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, prevStatusRef]);

	prevUserStatus = prevStatusRef.current;

  return (
    <div className=''>
      <h1>Top Developers</h1>
    </div>
  );
}

export default TopDevelopers;