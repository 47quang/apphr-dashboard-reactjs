import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import * as Yup from "yup";
import { getRegexExpression, VALIDATION_TYPE } from "src/utils/validationUtils";
import BasicLoader from "src/components/loader/BasicLoader";
import { TheHeader } from "src/layouts";
import { CContainer } from "@coreui/react";

const SettingGeneralInfoSchema = Yup.object().shape({
  companyName: Yup.string().trim().required("Bắt buộc nhập tên công ty"),
  phoneNumber: Yup.string()
    .matches(
      getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER),
      "Nhập không đúng số điện thoại"
    )
    .required("Bắt buộc nhập số điện thoại"),
  email: Yup.string().email("Email nhập sai").required("Bắt buộc nhập email"),
  address: Yup.string().trim(),
  tax: Yup.string(),
});

//TODO: translate
const SettingGeneralPage = ({ t, location }) => {
  const companyInfoForm = useRef();
  const lstEmployeeOption = [1, 2, 3, 4, 5, 6, 7];
  const [initialValues, setInitialValues] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tax: "",
    employeeAmount: "",
    rollCallType: "",
  });
  const [isLoader, setIsLoader] = useState(true);
  const getCompanyInfo = async () => {
    setInitialValues({
      companyName: "APPHR",
      phoneNumber: "23948",
      email: "trung@t.com",
      address: "33",
      tax: "333",
      employeeAmount: "2",
      rollCallType: "3",
    });
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  };
  useEffect(() => {
    getCompanyInfo();
  }, []);
  const getOnSubmitInForm = (event) =>
    companyInfoForm.current.handleSubmit(event);

  const handleSubmitInfo = (values) => {
    console.log(values);
  };
  const getButtonSubmit = () => {
    if (isLoader) return null;
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={getOnSubmitInForm}
      >
        Submit form
      </button>
    );
  };
  return (
    <>
      <TheHeader buttonSummit={getButtonSubmit()} />
      <CContainer fluid className="c-main mb-3">
        <div className="m-auto">
          {isLoader ? (
            <BasicLoader isVisible={isLoader} radius={10} />
          ) : (
            <div className="shadow bg-white rounded p-4 container col-md-10">
              <Formik
                innerRef={companyInfoForm}
                enableReinitialize
                initialValues={initialValues}
                validationSchema={SettingGeneralInfoSchema}
                onSubmit={(values) => handleSubmitInfo(values)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                }) => (
                  <form>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.companyName}
                        onBlur={handleBlur("companyName")}
                        onChange={handleChange("companyName")}
                        inputID={"name"}
                        labelText={"Tên doanh nghiệp"}
                        inputType={"text"}
                        placeholder={"Nhập tên doanh nghiệp"}
                        inputClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.companyName}
                        isError={errors.companyName && touched.companyName}
                        errorMessage={errors.companyName}
                      />

                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.phoneNumber}
                        onBlur={handleBlur("phoneNumber")}
                        onChange={handleChange("phoneNumber")}
                        inputID={"phone"}
                        labelText={"Số điện thoại"}
                        inputType={"text"}
                        placeholder={"Nhập số điện thoại"}
                        inputClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.phoneNumber}
                        isError={errors.phoneNumber && touched.phoneNumber}
                        errorMessage={errors.phoneNumber}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChange={handleChange("email")}
                        inputID={"email"}
                        labelText={"Email"}
                        inputType={"email"}
                        placeholder={"Nhập email"}
                        inputClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.email}
                        isError={errors.email && touched.email}
                        errorMessage={errors.email}
                      />
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.address}
                        onBlur={handleBlur("address")}
                        onChange={handleChange("address")}
                        inputID={"address"}
                        labelText={"Địa chỉ"}
                        inputType={"text"}
                        placeholder={"Nhập địa chỉ"}
                        inputClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.address}
                        isError={errors.address && touched.address}
                        errorMessage={errors.address}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.tax}
                        onBlur={handleBlur("tax")}
                        onChange={handleChange("tax")}
                        inputID={"tax"}
                        labelText={"Mã số thuế"}
                        inputType={"text"}
                        placeholder={"Nhập mã số thuế"}
                        inputClassName={"form-control"}
                        isTouched={touched.tax}
                        isError={errors.tax && touched.tax}
                        errorMessage={errors.tax}
                      />
                      <CommonSelectInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.employeeAmount}
                        onBlur={handleBlur("employeeAmount")}
                        onChange={handleChange("employeeAmount")}
                        inputID={"employeeAmount"}
                        labelText={"Số lượng nhân viên"}
                        selectClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.tax}
                        isError={errors.tax && touched.tax}
                        errorMessage={errors.tax}
                        lstSelectOptions={lstEmployeeOption}
                      />
                    </div>
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.rollCallType}
                        onBlur={handleBlur("rollCallType")}
                        onChange={handleChange("rollCallType")}
                        inputID={"rollCallType"}
                        labelText={"Hình thức điểm danh"}
                        selectClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.tax}
                        isError={errors.tax && touched.tax}
                        errorMessage={errors.tax}
                        lstSelectOptions={lstEmployeeOption}
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </CContainer>
    </>
  );
};

export default SettingGeneralPage;
