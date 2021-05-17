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
import RollUpInfo from 'src/components/dialog/RollUpInfo';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES, PROFILE_TABS, ROUTE_PATH } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import { fetchRollUpTable, setEmptyAssignments } from 'src/stores/actions/assignment';
import { fetchHolidays } from 'src/stores/actions/holiday';
import { setTabName } from 'src/stores/actions/profile';
import {} from 'src/stores/actions/rollUp';
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
      title: ['Chủ nhật', fromDate.clone().startOf('week').format('DD/MM')],
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
      title: ['Thứ hai', fromDate.clone().startOf('week').add(1, 'd').format('DD/MM')],
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
      title: ['Thứ ba', fromDate.clone().startOf('week').add(2, 'd').format('DD/MM')],
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
      title: ['Thứ tư', fromDate.clone().startOf('week').add(3, 'd').format('DD/MM')],
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
      title: ['Thứ năm', fromDate.clone().startOf('week').add(4, 'd').format('DD/MM')],
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
      title: ['Thứ sáu', fromDate.clone().startOf('week').add(5, 'd').format('DD/MM')],
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
      title: ['Thứ bảy', fromDate.clone().endOf('week').format('DD/MM')],
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

  // const CustomTableCell = ({ value, row, column, children, className, ...restProps }) => {
  //   const [cell, setCell] = useState({
  //     rowId: '',
  //     columnName: '',
  //     isOpen: false,
  //     assignment: {},
  //   });
  //   const reloadTable = () => {
  //     dispatch(
  //       fetchRollUpTable(
  //         {
  //           page: paging.currentPage,
  //           perpage: paging.pageSize,
  //           from: state.fromDate,
  //           to: state.toDate,
  //         },
  //         onTotalChange,
  //       ),
  //     );
  //   };
  //   const isDay = value?.assignment;
  //   const handleClose = (isReload) => {
  //     setCell({ ...cell, isOpen: !cell.isOpen });
  //     if (isReload) reloadTable();
  //   };
  //   const dateCol = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  //   const statusIcon = (status, point, idx) => {
  //     if (status === 'leave_pay' || status === 'leave_policy')
  //       return <AttachMoney key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.SUCCESS }} />;
  //     else if (status === 'leave_no_pay') return <MoneyOff key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.ERROR }} />;
  //     else {
  //       if (point !== 0) return <CheckCircle key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.SUCCESS }} />;
  //       else return <Cancel key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.ERROR }} role="layout" />;
  //     }
  //   };
  //   const backgroundColor = (status) => {
  //     if (status === 'normal') return '';
  //     else if (status === 'overtime') return COLORS.OVERTIME;
  //     else if (status === 'remote') return COLORS.REMOTE;
  //     else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
  //     else if (status.includes('leave')) return COLORS.LEAVE;
  //   };
  //   const backgroundColorHover = (status) => {
  //     if (status === 'overtime') return 'assignment-overtime';
  //     else if (status === 'remote') return 'assignment-remote';
  //     else if (status === 'remote_overtime') return 'assignment-remote-overtime';
  //     else if (status.includes('leave')) return 'assignment-leave';
  //     else return 'assignment-normal';
  //   };
  //   return (
  //     <>
  //       {cell.isOpen && (
  //         <RollUpInfo
  //           t={t}
  //           isOpen={cell.isOpen}
  //           handleClose={handleClose}
  //           assignment={cell.assignment}
  //           profileCode={row.code}
  //           fullName={row.fullname}
  //           profileId={row.id}
  //           avatar={row.avatar}
  //           reloadTable={reloadTable}
  //         />
  //       )}
  //       <Table.Cell
  //         className={classNames(className, 'm-auto')}
  //         row={row}
  //         column={column}
  //         children={children}
  //         tableColumn={restProps.tableColumn}
  //         tableRow={restProps.tableRow}
  //         style={{
  //           backgroundColor: column.holiday
  //             ? COLORS.HOLIDAY_CELL
  //             : isDay
  //             ? value.future
  //               ? COLORS.FREE_DATE
  //               : value.assignment.length > 0
  //               ? value.assignment.every((v) => v.point === 0)
  //                 ? COLORS.WHITE //FULLY_ABSENT_ROLL_CALL
  //                 : COLORS.WHITE //FULLY_ROLL_CALL
  //               : COLORS.FREE_DATE
  //             : COLORS.WHITE,
  //           verticalAlign: 'inherit',
  //           padding: '8px',
  //           borderColor: 'white',
  //           borderStyle: 'solid',
  //           borderLeftColor: '#D8DBE0',
  //           borderBottomColor: '#D8DBE0',
  //           borderRightColor: column.name === 'saturday' ? '#D8DBE0' : 'white',
  //           borderWidth: 'thin',
  //           ...restProps.style,
  //         }}
  //       >
  //         {isDay ? (
  //           <div className={classNames(className, 'rounded')}>
  //             {value.assignment.length > 0 &&
  //               value.assignment.map((val, idx) => {
  //                 return (
  //                   <div
  //                     key={idx + val.shiftCode}
  //                     role="button"
  //                     onClick={(e) => {
  //                       if (dateCol.includes(column.name))
  //                         setCell({ ...cell, rowId: row.id, columnName: column.name, isOpen: !cell.isOpen, assignment: val });
  //                     }}
  //                     style={{ backgroundColor: backgroundColor(val.status), borderRadius: '9px' }}
  //                     className={classNames('row p-1 m-1 ' + backgroundColorHover(val.status))}
  //                   >
  //                     {value.future ? (
  //                       val.status !== 'normal' ? (
  //                         <>
  //                           <div className="col-2 p-0 m-auto">
  //                             {val.status.includes('leave') && (
  //                               <p style={{ color: val.point > 0 ? COLORS.SUCCESS : COLORS.ERROR, margin: 'auto' }}>{val.point}</p>
  //                             )}
  //                           </div>
  //                           <div className="col-2  p-0 m-auto">{val.status.includes('leave') ? statusIcon(val.status, val.point, idx) : ''}</div>
  //                           <div className="col-8  p-0 m-auto">
  //                             <p className="m-auto"> {val.startCC + ' - ' + val.endCC}</p>
  //                           </div>
  //                         </>
  //                       ) : (
  //                         <>
  //                           <div className="col-2 p-0 m-auto"></div>
  //                           <div className="col-2  p-0 m-auto"></div>
  //                           <div className="col-8  p-0 m-auto">
  //                             <p className="m-auto"> {val.startCC + ' - ' + val.endCC}</p>
  //                           </div>
  //                         </>
  //                       )
  //                     ) : (
  //                       <>
  //                         <div className="col-2 p-0 m-auto">
  //                           <p style={{ color: val.point > 0 ? COLORS.SUCCESS : COLORS.ERROR, margin: 'auto' }}>{val.point}</p>
  //                         </div>
  //                         <div className="col-2  p-0 m-auto">{statusIcon(val.status, val.point, idx)}</div>
  //                         <div className="col-8  p-0 m-auto">
  //                           <p className="m-auto"> {val.startCC + ' - ' + val.endCC}</p>
  //                         </div>
  //                       </>
  //                     )}
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         ) : (
  //           <div className="d-flex ml-4 align-items-center">
  //             <div />
  //             <Avatar alt="avatar" src={row.avatar} className="mr-3" />
  //             <Link
  //               to={`${ROUTE_PATH.PROFILE}/${row.id}`}
  //               onClick={() => {
  //                 dispatch(setTabName(PROFILE_TABS.SCHEDULER));
  //               }}
  //             >
  //               <div>
  //                 <div>{row.code}</div>
  //               </div>
  //               <div>
  //                 <div>{row.fullname}</div>
  //               </div>
  //             </Link>
  //           </div>
  //         )}
  //       </Table.Cell>
  //     </>
  //   );
  // };
  const CustomTableCell = ({ value, row, column, children, className, ...restProps }) => {
    // console.log('value', value);
    const [cell, setCell] = useState({
      rowId: '',
      columnName: '',
      isOpen: false,
      assignment: {},
    });
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
      setCell({ ...cell, isOpen: !cell.isOpen });
      if (isReload) reloadTable();
    };
    //const dateCol = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    const backgroundColor = (value) => {
      let numOfAssignment = value.assignment.length;
      if (numOfAssignment === 0) return COLORS.FREE_DATE;
      else if (numOfAssignment > 1) return COLORS.BACKGROUND_COLOR_MANY_ASSIGNMENT;
      else {
        let status = value.assignment[0].status;
        if (status === 'normal') {
          let point = value.assignment[0].point;
          if (point === 0) return COLORS.BACKGROUND_ABSENT_ROLL_CALL;
          else if (point === 1) return COLORS.BACKGROUND_SUCCESS_ROLL_CALL;
          else return COLORS.BACKGROUND_LATE_ROLL_CALL;
        } else if (status === 'overtime') return COLORS.OVERTIME;
        else if (status === 'remote') return COLORS.REMOTE;
        else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
        else if (status === 'leave_no_pay') return COLORS.BACKGROUND_LEAVE_NO_PAY;
        else if (status === 'leave_pay') return COLORS.BACKGROUND_LEAVE_PAY;
        else if (status === 'leave_policy') return COLORS.BACKGROUND_LEAVE_POLICY;
      }
    };
    const dotColor = (value) => {
      let status = value.status;
      if (status === 'normal') {
        let point = value.point;
        if (point === 0) return COLORS.ERROR;
        else if (point === 1) return COLORS.BORDER_SUCCESS_ROLL_CALL;
        else return COLORS.BORDER_LATE_ROLL_CALL;
      } else if (status === 'overtime') return COLORS.OVERTIME;
      else if (status === 'remote') return COLORS.REMOTE;
      else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
      else if (status === 'leave_no_pay') return COLORS.BORDER_LEAVE_NO_PAY;
      else if (status === 'leave_pay') return COLORS.BORDER_LEAVE_PAY;
      else if (status === 'leave_policy') return COLORS.BORDER_LEAVE_POLICY;
      else return COLORS.ERROR;
    };
    const borderColor = (value) => {
      let numOfAssignment = value.assignment.length;
      if (numOfAssignment === 0) return COLORS.FREE_DATE;
      else if (numOfAssignment > 1) return COLORS.MANY_ASSIGNMENT;
      else {
        let status = value.assignment[0].status;
        if (status === 'normal') {
          let point = value.assignment[0].point;
          if (point === 0) return COLORS.ERROR;
          else if (point === 1) return COLORS.BORDER_SUCCESS_ROLL_CALL;
          else return COLORS.BORDER_LATE_ROLL_CALL;
        } else if (status === 'overtime') return COLORS.BORDER_OVERTIME;
        else if (status === 'remote') return COLORS.REMOTE;
        else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
        else if (status === 'leave_no_pay') return COLORS.BORDER_LEAVE_NO_PAY;
        else if (status === 'leave_pay') return COLORS.BORDER_LEAVE_PAY;
        else if (status === 'leave_policy') return COLORS.BORDER_LEAVE_POLICY;
      }
    };
    const backgroundColorHover = (value) => {
      let numOfAssignment = value.assignment.length;
      if (numOfAssignment === 1) return 'assignment-overtime';
      else return '';
    };
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
        <Table.Cell
          className={classNames(className, 'm-0 p-0')}
          row={row}
          column={column}
          children={children}
          tableColumn={restProps.tableColumn}
          tableRow={restProps.tableRow}
          style={{
            verticalAlign: 'inherit',
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 'thin',
            height: 75,
            ...restProps.style,
          }}
        >
          {isDay ? (
            <div
              className={classNames(backgroundColorHover(value), 'd-flex justify-content-center', 'align-items-center')}
              style={{
                verticalAlign: 'inherit',
                borderColor: borderColor(value),
                borderStyle: 'solid',
                height: '100%',
                borderRadius: '5px',
                borderWidth: '2px',
                backgroundColor: backgroundColor(value),
              }}
            >
              {value.assignment.length > 1 ? (
                <div>
                  <p className="mb-0">{value.assignment.length + 'Ca'}</p>
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
