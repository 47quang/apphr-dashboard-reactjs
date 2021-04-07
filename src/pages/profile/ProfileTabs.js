import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { joinClassName } from 'src/utils/stringUtils';
import AcademicLevel from './AcademicLevel';
import AddressInfo from './AddressInfo';
import BasicInfo from './BasicInfo';
import Benefit from './Benefit';
import CertificateInfo from './CertificateInfo';
import HistoryWorkingForm from './HistoryWorkingForm';
import JobTimelineInfo from './JobTimeline';
import OtherInfo from './OtherInfo';

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

const ProfileTabs = ({ t, history, match }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const basicInfoRef = createRef();
  const [tabName, setTabName] = useState(0);
  const [subTabName, setSubTabName] = useState(0);
  const isCreate = match.params.id ? false : true;

  const handleChange = (event, newValue) => {
    setTabName(newValue);
    setSubTabName(0);
  };

  const handleChangeSubTab = (event, newValue) => {
    setSubTabName(newValue);
  };

  return (
    <>
      <div className={classes.root} id="profile-tabs">
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
            <Tab className="noselect" label={t('label.profile_personal')} {...a11yProps(0)} />
            <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_proposal')} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabName} index={0} dir={theme.direction}>
          <div className={joinClassName([classes.root, 'pb-5'])}>
            <AppBar position="static" color="default">
              <Tabs
                value={subTabName}
                onChange={handleChangeSubTab}
                indicatorColor="primary"
                className="noselect"
                textColor="primary"
                aria-label="full width tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab className="noselect" label={t('label.profile_basic_info')} {...a11yProps(0)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_contract')} {...a11yProps(1)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_academic_level')} {...a11yProps(2)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_certificate')} {...a11yProps(3)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_contact_address')} {...a11yProps(4)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_salary_allowance')} {...a11yProps(5)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_other_info')} {...a11yProps(6)} />
                <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_schedule')} {...a11yProps(7)} />
              </Tabs>
            </AppBar>
            <TabPanel value={subTabName} index={0} dir={theme.direction}>
              <BasicInfo t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={7} dir={theme.direction}>
              <HistoryWorkingForm t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={1} dir={theme.direction}>
              <JobTimelineInfo t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={2} dir={theme.direction}>
              <AcademicLevel t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={3} dir={theme.direction}>
              <CertificateInfo t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={4} dir={theme.direction}>
              <AddressInfo t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={5} dir={theme.direction}>
              <Benefit t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={6} dir={theme.direction}>
              <OtherInfo t={t} history={history} match={match} />
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={tabName} index={1}>
          (TODO)
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
export default ProfileTabs;
