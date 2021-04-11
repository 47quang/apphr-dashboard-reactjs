import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AccountItemBody from './AccountItemBody';
import SchedulerPage from './SchedulerPage';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  anchorOriginTopCenter: {
    [theme.breakpoints.down('md')]: {
      top: 0,
      justifyContent: 'center',
    },
  },
  root: {
    [theme.breakpoints.down('md')]: {
      borderRadius: 4,
      minWidth: 200,
    },
  },
}));

const AccountTabs = ({ t, history, match }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const basicInfoRef = createRef();
  const [tabName, setTabName] = useState(0);
  const isCreate = match.params.id ? false : true;

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  return (
    <>
      <div className={classes.root} id="account-tabs">
        <AppBar position="static" color="default">
          <Tabs
            value={tabName}
            onChange={handleChange}
            indicatorColor="primary"
            className="noselect"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab className="noselect" label={t('label.account_info')} {...a11yProps(0)} />
            <Tab hidden={isCreate} className="noselect" label={t('label.scheduler')} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabName} index={0} dir={theme.direction}>
          <AccountItemBody match={match} history={history} t={t} />
        </TabPanel>
        <TabPanel hidden={isCreate} value={tabName} index={1}>
          <SchedulerPage match={match} history={history} t={t} />
        </TabPanel>
      </div>
      {/* <div
        className={joinClassName(['bg-white d-flex flex-column justify-content-center', 'px-4'])}
        style={{ position: 'fixed', right: 0, bottom: 0, width: `${snackBarWidth}px`, height: 50, borderTop: '0.5px solid #d8dbe0' }}
      >
        {renderButtons(buttons)}
      </div> */}
    </>
  );
};
export default AccountTabs;
