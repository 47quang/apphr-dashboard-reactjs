import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CHeaderNav, CBreadcrumbRouter, CToggler } from '@coreui/react';
import routes from 'src/routes/routes';
import '../styles/scss/header.scss';
import { useTranslation } from 'react-i18next';
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif';
import TheHeaderDropdownMssg from './TheHeaderDropdownMssg';
import TheHeaderDropdownTasks from './TheHeaderDropdownTasks';
import TheHeaderDropdown from './TheHeaderDropdown';
import { REDUX_STATE } from 'src/stores/states';

const TheHeader = (props) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Vietnam' },
  ];
  const sidebarShow = useSelector((state) => state.style.sidebarShow);

  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.style.language);
  const changeLanguage = (lang) => {
    dispatch({
      type: REDUX_STATE.style.CHANGE_LANGUAGE,
      payload: {
        language: lang,
      },
    });
    i18n.changeLanguage(lang);
  };
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch({ type: REDUX_STATE.style.CHANGE_SIDE_BAR_SHOW, payload: { sidebarShow: val } });
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch({ type: REDUX_STATE.style.CHANGE_SIDE_BAR_SHOW, payload: { sidebarShow: val } });
  };

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
      </CHeaderNav>
      <CHeaderNav className="ml-auto mr-3">
        <div className="lang">
          <div className={language}></div>
          <ul className="dropdown">
            {languages.map((lng, index) => {
              if (lng.code !== language) {
                return (
                  <li key={index}>
                    <div
                      onClick={() => {
                        changeLanguage(lng.code);
                      }}
                      className={lng.code}
                    ></div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        {/* <TheHeaderDropdownNotif /> */}
        {/* <TheHeaderDropdownMssg /> */}
        {/* <TheHeaderDropdownTasks /> */}
        <TheHeaderDropdown {...props} />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
