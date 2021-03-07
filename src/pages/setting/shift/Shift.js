// shortname, name, startCC, endCC, coefficient
import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  SearchState,
  ColumnChooser,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import { EditingState } from '@devexpress/dx-react-grid';
import { CContainer } from "@coreui/react";
import { TheHeader } from "src/layouts";
import { withStyles } from '@material-ui/core/styles';
import DateRange from '@material-ui/icons/DateRange';
import Input from '@material-ui/core/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';


const getRowId = row => row.id;

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
  },
  numericInput: {
    fontSize: '14px',
    textAlign: 'right',
    width: '100%',
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

const AddButton = () => (
  <div>
    <Link to={`/setting/shift/newShift`}>

      <button
        variant="contained"
        className="btn btn-primary"
        size="small"
        style={{ marginLeft: 5 }}
        onClick={(e) => {
          console.log(e.target);
        }}
      >
        Tạo mới
            </button>
    </Link>
  </div>
);
const EditButton = ({ row }) => (
  <div>
    <Link to={`/setting/shift/${row.id}`}>
      <IconButton title="Chỉnh sửa" onClick={() => {
        console.log(row);
      }}>
        <EditIcon />
      </IconButton>

    </Link>
  </div>
);

const DeleteButton = ({ row }) => (
  <IconButton onClick={() => {
    console.log(row);
  }} title="Delete row">
    <DeleteIcon />
  </IconButton>
);



const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
};
const Command = ({ id, onExecute }) => {
  console.log("aaaa", id);
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};



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
  const [columns] = useState([
    { name: 'shortname', title: 'Mã ca làm' },
    { name: 'name', title: 'Tên ca làm' },
    { name: 'startCC', title: 'Giờ Check-in' },
    { name: 'endCC', title: 'Giờ Check-out' },
    { name: 'coefficient', title: 'Hệ số giờ làm' },
  ]);
  const [rows, setRows] = useState([
    { id: 1, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 2, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 3, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 4, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 5, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 6, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },
    { id: 7, shortname: "SA1", name: "Ca sáng 1", startCC: "08:30", endCC: "14:30", coefficient: 1 },

  ]);
  const [selection, setSelection] = useState([]);
  const [editingColumnExtensions] = useState([
    {
      columnName: 'shortname',
      createRowChange: (row, value) => ({ user: { ...row.user, shortname: value } }),
    },
    {
      columnName: 'name',
      createRowChange: (row, value) => ({ user: { ...row.user, name: value } }),
    },
    {
      columnName: 'startCC',
      createRowChange: (row, value) => ({ car: { startCC: value } }),
    },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);

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
  const [searchValue, setSearchState] = useState('');
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'shortname', width: 200 },
    { columnName: 'name', width: 200 },
    { columnName: 'startCC', width: 200 },
    { columnName: 'endCC', width: 200 },
    { columnName: 'coefficient', width: 200 },
  ]);
  const [tableColumnExtensions] = useState([
  ]);
  const [hiddenColumnNames, setHiddenColumnNames] = useState([]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      console.log("ADD");
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      console.log("Edit");
      return <Redirect to="/setting/shift/1" />;
      //changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      console.log("Del");
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };


  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3">
        <div>
          <span>
            Total rows selected:
        {' '}
            {selection.length}
          </span>
          <Paper>
            <Grid
              rows={rows}
              columns={columns}
              getRowId={getRowId}
            >
              <SearchState
                value={searchValue}
                onValueChange={setSearchState}
              />
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
                columnExtensions={editingColumnExtensions}
                onCommitChanges={commitChanges}

              />
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
              <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
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
              />
              <TableColumnResizing
                columnWidths={columnWidths}
                onColumnWidthsChange={setColumnWidths}
              />
              <TableHeaderRow showSortingControls />

              <TableSelection showSelectAll />
              <TableEditRow />
              <TableEditColumn showAddCommand showEditCommand showDeleteCommand cellComponent={DeleteButton} />
              <TableFilterRow
                showFilterSelector
                iconComponent={FilterIcon}
                messages={{ month: 'Month equals' }}
              />
              <PagingPanel
                pageSizes={pageSizes}
              />
              <Toolbar />
              <SearchPanel />
            </Grid>
          </Paper>
        </div>

      </CContainer>
    </>
  );
};
export default Shifts;