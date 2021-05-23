import { DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignmentsInDate, setEmptyAssignmentInADate } from 'src/stores/actions/assignment';
import { backgroundColorOfAssignment, borderColorOfAssignment } from 'src/utils/colorOfCell';
import RollUpInfo from './RollUpInfo';

const AssignmentsDialog = ({ isOpen, handleCancel, t, profileId, date, code, fullName, avatar }) => {
  const assignments = useSelector((state) => state.assignment.assignmentsInADate);
  const dispatch = useDispatch();
  const [cell, setCell] = useState({
    isOpen: false,
    assignment: {},
    date: '',
    isReload: false,
  });
  const reloadTable = () => {
    dispatch(
      fetchAssignmentsInDate({
        profileId: profileId,
        from: from,
        to: to,
      }),
    );
  };
  const handleClose = (isReload) => {
    setCell({ ...cell, isOpen: !cell.isOpen, isReload: isReload });
    if (isReload) reloadTable();
  };
  let from = new Date(date);
  from.setHours(0);
  let to = new Date(date);
  to.setHours(23);
  to.setMinutes(59);
  useEffect(() => {
    dispatch(
      fetchAssignmentsInDate({
        profileId: profileId,
        from: from,
        to: to,
      }),
    );
    return () => {
      dispatch(setEmptyAssignmentInADate());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Dialog open={isOpen} onClose={handleCancel} maxWidth="sm" fullWidth disableBackdropClick>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{t('label.assignments')}</div>
          <Cancel fontSize="large" onClick={(e) => handleCancel(cell.isReload)} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="row">
          {cell.isOpen && (
            <RollUpInfo
              t={t}
              isOpen={cell.isOpen}
              handleClose={handleClose}
              assignment={cell.assignment}
              profileCode={code}
              fullName={fullName}
              profileId={profileId}
              avatar={avatar}
              reloadTable={reloadTable}
            />
          )}
          {assignments && assignments.length > 0 ? (
            assignments.map((assignment, idx) => {
              return (
                <div key={idx + assignment.shiftCode} className="col-6">
                  <div
                    className="my-2 d-flex align-items-center justify-content-center"
                    role="button"
                    onClick={(e) => {
                      setCell({ ...cell, isOpen: true, assignment: assignment });
                    }}
                    style={{
                      verticalAlign: 'inherit',
                      borderColor: borderColorOfAssignment(assignment),
                      borderStyle: 'solid',
                      borderRadius: '5px',
                      borderWidth: '2px',
                      backgroundColor: backgroundColorOfAssignment(assignment),
                      height: '75px',
                      textAlign: 'center',
                    }}
                  >
                    <div>
                      <p className="mb-0">{assignment.shiftName}</p>
                      <p className="m-auto"> {assignment.startCC + ' - ' + assignment.endCC}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentsDialog;
