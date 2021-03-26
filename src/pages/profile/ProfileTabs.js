import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubTabName, setTabName } from 'src/stores/actions/profile';
import { renderButtons } from 'src/utils/formUtils';
import { joinClassName } from 'src/utils/stringUtils';
import AcademicLevel from './AcademicLevel';
import AddressInfo from './AddressInfo';
import BasicInfo from './BasicInfo';
import CertificateInfo from './CertificateInfo';
import Contract from './Contract';
import HistoryWorking from './HistoryWorking';
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
  root: {
    width: '100%',
  },
}));

const ProfileTabs = ({ t, isCreate, profile }) => {
  const [snackBarWidth, setSnackBarWidth] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const tabName = useSelector((state) => state.profile.tabName);
  const subTabName = useSelector((state) => state.profile.subTabName);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setTabName(newValue));
    dispatch(setSubTabName(0));
  };

  const handleChangeSubTab = (event, newValue) => {
    dispatch(setSubTabName(newValue));
  };
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entry) => {
      setSnackBarWidth(entry[0].borderBoxSize[0].inlineSize);
    });
    resizeObserver.observe(document.getElementById('profile-tabs'));
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        // history.push(ROUTE_PATH.ROLE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        // roleInfoForm.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        // roleInfoForm.current.handleSubmit(e);
      },
      name: t('label.update'),
    },
  ];
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
            <Tab hidden={isCreate} className="noselect" label={t('label.profile_personal_schedule')} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabName} index={0} dir={theme.direction}>
          <div className={classes.root}>
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
                <Tab className="noselect" label={t('label.profile_contract')} {...a11yProps(1)} />
                <Tab className="noselect" label={t('label.profile_academic_level')} {...a11yProps(2)} />
                <Tab className="noselect" label={t('label.profile_certificate')} {...a11yProps(3)} />
                <Tab className="noselect" label={t('label.profile_contact_address')} {...a11yProps(4)} />
                <Tab className="noselect" label={t('label.profile_salary_allowance')} {...a11yProps(5)} />
                <Tab className="noselect" label={t('label.profile_other_info')} {...a11yProps(6)} />
              </Tabs>
            </AppBar>
            <TabPanel value={subTabName} index={0} dir={theme.direction}>
              <BasicInfo t={t} isCreate={isCreate} profile={profile} />
            </TabPanel>
            <TabPanel value={subTabName} index={1} dir={theme.direction}>
              {isCreate ? <JobTimelineInfo t={t} /> : <Contract t={t} />}
            </TabPanel>
            <TabPanel value={subTabName} index={2} dir={theme.direction}>
              <AcademicLevel t={t} />
            </TabPanel>
            <TabPanel value={subTabName} index={3} dir={theme.direction}>
              <CertificateInfo t={t} />
            </TabPanel>
            <TabPanel value={subTabName} index={4} dir={theme.direction}>
              <AddressInfo t={t} />
            </TabPanel>
            <TabPanel value={subTabName} index={5} dir={theme.direction}>
              Tiền lương / Trợ cấp (TODO)
            </TabPanel>
            <TabPanel value={subTabName} index={6} dir={theme.direction}>
              <OtherInfo t={t} />
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={tabName} index={1}>
          (TODO)
        </TabPanel>
        <TabPanel value={tabName} index={2}>
          <HistoryWorking t={t} />
        </TabPanel>
      </div>
      <div
        className={joinClassName(['bg-white d-flex flex-column justify-content-center', 'px-4'])}
        style={{ position: 'fixed', right: 0, bottom: 0, width: `${snackBarWidth}px`, height: 50, borderTop: '0.5px solid #d8dbe0' }}
      >
        {renderButtons(buttons)}
      </div>
    </>
  );
};
export default ProfileTabs;
