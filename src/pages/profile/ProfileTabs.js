import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Contract from './Contract';
import HistoryWorking from './HistoryWorking';
import BasicInfo from './BasicInfo';
import AcademicLevel from './AcademicLevel';
import AddressInfo from './AddressInfo';
import { setTabName, setSubTabName } from 'src/stores/actions/profile';

const ProfileTabs = ({ isCreate, buttons }) => {
  const dispatch = useDispatch();
  const tabName = useSelector((state) => state.profile.tabName);
  const subTabName = useSelector((state) => state.profile.subTabName);
  useEffect(() => {
    // dispatch(fetchAccounts());
    // dispatch(fetchAllProfiles({isHaveAccount: false}));
  }, []);

  const handleChangeTab = (e) => {
    if (e !== tabName) {
      dispatch(setTabName(e));
      dispatch(setSubTabName('basicInfo'));
    }
  };
  const handleChangeSubTab = (e) => {
    if (e !== tabName) {
      dispatch(setSubTabName(e));
    }
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <CTabs activeTab={tabName} onActiveTabChange={handleChangeTab}>
        <CNav variant="tabs">
          <CNavItem color="pink">
            <CNavLink data-tab="profile">Hồ sơ cá nhân</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="request" hidden={isCreate}>
              Đề xuất cá nhân
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="workHistory">Lịch sử công tác</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane data-tab="profile">
            <CTabs activeTab={subTabName} onActiveTabChange={handleChangeSubTab}>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="basicInfo">Thông tin cơ bản</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="contract">Hợp đồng làm việc</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="qualification">Trình độ chuyên môn</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="certificate">Chứng chỉ</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="contact">Thông tin liên hệ</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="salary">Tiền lương/Trợ cấp</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="DiffInfo">Thông tin khác</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="basicInfo">
                  <BasicInfo />
                </CTabPane>
                <CTabPane data-tab="contract">
                  <Contract isCreate={isCreate} />
                </CTabPane>
                <CTabPane data-tab="qualification">
                  <AcademicLevel />
                </CTabPane>
                <CTabPane data-tab="certificate">4</CTabPane>
                <CTabPane data-tab="contact">
                  <AddressInfo />
                </CTabPane>
                <CTabPane data-tab="salary">6</CTabPane>
                <CTabPane data-tab="DiffInfo">7</CTabPane>
              </CTabContent>
            </CTabs>
          </CTabPane>
          <CTabPane data-tab="request" hidden={!isCreate}></CTabPane>
          <CTabPane data-tab="workHistory">
            <HistoryWorking isCreate={isCreate} />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </CContainer>
  );
};

export default ProfileTabs;
