import { DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import React from 'react';
import { backgroundColorOfAssignment, borderColorOfAssignment } from 'src/utils/colorOfCell';

const AssignmentsDialog = ({ isOpen, handleConfirm, handleCancel, t, assignments }) => {
  return (
    <Dialog open={isOpen} onClose={handleCancel} maxWidth="sm" fullWidth disableBackdropClick>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{t('label.assignments')}</div>
          <Cancel fontSize="large" onClick={(e) => handleCancel()} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="row">
          {assignments && assignments.length > 0 ? (
            assignments.map((assignment, idx) => {
              return (
                <div key={idx + assignment.shiftCode} className="col-6">
                  <div
                    className="my-2 d-flex align-items-center justify-content-center"
                    role="button"
                    onClick={(e) => {
                      handleConfirm(assignment);
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
  //return <></>;
};

export default AssignmentsDialog;
