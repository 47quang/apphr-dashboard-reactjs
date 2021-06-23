import { Getter, Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { CustomPaging, DataTypeProvider, EditingState, IntegratedSelection, PagingState, SelectionState } from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
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
import { AccountBalanceWallet, AddCircle, CloudDownload, CloudUpload, MonetizationOn, Replay } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import classNames from 'classnames';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import { COLORS } from 'src/constants/theme';
import { resetPassword } from 'src/stores/actions/account';
import { exportAllWage, exportWage, exportProfiles, importProfiles } from 'src/stores/actions/profile';
import { createRollUp, updateRollUp } from 'src/stores/actions/rollUp';
import ExportProfiles from '../dialog/ExportProfiles';
import ExportWage from '../dialog/ExportWage';
import ImportProfiles from '../dialog/ImportProfiles';
import NewRollUp from '../dialog/NewRollUp';
import FilterTable from './FilterTable';
import NoteTable from './NoteTable';

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

const TableComponentBase = ({ classes, ...restProps }) => {
  return <Table.Table {...restProps} className={classes.tableStriped} />;
};

export const TableComponent = withStyles(styles, {
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
            title={t('title.export_all_salary')}
            onClick={() => {
              setOpenExportEmployeeSalary(true);
            }}
            style={{ width: 35, height: 35 }}
          >
            <AccountBalanceWallet color={'primary'} />
          </IconButton>
        }
      </Template>
    </Plugin>
  );
};
const ExportProfile = ({ t, disableExportProfile }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = (values) => {
    setIsOpen(false);
    dispatch(exportProfiles(values));
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Plugin name="ExportProfile" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {disableExportProfile && isOpen && <ExportProfiles isOpen={isOpen} t={t} handleCancel={handleCancel} handleConfirm={handleConfirm} />}
        {
          <IconButton
            hidden={!disableExportProfile}
            className="py-0 px-2"
            title={t('title.export_profile')}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{ width: 35, height: 35 }}
          >
            <CloudDownload color={'primary'} />
          </IconButton>
        }
      </Template>
    </Plugin>
  );
};

