import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CHeaderNav,
  CBreadcrumbRouter,
  CToggler,
} from "@coreui/react";
import { Link } from "react-router-dom";
import routes from "src/routes/routes";
import "../styles/scss/header.scss";

const TheHeader = () => {
  const sidebarShow = useSelector((state) => state.style.sidebarShow);

  const actions = useSelector((state) => state.header.actions);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "CHANGE_SIDEBARSHOW", payload: { sidebarShow: val } });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "CHANGE_SIDEBARSHOW", payload: { sidebarShow: val } });
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

      <CHeaderNav className="d-md-down-none mr-auto">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CHeaderNav>
      <CHeaderNav className="px-3">
        {actions.map((action, index) => {
          const { type, name, callback, to } = action;
          return to ? (
            <Link to={to} className={`btn btn-${type}`} key={index}>
              Tạo ca làm
            </Link>
          ) : (
            <button
              key={index}
              type="submit"
              className={`btn btn-${type}`}
              onClick={callback}
            >
              {name}
            </button>
          );
        })}
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
