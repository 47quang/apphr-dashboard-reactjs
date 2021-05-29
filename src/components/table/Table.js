import { Getter, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { CustomPaging, DataTypeProvider, EditingState, IntegratedSelection, PagingState, SelectionState } from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableColumnVisibility,
  TableEditColumn,
  TableEditRow,
  TableFixedColumns,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { CircularProgress } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {
  AccountBalanceWallet,
  AddCircle,
  AlarmAdd,
  AttachMoney,
  BluetoothAudio,
  Cancel,
  CheckCircle,
  Gavel,
  Lens,
  MonetizationOn,
  MoneyOff,
  Replay,
  Schedule,
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import classNames from 'classnames';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { COLORS } from 'src/constants/theme';
import { FilterSchema } from 'src/schema/formSchema';
import { resetPassword } from 'src/stores/actions/account';
import { exportAllWage, exportWage } from 'src/stores/actions/profile';
import { createRollUp, updateRollUp } from 'src/stores/actions/rollUp';
import ExportWage from '../dialog/ExportWage';
import NewRollUp from '../dialog/NewRollUp';

/*
  Params:
    columnDef:  ,
    data: ,
    route: ,
    deleteRowFunc,
*/

const styles = (theme) => ({
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
  },
  customToolbar: {
    float: 'left',
    display: 'inline-flex',
  },
  MuiTableCell: {
    padding: 'none',
  },
});

const _styles = (theme) => ({
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
    },
  },
  customToolbar: {
    float: 'left',
    display: 'inline-flex',
  },
  MuiTableCell: {
    padding: 'none',
  },
});

const TableComponentBase = ({ classes, ...restProps }) => {
  return <Table.Table {...restProps} className={classes.tableStriped} />;
};

export const TableComponent = withStyles(styles, {
  name: 'TableComponent',
})(TableComponentBase);

export const _TableComponent = withStyles(_styles, {
  name: 'TableComponent',
})(TableComponentBase);

const ToolbarRootBase = ({ classes, className, ...restProps }) => {
  return <Toolbar.Root className={classNames(className, classes.customToolbar)} {...restProps} />;
};

const ToolbarRoot = withStyles(styles)(ToolbarRootBase);

const AddRowPanel = ({ t, route, disableCreate, isPopUp, rollUpData }) => {
  const dispatch = useDispatch();
  const disabledClass = disableCreate ? 'disabled' : 'primary';
  return (
    <Plugin name="AddRowPanel" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {isPopUp ? (
          <IconButton
            hidden={disableCreate}
            className="py-0 px-0"
            title={t('message.add')}
            onClick={() => {
              dispatch(
                createRollUp(
                  {
                    assignmentId: rollUpData.assignmentId,
                  },
                  rollUpData.setIsReload,
                  t('label.roll_up_success'),
                ),
              );
            }}
            style={{ width: 35, height: 35 }}
          >
            <AddCircle color={disabledClass} />
          </IconButton>
        ) : (
          <Link to={`${route}create`} className="px-0 py-0">
            <IconButton hidden={disableCreate} className="py-0 px-0" title={t('message.add')} style={{ width: 35, height: 35 }}>
              <AddCircle color={disabledClass} />
            </IconButton>
          </Link>
        )}
      </Template>
    </Plugin>
  );
};
const ExportAllSalaryPanel = ({ t, disableExportAllSalary }) => {
  const dispatch = useDispatch();
  const [openExportEmployeeSalary, setOpenExportEmployeeSalary] = useState(false);
  const handleConfirmExportSalary = (values) => {
    setOpenExportEmployeeSalary(false);
    dispatch(
      exportAllWage(
        { from: moment(values.month), to: moment(values.month).endOf('month'), filename: values.filename },
        t('message.successful_export'),
      ),
    );
  };
  const handleCancelExportSalary = () => {
    setOpenExportEmployeeSalary(false);
  };
  return (
    <Plugin name="ExportAllSalaryPanel" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {disableExportAllSalary && openExportEmployeeSalary && (
          <ExportWage isOpen={openExportEmployeeSalary} t={t} handleCancel={handleCancelExportSalary} handleConfirm={handleConfirmExportSalary} />
        )}
        {
          <IconButton
            hidden={!disableExportAllSalary}
            className="py-0 px-2"
            onClick={() => {
              setOpenExportEmployeeSalary(true);
            }}
          >
            <AccountBalanceWallet color={'primary'} />
          </IconButton>
        }
      </Template>
    </Plugin>
  );
};
const StubHeaderCellComponent = ({ column, className, ...props }) => {
  return (
    <Table.StubHeaderCell
      style={{
        width: 0,
      }}
    ></Table.StubHeaderCell>
  );
};
const Label = ({ column, className, ...props }) => {
  props.draggingEnabled = false;
  const rvComponent = Array.isArray(column.title) ? (
    <TableHeaderRow.Cell
      className={classNames(className)}
      {...props}
      style={{
        backgroundColor: column.today ? COLORS.TODAY_HEADER_CELL : column.holiday ? COLORS.HOLIDAY_HEADER : '',
        borderStyle: 'solid',
        borderLeftColor: '#D8DBE0',
        borderTopColor: '#D8DBE0',
        borderRightColor: column.today ? COLORS.TODAY_HEADER_CELL : column.holiday ? COLORS.HOLIDAY_HEADER : 'white',
        borderBottomColor: '#D8DBE0',
        borderWidth: 'thin',
      }}
    >
      <div>
        <p className="p-0 m-0 ml-1">{column.title[0] + ' - ' + column.title[1]}</p>
      </div>
    </TableHeaderRow.Cell>
  ) : (
    <TableHeaderRow.Cell
      className={classNames(className)}
      {...props}
      style={{
        borderStyle: 'solid',
        borderLeftColor: '#D8DBE0',
        borderTopColor: '#D8DBE0',
        borderRight: 'white',
        borderBottomColor: '#D8DBE0',
        borderWidth: 'thin',
      }}
    >
      <div>
        <p className="m-0 ml-1">{column.title}</p>
      </div>
    </TableHeaderRow.Cell>
  );
  return rvComponent;
};

