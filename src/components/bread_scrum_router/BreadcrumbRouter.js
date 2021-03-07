import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BreadcrumbRouter = ({ location = [] }) => {
  const { t } = useTranslation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs>
      <Link to="/">Dasboard</Link>
      {pathNames.map((value, index) => {
        const last = index === pathNames.length - 1;
        const subPath = pathNames.splice(0, index + 1);
        // console.log("subPath", subPath);
        const to = `/${subPath.join("/")}`;
        if (last) return <Typography key={to}>{t(value)}</Typography>;
        else
          return (
            <Link to={to} key={to}>
              {t(value)}
            </Link>
          );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbRouter;
