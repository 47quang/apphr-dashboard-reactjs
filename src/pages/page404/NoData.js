import { CContainer } from '@coreui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NoData = ({ history, location }) => {
  const { t } = useTranslation();

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <div className="row justify-content-center ">
          <img src="/images/sad_face.svg" alt="no data" width="300px" height="300px" />
          <div className="my-auto">
            <div className="d-block">
              <h2 className="pt-3">Oops!.</h2>
            </div>
            <div>
              <h3 className="text-muted float-left">{t('message.no_data')}</h3>
            </div>
          </div>
        </div>
      </CContainer>
    </div>
  );
};

export default NoData;
