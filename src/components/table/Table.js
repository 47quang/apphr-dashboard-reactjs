import {
  Getter,
  Plugin,
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  DataTypeProvider,
  EditingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableColumnReordering,
  TableFixedColumns,
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
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog'
import CommonTextInput from "src/components/input/CommonTextInput";
import { Formik } from "formik";
import CommonSelectInput from "src/components/input/CommonSelectInput";



/*
  Params:
    columnDef:  ,
    data: ,
    route: ,
    idxColumnsFilter
*/

const CustomTableEditColumn = ({ route }) => {
  const [openWarning, setOpenWarning] = useState(false);
  let deletingRowID;
  const handleConfirm = (props) => {
    if (Number.isInteger(deletingRowID)) {
      // Call API Delete
    }
    setOpenWarning(!openWarning);
  }
  const handleCancel = () => {
    setOpenWarning(!openWarning);
  }
  return (
    <Plugin>
      <WarningAlertDialog
        isVisible={openWarning}
        title={"Xóa hàng"}
        titleConfirm={"Đồng ý"}
        handleConfirm={handleConfirm}
        titleCancel={"Từ chối"}
        handleCancel={handleCancel}
        warningMessage={"Bạn có muốn xóa hàng này?"}
      />
      <Getter
        name="tableColumns"
        computed={({ tableColumns }) => {
          return tableColumns.concat(
            { key: 'edit', type: 'edit', width: "5%" },
            { key: 'delete', type: 'delete', width: "5%" }
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
                    setOpenWarning(!openWarning);
                    deletingRowID = params.tableRow.rowId;
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
                <Link to={`${route}/${params.tableRow.rowId}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
              </TableCell>
            )}
          </TemplateConnector>
        )}
      </Template>
    </Plugin >
  )
};

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
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
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

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table
    {...restProps}
    className={classes.tableStriped}
  />
);

export const TableComponent = withStyles(styles, {
  name: 'TableComponent',
})(TableComponentBase);

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
  const { columnDef, data, route, idxColumnsFilter } = props;
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
  const [columnOrder, setColumnOrder] = useState(columnDef.map(col => col.name));
  const colHeight = Math.floor(1 / columnDef.length * 100);
  const tableColumnExtensions = columnDef.map(col => ({ name: col.name, align: 'left', width: colHeight + "%" }))

  const columnsFilter = idxColumnsFilter.map(idx => columnDef[idx].title);
  const filterTypes = ["Bao gồm", "Chính xác", "Không bao gồm"];
  const filterValues = {
    columnsFilter: columnsFilter[0],
    filterTypes: filterTypes[0],
    textFilter: '',
  };

  return (
    <div>
      <Paper>
        <div className="m-auto">
          <div className="rounded p-4 container col-md-12">
            <Formik
              enableReinitialize
              initialValues={filterValues}
              onSubmit={(values) => console.log(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form autoComplete="off">
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-4"}
                      value={values.columnsFilter}
                      onBlur={handleBlur("columnsFilter")}
                      onChange={handleChange("columnsFilter")}
                      inputID={"columnsFilter"}
                      labelText={"Chọn cột cần lọc"}
                      selectClassName={"form-control"}
                      lstSelectOptions={columnsFilter}
                    />
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-4"}
                      value={values.filterTypes}
                      onBlur={handleBlur("filterTypes")}
                      onChange={handleChange("filterTypes")}
                      inputID={"filterTypes"}
                      labelText={"Tùy chọn lọc"}
                      selectClassName={"form-control"}
                      lstSelectOptions={filterTypes}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-4"}
                      value={values.textFilter}
                      onBlur={handleBlur("textFilter")}
                      onChange={handleChange("textFilter")}
                      inputID={"textFilter"}
                      labelText={"Từ khóa"}
                      inputType={"text"}
                      placeholder={"Nhập từ khóa"}
                      inputClassName={"form-control"}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>


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
          <IntegratedFiltering
            columnExtensions={filteringColumnExtensions}
          />
          <Table
            tableComponent={TableComponent}
            columnExtensions={tableColumnExtensions}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableFixedColumns
            rightColumns={['edit', 'delete']}
          />
          <CustomTableEditColumn route={route} />
          {/* <TableSelection showSelectAll /> */}
          <PagingPanel
            pageSizes={state.pageSizes}
          />
        </Grid>
      </Paper>
    </div>

  );
};
export default QTable;
