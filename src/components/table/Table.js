import { Getter, Plugin, Template, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  CustomPaging,
  DataTypeProvider,
  EditingState,
  IntegratedFiltering,
  IntegratedSelection,
  PagingState,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  ColumnChooser,
  DragDropProvider,
  ExportPanel,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableColumnVisibility,
  TableFixedColumns,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
// import { CircularProgress } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AttachMoney, Cancel, CheckCircle, Lens, MoneyOff } from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import classNames from 'classnames';
import saveAs from 'file-saver';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { COLORS } from 'src/constants/theme';
import { createRollUp, updateRollUp } from 'src/stores/actions/rollUp';
import NewRollUp from '../dialog/NewRollUp';

/*
  Params:
    columnDef:  ,
    data: ,
    route: ,
    idxColumnsFilter,
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

const TableComponentBase = ({ classes, ...restProps }) => <Table.Table {...restProps} className={classes.tableStriped} />;

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

const filteringColumnExtensions = [
  {
    columnName: 'saleDate',
    predicate: (value, filter, row) => {
      if (!filter.value.length) return true;
      if (filter && filter.operation === 'month') {
        const month = parseInt(value.split('-')[1], 10);
        return month === parseInt(filter.value, 10);
      }
      return IntegratedFiltering.defaultPredicate(value, filter, row);
    },
  },
];

const AddRowPanel = ({ t, route, disableCreate, isPopUp, rollUpData }) => {
  const dispatch = useDispatch();

  return (
    <Plugin name="AddRowPanel" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {
          <IconButton
            hidden={disableCreate}
            className="py-0 px-0"
            onClick={() => {
              if (isPopUp) {
                dispatch(
                  createRollUp(
                    {
                      assignmentId: rollUpData.assignmentId,
                    },
                    t('label.roll_up_success'),
                  ),
                );
              }
            }}
          >
            {isPopUp ? (
              <AddCircleOutlineIcon color={disableCreate ? 'disabled' : 'primary'} />
            ) : (
              <Link to={`${route}create`} className="px-0 py-0">
                <AddCircleOutlineIcon color={disableCreate ? 'disabled' : 'primary'} />
              </Link>
            )}
          </IconButton>
        }
      </Template>
    </Plugin>
  );
};
const Label = ({ column, className, ...props }) => {
  props.draggingEnabled = false;
  // console.log(column);
  const rvComponent = Array.isArray(column.title) ? (
    <TableHeaderRow.Cell
      className={classNames(className)}
      {...props}
      style={{
        backgroundColor: column.holiday ? COLORS.HOLIDAY_HEADER : '',
        borderStyle: 'solid',
        borderLeftColor: '#D8DBE0',
        borderTopColor: '#D8DBE0',
        borderRightColor: column.name === 'saturday' ? '#D8DBE0' : 'white',
        borderBottomColor: '#D8DBE0',
        borderWidth: 'thin',
      }}
    >
      <div>
        <p className="pl-2 m-0">{column.title[0]}</p>
        <p className="pl-2 m-0  d-flex justify-content-center">{column.title[1]}</p>
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
        <p className="pl-2 ml-3">{column.title}</p>
      </div>
    </TableHeaderRow.Cell>
  );
  return rvComponent;
};

const CustomTableEditColumn = ({ t, route, deleteRow, disableDelete, disableEdit, disableEditColum, isPopUp, editColumnWidth, rollUpData }) => {
  const [openWarning, setOpenWarning] = useState(false);
  const [deletingRowID, setDeletingRowID] = useState(-1);
  const [openEditing, setOpenEditing] = useState(false);
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
  const handleConfirmEditing = (values) => {
    let endTime = values.endTime;
    endTime = rollUpData.date.split('T')[0] + 'T' + endTime;
    console.log('rollUp', rollUp);
    dispatch(
      updateRollUp(
        {
          endTime: new Date(endTime),
          id: rollUp.rowId,
        },
        rollUpData.assignmentId,
        t('message.successful_update'),
      ),
    );
    setOpenEditing(!openEditing);
  };
  const handleCancelEditing = () => {
    setOpenEditing(!openEditing);
  };
  return (
    <Plugin>
      {openEditing ? (
        <NewRollUp
          isOpen={openEditing}
          handleConfirm={handleConfirmEditing}
          handleCancel={handleCancelEditing}
          t={t}
          startCC={rollUp?.row?.startTime}
        />
      ) : (
        <></>
      )}
      {openWarning ? (
        <WarningAlertDialog
          isVisible={openWarning}
          title={t('title.delete_row')}
          titleConfirm={t('label.agree')}
          handleConfirm={handleConfirmWarning}
          titleCancel={t('label.decline')}
          handleCancel={handleCancelWarning}
          warningMessage={t('message.delete_warning_message')}
        />
      ) : (
        <></>
      )}

      <Getter
        name="tableColumns"
        computed={({ tableColumns }) => {
          tableColumns = tableColumns.concat([
            {
              key: 'behavior' + route,
              type: 'behavior',
              width: editColumnWidth ? editColumnWidth : !disableEditColum ? (!disableDelete ? (!disableEdit ? '10%' : '5%') : '5%') : '0%',
              align: 'center',
            },
          ]);
          return tableColumns;
        }}
      />
      <Template
        name="tableCell"
        predicate={({ tableColumn, tableRow }) => tableColumn.type === 'behavior' && tableRow.type === Table.ROW_TYPE && !disableEditColum}
      >
        {(params) => {
          return (
            <TemplateConnector>
              {(getters, { deleteRows, commitDeletedRows }) => (
                <TableCell className="px-0 py-0">
                  <IconButton
                    className="mx-2"
                    hidden={disableEdit}
                    title={t('message.edit_row')}
                    onClick={() => {
                      if (isPopUp) {
                        setOpenEditing(!openEditing);
                        setRollUp(params.tableRow);
                        console.log(params.tableRow);
                      }
                    }}
                  >
                    {isPopUp ? (
                      <InfoIcon />
                    ) : (
                      <Link to={`${route}${params.tableRow.rowId}`}>
                        <InfoIcon />
                      </Link>
                    )}
                  </IconButton>

                  <IconButton
                    className="mx-2"
                    hidden={disableDelete}
                    onClick={() => {
                      setDeletingRowID(params.tableRow.rowId);
                      setOpenWarning(!openWarning);
                    }}
                    title={t('message.delete_row')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TemplateConnector>
          );
        }}
      </Template>
    </Plugin>
  );
};

const QTable = (props) => {
  const {
    t,
    columnDef,
    data,
    route,
    idxColumnsFilter,
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
  } = props;
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  let dateColumns = Array.isArray(dateCols) ? dateCols.map((idx) => columnDef[idx].name) : [''];
  let statusColumns = Array.isArray(statusCols) ? statusCols.map((idx) => columnDef[idx].name) : [''];
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
  // const colHeight = columnDef.length < 6 ? Math.floor((0.75 / (columnDef.length - 1)) * 100) : 15;
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

  const columnsFilter = idxColumnsFilter
    ? idxColumnsFilter.map((idx) => ({
        id: idx,
        name: columnDef[idx]?.title,
      }))
    : [];
  const filterTypes = [
    { id: 1, name: t('label.include') },
    { id: 2, name: t('label.not_include') },
    { id: 3, name: t('label.correct') },
  ];
  const filterValues = {
    columnsFilter: columnsFilter[0],
    filterTypes: filterTypes[0],
    textFilter: '',
  };
  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
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

  const StatusFormatter = ({ value }) => {
    return (
      <Chip
        label={value === 'approve' ? 'Đã phê duyệt' : value === 'reject' ? 'Đã từ chối' : 'Đang xữ lý'}
        className="mx-1 my-1 px-0 py-0"
        style={{
          backgroundColor: value === 'approve' ? COLORS.FULLY_ROLL_CALL : value === 'reject' ? COLORS.FULLY_ABSENT_ROLL_CALL : COLORS.FREE_DATE,
        }}
      />
    );
  };
  const StatusProvider = (p) => <DataTypeProvider formatterComponent={StatusFormatter} {...p} />;

  const LinkFormatter = ({ value, column }) =>
    value ? <Link to={`${linkCols.filter((x) => x.name === column.name)[0].route}${value}`}>{value}</Link> : t('message.empty_table');

  const LinkTypeProvider = (p) => <DataTypeProvider formatterComponent={LinkFormatter} {...p} />;
  return (
    <div>
      <Paper>
        {disableFilter ? (
          <div />
        ) : (
          <div className="m-auto">
            <div className="rounded container col-md-12 pt-4 m-2">
              <Formik enableReinitialize initialValues={filterValues}>
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <form autoComplete="off">
                    <div className="row">
                      <div className="row col-lg-11">
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.columnsFilter}
                          onBlur={handleBlur('columnsFilter')}
                          onChange={handleChange('columnsFilter')}
                          labelText={t('label.column_filter')}
                          selectClassName={'form-control'}
                          lstSelectOptions={columnsFilter}
                          placeholder={t('placeholder.select_column_filter')}
                        />
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.filterTypes}
                          onBlur={handleBlur('filterTypes')}
                          onChange={handleChange('filterTypes')}
                          labelText={t('label.filter_option')}
                          placeholder={t('placeholder.select_filter_option')}
                          selectClassName={'form-control'}
                          lstSelectOptions={filterTypes}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.textFilter}
                          onBlur={handleBlur('textFilter')}
                          onChange={handleChange('textFilter')}
                          labelText={t('label.keyword')}
                          inputType={'text'}
                          placeholder={t('placeholder.enter_keyword')}
                          inputClassName={'form-control'}
                        />
                      </div>
                      <div className="col-lg-1 d-flex align-items-end pb-3">
                        <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
                          {t('label.search')}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        )}

        <Grid rows={data} columns={state.columns} getRowId={(row) => row.id}>
          <DateTypeProvider for={dateColumns} />
          <StatusProvider for={statusColumns} />
          <MultiValuesTypeProvider for={multiValuesColumns} />
          <LinkTypeProvider for={linkColumns} />
          <EditingState editingRowIds={state.editingRowIds} rowChanges={rowChanges} onRowChangesChange={setRowChanges} addedRows={[]} />
          {!notPaging ? (
            <PagingState
              currentPage={state.currentPage}
              onCurrentPageChange={(newPage) => onCurrentPageChange(newPage)}
              pageSize={paging.pageSize}
              onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
            />
          ) : (
            <></>
          )}
          {!notPaging ? <CustomPaging totalCount={paging.total} /> : <></>}
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
          <SortingState
            defaultSorting={[
              {
                columnName: columnDef && columnDef[0].name,
                direction: 'asc',
              },
            ]}
          />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <DragDropProvider />
          {customTableCell ? (
            <Table
              key={route}
              columnExtensions={tableColumnExtensions}
              tableComponent={disableToolBar ? _TableComponent : TableComponent}
              cellComponent={customTableCell}
            />
          ) : (
            <Table key={route} columnExtensions={tableColumnExtensions} tableComponent={TableComponent} />
          )}
          <TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />
          {paddingColumnHeader ? <TableHeaderRow showSortingControls cellComponent={Label} /> : <TableHeaderRow showSortingControls />}
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
              <ExportPanel startExport={startExport} color={'primary'} />
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
              <ColumnChooser />
            </div>
          )}
          {/* <ExportPanel startExport={startExport} color={'primary'} />
          <AddRowPanel route={route} disableCreate={disableCreate} isPopUp={isPopUp} t={t} rollUpData={rollUpData} />
          <ColumnChooser /> */}
          <TableFixedColumns />
          <CustomTableEditColumn
            t={t}
            route={route}
            deleteRow={deleteRow}
            disableDelete={disableDelete}
            disableEdit={disableEdit}
            disableEditColum={disableEditColum}
            isPopUp={isPopUp}
            editColumnWidth={editColumnWidth}
            rollUpData={rollUpData}
          />
          {/* <TableSelection showSelectAll /> */}
          {!notPaging ? <PagingPanel pageSizes={paging.pageSizes} /> : <></>}
        </Grid>
        {/* {paging.loading && (
          <div className="loading-shading-mui">
            <CircularProgress className="loading-icon-mui" />
          </div>
        )} */}
        {disableToolBar ? <div /> : <GridExporter ref={exporterRef} rows={data} columns={state.columns} onSave={onSave} />}
        {route === '/roll-up/' ? (
          <div>
            <div className="row m-2">
              <div className="col-4">
                <Lens className="mr-2" style={{ color: COLORS.FREE_DATE }} />
                <p className="d-inline">{t('label.free_date')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2" style={{ color: COLORS.HOLIDAY_HEADER }} />
                <p className="d-inline">{t('label.holiday')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2" style={{ color: COLORS.REMOTE }} />
                <p className="d-inline">{t('label.remote_req')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2" style={{ color: COLORS.OVERTIME }} />
                <p className="d-inline">{t('label.overtime_req')}</p>
              </div>
              <div className="col-2">
                <Lens className="mr-2" style={{ color: COLORS.OVERTIME_REMOTE }} />
                <p className="d-inline">{t('label.overtime_remote_req')}</p>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-2"></div>
              <div className="col-2"></div>

              <div className="col-2">
                <AttachMoney className="mr-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.leave_pay_req')}</p>
              </div>
              <div className="col-2">
                <MoneyOff className="mr-2" style={{ color: COLORS.ERROR }} />
                <p className="d-inline">{t('label.leave_no_pay_req')}</p>
              </div>
              <div className="col-2">
                <CheckCircle className="mr-2" style={{ color: COLORS.SUCCESS }} />
                <p className="d-inline">{t('label.roll_up_success')}</p>
              </div>
              <div className="col-2">
                <Cancel className="mr-2" style={{ color: COLORS.ERROR }} />
                <p className="d-inline">{t('label.absent_roll_Call')}</p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Paper>
    </div>
  );
};
export default QTable;
