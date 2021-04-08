import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { ArrowDropDown, Cancel, Lens } from '@material-ui/icons';
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { COLORS } from 'src/constants/theme';
const RollUpInfo = ({ t, isOpen, handleClose }) => {
  const [dropdownSuccess, setDropdownSuccess] = useState(false);
  const [dropdownDanger, setDropdownDanger] = useState(false);

  const toggleSuccess = () => setDropdownSuccess((prevState) => !prevState);
  const toggleDanger = () => setDropdownDanger((prevState) => !prevState);

  const createData = (rollupType, time, type) => {
    return { rollupType, type, time };
  };
  const rows = [
    createData('Mạng nội bộ', '08:30', 'Check-in'),
    createData('Mạng nội bộ', '11:30', 'Check-out'),
    createData('Mạng nội bộ', '13:30', 'Check-in'),
    createData('Mạng nội bộ', '15:30', 'Check-out'),
    createData('Mạng nội bộ', '15:45', 'Check-in'),
    createData('Mạng nội bộ', '18:00', 'Check-out'),
  ];

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>Lịch sử điểm danh</div>
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
              <TableCell style={{ fontWeight: 'bold' }}>Hình thức điểm danh</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Loại</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Thời gian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={`row ${index}`} className={`${index % 2 === 0 ? 'table-row-background' : ''}`}>
                <TableCell>{row.rollupType}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="d-flex flex-row justify-content-end mb-3 align-items-center text-danger">
          <Lens className="mr-2" />
          Check in trễ/ check out sớm
        </div>
      </DialogContent>
      <DialogActions style={{ backgroundColor: COLORS.SIDE_BAR_COLOR }} className="px-3">
        <Dropdown isOpen={dropdownSuccess} toggle={toggleSuccess}>
          <DropdownToggle caret color="danger">
            {t('label.reset_roll_up')}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Ca sáng</DropdownItem>
            <DropdownItem>Ca chiều</DropdownItem>
            <DropdownItem>Cả ngày</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={dropdownDanger} toggle={toggleDanger}>
          <DropdownToggle caret color="success">
            {t('label.roll_up')}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Ca sáng</DropdownItem>
            <DropdownItem>Ca chiều</DropdownItem>
            <DropdownItem>Cả ngày</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DialogActions>
    </Dialog>
  );
};

export default RollUpInfo;
