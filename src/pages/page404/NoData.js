import { CContainer, CRow } from '@coreui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NoData = ({ history, location }) => {
  const { t } = useTranslation();

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <div className="clearfix">
            <div className="row d-flex justyfy-content-center">
              <h2 className="pt-3">Oops!.</h2>
            </div>
            <div className="row d-flex justyfy-content-center">
              <h3 className="text-muted float-left">{t('message.no_data')}</h3>
            </div>
          </div>
        </CRow>
      </CContainer>
    </div>
  );
};

export default NoData;
