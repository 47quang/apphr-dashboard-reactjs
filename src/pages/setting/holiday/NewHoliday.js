import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import { TheHeader } from "src/layouts";
import { SettingHolidayInfoSchema } from "src/schema/formSchema";
//TODO: translate
const NewHolidayPage = ({ t, location }) => {
  const [initialValues, setInitialValues] = useState({
    holidayTitle: "",
    startDate: "",
    endDate: "",
  });
  return (
    <>
      <>
        <TheHeader />
        <CContainer fluid className="c-main mb-3 px-4">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SettingHolidayInfoSchema}
              onSubmit={(values) => console.log(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form>
                  <h3>Thêm ngày nghỉ</h3>
                  <hr />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.holidayTitle}
                      onBlur={handleBlur("holidayTitle")}
                      onChange={handleChange("holidayTitle")}
                      inputID={"name"}
                      labelText={"Tiêu đề"}
                      inputType={"text"}
                      placeholder={"Nhập tiêu đề cho ngày nghỉ"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.holidayTitle}
                      isError={errors.holidayTitle && touched.holidayTitle}
                      errorMessage={errors.holidayTitle}
                    />
                  </div>
                  <button onClick={handleSubmit}>hihi</button>
                </form>
              )}
            </Formik>
          </div>
        </CContainer>
      </>
    </>
  );
};

export default NewHolidayPage;
