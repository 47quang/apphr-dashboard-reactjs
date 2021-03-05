import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
  CToggler
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import routes from 'src/routes/routes';
import '../styles/scss/header.scss';

import {
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
  TheHeaderDropdown
} from './index';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Vietnam' }
];

const TheHeader = () => {
  const { i18n } = useTranslation();
  const language = useSelector(state => state.style.language);
  const sidebarShow = useSelector(state => state.style.sidebarShow);

  const dispatch = useDispatch();

  const changeLanguage(lang) {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: {
        lang
      }
    });
    i18n.changeLanguage(lang);
  }

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow)
    ? false
    : 'responsive';
    dispatch({ type: 'CHANGE_SIDEBARSHOW', payload: { sidebarShow: val } });
  };
  
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow)
      ? true
      : 'responsive';
    dispatch({ type: 'CHANGE_SIDEBARSHOW', payload: { sidebarShow: val } });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <div className="lang">
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
        </div>
        <TheHeaderDropdownNotif />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdown/>
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
