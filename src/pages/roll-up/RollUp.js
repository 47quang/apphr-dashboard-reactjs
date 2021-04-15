import { CContainer } from '@coreui/react';
import { Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import RollUpInfo from 'src/components/dialog/RollUpInfo';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import {} from 'src/stores/actions/rollUp';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import classNames from 'classnames';
import { COLORS } from 'src/constants/theme';
import { Cancel, CheckCircle, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from 'src/stores/actions/assignment';

const RollUp = ({ t, location }) => {
  const [state, setState] = useState({
    today: moment(),
    fromDate: moment().clone().startOf('week'),
    toDate: moment().clone().endOf('week'),
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.assignment.assignments);

  // let data = [
  //   {
  //     id: 1,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 0.8 },
  //       { startCC: '19:30', endCC: '21:00', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 0.8 },
  //     ],
  //     friday: [],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [],
  //   },
  //   {
  //     id: 3,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: false, value: 0 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     code: 'NV001',
  //     fullname: 'Nguyễn Văn An',
  //     monday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     tuesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     wednesday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     thursday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     friday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     saturday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //     sunday: [
  //       { startCC: '08:30', endCC: '13:30', status: false, value: 0 },
  //       { startCC: '13:30', endCC: '17:30', status: true, value: 1 },
  //     ],
  //   },
  // ];

  const changeColDef = (fromDate) => [
    { name: 'code', title: t('label.employee_code'), align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '13%', wordWrapEnabled: true },
    {
      name: 'sunday',
      title: ['Chủ nhật', fromDate.clone().startOf('week').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      name: 'monday',
      title: ['Thứ hai', fromDate.clone().startOf('week').add(1, 'd').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      name: 'tuesday',
      title: ['Thứ ba', fromDate.clone().startOf('week').add(2, 'd').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      name: 'wednesday',
      title: ['Thứ tư', fromDate.clone().startOf('week').add(3, 'd').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      name: 'thursday',
      title: ['Thứ năm', fromDate.clone().startOf('week').add(4, 'd').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      name: 'friday',
      title: ['Thứ sáu', fromDate.clone().startOf('week').add(5, 'd').format('DD/MM')],
      align: 'left',
      width: '15%',
      wordWrapEnabled: true,
    },
    { name: 'saturday', title: ['Thứ bảy', fromDate.clone().endOf('week').format('DD/MM')], align: 'left', width: '15%', wordWrapEnabled: true },
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
      fetchAssignments({
        groupByProfile: true,
      }),
    );
    console.log(state.fromDate.format('DD/MM'));
    columnDefOfRollUp.current = changeColDef(state.fromDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fromDate]);

  const CustomTableCell = ({ value, row, column, children, className, ...restProps }) => {
    // console.log('value', value);
    // console.log('row', row);
    // console.log('column', column);
    // console.log('children', children);
    const [cell, setCell] = useState({
      rowId: '',
      columnName: '',
      isOpen: false,
    });

    const handleClose = () => {
      setCell({ ...cell, isOpen: false });
    };
    const dateCol = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return (
      <>
        <RollUpInfo t={t} isOpen={cell.isOpen} handleClose={handleClose} />
        <Table.Cell
          className={classNames(className, Array.isArray(value) ? 'p-1 border border-secondary' : 'ps-3')}
          {...restProps}
          row={row}
          column={column}
          children={children}
          style={{
            backgroundColor: Array.isArray(value)
              ? value.length > 0
                ? value.every((v) => v.status === false)
                  ? COLORS.FULLY_ABSENT_ROLL_CALL
                  : COLORS.FULLY_ROLL_CALL
                : COLORS.FREE_DATE
              : '',
          }}
        >
          {Array.isArray(value) ? (
            <div className={classNames(className, 'rounded  p-0')}>
              {value.length > 0 ? (
                value.map((val, idx) => {
                  return (
                    <div
                      className={classNames('row p-1 m-1', idx === value.length - 1 ? '' : 'border-bottom')}
                      role="button"
                      onClick={(e) => {
                        if (dateCol.includes(column.name))
                          setCell((prevState) => ({
                            ...prevState,
                            rowId: row.id,
                            columnName: column.name,
                            isOpen: true,
                          }));
                      }}
                    >
                      <div className="col-2 border-right p-0 m-0">
                        <p style={{ color: val.status > 0 ? COLORS.SUCCESS : COLORS.ERROR }}>{val.value}</p>
                      </div>
                      <div className="col-10">
                        {val.status ? (
                          <CheckCircle key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.SUCCESS }} />
                        ) : (
                          <Cancel key={row.id + column.name + idx} className="m-0 p-0" style={{ color: COLORS.ERROR }} role="layout" />
                        )}
                        <p className="d-inline"> {val.startCC + ' - ' + val.endCC}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center">
                  <Remove />
                </div>
              )}
            </div>
          ) : (
            value
          )}
        </Table.Cell>
      </>
    );
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="pb-2 d-flex justify-content-center">
        <Button onClick={handlePrev}>
          <NavigateBeforeIcon className="m-3" fontSize="large" />
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
      />
    </CContainer>
  );
};

export default RollUp;
