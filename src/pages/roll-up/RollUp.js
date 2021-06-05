import { CContainer } from '@coreui/react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Avatar } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AssignmentsDialog from 'src/components/dialog/Assignments';
import RollUpInfo from 'src/components/dialog/RollUpInfo';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, PAGE_SIZES, PROFILE_TABS, ROUTE_PATH } from 'src/constants/key';
import { COLORS } from 'src/constants/theme';
import { fetchRollUpTable, setEmptyAssignments } from 'src/stores/actions/assignment';
import { fetchHolidays } from 'src/stores/actions/holiday';
import { setTabName } from 'src/stores/actions/profile';
import { backgroundColor, backgroundColorHover, borderColor, dotColor, renderIcon } from 'src/utils/colorOfCell';
import { isSameBeforeTypeDate } from 'src/utils/datetimeUtils';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) && JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const RollUp = ({ t, location }) => {
  let today = moment();
  const [fromDate, setFromDate] = useState(today.clone().startOf('week'));
  const dispatch = useDispatch();
  const data = useSelector((state) => state.assignment.assignments);
  const holidays = useSelector((state) => state.holiday.holidays);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
    columnDefFlag: false,
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

  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  const operatesText = [
    {
      id: FILTER_OPERATOR.LIKE,
      name: t('filter_operator.like'),
    },
    {
      id: FILTER_OPERATOR.START,
      name: t('filter_operator.start'),
    },
    {
      id: FILTER_OPERATOR.END,
      name: t('filter_operator.end'),
    },
    {
      id: FILTER_OPERATOR.EMPTY,
      name: t('filter_operator.empty'),
    },
    {
      id: FILTER_OPERATOR.NOT_EMPTY,
      name: t('filter_operator.not_empty'),
    },
  ];
  const filters = {
    code: {
      title: t('label.employee_code'),
      operates: operatesText,
      type: 'text',
    },
    suggestion: {
      title: t('label.employee_full_name'),
      operates: [
        {
          id: FILTER_OPERATOR.AUTOCOMPLETE,
          name: t('filter_operator.autocomplete'),
        },
      ],
      type: 'text',
    },
  };

  const changeColDef = (fromDate) => {
    return [
      { name: 'code', title: t('label.employee'), align: 'left', width: '16%', wordWrapEnabled: true },
      {
        name: 'sunday',
        title: [t('label.sunday'), fromDate.clone().startOf('week').format('DD/MM')],
        align: 'left',
        width: '12%',
        wordWrapEnabled: true,
        today: today.isSame(fromDate.clone().startOf('week'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(1, 'd'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(2, 'd'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(3, 'd'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(4, 'd'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(5, 'd'), 'day'),
        holiday: holidays.payload.find(
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
        today: today.isSame(fromDate.clone().startOf('week').add(6, 'd'), 'day'),
        holiday: holidays.payload.find(
          (e) =>
            isSameBeforeTypeDate(e.startDate.replace('Z', ''), fromDate.clone().endOf('week')) &&
            isSameBeforeTypeDate(fromDate.clone().endOf('week').format('YYYY-MM-DD'), e.endDate.replace('Z', '')),
        )
          ? true
          : false,
      },
    ];
  };

  let columnDefOfRollUp = useRef();
  columnDefOfRollUp.current = changeColDef(fromDate);
  useEffect(() => {
    columnDefOfRollUp.current = changeColDef(fromDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);
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
          from: fromDate,
          to: fromDate.clone().endOf('week'),
        },
        setLoading,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, paging.currentPage, paging.pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setEmptyAssignments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterFunction = (params) => {
    dispatch(
      fetchRollUpTable(
        {
          ...params,
          page: paging.currentPage,
          perpage: paging.pageSize,
          from: fromDate,
          to: fromDate.clone().endOf('week'),
        },
        setLoading,
      ),
    );
  };
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
            from: fromDate,
            to: fromDate.clone().endOf('week'),
          },
          setLoading,
        ),
      );
    };
    const isDay = value?.assignment;
    const handleClose = (isReload) => {
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
            backgroundColor: column.holiday ? COLORS.HOLIDAY_CELL : column.today ? COLORS.TODAY_BODY_CELL : isDay ? COLORS.FREE_DATE : COLORS.WHITE,
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
            <div
              className={classNames(
                backgroundColorHover(value),
                value.assignment.length > 1 ? 'd-flex justify-content-center align-items-center' : 'd-flex align-items-center',
              )}
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
                        style={{
                          color: dotColor(assignment),
                          height: '10px',
                          width: '10px',
                          textAlign: 'center',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : value.assignment.length === 0 ? (
                <></>
              ) : (
                <div className="m-2 p-0 row d-flex align-items-center" style={{ width: '90%' }}>
                  <div className="col-2 p-0">{renderIcon(value.assignment[0])}</div>
                  <div
                    className="col-10 pl-1"
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '80%', textAlign: 'left' }}
                  >
                    <p className="mb-0">{value.assignment[0].shiftName}</p>
                    <p className="m-auto"> {value.assignment[0].startCC + ' - ' + value.assignment[0].endCC}</p>
                  </div>
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
    <CContainer fluid className="c-main p-4 m-auto">
      <MemoizedQTable
        t={t}
        columnDef={columnDefOfRollUp.current}
        data={data?.payload ?? []}
        route={ROUTE_PATH.ROLL_UP + '/'}
        disableEditColum={true}
        headerDateCols={[2, 3, 4, 5, 6, 7, 8]}
        customTableCell={CustomTableCell}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableToolBar={true}
        paddingColumnHeader={true}
        filters={filters}
        filterFunction={filterFunction}
        fromDate={fromDate}
        setFromDate={setFromDate}
        pageSize={paging.pageSize}
        currentPage={paging.currentPage}
        // onTotalChange={onTotalChange}
        total={data?.total ?? 0}
      />
    </CContainer>
  );
};

export default RollUp;
