// import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Contract from './Contract';
// import HistoryWorking from './HistoryWorking';
// import BasicInfo from './BasicInfo';
// import AcademicLevel from './AcademicLevel';
// import AddressInfo from './AddressInfo';
// import CertificateInfo from './CertificateInfo';
// import OtherInfo from './OtherInfo';
// import { setTabName, setSubTabName } from 'src/stores/actions/profile';

// const ProfileTabs = ({ isCreate, buttons }) => {
//   const dispatch = useDispatch();
//   const tabName = useSelector((state) => state.profile.tabName);
//   const subTabName = useSelector((state) => state.profile.subTabName);
//   useEffect(() => {
//     // dispatch(fetchAccounts());
//     // dispatch(fetchAllProfiles({isHaveAccount: false}));
//   }, []);

//   const handleChangeTab = (e) => {
//     if (e !== tabName) {
//       dispatch(setTabName(e));
//       dispatch(setSubTabName('basicInfo'));
//     }
//   };
//   const handleChangeSubTab = (e) => {
//     if (e !== tabName) {
//       dispatch(setSubTabName(e));
//     }
//   };
//   return (
//     <CContainer fluid className="c-main mb-3 px-4">
//       <CTabs activeTab={tabName} onActiveTabChange={handleChangeTab}>
//         <CNav variant="tabs">
//           <CNavItem color="pink">
//             <CNavLink data-tab="profile">Hồ sơ cá nhân</CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink data-tab="request" hidden={isCreate}>
//               Đề xuất cá nhân
//             </CNavLink>
//           </CNavItem>
//           <CNavItem>
//             <CNavLink data-tab="workHistory">Lịch sử công tác</CNavLink>
//           </CNavItem>
//         </CNav>
//         <CTabContent>
//           <CTabPane data-tab="profile">
//             <CTabs activeTab={subTabName} onActiveTabChange={handleChangeSubTab}>
//               <CNav variant="tabs">
//                 <CNavItem>
//                   <CNavLink data-tab="basicInfo">Thông tin cơ bản</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="contract">Hợp đồng làm việc</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="qualification">Trình độ chuyên môn</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="certificate">Chứng chỉ</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="contact">Thông tin liên hệ</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="salary">Tiền lương/Trợ cấp</CNavLink>
//                 </CNavItem>
//                 <CNavItem>
//                   <CNavLink data-tab="DiffInfo">Thông tin khác</CNavLink>
//                 </CNavItem>
//               </CNav>
//               <CTabContent>
//                 <CTabPane data-tab="basicInfo">
//                   <BasicInfo />
//                 </CTabPane>
//                 <CTabPane data-tab="contract">
//                   <Contract isCreate={isCreate} />
//                 </CTabPane>
//                 <CTabPane data-tab="qualification">
//                   <AcademicLevel />
//                 </CTabPane>
//                 <CTabPane data-tab="certificate">
//                   <CertificateInfo />
//                 </CTabPane>
//                 <CTabPane data-tab="contact">
//                   <AddressInfo />
//                 </CTabPane>
//                 <CTabPane data-tab="salary">6</CTabPane>
//                 <CTabPane data-tab="DiffInfo">
//                   <OtherInfo />
//                 </CTabPane>
//               </CTabContent>
//             </CTabs>
//           </CTabPane>
//           <CTabPane data-tab="request" hidden={!isCreate}></CTabPane>
//           <CTabPane data-tab="workHistory">
//             <HistoryWorking isCreate={isCreate} />
//           </CTabPane>
//         </CTabContent>
//       </CTabs>
//     </CContainer>
//   );
// };

// export default ProfileTabs;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Contract from './Contract';
import HistoryWorking from './HistoryWorking';
import BasicInfo from './BasicInfo';
import AcademicLevel from './AcademicLevel';
import AddressInfo from './AddressInfo';
import CertificateInfo from './CertificateInfo';
import OtherInfo from './OtherInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setTabName, setSubTabName } from 'src/stores/actions/profile';
import JobTimelineInfo from './JobTimeline';

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

const ProfileTabs = ({ isCreate, profile }) => {
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

  return (
    <div className={classes.root}>
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
          <Tab className="noselect" label="Hồ sơ cá nhân" {...a11yProps(0)} />
          <Tab hidden={isCreate} className="noselect" label="Đề xuất cá nhân" {...a11yProps(1)} />
          <Tab hidden={isCreate} className="noselect" label="Lịch sử công tác" {...a11yProps(2)} />
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
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab className="noselect" label="Thông tin cơ bản" {...a11yProps(0)} />
              <Tab className="noselect" label="Hợp đồng lao động" {...a11yProps(1)} />
              <Tab className="noselect" label="Trình độ chuyên môn" {...a11yProps(2)} />
              <Tab className="noselect" label="Chứng chỉ chuyên ngành" {...a11yProps(3)} />
              <Tab className="noselect" label="Thông tin liên hệ" {...a11yProps(4)} />
              <Tab className="noselect" label="Tiền lương / Trợ cấp" {...a11yProps(5)} />
              <Tab className="noselect" label="Thông tin khác" {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <TabPanel value={subTabName} index={0} dir={theme.direction}>
            <BasicInfo isCreate={isCreate} profile={profile} />
          </TabPanel>
          <TabPanel value={subTabName} index={1} dir={theme.direction}>
            {isCreate ? <JobTimelineInfo /> : <Contract />}
          </TabPanel>
          <TabPanel value={subTabName} index={2} dir={theme.direction}>
            <AcademicLevel />
          </TabPanel>
          <TabPanel value={subTabName} index={3} dir={theme.direction}>
            <CertificateInfo />
          </TabPanel>
          <TabPanel value={subTabName} index={4} dir={theme.direction}>
            <AddressInfo />
          </TabPanel>
          <TabPanel value={subTabName} index={5} dir={theme.direction}>
            Tiền lươn / Trợ cấp
          </TabPanel>
          <TabPanel value={subTabName} index={6} dir={theme.direction}>
            <OtherInfo />
          </TabPanel>
        </div>
      </TabPanel>
      <TabPanel value={tabName} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabName} index={2}>
        <HistoryWorking />
      </TabPanel>
    </div>
  );
};
export default ProfileTabs;
