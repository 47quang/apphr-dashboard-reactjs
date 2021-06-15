import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from '@coreui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_STATE } from 'src/stores/states';
import nav from './_nav';
const TheSidebar = () => {
  let navigation = JSON.parse(JSON.stringify(nav));
  const permissionIds = localStorage.getItem('permissionIds');
  navigation = navigation.filter((x) => (x?.permission ? permissionIds.includes(x.permission) : true));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const show = useSelector((state) => state.style.sidebarShow);

  const changeName = (tree) => {
    if (tree.name) {
      tree.name = t(tree.name);
    }
    if (tree._children) {
      for (const child of tree._children) {
        changeName(child);
      }
    }
  };
  console.log('show', show);
  return (
    <CSidebar
      fixed={true}
      show={show}
      onShowChange={(val) => {
        const value = [true, 'responsive'].includes(val) ? false : 'responsive';
        dispatch({ type: REDUX_STATE.style.CHANGE_SIDE_BAR_SHOW, payload: { sidebarShow: value } });
      }}
      style={{ overflowY: 'hidden' }}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img className="c-sidebar-brand-full" name="logo-negative" src="images/long_logo.png" alt="" style={{ height: '45px' }} />
        <img className="c-sidebar-brand-minimized" name="sygnet" src="images/short_logo.png" alt="" style={{ height: '45px' }} />
      </CSidebarBrand>

      <CSidebarNav>
        <CCreateElement
          items={navigation.map((i) => {
            changeName(i);
            return i;
          })}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-lg-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
