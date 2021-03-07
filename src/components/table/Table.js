// shortname, name, startCC, endCC, coefficient
import { CContainer } from '@coreui/react';
import {
  Getter,
  Plugin,
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  DataTypeProvider,
  EditingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const CustomTableEditColumn = () => (
  <Plugin>
    <Getter
      name="tableColumns"
      computed={({ tableColumns }) => {
        return tableColumns.concat(
          { key: 'edit', type: 'edit', width: 50 },
          { key: 'delete', type: 'delete', width: 50 }
        );
      }}
    />
    <Template
      name="tableCell"
      predicate={({ tableColumn, tableRow }) =>
        tableColumn.type === 'delete' && tableRow.type === Table.ROW_TYPE
      }
    >
      {(params) => (
        <TemplateConnector>
          {(getters, { deleteRows, commitDeletedRows }) => (
            <TableCell>
              <IconButton
                onClick={() => {
                  const rowIds = [params.tableRow.rowId];
                  deleteRows({ rowIds });
                  commitDeletedRows({ rowIds });
                }}
                title="Delete row"
              >
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
        tableColumn.type === 'delete' &&
        tableRow.type === TableHeaderRow.ROW_TYPE
      }
    >
      {(params) => (
        <TemplateConnector>
          {(getters, { deleteRows, addRow }) => <TableCell></TableCell>}
        </TemplateConnector>
      )}
    </Template>
    <Template
      name="tableCell"
      predicate={({ tableColumn, tableRow }) =>
        tableColumn.type === 'edit' && tableRow.type === Table.ROW_TYPE
      }
    >
      {(params) => (
        <TemplateConnector>
          {(getters, { startEditRows }) => (
            <TableCell>
              <Link to={`/setting/shift/${params.tableRow.rowId}`}>
                <IconButton onClick={() => {}}>
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


const styles = (theme) => ({
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

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes,
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      MenuProps={{
        className: classes.selectMenu,
      }}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableColumnValues.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const LookupEditCell = withStyles(styles, {
  name: 'ControlledModeDemo',
})(LookupEditCellBase);

const dateColumns = ['saleDate'];
const currencyColumns = ['amount'];

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

const QTable = (props) => {
  const { columnDef, data } = props;
  const [state, setState] = useState({
    columns: columnDef,
    rows: data,
    selection: [],
    currentPage: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    editingRowIds: [],
  });
  const [rowChanges, setRowChanges] = useState({});

  return (
    <>
      <CContainer fluid className="c-main mb-3">
        <div>
          <Paper>
            <Grid rows={state.rows} columns={state.columns} getRowId={(row) => row.id}>
              <DataTypeProvider for={dateColumns} />
              <DataTypeProvider for={currencyColumns} />
              <EditingState
                editingRowIds={state.editingRowIds}
                rowChanges={rowChanges}
                onRowChangesChange={setRowChanges}
                addedRows={[]}
              />
              <PagingState
                currentPage={state.currentPage}
                onCurrentPageChange={(PageNumber) =>
                  setState((prevState) => ({
                    ...prevState,
                    currentPage: PageNumber,
                  }))
                }
                pageSize={state.pageSize}
                onPageSizeChange={(newPageSize) =>
                  setState((prevState) => ({
                    ...prevState,
                    pageSize: newPageSize,
                  }))
                }
              />
              <SelectionState
                selection={state.selection}
                onSelectionChange={(selection) =>
                  setState((prevState) => ({
                    ...prevState,
                    selection: selection,
                  }))
                }
              />
              <IntegratedPaging />
              <IntegratedSelection />
              <SortingState
                defaultSorting={[
                  {
                    columnName: columnDef && columnDef[0].name,
                    direction: 'asc',
                  },
                ]}
              />
              <IntegratedSorting />
              <IntegratedFiltering
                columnExtensions={filteringColumnExtensions}
              />
              <Table />
              <TableHeaderRow showSortingControls />
              <CustomTableEditColumn />
              {/* <TableSelection showSelectAll /> */}
              <PagingPanel
                pageSizes={state.pageSizes}
              />
            </Grid>
          </Paper>
        </div>
      </CContainer>
    </>
  );
};
export default QTable;
