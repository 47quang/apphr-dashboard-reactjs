import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { AlarmAdd, AttachMoney, BluetoothAudio, Cancel, CheckCircle, Gavel, Help, Lens, MoneyOff, Schedule } from '@material-ui/icons';
import React from 'react';
import { COLORS } from 'src/constants/theme';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const NoteTable = ({ t }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        role="button"
        className="rounded-circle d-flex align-items-center justify-content-center p-1 m-1"
        style={{
          backgroundColor: COLORS.FREE_DATE,
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 40,
          height: 40,
        }}
      >
        <Help className="m-0 p-0" color="primary" style={{ fontSize: 30, width: 30, height: 30 }} />
      </div>
      <Popover
        disableScrollLock={true}
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: { width: '20%' },
        }}
      >
        <div className="row m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.type_of_column')}</b>
          </p>
          <div className="col-12">
            <Lens className="mr-2 mb-2" style={{ color: COLORS.HOLIDAY_CELL }} />
            <p className="d-inline">{t('label.holiday')}</p>
          </div>
          <div className="col-12">
            <Lens className="mr-2 mb-2" style={{ color: COLORS.TODAY_BODY_CELL }} />
            <p className="d-inline">{t('label.today')}</p>
          </div>
        </div>
        <div className="row m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.type_of_cell')}</b>
          </p>
          <div className="col-12">
            <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_REQUEST }} />
            <p className="d-inline">{t('label.request')}</p>
          </div>
          <div className="col-12">
            <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_NORMAL }} />
            <p className="d-inline">{t('label.normal_assignment')}</p>
          </div>
          <div className="col-12">
            <Lens className="mr-2 mb-2" style={{ color: COLORS.BACKGROUND_COLOR_MANY_ASSIGNMENT }} />
            <p className="d-inline">{t('label.many_assignments')}</p>
          </div>
        </div>
        <div className="row m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.type_of_request')}</b>
          </p>
          <div className="col-12">
            <AttachMoney className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
            <p className="d-inline">{t('label.leave_pay_req')}</p>
          </div>
          <div className="col-12">
            <MoneyOff className="mr-2 mb-2" style={{ color: COLORS.ERROR }} />
            <p className="d-inline">{t('label.leave_no_pay_req')}</p>
          </div>
          <div className="col-12">
            <Gavel className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
            <p className="d-inline">{t('label.leave_policy_req')}</p>
          </div>
          <div className="col-12">
            <BluetoothAudio className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
            <p className="d-inline">{t('label.remote_req')}</p>
          </div>
          <div className="col-12">
            <AlarmAdd className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
            <p className="d-inline">{t('label.overtime_req')}</p>
          </div>
        </div>
        <div className="row m-12 m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.status_of_cell')}</b>
          </p>

          <div className="col-12">
            <CheckCircle className="mr-2 mb-2" style={{ color: COLORS.SUCCESS }} />
            <p className="d-inline">{t('label.success_roll_call')}</p>
          </div>
          <div className="col-12">
            <Schedule className="mr-2 mb-2" style={{ color: COLORS.LATE }} />
            <p className="d-inline">{t('label.late_roll_call')}</p>
          </div>
          <div className="col-12">
            <Cancel className="mr-2 mb-2" style={{ color: COLORS.ERROR }} />
            <p className="d-inline">{t('label.error_roll_call')}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default NoteTable;
