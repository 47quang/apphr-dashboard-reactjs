import { CContainer } from "@coreui/react";
import React from "react";
import { TheHeader } from "src/layouts";

const Role = ({ t, location }) => {
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div>This is Role setting page</div>
      </CContainer>
    </>
  );
};

export default Role;
