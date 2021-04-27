import { CContainer } from '@coreui/react';
import { Avatar, Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import RollUpInfo from 'src/components/dialog/RollUpInfo';
import QTable from 'src/components/table/Table';
import { PROFILE_TABS, ROUTE_PATH } from 'src/constants/key';
import {} from 'src/stores/actions/rollUp';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { COLORS } from 'src/constants/theme';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRollUpTable, setEmptyAssignments } from 'src/stores/actions/assignment';
import { Link } from 'react-router-dom';
import { setTabName } from 'src/stores/actions/profile';

const RollUp = ({ t, location }) => {
  const [state, setState] = useState({
    today: moment(),
    fromDate: moment().clone().startOf('week'),
    toDate: moment().clone().endOf('week'),
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.assignment.assignments);

  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
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

  const changeColDef = (fromDate) => [
    { name: 'code', title: t('label.employee'), align: 'left', width: '16%', wordWrapEnabled: true },
    {
      name: 'sunday',
      title: ['Chủ nhật', fromDate.clone().startOf('week').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    {
      name: 'monday',
      title: ['Thứ hai', fromDate.clone().startOf('week').add(1, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    {
      name: 'tuesday',
      title: ['Thứ ba', fromDate.clone().startOf('week').add(2, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    {
      name: 'wednesday',
      title: ['Thứ tư', fromDate.clone().startOf('week').add(3, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    {
      name: 'thursday',
      title: ['Thứ năm', fromDate.clone().startOf('week').add(4, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    {
      name: 'friday',
      title: ['Thứ sáu', fromDate.clone().startOf('week').add(5, 'd').format('DD/MM')],
      align: 'left',
      width: '12%',
      wordWrapEnabled: true,
    },
    { name: 'saturday', title: ['Thứ bảy', fromDate.clone().endOf('week').format('DD/MM')], align: 'left', width: '12%', wordWrapEnabled: true },
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
    columnDefOfRollUp.current = changeColDef(state.fromDate);
    return () => {
      dispatch(setEmptyAssignments());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromDate, paging.currentPage, paging.pageSize]);

  const CustomTableCell = ({ value, row, column, children, className, ...restProps }) => {
    // console.log('value', value);
    // console.log('row', row);
    // console.log('column', column);
    // console.log('children', children);
    const [cell, setCell] = useState({
      rowId: '',
      columnName: '',
      isOpen: false,
      assignment: {},
    });
    const isDay = value?.assignment;
    const handleClose = () => {
      setCell({ ...cell, isOpen: !cell.isOpen });
    };
    const dateCol = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return (
      <>
        {cell.isOpen ? (
          <RollUpInfo
            t={t}
            isOpen={cell.isOpen}
            handleClose={handleClose}
            assignment={cell.assignment}
            profileCode={row.code}
            fullName={row.fullname}
            profileId={row.id}
            avatar={row.avatar}
          />
        ) : (
          <></>
        )}
        <Table.Cell
          className={classNames(className, isDay ? 'm-auto' : '')}
          row={row}
          column={column}
          children={children}
          tableColumn={restProps.tableColumn}
          tableRow={restProps.tableRow}
          style={{
            backgroundColor: isDay
              ? value.future
                ? COLORS.FREE_DATE
                : value.assignment.length > 0
                ? value.assignment.every((v) => v.point === 0)
                  ? COLORS.FULLY_ABSENT_ROLL_CALL
                  : COLORS.FULLY_ROLL_CALL
                : COLORS.FREE_DATE
              : '',
            verticalAlign: 'text-top',
            padding: '8px',
            borderColor: 'white',
            borderStyle: 'solid',
            // borderLeftColor: '#D8DBE0',
            // borderTopColor: '#D8DBE0',
            borderWidth: 'thin',
            ...restProps.style,
          }}
        >
          {isDay ? (
            <div className={classNames(className, 'rounded')}>
              {value.assignment.length > 0 ? (
                value.assignment.map((val, idx) => {
                  return (
                    <div
                      key={idx + val.shiftCode}
                      className={classNames(
                        'row p-1 m-auto',
                        isDay
                          ? value.future
                            ? 'assignment-free'
                            : value.assignment.length > 0
                            ? value.assignment.every((v) => v.point === 0)
                              ? 'assignment-absent'
                              : 'assignment-fully'
                            : 'assignment-free'
                          : '',
                      )}
                      role="button"
                      onClick={(e) => {
                        if (dateCol.includes(column.name))
                          setCell({ ...cell, rowId: row.id, columnName: column.name, isOpen: !cell.isOpen, assignment: val });
                      }}
                    >
                      {value.future ? (
                        <div>
                          <p className="m-auto"> {val.startCC + ' - ' + val.endCC}</p>
                        </div>
                      ) : (
                        <>
                          <div className="col-2 p-0 m-auto">
                            <p style={{ color: val.point > 0 ? COLORS.SUCCESS : COLORS.ERROR, margin: 'auto' }}>{val.point}</p>
                          </div>
                          <div className="col-10  p-0 m-auto">
                            {val.status ? (
                              <CheckCircle key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.SUCCESS }} />
                            ) : (
                              <Cancel key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.ERROR }} role="layout" />
                            )}
                            <p className="d-inline"> {val.startCC + ' - ' + val.endCC}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center"></div>
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
  console.log(data);
  return (
    <CContainer fluid className="c-main px-4 py-2">
      <div className="p-0 d-flex justify-content-center">
        <Button onClick={handlePrev}>
          <NavigateBeforeIcon className="m-1" fontSize="large" />
        </Button>
        <div className="d-inline">
          <h2 className="d-flex justify-content-center">{t('label.roll_call_table')}</h2>
          <h5 className="d-flex justify-content-center">
            {t('label.from') + ': ' + state.fromDate.format('DD/MM/YYYY') + t('label.to') + ': ' + state.toDate.format('DD/MM/YYYY')}
          </h5>
        </div>
        <Button onClick={handleNext} disabled={state.today <= state.toDate}>
          <NavigateNextIcon className="m-3" fontSize="large" />
        </Button>
      </div>
      <QTable
        t={t}
        columnDef={columnDefOfRollUp.current}
        data={data}
        route={ROUTE_PATH.ROLL_UP + '/'}
        idxColumnsFilter={[0, 1]}
        disableEditColum={true}
        headerDateCols={[2, 3, 4, 5, 6, 7, 8]}
        customTableCell={CustomTableCell}
        paging={paging}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        disableToolBar={true}
      />
    </CContainer>
  );
};

export default RollUp;
