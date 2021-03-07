// shortname, name, startCC, endCC, coefficient
import { CContainer } from "@coreui/react";
import {
  Getter, Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";
import {
  DataTypeProvider, EditingState, FilteringState,
  IntegratedFiltering, IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting, PagingState,
  SearchState, SelectionState,
  SortingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  SearchPanel, Table,
  TableColumnResizing, TableEditRow,
  TableFilterRow, TableHeaderRow,
  TableSelection,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import AddIcon from '@material-ui/icons/Add';
import DateRange from '@material-ui/icons/DateRange';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { TheHeader } from "src/layouts";

const CustomTableEditColumn = () => (
  <Plugin>
    {/* Adding 'edit' and 'delete' columns */}
    <Getter
      name="tableColumns"
      computed={({ tableColumns }) => {
        const result = tableColumns.slice();
        result.push({ key: "edit", type: "edit", width: 130 });
        result.push({ key: "delete", type: "delete", width: 130 });
        return result;
      }}
    />
    {/* Styling 'delete' column */}
    <Template
      name="tableCell"
      predicate={({ tableColumn, tableRow }) =>
        tableColumn.type === "delete" && tableRow.type === Table.ROW_TYPE
      }
    >
      {params => (
        <TemplateConnector>
          {(getters, { deleteRows, commitDeletedRows }) => (
            <TableCell>
              <IconButton
                onClick={() => {
                  const rowIds = [params.tableRow.rowId];
                  deleteRows({ rowIds });
                  commitDeletedRows({ rowIds });
                }}
                title="Delete row">
                <DeleteIcon />
              </IconButton>

            </TableCell>
          )}
        </TemplateConnector>
      )}
    </Template>
    <Template
      name="tableCell"
      predicate={({ tableColumn, tableRow }) =>
        tableColumn.type === "delete" &&
        tableRow.type === TableHeaderRow.ROW_TYPE
      }
    >
      {params => (
        <TemplateConnector>
          {(getters, { deleteRows, addRow }) => (
            <TableCell>
              <Link to={`/setting/shift/newShift`}>
                <IconButton
                  onClick={() => {
                    addRow();
                  }}
                >
                  <AddIcon color="primary" />
                </IconButton>

              </Link>
            </TableCell>
          )}
        </TemplateConnector>
      )}
    </Template>
    {/* Styling 'edit' column */}
    <Template
      name="tableCell"
      predicate={({ tableColumn, tableRow }) =>
        tableColumn.type === "edit" && tableRow.type === Table.ROW_TYPE
      }
    >
      {params => (
        <TemplateConnector>
          {(getters, { startEditRows }) => (
            <TableCell>
              <Link to={`/setting/shift/${params.tableRow.rowId}`}>
                <IconButton
                  onClick={() => {
                    const rowIds = [params.tableRow.rowId];
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Link>
            </TableCell>
          )}
        </TemplateConnector>
      )}
    </Template>
  </Plugin>
);

const tableMessages = {
  noData: 'Dữ liệu trống',
};
const filterRowMessages = {
  filterPlaceholder: 'Lọc...',
};
const pagingPanelMessages = {
  showAll: 'Tất cả',
  rowsPerPage: 'Số hàng trên một trang',
  info: 'Đạt',
};


const getRowId = row => row.id;

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const styles = theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
});

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Lọc...',
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);



const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      MenuProps={{
        className: classes.selectMenu,
      }}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
      )}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);






const Shifts = () => {
  const [state, setState] = useState({
    columns: [
      { name: 'shortname', title: 'Mã ca làm' },
      { name: 'name', title: 'Tên ca làm' },
      { name: 'startCC', title: 'Giờ Check-in' },
      { name: 'endCC', title: 'Giờ Check-out' },
      { name: 'coefficient', title: 'Hệ số giờ làm' },
    ],
    rows: [
      { id: 1, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 2, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 3, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 4, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 5, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 6, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
      { id: 7, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    ],
    selection: [],
    currentPage: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    columnWidths: [
      { columnName: 'shortname', width: 200 },
      { columnName: 'name', width: 200 },
      { columnName: 'startCC', width: 200 },
      { columnName: 'endCC', width: 200 },
      { columnName: 'coefficient', width: 200 },
    ],
    editingRowIds: [],

  });

  const [editingRowIds, getEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const [dateColumns] = useState(['saleDate']);
  const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
  const [currencyColumns] = useState(['amount']);
  const [currencyFilterOperations] = useState([
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ]);
  const [filteringColumnExtensions] = useState([
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
  ]);







  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3">
        <div>
          <span>
            Total rows selected:
        {' '}
            {state.selection.length}
          </span>
          <Paper>
            <Grid
              rows={state.rows}
              columns={state.columns}
              getRowId={getRowId}
            >

              <DataTypeProvider
                for={dateColumns}
                availableFilterOperations={dateFilterOperations}
              />
              <DataTypeProvider
                for={currencyColumns}
                availableFilterOperations={currencyFilterOperations}
                editorComponent={CurrencyEditor}
              />
              <EditingState
                editingRowIds={editingRowIds}
                onEditingRowIdsChange={getEditingRowIds}
                rowChanges={rowChanges}
                onRowChangesChange={setRowChanges}
                addedRows={addedRows}

              />
              <PagingState
                currentPage={state.currentPage}
                onCurrentPageChange={(PageNumber) => setState((prevState) => ({
                  ...prevState,
                  currentPage: PageNumber,
                }
                ))}
                pageSize={state.pageSize}
                onPageSizeChange={(newPageSize) => setState((prevState) => ({
                  ...prevState,
                  pageSize: newPageSize,
                }
                ))}
              />
              <SelectionState
                selection={state.selection}
                onSelectionChange={(selection) => setState((prevState) => ({
                  ...prevState,
                  selection: selection,
                }
                ))}
              />
              <IntegratedPaging />
              <IntegratedSelection />
              <SortingState
                defaultSorting={[{ columnName: 'shortname', direction: 'asc' }]}
              />
              <IntegratedSorting />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
              <Table
                messages={tableMessages}
              />
              <TableColumnResizing
                columnWidths={state.columnWidths}
                onColumnWidthsChange={(newColumnWidths) => setState((prevState) => ({
                  ...prevState,
                  columnWidths: newColumnWidths,
                }
                ))}
              />
              <TableHeaderRow showSortingControls />
              <CustomTableEditColumn />

              <TableSelection showSelectAll />
              <TableEditRow />

              <PagingPanel
                pageSizes={state.pageSizes}
                messages={pagingPanelMessages}
              />
              <Toolbar />
            </Grid>
          </Paper>
        </div>

      </CContainer>
    </>
  );
};
export default Shifts;