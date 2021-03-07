import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import FormHeader from "src/components/text/FormHeader";
import { TheHeader } from "src/layouts";
import { SettingHolidayInfoSchema } from "src/schema/formSchema";
//TODO: translate
const NewHolidayPage = ({ t, location }) => {
  const [initialValues, setInitialValues] = useState({
    holidayTitle: "",
    startDate: "",
    endDate: "",
  });
  const getHolidayInfo = () => {
    setInitialValues({
      holidayTitle: "",
      startDate: "",
      endDate: "",
    });
  };
  useEffect(() => {
    getHolidayInfo();
  }, []);
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
                  <FormHeader text="Thêm ngày nghỉ lễ" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.holidayTitle}
                      onBlur={handleBlur("holidayTitle")}
                      onChange={handleChange("holidayTitle")}
                      inputID={"holidayTitle"}
                      labelText={"Tiêu đề"}
                      inputType={"text"}
                      placeholder={"Nhập tiêu đề cho ngày nghỉ"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.holidayTitle}
                      isError={errors.holidayTitle && touched.holidayTitle}
                      errorMessage={errors.holidayTitle}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.startDate}
                      onBlur={handleBlur("startDate")}
                      onChange={handleChange("startDate")}
                      inputID={"startDate"}
                      labelText={"Ngày bắt đầu"}
                      inputType={"date"}
                      placeholder={"Nhập ngày bắt đầu"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.startDate}
                      isError={errors.startDate && touched.startDate}
                      errorMessage={errors.startDate}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.endDate}
                      onBlur={handleBlur("endDate")}
                      onChange={handleChange("endDate")}
                      inputID={"endDate"}
                      labelText={"Ngày kết thúc"}
                      inputType={"date"}
                      placeholder={"Nhập ngày kết thúc"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.endDate}
                      isError={errors.endDate && touched.endDate}
                      errorMessage={errors.endDate}
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
