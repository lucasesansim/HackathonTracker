import { EmojiEvents } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardMedia,
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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { getHackathon } from '../store/actions';
import {
  HACKATHONS_ERRORED,
  HACKATHON_REQUESTED,
  HACKATHON_RETRIEVED
} from '../store/types';
import TechImage from '../assets/tech.jpeg'
import Moment from 'react-moment';

const useStyles = makeStyles({
  card: {
    margin: '16px',
    minWidth: 1225
  },
  loader: {
    margin: '32px'
  },
  hackathonCardContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    marginBottom: '16px'
  },
  hackathonCard: {
    margin: '16px',
    width: '100%',
    maxWidth: '900px',
  },
  hackathonCardContentContainer: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
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

  return (
    <Card className={classes.card} variant="outlined"> 
      <CardContent>
        <Typography variant="h4" align='left'>
          Hackathon Detail
        </Typography>
        <Divider />

        <div className={classes.hackathonCardContainer}>
          <Card className={classes.hackathonCard} variant="outlined">
            <CardMedia
              component="img"
              height="140"
              image={TechImage} // Future versions: implement uploading of image for each hackathon
              alt={`${hackathon.name}-image`}
            />
            <CardContent>
              <div className={classes.hackathonCardContentContainer}>
                <Typography variant="h5">
                  {hackathon.name}
                </Typography>
                <Typography variant="h5">
                  {hackathon.place}
                </Typography>
                <Typography variant="h5">
                  <Moment 
                    date={hackathon.held_in}
                    format="MM/DD/YYYY"
                  />
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        {Object.keys(hackathon).length !== 0 && (
          <>
            <Typography 
              variant="h5"
              align='left'
              marginBottom={'16px'}
            >
              Developments
            </Typography>
            <TableContainer component={Card}>
              <Table aria-label="hackathon table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        Rank
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        Description
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hackathon.developments
                    .map((development, index) => {
                      let color = null
                      switch(development.rank) {
                        case 1:
                          color = 'gold';
                          break;
                        case 2:
                          color = 'silver';
                          break;
                        case 3:
                          color = 'sandybrown';
                          break;
                        default:
                      }
                      return (
                        <TableRow key={development.id} hover>
                          <TableCell>
                            { development.rank <= 3 
                              ? (
                                <EmojiEvents 
                                  fontSize="large"
                                  style={{ color }}
                                />
                            ) : (
                              `${development.rank}`
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            { development.name }
                          </TableCell>
                          <TableCell>
                            { development.description }
                          </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {loading && (
          <div className={classes.loader}>
            <PropagateLoader color="#ABD9F1"/>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HackathonDetail;