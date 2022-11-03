import { EmojiEvents } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { getTopDevelopers } from '../store/actions';
import { 
  TOP_DEVELOPERS_ERRORED,
  TOP_DEVELOPERS_REQUESTED,
  TOP_DEVELOPERS_RETRIEVED
} from '../store/types';

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

const TopDevelopers = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
	const dispatch = useDispatch()
	const status = useSelector(state => state.status);
  /* RowData isn't set to state.developers.topDevelopers initially because in current implementation,
   * because in case there are old top developers stored in state, they would be displayed, 
   * and later they would refresh and display new ones, which would not be good in terms of UX*/
	const stateCurrentTopDevelopers = useSelector(state => state.developers.topDevelopers);
	const prevStatusRef = useRef();
  let prevUserStatus = '';

  useEffect(() => {
		// dispatch(login({email: 'rooth@gmail.com', password: 'rootrooth'}));
		dispatch(getTopDevelopers());
    
    // No stale deps, this hook is meant to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
				alert('explosion occured'); // Future versions: Implement better error feedback
			}
		}
		prevStatusRef.current = status;
    // There aren't stale deps on this useEffect, as this depends on status mostly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, prevStatusRef]);

	prevUserStatus = prevStatusRef.current;

  return (
    <Card  className={classes.card} variant="outlined"> 
      <CardContent>
        <Typography variant="h4" align='left'>
          Top 10 Developers!
        </Typography>
        <Divider />
        <TableContainer component={Card}>
          <Divider sx={{ marginTop: '40px' }}/>
          <Table 
            aria-label="hackathon table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    Rank
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    Person
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    Total Points
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData
                .map((developer, index) => {
                  let color = null
                  switch(index) {
                    case 0:
                      color = 'gold';
                      break;
                    case 1:
                      color = 'silver';
                      break;
                    case 2:
                      color = 'sandybrown';
                      break;
                    default:
                  }
                  return (
                    <TableRow key={developer.id} hover>
                      <TableCell>
                        { index <= 2 
                          ? (
                            <EmojiEvents 
                              fontSize="large"
                              style={{ color }}
                            />
                        ) : (
                          `${index + 1}`
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className={classes.nameContainer}>
                          <Avatar
                            alt={`${developer.id}-profile`}
                            src={developer.profile_thumbnail}
                            className={classes.avatar}
                          />
                          { developer.first_name } { developer.last_name }
                        </div>
                      </TableCell>
                      <TableCell>
                        { developer.phone }
                      </TableCell>
                      <TableCell>
                        { developer.email }
                      </TableCell>
                      <TableCell>
                        { developer.total_points }
                      </TableCell>
                    </TableRow>
                )})}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && (
          <div className={classes.loader}>
            <PropagateLoader color="#ABD9F1"/>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TopDevelopers;