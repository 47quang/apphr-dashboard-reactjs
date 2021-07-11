import { CButton, CHeader, CHeaderNav, CToggler } from '@coreui/react';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/stores/actions/user';
import { REDUX_STATE } from 'src/stores/states';
import '../styles/scss/header.scss';

const TheHeader = (props) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Vietnam' },
  ];
  const sidebarShow = useSelector((state) => state.style.sidebarShow);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
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
        <CButton
          onClick={(e) => {
            dispatch(logout(props.history));
          }}
          className="d-flex flex-row justify-content-between"
          title={t('title.logout')}
        >
          <ExitToApp style={{ color: 'red' }} />
        </CButton>
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
