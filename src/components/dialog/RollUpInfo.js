import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Cancel, Lens } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { COLORS } from 'src/constants/theme';
import { fetchAssignment } from 'src/stores/actions/assignment';
import { renderButtons } from 'src/utils/formUtils';
const RollUpInfo = ({ t, isOpen, handleClose, id }) => {
  const [dropdownSuccess, setDropdownSuccess] = useState(false);
  const [dropdownDanger, setDropdownDanger] = useState(false);

  const toggleSuccess = () => setDropdownSuccess((prevState) => !prevState);
  const toggleDanger = () => setDropdownDanger((prevState) => !prevState);
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.assignment.assignment);

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary  mx-2`,
      onClick: (e) => {},
      name: t('label.check_in'),
    },

    {
      type: 'button',
      className: `btn btn-primary px-4 ml-4`,
      onClick: (e) => {},
      name: t('label.check_out'),
    },
  ];

  useEffect(() => {
    if (id) dispatch(fetchAssignment(id));
  }, []);

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{t('label.history_roll_call')}</div>
          <Cancel fontSize="large" onClick={handleClose} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="d-flex flex-row py-2 align-items-center">
          <Avatar alt="avatar" src="" className="mr-3" />
          <div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{t('label.employee_full_name')}:</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{t('label.employee_code')}:</div>
            </div>
          </div>
        </div>
        <Table className="my-3">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>{t('label.type_roll_call')}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Loại</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Thời gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.rollUps && rows.rollUps.length > 0 ? (
              rows.rollUps.map((row, index) => (
                <TableRow key={`row ${index}`} className={`${index % 2 === 0 ? 'table-row-background' : ''}`}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                </TableRow>
              ))
            ) : (
              <div />
            )}
          </TableBody>
        </Table>
        <div className="d-flex flex-row justify-content-end mb-3 align-items-center text-danger">
          <Lens className="mr-2" />
          Check in trễ/ check out sớm
        </div>
      </DialogContent>
      <DialogActions style={{ backgroundColor: COLORS.SIDE_BAR_COLOR }} className="px-3">
        {renderButtons(buttons)}
      </DialogActions>
    </Dialog>
  );
};

export default RollUpInfo;
