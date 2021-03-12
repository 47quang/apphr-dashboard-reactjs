import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import { SettingHolidayInfoSchema } from "src/schema/formSchema";
import { changeListButtonHeader } from "src/stores/actions/header";
import FormHeader from "src/components/text/FormHeader";

//TODO: translate

const NewHolidayPage = ({ t, location, match }) => {
  const params = match.params;
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    holidayTitle: "",
    startDate: "",
    endDate: "",
    coefficient: 1,
  });

  const getHolidayInfo = () => {
    setInitialValues({
      holidayTitle: "Tết Dương lịch",
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      coefficient: 2,
    });
  };

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (params?.id) getHolidayInfo();
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicHoliday"
          onClick={getOnSubmitInForm}
        >
          {params?.id ? "Cập nhật" : "Tạo mới"}
        </button>,
      ])
    );
    return () => {
      dispatch(changeListButtonHeader([]));
      clearTimeout(wait);
    };
  }, []);

  const getOnSubmitInForm = (event) =>
    holidayInfoForm.current.handleSubmit(event);

  const handleSubmitInfo = (values) => {
    console.log(values);
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={holidayInfoForm}
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
                </form>
              )}
            </Formik>
          </div>
          ;
        </div>
      )}
    </CContainer>
  );
};

export default NewHolidayPage;
