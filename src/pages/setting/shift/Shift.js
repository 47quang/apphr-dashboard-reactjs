// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(2.5),
//   },
// }));

// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onChangePage(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


// function createDate(shiftCode, shiftName, start, end) {
//   return { shiftCode, shiftName, start, end };
// }

// const rows = [
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
//   createDate("SA1", "Ca sáng 1", "08:30", "11:30"),
// ]

// // Shift.propTypes = {

// // };

// function Shift(props) {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="custom pagination table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="right">Mã&nbsp;ca&nbsp;làm</TableCell>
//             <TableCell align="right">Tên&nbsp;ca&nbsp;làm</TableCell>
//             <TableCell align="right">Giờ&nbsp;check-in</TableCell>
//             <TableCell align="right">Giờ&nbsp;check-out</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {(rowsPerPage > 0
//             ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : rows
//           ).map((row) => (
//             <TableRow key={row.name}>
//               <TableCell align="right">{row.shiftCode}</TableCell>
//               <TableCell align="right">{row.shiftName}</TableCell>
//               <TableCell align="right">{row.start}</TableCell>
//               <TableCell align="right">{row.end}</TableCell>
//             </TableRow>
//           ))}
//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={4}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               SelectProps={{
//                 inputProps: { 'aria-label': 'rows per page' },
//                 native: true,
//               }}
//               onChangePage={handleChangePage}
//               onChangeRowsPerPage={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// }

// export default Shift;
import * as React from 'react';
import { DataGrid, GridOverlay, GridColumnsToolbarButton, GridFilterToolbarButton, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <div className="py-2"></div>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div>Chưa có ca làm việc nào</div>
    </GridOverlay>
  );
}




export default function Shift() {
  const columns = [
    { field: 'code', headerName: 'Mã ca làm', flex: 1 },
    { field: 'name', headerName: 'Tên ca làm', flex: 1 },
    { field: 'start', headerName: 'Giờ check-in', flex: 1 },
    { field: 'end', headerName: 'Giờ check-out', flex: 1 },

  ];
  function createDate(id, shiftCode, shiftName, start, end) {
    return { id: id, code: shiftCode, name: shiftName, start: start, end: end };
  }

  const rows = [
    createDate(1, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(2, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(3, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(4, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(5, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(6, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(7, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(8, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(9, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(10, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(11, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(12, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(13, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(14, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(15, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(16, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(17, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(18, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(19, "SA1", "Ca sáng 1", "08:30", "11:30"),
    createDate(20, "SA1", "Ca sáng 1", "08:30", "11:30"),
  ]

  return (
    <div className="col-12 ">
      <DataGrid
        className="bg-white py-3 px-4"
        autoHeight
        pageSize={5} rowsPerPageOptions={[5, 10]} pagination
        rows={rows} columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}