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
import React from 'react';
import Moment from 'react-moment';
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

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
]

const Hackathons = () => {
  const classes = useStyles();
  const [rowData, setRowData] = React.useState(hackathonData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
	const store = useStore();
	console.log(store.getState())

  const handleChangePage = (newPage) => {
    setPage(newPage);
    setLoading(true);
    // Ask for more data, REMEMBER TO ERASE CURRENT DATA ONCE NEW IS LOADED
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* <h1>Hackathons</h1> */}
      {/* Check if when having full table data, the minWidht isn't needed */}
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
                {rowData.map(hackathon => (
                  <TableRow
                    key={hackathon.id}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      <Link to={`/hackathons/${hackathon.id}`}>
                        {hackathon.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {hackathon.place}
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
          {/* TODO: further implementation, use infinite scroller for smoother UX. */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={-1} // This would count total pagination available, but only db has total number. Could get as fascets in future implementation
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, page) => handleChangePage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
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