const QTable = (props) => {
  const {
    t,
    columnDef,
    data,
    route,
    dateCols,
    multiValuesCols,
    linkCols,
    deleteRow,
    disableCreate,
    disableDelete,
    disableEdit,
    disableEditColum,
    disableToolBar,
    disableFilter,
    customTableCell,
    statusCols,
    paging,
    onCurrentPageChange,
    onPageSizeChange,
    isPopUp,
    rollUpData,
    editColumnWidth,
    paddingColumnHeader,
    notPaging,
    filters,
    filterFunction,
    fixed,
    statusComponent,
    isExportEmployeeSalary,
    disableExportAllSalary,
    isResetPassWord,
  } = props;

  let dateColumns = Array.isArray(dateCols) ? dateCols.map((idx) => columnDef[idx].name) : [''];
  let multiValuesColumns = Array.isArray(multiValuesCols) ? multiValuesCols.map((idx) => columnDef[idx].name) : [''];
  let linkColumns = Array.isArray(linkCols) ? linkCols.map((val) => val.name) : [''];

  const [state, setState] = useState({
    columns: columnDef,
    selection: [],
    editingRowIds: [],
    hiddenColumnNames: [],
  });

  const setHiddenColumnNames = (hiddenColumns) => {
    setState((preState) => ({
      ...preState,
      hiddenColumnNames: hiddenColumns,
    }));
  };
  const [rowChanges, setRowChanges] = useState({});

  const [columnOrder, setColumnOrder] = useState(columnDef.map((col) => col.name));

  useEffect(() => {
    setState((preState) => ({
      ...preState,
      columns: columnDef,
    }));
  }, [columnDef]);

  const tableColumnExtensions = columnDef
    ? columnDef.map((col, idx) => {
        return {
          columnName: col.name,
          align: col.align,
          width: col.width,
          wordWrapEnabled: col.wordWrapEnabled,
        };
      })
    : [];
  let columnsFilter = filters ? Object.keys(filters) : [];
  columnsFilter =
    columnsFilter && columnsFilter.length > 0
      ? columnsFilter.map((colName) => ({
          id: colName,
          name: filters[colName]?.title,
        }))
      : [];
  const filterValues = {
    rule: '',
    op: '',
    value: '',
    operates: [],
  };

  const DateFormatter = ({ value }) => (value ? value.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1') : '');

  const DateTypeProvider = (p) => <DataTypeProvider formatterComponent={DateFormatter} {...p} />;

  const MultiValuesFormatter = ({ value }) => {
    return value.map((val, idx) => (
      <Chip
        component="div"
        label={
          <section>
            <div className=""> {val.shift}</div>
          </section>
        }
        key={idx}
        className="mx-1 my-1 px-0 py-0"
        color="primary"
        variant="outlined"
      />
    ));
  };
  const MultiValuesTypeProvider = (p) => <DataTypeProvider formatterComponent={MultiValuesFormatter} {...p} />;

  const StatusFormatter = ({ value, column }) => {
    return statusComponent ? statusComponent(value, column.name) : <p>{value}</p>;
  };
  const StatusProvider = (p) => {
    return <DataTypeProvider formatterComponent={StatusFormatter} {...p} />;
  };

  const LinkFormatter = ({ row, value, column }) => {
    let col = linkCols.filter((x) => x.name === column.name)[0];
    if (value) {
      if (col.route) return <Link to={`${col.route}${row[col.id]}`}>{value}</Link>;
      else {
        if (row[col.id]) return <Link to={`${row[col.id]}`}>{value}</Link>;
        else return <p>{value}</p>;
      }
    }
    return t('message.empty_table');
  };

  const LinkTypeProvider = (p) => <DataTypeProvider formatterComponent={LinkFormatter} {...p} />;

  const NoDataCellComponent = ({ getMessage, ...restProps }) => {
    //<CircularProgress className="loading-icon-mui" />
    return (
      <td className="py-5 text-center" colSpan={restProps.colSpan}>
        {paging.loading ? <CircularProgress className="loading-icon-mui" /> : <big className="text-muted">{getMessage('noData')}</big>}
      </td>
    );
  };
  const [multiFilter, setMultiFilter] = useState([]);

  const updateMultiFilter = async (newFilter) => {
    return new Promise((resolve, reject) => {
      let isConsist = multiFilter.some((filter) => filter.rule === newFilter.rule);
      if (isConsist) {
        setMultiFilter(multiFilter.map((filter) => (filter.rule === newFilter.rule ? newFilter : filter)));
        resolve(multiFilter.map((filter) => (filter.rule === newFilter.rule ? newFilter : filter)));
      } else {
        setMultiFilter([...multiFilter, newFilter]);
        resolve([...multiFilter, newFilter]);
      }
    });
  };
  const deleteMultiFilter = async (idx) => {
    return new Promise((resolve, reject) => {
      multiFilter.splice(idx, 1);
      setMultiFilter([...multiFilter]);
      resolve([...multiFilter]);
    });
  };
  const handleDelete = async (idx) => {
    let newState = await deleteMultiFilter(idx);
    filterFunction({ filters: newState });
  };
  const TestComponent = ({ row, className, ...props }) => {
    // console.log('TestComponent', props);
    const [openWarning, setOpenWarning] = useState(false);
    const [openResetPassWordWarning, setOpenResetPassWordWarning] = useState(false);
    const [deletingRowID, setDeletingRowID] = useState(-1);
    const [openEditing, setOpenEditing] = useState(false);
    const [openExportEmployeeSalary, setOpenExportEmployeeSalary] = useState(false);
    const [rollUp, setRollUp] = useState(-1);
    const dispatch = useDispatch();
    const handleConfirmWarning = (e) => {
      if (Number.isInteger(deletingRowID)) {
        deleteRow(deletingRowID);
      }
      setOpenWarning(!openWarning);
    };
    const handleCancelWarning = () => {
      setOpenWarning(!openWarning);
    };
    const handleConfirmResetPassWord = (e) => {
      dispatch(resetPassword(+row.id));
      setOpenResetPassWordWarning(!openResetPassWordWarning);
    };
    const handleCancelResetPasswod = () => {
      setOpenResetPassWordWarning(!openResetPassWordWarning);
    };
    const handleConfirmEditing = (values) => {
      let endTime = values.endTime;
      endTime = rollUpData.date.split('T')[0] + 'T' + endTime;
      dispatch(
        updateRollUp(
          {
            endTime: new Date(endTime),
            id: rollUp.rowId,
          },
          rollUpData.assignmentId,
          rollUpData.setIsReload,
          t('message.successful_update'),
        ),
      );
      setOpenEditing(!openEditing);
    };
    const handleCancelEditing = () => {
      setOpenEditing(!openEditing);
    };
    const handleConfirmExportSalary = (values) => {
      setOpenExportEmployeeSalary(false);
      dispatch(
        exportWage(
          { from: moment(values.month), to: moment(values.month).endOf('month'), id: +row.id, filename: values.filename },
          t('message.successful_export'),
        ),
      );
    };
    const handleCancelExportSalary = () => {
      setOpenExportEmployeeSalary(false);
    };
    return (
      <TableEditColumn.Cell className={classNames(className, isExportEmployeeSalary ? 'm-0 p-0' : '')} {...props}>
        {openEditing && (
          <NewRollUp
            isOpen={openEditing}
            handleConfirm={handleConfirmEditing}
            handleCancel={handleCancelEditing}
            t={t}
            startCC={rollUp?.row?.startTime}
          />
        )}
        {openWarning && (
          <WarningAlertDialog
            isVisible={openWarning}
            title={t('title.delete_row')}
            titleConfirm={t('label.agree')}
            handleConfirm={handleConfirmWarning}
            titleCancel={t('label.decline')}
            handleCancel={handleCancelWarning}
            warningMessage={t('message.delete_warning_message')}
          />
        )}
        {openResetPassWordWarning && isResetPassWord && (
          <WarningAlertDialog
            isVisible={openResetPassWordWarning}
            title={t('title.reset_password')}
            titleConfirm={t('label.agree')}
            handleConfirm={handleConfirmResetPassWord}
            titleCancel={t('label.decline')}
            handleCancel={handleCancelResetPasswod}
            warningMessage={t('message.reset_password_warning_message')}
          />
        )}
        {isExportEmployeeSalary && openExportEmployeeSalary && (
          <ExportWage isOpen={openExportEmployeeSalary} t={t} handleCancel={handleCancelExportSalary} handleConfirm={handleConfirmExportSalary} />
        )}
        {isPopUp ? (
          <IconButton
            className="mx-2 my-0 p-0"
            hidden={disableEdit}
            title={t('message.edit_row')}
            onClick={() => {
              if (isPopUp) {
                setOpenEditing(!openEditing);
                setRollUp(row.id);
              }
            }}
            style={{ width: 35, height: 35 }}
          >
            <InfoIcon />
          </IconButton>
        ) : (
          <Link to={`${route}${row.id}`}>
            <IconButton className="mx-2 my-0 p-0" hidden={disableEdit} title={t('message.edit_row')} style={{ width: 35, height: 35 }}>
              <InfoIcon />
            </IconButton>
          </Link>
        )}

        <IconButton
          className="mx-2 my-0 p-0"
          hidden={disableDelete}
          onClick={() => {
            setDeletingRowID(row.id);
            setOpenWarning(!openWarning);
          }}
          title={t('message.delete_row')}
          style={{ width: 35, height: 35 }}
        >
          <DeleteIcon />
        </IconButton>
        {isExportEmployeeSalary && (
          <IconButton
            className="mx-2 my-0 p-0"
            onClick={() => {
              setOpenExportEmployeeSalary(true);
            }}
            title={t('message.delete_row')}
            style={{ width: 35, height: 35 }}
          >
            <MonetizationOn />
          </IconButton>
        )}
        {isResetPassWord && (
          <IconButton
            className="mx-2 my-0 p-0"
            onClick={() => {
              setOpenResetPassWordWarning(true);
            }}
            style={{ width: 35, height: 35 }}
            title={t('message.reset_password_row')}
          >
            <Replay />
          </IconButton>
        )}
      </TableEditColumn.Cell>
    );
  };
  const CellComponent = ({ className, style, ...props }) => {
    return <Table.Cell className={classNames(className, 'py-0')} {...props} style={{ ...style, height: 53 }}></Table.Cell>;
  };
  return (
    <div>
      <Paper>
        {disableFilter ? (
          <div />
        ) : (
          <div className="m-auto">
            <div className="rounded container col-md-12 pt-4 m-2">
              <Formik
                enableReinitialize
                initialValues={filterValues}
                validationSchema={FilterSchema}
                onSubmit={async ({ operates, ...values }) => {
                  let newState = await updateMultiFilter(values);
                  filterFunction({ filters: newState });
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, handleReset }) => (
                  <form autoComplete="off">
                    <div className="row">
                      <div className="row col-lg-11">
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.rule}
                          onBlur={handleBlur('rule')}
                          onChange={(e) => {
                            handleChange('rule')(e);
                            setFieldValue('op', '');
                            setFieldValue('operates', filters[e.target.value]?.operates);
                            setFieldValue('value', '');
                          }}
                          labelText={t('label.column_filter')}
                          selectClassName={'form-control'}
                          lstSelectOptions={columnsFilter}
                          placeholder={t('placeholder.select_column_filter')}
                          isRequiredField
                          isTouched={touched.rule}
                          isError={errors.rule && touched.rule}
                          errorMessage={t(errors.rule)}
                        />
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.op}
                          onBlur={handleBlur('op')}
                          onChange={handleChange('op')}
                          labelText={t('label.filter_option')}
                          placeholder={t('placeholder.select_filter_option')}
                          selectClassName={'form-control'}
                          lstSelectOptions={values.operates}
                          isRequiredField
                          isTouched={touched.op}
                          isError={errors.op && touched.op}
                          errorMessage={t(errors.op)}
                        />
                        {filters[values.rule]?.type === 'text' ? (
                          <CommonTextInput
                            containerClassName={'form-group col-lg-4'}
                            value={values.value}
                            onBlur={handleBlur('value')}
                            onChange={(e) => {
                              handleChange('value')(e);
                            }}
                            labelText={t('label.keyword')}
                            inputType={'text'}
                            placeholder={t('placeholder.enter_keyword')}
                            inputClassName={'form-control'}
                            isTouched={touched.value}
                            isDisable={['empty', 'not_empty'].includes(values.op)}
                            isError={errors.value && touched.value}
                            errorMessage={t(errors.value)}
                          />
                        ) : (
                          <CommonSelectInput
                            containerClassName={'form-group col-lg-4'}
                            value={values.value}
                            onBlur={handleBlur('value')}
                            onChange={(e) => {
                              handleChange('value')(e);
                            }}
                            labelText={t('label.filter_value')}
                            placeholder={t('placeholder.select_value')}
                            selectClassName={'form-control'}
                            lstSelectOptions={filters[values.rule]?.values ?? []}
                            isTouched={touched.value}
                            isError={errors.value && touched.value}
                            errorMessage={t(errors.value)}
                          />
                        )}
                      </div>
                      <div className="col-lg-1 d-flex align-items-start pt-4 mt-1">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => {
                            handleSubmit();
                          }}
                        >
                          {t('label.search')}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
              {multiFilter && multiFilter.length > 0 ? (
                multiFilter.map((filter, idx) => {
                  return (
                    <Chip
                      className="m-1 p-1"
                      key={`filter${idx}`}
                      label={
                        filters[filter.rule]?.title +
                        ': ' +
                        t(`filter_operator.${filter.op}`) +
                        (['empty', 'not_empty'].includes(filter.op)
                          ? ''
                          : ' "' + (filters[filter.rule]?.type === 'text' ? filter.value : t(`label.${filter.value}`)) + '"')
                      }
                      color="primary"
                      onDelete={handleDelete}
                      variant="outlined"
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        )}

        <Grid rows={data} columns={state.columns} getRowId={(row) => row.id}>
          <DateTypeProvider for={dateColumns} />
          <StatusProvider for={statusCols ?? []} />
          <MultiValuesTypeProvider for={multiValuesColumns} />
          <LinkTypeProvider for={linkColumns} />
          <EditingState editingRowIds={state.editingRowIds} rowChanges={rowChanges} onRowChangesChange={setRowChanges} addedRows={[]} />
          {!notPaging && (
            <PagingState
              currentPage={state.currentPage}
              onCurrentPageChange={(newPage) => onCurrentPageChange(newPage)}
              pageSize={paging.pageSize}
              onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
            />
          )}
          {!notPaging && <CustomPaging totalCount={paging.total} />}
          <SelectionState
            selection={state.selection}
            onSelectionChange={(selection) =>
              setState((prevState) => ({
                ...prevState,
                selection: selection,
              }))
            }
          />
          <IntegratedSelection />
          <DragDropProvider />
          {customTableCell ? (
            <Table
              key={route}
              columnExtensions={tableColumnExtensions}
              tableComponent={disableToolBar ? _TableComponent : TableComponent}
              cellComponent={customTableCell}
              noDataCellComponent={NoDataCellComponent}
              stubHeaderCellComponent={StubHeaderCellComponent}
            />
          ) : (
            <Table
              key={route}
              columnExtensions={tableColumnExtensions}
              tableComponent={TableComponent}
              cellComponent={CellComponent}
              noDataCellComponent={NoDataCellComponent}
            />
          )}
          <TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />
          {paddingColumnHeader ? <TableHeaderRow cellComponent={Label} /> : <TableHeaderRow />}
          <TableColumnVisibility defaultHiddenColumnNames={state.hiddenColumnNames} onHiddenColumnNamesChange={setHiddenColumnNames} />
          {/* <Toolbar rootComponent={ToolbarRoot} /> */}
          {disableToolBar ? (
            <div />
          ) : (
            <div>
              <Toolbar rootComponent={ToolbarRoot} />
            </div>
          )}
          {disableToolBar ? (
            <div />
          ) : (
            <div>
              <AddRowPanel route={route} disableCreate={disableCreate} isPopUp={isPopUp} t={t} rollUpData={rollUpData} />
            </div>
          )}
          {disableToolBar ? (
            <div />
          ) : (
            <div>
              <ExportAllSalaryPanel t={t} disableExportAllSalary={disableExportAllSalary} />
            </div>
          )}
          <TableEditRow />
          {!disableEditColum && <TableEditColumn cellComponent={TestComponent} />}
          <TableFixedColumns rightColumns={fixed ? [TableEditColumn.COLUMN_TYPE] : []} leftColumns={fixed ? ['code'] : []} />

          <Getter
            name="tableColumns"
            computed={({ tableColumns }) => {
              // console.log('tableColumns', tableColumns);
              if (disableEditColum) return tableColumns;
              let editColumn = tableColumns.shift();
              //return tableColumns;
              // console.log(editColumn);
              return [...tableColumns, { ...editColumn, width: isExportEmployeeSalary || isResetPassWord ? '15%' : '10%' }];
            }}
          />

          <Getter
            name="tableHeaderColumnChains"
            computed={({ tableHeaderColumnChains }) => {
              if (!fixed) return tableHeaderColumnChains;
              // console.log('tableHeaderColumnChainstableHeaderColumnChains', tableHeaderColumnChains);
              tableHeaderColumnChains =
                tableHeaderColumnChains && tableHeaderColumnChains.length > 0
                  ? tableHeaderColumnChains.map((ele) => {
                      ele.push({
                        columns: [
                          {
                            width: editColumnWidth
                              ? editColumnWidth
                              : !disableEditColum
                              ? !disableDelete
                                ? !disableEdit
                                  ? '10%'
                                  : '5%'
                                : '5%'
                              : '0%',
                            key: 'Symbol(editCommand)',
                            type: 'Symbol(editCommand)',
                            fixed: 'right',
                          },
                        ],
                        start: columnDef.length,
                        fixed: 'right',
                      });
                      return ele;
                    })
                  : undefined;
              return tableHeaderColumnChains;
            }}
          />

          {!notPaging && <PagingPanel pageSizes={paging.pageSizes} />}
        </Grid>

        {route === '/roll-up/' && (
          <div className="p-0">
            <div className="row m-2">
              <div className="col-2">
                <Lens className="mr-2 mb-2" style={{ color: COLORS.HOLIDAY_CELL }} />
                <p className="d-inline">{t('label.holiday')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2 mb-2" style={{ color: COLORS.TODAY_BODY_CELL }} />
                <p className="d-inline">{t('label.today')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_REQUEST }} />
                <p className="d-inline">{t('label.request')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_NORMAL }} />
                <p className="d-inline">{t('label.normal_assignment')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_COLOR_MANY_ASSIGNMENT }} />
                <p className="d-inline">{t('label.many_assignments')}</p>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-2">
                <AttachMoney className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.leave_pay_req')}</p>
              </div>
              <div className="col-2">
                <MoneyOff className="mr-2 mb-2" style={{ color: COLORS.ERROR }} />
                <p className="d-inline">{t('label.leave_no_pay_req')}</p>
              </div>
              <div className="col-2">
                <Gavel className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.leave_policy_req')}</p>
              </div>
              <div className="col-2">
                <BluetoothAudio className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.remote_req')}</p>
              </div>
              <div className="col-2">
                <AlarmAdd className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.overtime_req')}</p>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-2">
                <CheckCircle className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.success_roll_call')}</p>
              </div>
              <div className="col-2">
                <Schedule className="mr-2 mb-2" style={{ color: COLORS.LATE }} />
                <p className="d-inline">{t('label.late_roll_call')}</p>
              </div>
              <div className="col-4">
                <Cancel className="mr-2 mb-2" style={{ color: COLORS.ERROR }} />
                <p className="d-inline">{t('label.error_roll_call')}</p>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
};
export default QTable;
