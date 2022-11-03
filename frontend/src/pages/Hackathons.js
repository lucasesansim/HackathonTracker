import { 
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { getHackathons } from '../store/actions';
import {
	HACKATHONS_ERRORED,
	HACKATHONS_REQUESTED,
	HACKATHONS_RETRIEVED
} from '../store/types';

const useStyles = makeStyles({
  card: {
    margin: '16px',
    minWidth: 1300
  },
  loader: {
    marginBottom: '32px'
  }
});

const hackathonData = [
	{
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "PAPILLA",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "POROTA",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
  {
		"id": 20,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "Mordor",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 1,
		"created_at": "2022-10-31T16:05:35.000000Z",
		"updated_at": "2022-10-31T16:05:35.000000Z",
		"name": "HackTest",
		"place": "Buenos Aires",
		"held_in": "2022-10-30 16:05:35"
	},
	{
		"id": 21,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "FINALIZo",
		"held_in": "2022-11-01 19:49:36"
	},
	{
		"id": 22,
		"created_at": "2022-11-01T19:49:36.000000Z",
		"updated_at": "2022-11-01T19:49:36.000000Z",
		"name": "Hackathon 2022-11-01 19:49:36",
		"place": "CHAN",
		"held_in": "2022-11-01 19:49:36"
	},
]

const Hackathons = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

	const classes = useStyles();
	const dispatch = useDispatch();
	const status = useSelector(state => state.status);
	const hackathons = useSelector(state => state.hackathons.hackathons);
	const prevStatusRef = useRef();
  let prevUserStatus = '';

	useEffect(() => {
		dispatch(getHackathons(page, pageSize));
	}, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    dispatch(getHackathons(newPage, pageSize));
  };

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

	useEffect(() => {
		if (prevUserStatus && prevUserStatus !== status) {
      if (status === HACKATHONS_REQUESTED) {
				setLoading(true);
			}
			if (status === HACKATHONS_RETRIEVED) {
				setLoading(false);
				setRowData([...hackathons]);
			}
			if (status === HACKATHONS_ERRORED) {
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
    <>
      <Card  className={classes.card} variant="outlined"> 
        <CardContent>
          <Typography variant="h4" align='left'>
            Hackathon List
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
                    <Typography variant="h5">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      Place
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      Date of Event
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData
									.map(hackathon => (
                  <TableRow key={hackathon.id} hover>
                    <TableCell component="th" scope="row">
                      <Link to={`/hackathons/${hackathon.id}`}>
                        { hackathon.name }
                      </Link>
                    </TableCell>
                    <TableCell>
                      { hackathon.place }
                    </TableCell>
                    <TableCell>
                      <Moment 
                        date={hackathon.held_in}
                        format="MM/DD/YYYY"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Future Versions: implement infinite scroller for smoother UX. */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
						/* This would count total pagination available, but only db has total number. 
						 * Could get as fascets in future implementation. */
            count={-1} 
            rowsPerPage={pageSize}
            page={page}
            onPageChange={(event, page) => handleChangePage(page)}
            onRowsPerPageChange={handleChangePageSize}
						/* Future Versions: pagination has a bug where if amount in db has total of N files, 
						 * where N % pageSize === 0,then pagination would let you advance up to an empty page. 
						 * When fascets that indicate total stored in db are implemented, 
						 * disabling next page button should be revisited */
						nextIconButtonProps={{disabled: (rowData.length < page * pageSize)}}
          />
          {loading && (
            <div className={classes.loader}>
              <PropagateLoader color="#ABD9F1"/>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Hackathons;