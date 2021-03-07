import { CContainer } from "@coreui/react";
import React from "react";
import { TheHeader } from "src/layouts";

const PermissionGroup = ({ t, location }) => {
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div>This is PermissionGroup setting page</div>
      </CContainer>
    </>
  );
};

export default PermissionGroup;
