import { CContainer } from "@coreui/react";
import React from "react";
import { TheHeader } from "src/layouts";

const Profile = ({ t, location }) => {
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div>This is Profile setting page</div>
      </CContainer>
    </>
  );
};

export default Profile;
