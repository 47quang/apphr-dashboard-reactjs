import { CContainer } from '@coreui/react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Avatar, Button } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AssignmentsDialog from 'src/components/dialog/Assignments';
import RollUpInfo from 'src/components/dialog/RollUpInfo';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PROFILE_TABS, ROUTE_PATH } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import { fetchRollUpTable, setEmptyAssignments } from 'src/stores/actions/assignment';
import { fetchHolidays } from 'src/stores/actions/holiday';
import { setTabName } from 'src/stores/actions/profile';
import {} from 'src/stores/actions/rollUp';
import { backgroundColor, backgroundColorHover, borderColor, dotColor } from 'src/utils/colorOfCell';
import { isSameBeforeTypeDate } from 'src/utils/datetimeUtils';

const RollUp = ({ t, location }) => {
  const [state, setState] = useState({
    today: moment(),
    fromDate: moment().clone().startOf('week'),
    toDate: moment().clone().endOf('week'),
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.assignment.assignments);
  const holidays = useSelector((state) => state.holiday.holidays);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
  });
  const onCurrentPageChange = (pageNumber) =>
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
      currentPage: 0,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };

  const changeColDef = (fromDate) => [
    { name: 'code', title: t('label.employee'), align: 'left', width: '16%', wordWrapEnabled: true },
    {
      name: 'sunday',
      title: [t('label.sunday'), fromDate.clone().startOf('week').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'monday',
      title: [t('label.monday'), fromDate.clone().startOf('week').add(1, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week').add(1, 'd')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week').add(1, 'd'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'tuesday',
      title: [t('label.tuesday'), fromDate.clone().startOf('week').add(2, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week').add(2, 'd')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week').add(2, 'd'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'wednesday',
      title: [t('label.wednesday'), fromDate.clone().startOf('week').add(3, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week').add(3, 'd')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week').add(3, 'd'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'thursday',
      title: [t('label.thursday'), fromDate.clone().startOf('week').add(4, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week').add(4, 'd')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week').add(4, 'd'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'friday',
      title: [t('label.friday'), fromDate.clone().startOf('week').add(5, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().startOf('week').add(5, 'd')) &&
          isSameBeforeTypeDate(fromDate.clone().startOf('week').add(5, 'd'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
    {
      name: 'saturday',
      title: [t('label.saturday'), fromDate.clone().endOf('week').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
      holiday: holidays.find(
        (e) =>
          isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().endOf('week')) &&
          isSameBeforeTypeDate(fromDate.clone().endOf('week').format('YYYY-MM-DD'), e.endDate.replace('Z', '')),
      )
        ? true
        : false,
    },
  ];

  let columnDefOfRollUp = useRef();
  columnDefOfRollUp.current = changeColDef(state.fromDate);

  const handlePrev = () => {
    let from = state.fromDate.clone().subtract(7, 'd');
    let to = state.toDate.clone().subtract(7, 'd');

    setState((preState) => ({
      ...preState,
      fromDate: from,
      toDate: to,
    }));
  };

  const handleNext = () => {
    let from = state.fromDate.clone().add(7, 'd');
    let to = state.toDate.clone().add(7, 'd');

    setState((preState) => ({
      ...preState,
      fromDate: from,
      toDate: to,
    }));
  };

  useEffect(() => {
    dispatch(
      fetchHolidays({
        page: 0,
        perpage: 999,
      }),
    );
    dispatch(
      fetchRollUpTable(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
          from: state.fromDate,
          to: state.toDate,
        },
        onTotalChange,
        setLoading,
      ),
    );
    columnDefOfRollUp.current = changeColDef(state.fromDate);
    return () => {
      dispatch(setEmptyAssignments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromDate, paging.currentPage, paging.pageSize]);

  const CustomTableCell = ({ value, row, column, children, className, ...restProps }) => {
    const [cell, setCell] = useState({
      rowId: '',
      columnName: '',
      isOpen: false,
      assignment: {},
      date: '',
    });
    const [isOpenAssignmentsDialog, setIsOpenAssignmentsDialog] = useState(false);

    const handleCloseAssignmentsDialog = (isReload) => {
      setIsOpenAssignmentsDialog(false);
      if (isReload) reloadTable();
    };

    const reloadTable = () => {
      dispatch(
        fetchRollUpTable(
          {
            page: paging.currentPage,
            perpage: paging.pageSize,
            from: state.fromDate,
            to: state.toDate,
          },
          onTotalChange,
        ),
      );
    };
    const isDay = value?.assignment;
    const handleClose = (isReload) => {
      console.log('isReload', isReload);
      setCell({ ...cell, isOpen: !cell.isOpen, isReload: isReload });
      if (isReload) reloadTable();
    };
    const dateCol = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return (
      <>
        {cell.isOpen && (
          <RollUpInfo
            t={t}
            isOpen={cell.isOpen}
            handleClose={handleClose}
            assignment={cell.assignment}
            profileCode={row.code}
            fullName={row.fullname}
            profileId={row.id}
            avatar={row.avatar}
            reloadTable={reloadTable}
          />
        )}
        {isOpenAssignmentsDialog ? (
          <AssignmentsDialog
            t={t}
            isOpen={isOpenAssignmentsDialog}
            handleCancel={handleCloseAssignmentsDialog}
            profileId={cell.rowId}
            date={cell.date}
            fullName={row.fullname}
            avatar={row.avatar}
            code={row.code}
          />
        ) : (
          <></>
        )}
        <Table.Cell
          className={classNames(className, 'm-1 p-1')}
          row={row}
          column={column}
          children={children}
          tableColumn={restProps.tableColumn}
          tableRow={restProps.tableRow}
          style={{
            backgroundColor: column.holiday ? COLORS.HOLIDAY_CELL : isDay ? (value.future ? COLORS.FREE_DATE : COLORS.FREE_DATE) : COLORS.WHITE,
            verticalAlign: 'inherit',
            borderBottomColor: '#D8DBE0',
            borderLeftColor: '#D8DBE0',
            borderTopColor: 'white',
            borderRightColor: 'white',
            borderStyle: 'solid',
            borderWidth: 'thin',
            height: 75,
            ...restProps.style,
          }}
        >
          {isDay ? (
            value.future ? (
              <div
                className={classNames('d-flex justify-content-center', 'align-items-center')}
                //role={value.assignment.length > 0 ? 'button' : 'layout'}
                // onClick={(e) => {
                //   if (dateCol.includes(column.name)) {
                //     let numOfAssignment = value.assignment.length;
                //     if (numOfAssignment === 1)
                //       setCell({ ...cell, rowId: row.id, columnName: column.name, isOpen: !cell.isOpen, assignment: value.assignment[0] });
                //     else if (numOfAssignment >= 1) {
                //       setIsOpenAssignmentsDialog(true);
                //       setCell({ ...cell, rowId: row.id, date: value.date });
                //     }
                //   }
                // }}
                style={{
                  verticalAlign: 'inherit',
                  borderColor: borderColor(value),
                  borderStyle: 'solid',
                  //height: '100%',
                  borderRadius: '5px',
                  borderWidth: '2px',
                  backgroundColor: backgroundColor(value),
                  height: 75,
                }}
              >
                {value.assignment.length > 1 ? (
                  <div>
                    <p className="mb-0">{value.assignment.length + 'Ca'}</p>
                    <div>
                      {value.assignment.map((assignment, idx) => (
                        <Lens key={assignment.shiftCode} className="mr-1" style={{ color: COLORS.BORDER_FUTURE, height: '10px', width: '10px' }} />
                      ))}
                    </div>
                  </div>
                ) : value.assignment.length === 0 ? (
                  <></>
                ) : (
                  <div>
                    <p className="mb-0">{value.assignment[0].shiftName}</p>
                    <p className="m-auto"> {value.assignment[0].startCC + ' - ' + value.assignment[0].endCC}</p>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={classNames(backgroundColorHover(value), 'd-flex justify-content-center', 'align-items-center')}
                role={value.assignment.length > 0 ? 'button' : 'layout'}
                onClick={(e) => {
                  if (dateCol.includes(column.name)) {
                    let numOfAssignment = value.assignment.length;
                    if (numOfAssignment === 1)
                      setCell({ ...cell, rowId: row.id, columnName: column.name, isOpen: !cell.isOpen, assignment: value.assignment[0] });
                    else if (numOfAssignment >= 1) {
                      setIsOpenAssignmentsDialog(true);
                      setCell({ ...cell, rowId: row.id, date: value.date });
                    }
                  }
                }}
                style={{
                  verticalAlign: 'inherit',
                  borderColor: borderColor(value),
                  borderStyle: 'solid',
                  //height: '100%',
                  borderRadius: '5px',
                  borderWidth: '2px',
                  backgroundColor: backgroundColor(value),
                  height: 75,
                }}
              >
                {value.assignment.length > 1 ? (
                  <div>
                    <p className="mb-0">{value.assignment.length + ' Ca'}</p>
                    <div>
                      {value.assignment.map((assignment, idx) => (
                        <Lens
                          key={assignment.shiftCode}
                          className="mr-1"
                          style={{ color: assignment.point > 0 ? dotColor(assignment) : COLORS.ERROR, height: '10px', width: '10px' }}
                        />
                      ))}
                    </div>
                  </div>
                ) : value.assignment.length === 0 ? (
                  <></>
                ) : (
                  <div>
                    <p className="mb-0">{value.assignment[0].shiftName}</p>
                    <p className="m-auto"> {value.assignment[0].startCC + ' - ' + value.assignment[0].endCC}</p>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="d-flex ml-4 align-items-center">
              <div />
              <Avatar alt="avatar" src={row.avatar} className="mr-3" />
              <Link
                to={`${ROUTE_PATH.PROFILE}/${row.id}`}
                onClick={() => {
                  dispatch(setTabName(PROFILE_TABS.SCHEDULER));
                }}
              >
                <div>
                  <div>{row.code}</div>
                </div>
                <div>
                  <div>{row.fullname}</div>
                </div>
              </Link>
            </div>
          )}
        </Table.Cell>
      </>
    );
  };
  return (
    <CContainer fluid className="c-main px-4 py-2">
      <div className="p-0 d-flex justify-content-center align-items-center">
        <Button onClick={handlePrev} style={{ height: '50%' }}>
          <NavigateBeforeIcon className="m-1" fontSize="large" />
        </Button>
        <div className="d-inline">
          <h2 className="d-flex justify-content-center">{t('label.roll_call_table')}</h2>
          <h5 className="d-flex justify-content-center">
            {t('label.from') + ': ' + state.fromDate.format('DD/MM/YYYY') + t('label.to') + ': ' + state.toDate.format('DD/MM/YYYY')}
          </h5>
        </div>
        <Button onClick={handleNext} style={{ height: '50%' }} disabled={state.today <= state.toDate}>
          <NavigateNextIcon className="m-1" fontSize="large" />
        </Button>
      </div>
      <QTable
        t={t}
        columnDef={columnDefOfRollUp.current}
        data={data}
        route={ROUTE_PATH.ROLL_UP + '/'}
        disableEditColum={true}
        headerDateCols={[2, 3, 4, 5, 6, 7, 8]}
        customTableCell={CustomTableCell}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableToolBar={true}
        paddingColumnHeader={true}
        disableFilter={true}
      />
    </CContainer>
  );
};

export default RollUp;