const ImportProfile = ({ t, disableImportProfile }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = (values) => {
    setIsOpen(false);
    dispatch(importProfiles(values));
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Plugin name="ImportProfile" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {disableImportProfile && isOpen && <ImportProfiles isOpen={isOpen} t={t} handleCancel={handleCancel} handleConfirm={handleConfirm} />}
        {
          <IconButton
            hidden={!disableImportProfile}
            className="py-0 px-2"
            title={t('title.import_profile')}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{ width: 35, height: 35 }}
          >
            <CloudUpload color={'primary'} />
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

const Label = ({ column, className, ...restProps }) => {
  restProps.draggingEnabled = false;
  const getBackgroundColor = (col) => {
    if (col.holiday) return COLORS.HOLIDAY_HEADER;
    else {
      if (col.today) return COLORS.TODAY_HEADER_CELL;
      else return '';
    }
  };
  const getBorderRightColor = (col) => {
    if (col.holiday) return COLORS.HOLIDAY_HEADER;
    else {
      if (col.today) return COLORS.TODAY_HEADER_CELL;
      else return 'white';
    }
  };
  return Array.isArray(column.title) ? (
    <TableHeaderRow.Cell
      className={classNames(className)}
      {...restProps}
      style={{
        backgroundColor: getBackgroundColor(column),
        borderStyle: 'solid',
        borderLeftColor: '#D8DBE0',
        borderTopColor: '#D8DBE0',
        borderRightColor: getBorderRightColor(column),
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
      {...restProps}
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
    fromDate,
    setFromDate,
    pageSize,
    currentPage,
    total,
    disableExportProfile,
    disableImportProfile,
  } = props;
  let dateColumns = Array.isArray(dateCols) ? dateCols.map((idx) => columnDef[idx].name) : [''];
  let multiValuesColumns = Array.isArray(multiValuesCols) ? multiValuesCols.map((idx) => columnDef[idx].name) : [''];
  let linkColumns = Array.isArray(linkCols) ? linkCols.map((val) => val.name) : [''];
  const [state, setState] = useState({
    selection: [],
    editingRowIds: [],
  });
  const [rowChanges, setRowChanges] = useState({});
  const [columnOrder, setColumnOrder] = useState(columnDef.map((col) => col.name));

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
    const getPath = (model, modelId) => {
      switch (model) {
        case 'leave-form': {
          return '/proposal/leave/' + modelId;
        }
        case 'remote-form': {
          return '/proposal/remote/' + modelId;
        }
        case 'overtime-form': {
          return '/proposal/overtime/' + modelId;
        }
        case 'branch': {
          return '/setting/branch/' + modelId;
        }
        case 'department': {
          return '/setting/department/' + modelId;
        }
        case 'position': {
          return '/setting/position/' + modelId;
        }
        case 'shift': {
          return '/setting/shift/' + modelId;
        }
        case 'holiday': {
          return '/setting/holiday/' + modelId;
        }
        case 'role': {
          return '/setting/role/' + modelId;
        }
        case 'type-article': {
          return '/setting/articleType/' + modelId;
        }
        case 'attribute': {
          return '/setting/attribute/' + modelId;
        }
        case 'wage': {
          return '/setting/wage/' + modelId;
        }
        case 'allowance': {
          return '/setting/allowance/' + modelId;
        }
        case 'user': {
          return '/account/' + modelId;
        }
        case 'contract': {
          return '/contract/' + modelId;
        }
        case 'wage-history': {
          return '/benefit/' + modelId;
        }
        case 'payment': {
          return '/setting/taxDefine/' + modelId;
        }
        case 'article': {
          return '/notification/' + modelId;
        }
        default: {
          break;
        }
      }
    };
    if (value) {
      if (col.route) return <Link to={`${col.route}${row[col.id]}`}>{value}</Link>;
      else {
        if (row[col.id]) return <Link to={`${row[col.id]}`}>{value}</Link>;
        else {
          if (row?.model) return <Link to={`${getPath(row.model, row.modelId)}`}>{value}</Link>;
          return <p>{value}</p>;
        }
      }
    }
    return t('message.empty_table');
  };

  const LinkTypeProvider = (p) => <DataTypeProvider formatterComponent={LinkFormatter} {...p} />;

  const NoDataCellComponent = ({ getMessage, ...restProps }) => {
    //<CircularProgress className="loading-icon-mui" />
    return (
      <td className="text-center" colSpan={restProps.colSpan} style={{ height: 53 }}>
        {paging.loading ? <CircularProgress className="loading-icon-mui" /> : <big className="text-muted">{t('message.no_data')}</big>}
      </td>
    );
  };

  const TestComponent = ({ row, className, ...restProps }) => {
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
      dispatch(resetPassword(+row.id, t('message.successful_reset_password')));
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
            id: rollUp.id,
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
      <TableEditColumn.Cell className={classNames(className, isExportEmployeeSalary ? 'm-0 p-0' : '')} {...restProps}>
        {openEditing && (
          <NewRollUp isOpen={openEditing} handleConfirm={handleConfirmEditing} handleCancel={handleCancelEditing} t={t} startCC={rollUp?.startTime} />
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
            className=""
            hidden={disableEdit}
            title={t('message.edit_row')}
            onClick={() => {
              if (isPopUp) {
                setOpenEditing(!openEditing);
                setRollUp(row);
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
            title={t('title.export_wage_row')}
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
  const CellComponent = ({ className, style, ...restProps }) => {
    return <Table.Cell className={classNames(className, 'py-0')} {...restProps} style={{ ...style, height: 53 }}></Table.Cell>;
  };
  return (
    <div>
      <Paper>
        {disableFilter ? (
          <div />
        ) : (
          <div className="m-auto">
            <FilterTable
              t={t}
              filters={filters}
              filterFunction={filterFunction}
              isRollUpTable={route === '/roll-up/'}
              fromDate={fromDate}
              setFromDate={setFromDate}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        )}

        <Grid rows={data} columns={columnDef} getRowId={(row) => row.id}>
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
          {!notPaging && <CustomPaging totalCount={total} />}
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
              tableComponent={TableComponent}
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
          {disableToolBar ? (
            <div />
          ) : (
            <div>
              <ImportProfile t={t} disableImportProfile={disableImportProfile} />
            </div>
          )}
          {disableToolBar ? (
            <div />
          ) : (
            <div>
              <ExportProfile t={t} disableExportProfile={disableExportProfile} />
            </div>
          )}
          <TableEditRow />
          {!disableEditColum && <TableEditColumn cellComponent={TestComponent} />}
          <TableFixedColumns rightColumns={fixed ? [TableEditColumn.COLUMN_TYPE] : []} leftColumns={fixed ? ['code'] : []} />

          <Getter
            name="tableColumns"
            computed={({ tableColumns }) => {
              if (disableEditColum) return tableColumns;
              let editColumn = tableColumns.shift();
              return [...tableColumns, { ...editColumn, width: isExportEmployeeSalary || isResetPassWord ? '15%' : '10%' }];
            }}
          />

          <Getter
            name="tableHeaderColumnChains"
            computed={({ tableHeaderColumnChains }) => {
              if (!fixed) return tableHeaderColumnChains;
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
          <div className="d-flex justify-content-end">
            <NoteTable t={t} />
          </div>
        )}
      </Paper>
    </div>
  );
};
export default QTable;
