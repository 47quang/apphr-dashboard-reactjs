import { Avatar, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Cancel, Lens } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_SIZES } from 'src/constants/key';
import { fetchAssignment, setEmptyAssignment } from 'src/stores/actions/assignment';
import { deleteRollUp } from 'src/stores/actions/rollUp';

import QTable from '../table/Table';
const RollUpInfo = ({ t, isOpen, handleClose, profileCode, fullName, avatar, assignment, profileId }) => {
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.assignment.assignment);

  const columnDef = [
    { name: 'type', title: t('label.type_roll_call'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'startTime', title: t('label.start_time'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'endTime', title: t('label.end_time'), align: 'left', width: '30%', wordWrapEnabled: true },
    //{ name: 'coefficient', title: 'Hệ số giờ làm' },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,

    total: 0,
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

  useEffect(() => {
    if (assignment?.id && isOpen) {
      dispatch(fetchAssignment(assignment.id));
      setPaging((prevState) => ({
        ...prevState,
        total: rows?.rollUps?.length ?? 0,
      }));
    }
    return () => {
      dispatch(setEmptyAssignment());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  const deleteRow = async (rowId) => {
    dispatch(deleteRollUp(rowId, assignment.id, t('message.successful_delete')));
  };
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{t('label.history_roll_call')}</div>
          <Cancel fontSize="large" onClick={handleClose} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="d-flex flex-row py-2 align-items-center">
          <Avatar alt="avatar" src={avatar} className="mr-3" />
          <div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                {t('label.employee_full_name')} : {fullName}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                {t('label.employee_code')} : {profileCode}
              </div>
            </div>
          </div>
        </div>
        <QTable
          t={t}
          columnDef={columnDef}
          data={rows?.rollUps ?? []}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableFilter={true}
          isPopUp={true}
          deleteRow={deleteRow}
          rollUpData={{ profileId: profileId, assignmentId: assignment?.id, startCC: assignment.startCC, date: rows.startTime }}
          editColumnWidth={'15%'}
          // disableDelete={!permissionIds.includes(PERMISSION.DELETE_HOLIDAY)}
          // disableCreate={false}
          // disableEdit={!permissionIds.includes(PERMISSION.GET_HOLIDAY)}
        />
        <div className="d-flex flex-row justify-content-end mb-3 pt-4 align-items-center text-danger">
          <Lens className="mr-2" />
          {t('label.lately_roll_call')}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RollUpInfo;
