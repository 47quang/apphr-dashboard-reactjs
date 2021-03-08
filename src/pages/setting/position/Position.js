import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';
import { TheHeader } from 'src/layouts';

const Position = ({ t, location }) => {
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <QTable></QTable>
      </CContainer>
    </>
  );
};

export default Position;
