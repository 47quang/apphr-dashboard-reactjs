import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION } from 'src/constants/key';
import { setSubTabName, setTabName } from 'src/stores/actions/profile';
import { joinClassName } from 'src/utils/stringUtils';
import Page404 from '../page404/Page404';
import Proposal from '../proposal/Proposal';
import AcademicLevel from './AcademicLevel';
import AddressInfo from './AddressInfo';
import BasicInfo from './BasicInfo';
import Benefit from './Benefit';
import CertificateInfo from './CertificateInfo';
import HistoryWorkingForm from './HistoryWorkingForm';
import JobTimelineInfo from './JobTimeline';
import OtherInfo from './OtherInfo';
import RequestStatistic from './RequestStatistic';
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

const ProfileTabs = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const classes = useStyles();
  const theme = useTheme();
  // const basicInfoRef = createRef();
  const tabName = useSelector((state) => state.profile.tabName);
  const subTabName = useSelector((state) => state.profile.subTabName);
  const dispatch = useDispatch();
  const isCreate = match.params.id ? false : true;

  const handleChange = (event, newValue) => {
    dispatch(setTabName(newValue));
    dispatch(setSubTabName(0));
  };

  const handleChangeSubTab = (event, newValue) => {
    dispatch(setSubTabName(newValue));
  };
  useEffect(() => {
    return () => {
      dispatch(setTabName(0));
      dispatch(setSubTabName(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const returnComponent = (
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
            <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_schedule')} {...a11yProps(1)} />
            <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_proposal')} {...a11yProps(2)} />
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
                <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_history_working')} {...a11yProps(1)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_contract')} {...a11yProps(2)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_salary_allowance')} {...a11yProps(3)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_academic_level')} {...a11yProps(4)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_certificate')} {...a11yProps(5)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_contact_address')} {...a11yProps(6)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.profile_other_info')} {...a11yProps(7)} />
              </Tabs>
            </AppBar>
            <TabPanel value={subTabName} index={0} dir={theme.direction}>
              <BasicInfo t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={1} dir={theme.direction}>
              <HistoryWorkingForm t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={2} dir={theme.direction}>
              <JobTimelineInfo t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={3} dir={theme.direction}>
              <Benefit t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={4} dir={theme.direction}>
              <AcademicLevel t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={5} dir={theme.direction}>
              <CertificateInfo t={t} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={6} dir={theme.direction}>
              <AddressInfo t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={7} dir={theme.direction}>
              <OtherInfo t={t} history={history} match={match} />
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={tabName} index={1}>
          <SchedulerPage t={t} history={history} match={match} />
        </TabPanel>
        <TabPanel value={tabName} index={2}>
          <div className={joinClassName([classes.root, 'pb-5'])}>
            <AppBar position="static" color="default">
              <Tabs
                value={subTabName}
                onChange={handleChangeSubTab}
                indicatorColor="primary"
                className="noselect"
                textColor="primary"
                aria-label="full width tabs example"
                variant="fullWidth"
                scrollButtons="auto"
              >
                <Tab hidden={isCreate} className="noselect" label={t('label.request_statistic')} {...a11yProps(0)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.leave_request')} {...a11yProps(1)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.remote_request')} {...a11yProps(2)} />
                <Tab disabled={isCreate} className="noselect" label={t('label.overtime_request')} {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={subTabName} index={0} dir={theme.direction}>
              <RequestStatistic t={t} history={history} match={match} />
            </TabPanel>
            <TabPanel value={subTabName} index={1} dir={theme.direction}>
              <Proposal t={t} history={history} match={match} type={'leave'} profileId={match?.params?.id} />
            </TabPanel>
            <TabPanel value={subTabName} index={2} dir={theme.direction}>
              <Proposal t={t} history={history} match={match} type={'remote'} profileId={match?.params?.id} />
            </TabPanel>
            <TabPanel value={subTabName} index={3} dir={theme.direction}>
              <Proposal t={t} history={history} match={match} type={'overtime'} profileId={match?.params?.id} />
            </TabPanel>
          </div>
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
  if (isCreate) {
    if (permissionIds.includes(PERMISSION.CREATE_PROFILE)) return returnComponent;
    else return <Page404 />;
  } else {
    if (permissionIds.includes(PERMISSION.GET_PROFILE)) return returnComponent;
    else return <Page404 />;
  }
};
export default ProfileTabs;
