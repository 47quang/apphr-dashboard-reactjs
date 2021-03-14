import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import { SettingHolidayLimitSchema } from "src/schema/formSchema";
import { changeListButtonHeader } from "src/stores/actions/header";
import FormHeader from "src/components/text/FormHeader";

//TODO: translate

const HolidaySettings = ({ t, location, match }) => {
  const params = match.params;
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    type: "",
    total: "",
  });

  const getHolidayInfo = () => {
    setInitialValues({
      type: "Nghỉ có phép",
      total: "12",
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
              validationSchema={SettingHolidayLimitSchema}
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
                      value={values.type}
                      onBlur={handleBlur("type")}
                      onChange={handleChange("type")}
                      inputID={"type"}
                      labelText={"Loại đề xuất"}
                      inputType={"text"}
                      inputClassName={"form-control"}
                      isDisable={true}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.total}
                      onBlur={handleBlur("total")}
                      onChange={handleChange("total")}
                      inputID={"total"}
                      labelText={"Tổng số ngày tối đa"}
                      inputType={"number"}
                      placeholder={"Nhập tổng số ngày tối đa"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.total}
                      isError={errors.total && touched.total}
                      errorMessage={errors.total}
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

export default HolidaySettings;
