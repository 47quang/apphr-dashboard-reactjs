import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Help, Lens } from '@material-ui/icons';
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

const NoteScheduler = ({ t }) => {
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
    <>
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
        classes={{
          paper: classes.paper,
        }}
      >
        <div className="row m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.type_of_column')}</b>
          </p>
          <div className="col-12">
            <Lens className="mr-2" style={{ color: COLORS.TODAY_HEADER_CELL }} />
            <p className="d-inline">{t('label.today')}</p>
          </div>
          <div className="col-12">
            <Lens className="mr-2" style={{ color: COLORS.WEEKEND_HEADER_CELL }} />
            <p className="d-inline">{t('label.weekend')}</p>
          </div>

          <div className="col-12">
            <Lens className="mr-2" style={{ color: COLORS.HOLIDAY_HEADER }} />
            <p className="d-inline">{t('label.holiday')}</p>
          </div>
        </div>
        <div className="row m-2" style={{ width: '100%' }}>
          <p>
            <b>{t('title.type_of_cell')}</b>
          </p>
          <div className="col-12">
            <Lens className="mr-2" style={{ color: COLORS.OVERTIME_ASSIGNMENT }} />
            <p className="d-inline">{t('label.overtime_assignment')}</p>
          </div>
          <div className="col-12">
            <Lens className="mr-2" style={{ color: COLORS.NORMAL_ASSIGNMENT }} />
            <p className="d-inline">{t('label.normal_assignment')}</p>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default NoteScheduler;
