import { CContainer } from '@coreui/react';
import React, { useState } from 'react';
import RollUpInfo from 'src/components/dialog/RollUpInfo';

const RollUp = ({ t, location }) => {
  const [openRollupHistory, setOpenRollHistory] = useState(true);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <RollUpInfo
        isOpen={openRollupHistory}
        t={t}
        handleClose={() => {
          setOpenRollHistory(false);
        }}
      />
    </CContainer>
  );
};

export default RollUp;
