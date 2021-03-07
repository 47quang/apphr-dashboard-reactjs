import { CContainer } from "@coreui/react";
import React from "react";
import { TheHeader } from "src/layouts";

const Course = ({ t, location }) => {
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div>This is Cource setting page</div>
      </CContainer>
    </>
  );
};

export default Course;
