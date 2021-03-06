import React from 'react';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CHeaderNav
} from '@coreui/react';
import nav from './_nav';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import TheHeaderDropdown from './TheHeaderDropdown';
// import {
//   TheHeaderDropdown,
//   TheHeaderDropdownNotif,
//   TheHeaderDropdownTasks,
//   TheHeaderDropdownMssg
// } from './index';
const languages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Vietnam" },
];
const TheSidebar = () => {
  const navigation = JSON.parse(JSON.stringify(nav));
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const show = useSelector(state => state.style.sidebarShow);

  const changeName = (tree) => {
    if (tree.name) {
      tree.name = t(tree.name);
    }
    if (tree._children) {
      for (const child of tree._children) {
        changeName(child);
      }
    }
  }
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.style.language);
  const changeLanguage = (lang) => {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: {
        lang,
      },
    });
    i18n.changeLanguage(lang);
  };
  
  return (
    <CSidebar
      show={show}
      onShowChange={val => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img
          src="/public/images/sysadmin_logo.png"
          alt=""
          style={{ height: '35px' }}
        />
      </CSidebarBrand>
      {/* <CHeaderNav> */}
        {/* <div className="lang">
          <div className={language}></div>
          <ul className="dropdown">
            {languages.map((lng, index) => {
              if (lng.code !== language) {
                return (
                  <li key={index}>
                    <div
                      onClick={() => changeLanguage(lng.code)}
                      className={lng.code}
                    ></div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div> */}
        {/* <TheHeaderDropdownNotif /> */}
        {/* <TheHeaderDropdownMssg /> */}
        {/* <TheHeaderDropdownTasks /> */}
        
      {/* </CHeaderNav> */}
      <CSidebarNav>
        <TheHeaderDropdown />
        <CCreateElement
          items={navigation.map(i => {
            changeName(i);
            return i;
          })}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
