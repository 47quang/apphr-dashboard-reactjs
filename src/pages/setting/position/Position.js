import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';

const Position = ({ t, location }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable></QTable>
    </CContainer>
  );
};

export default Position;
