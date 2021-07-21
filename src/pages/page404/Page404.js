import { CCol, CContainer, CRow } from '@coreui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Page404 = ({ history, location }) => {
  const { t } = useTranslation();

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops!.</h4>
              <p className="text-muted float-left">{t('message.404')}</p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page404;
