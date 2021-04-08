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
import { COLORS } from 'src/constants/theme';
const RollUpInfo = ({ t, isOpen, handleClose }) => {
  const [resetDropdownInfo, setResetDropdownInfo] = useState({
    id: 'resetDropdown',
    resetAnchorEl: null,
  });
  const [rollupDropdownInfo, setRollupDropdownInfo] = useState({
    id: 'rollupDropdown',
    rollUpAnchorEl: null,
  });
  const createData = (rollupType, time, type) => {
    return { rollupType, type, time };
  };
  const rows = [
    createData('Mạng nội bộ', Date.now(), 'Check-in'),
    createData('Mạng nội bộ', Date.now(), 'Check-in'),
    createData('Mạng nội bộ', Date.now(), 'Check-in'),
    createData('Mạng nội bộ', Date.now(), 'Check-in'),
    createData('Mạng nội bộ', Date.now(), 'Check-in'),
  ];

  return (
    <Dialog open={isOpen} maxWidth="md">
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
        <div
          className="btn btn-danger d-flex flex-row justify-content-between"
          aria-describedby={resetDropdownInfo.id}
          onClick={(e) => {
            setResetDropdownInfo((prevState) => {
              return { ...prevState, resetAnchorEl: e.currentTarget };
            });
          }}
        >
          Reset
          <ArrowDropDown />
          <Popover
            style={{ borderRadius: 0 }}
            id={resetDropdownInfo.id}
            open={Boolean(resetDropdownInfo.resetAnchorEl)}
            anchorEl={resetDropdownInfo.resetAnchorEl}
            onClose={() => {
              setResetDropdownInfo((prevState) => {
                return { ...prevState, resetAnchorEl: null };
              });
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            hihi
          </Popover>
        </div>
        <div
          className="btn btn-success d-flex flex-row justify-content-between"
          aria-describedby={rollupDropdownInfo.id}
          onClick={(e) => {
            setRollupDropdownInfo((prevState) => {
              return { ...prevState, rollupAnchorEl: e.currentTarget };
            });
          }}
        >
          Điểm danh
          <ArrowDropDown />
          <Popover
            style={{ borderRadius: 0 }}
            id={rollupDropdownInfo.id}
            open={Boolean(rollupDropdownInfo.rollupAnchorEl)}
            anchorEl={rollupDropdownInfo.rollupAnchorEl}
            onClose={() => {
              setRollupDropdownInfo((prevState) => {
                return { ...prevState, rollupAnchorEl: null };
              });
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            hihi
          </Popover>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default RollUpInfo;
