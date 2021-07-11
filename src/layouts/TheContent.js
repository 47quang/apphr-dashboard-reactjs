import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';
import utils from 'src/utils/index';
// routes config
import routes from 'src/routes/routes';
import { withTranslation } from 'react-i18next';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = ({ t, i18n }) => {
  console.log('tt', { t });
  return (
    <main>
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <CFade>
                      <route.component utils={utils} t={t} i18n={i18n} {...props} />
                    </CFade>
                  )}
                />
              )
            );
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </main>
  );
};

export default React.memo(withTranslation()(TheContent));
