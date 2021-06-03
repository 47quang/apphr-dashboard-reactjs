import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { useState } from 'react';
import { PAGE_SIZES } from 'src/constants/key';
import QTable from '../table/Table';

const equalQTable = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const StatisticAssignmentTable = ({ t, isOpen, handleClose, data, title }) => {
  const columnDef = [
    { name: 'profileCode', title: t('label.employee_code'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '70%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: data.length,
    loading: false,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
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
    }));
  // const setLoading = (isLoading) => {
  //   setPaging((prevState) => ({
  //     ...prevState,
  //     loading: isLoading,
  //   }));
  // };
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth disableBackdropClick={false}>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{title}</div>
          <Cancel fontSize="large" onClick={(e) => handleClose()} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <MemoizedQTable
          t={t}
          columnDef={columnDef}
          data={data ?? []}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableFilter={true}
          disableEditColum={true}
          disableCreate={true}
          disableToolBar={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StatisticAssignmentTable;
