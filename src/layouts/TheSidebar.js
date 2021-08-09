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
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_STATE } from 'src/stores/states';
import nav from './_nav';
import { fetchPermissions } from 'src/stores/actions/role';
import { api } from 'src/stores/apis';

const TheSidebar = () => {
  let navigation = JSON.parse(JSON.stringify(nav));
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const roleId = localStorage.getItem('roleId');
  navigation = navigation.filter((x) => (x?.permission ? permissionIds.includes(x.permission) : true));
  navigation = navigation.reduce((init, item) => {
    if (item?._children) {
      item._children = item._children.filter((x) => {
        if (x.permission === 48) console.log(x?.permission ? permissionIds.includes(x.permission) : true);
        return x?.permission ? permissionIds.includes(x.permission) : true;
      });
      if (item._children.length !== 0) init.push(item);
    } else init.push(item);
    return init;
  }, []);

  const { t } = useTranslation();
  const permissionGroups = useSelector((state) => state.role.permissions);

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
  const updatePermissionIds = () => {
    api.role
      .get(roleId)
      .then(({ payload }) => {
        localStorage.setItem('permissionIds', JSON.stringify(payload.permissionIds));
        return payload;
      })
      .catch((err) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: t('message.something_went_wrong') } });
      });
  };
  useEffect(() => {
    if (permissionGroups && permissionGroups.length === 0) dispatch(fetchPermissions());
    updatePermissionIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
