import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";

import BasicLoader from "src/components/loader/BasicLoader";
import { TheHeader } from "src/layouts";
import { CContainer } from "@coreui/react";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import { SettingGeneralInfoSchema } from "src/schema/formSchema";

//TODO: translate
const SettingGeneralPage = ({ t, location }) => {
  const companyInfoForm = useRef();
  const [initialValues, setInitialValues] = useState({
    companyName: "",
    provinceId: 0,
    districtId: 0,
    wardId: 0,
    address: "",
    phone: "",
    email: "",
    shortName: "",
    taxCode: "",
    note: "",
  });
  const [isLoader, setIsLoader] = useState(true);
  const getCompanyInfo = async () => {
    setInitialValues({
      companyName: "APPHPR",
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      address: "",
      phone: "",
      email: "",
      shortName: "",
      taxCode: "",
      note: "",
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
      <TheHeader buttonSummit={getButtonSubmit()} location={location} />
      <CContainer fluid className="c-main mb-3 px-4">
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
                {({ values, errors, touched, handleChange, handleBlur }) => (
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
                        value={values.shortName}
                        onBlur={handleBlur("shortName")}
                        onChange={handleChange("shortName")}
                        inputID={"shortName"}
                        labelText={"Tên viết tắt của doanh nghiệp"}
                        inputType={"text"}
                        placeholder={"Nhập tên viết tắt"}
                        inputClassName={"form-control"}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.phone}
                        onBlur={handleBlur("phone")}
                        onChange={handleChange("phone")}
                        inputID={"phone"}
                        labelText={"Số điện thoại"}
                        inputType={"text"}
                        placeholder={"Nhập số điện thoại"}
                        inputClassName={"form-control"}
                        isRequiredField
                        isTouched={touched.phone}
                        isError={errors.phone && touched.phone}
                        errorMessage={errors.phone}
                      />
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
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-6"}
                        value={values.taxCode}
                        onBlur={handleBlur("taxCode")}
                        onChange={handleChange("taxCode")}
                        inputID={"taxCode"}
                        labelText={"Mã số thuế"}
                        inputType={"text"}
                        placeholder={"Nhập mã số thuế"}
                        inputClassName={"form-control"}
                      />
                    </div>

                    <div className="row">
                      <CommonTextInput
                        containerClassName={"form-group col-lg-12"}
                        value={values.address}
                        onBlur={handleBlur("address")}
                        onChange={handleChange("address")}
                        inputID={"address"}
                        labelText={"Địa chỉ cụ thể"}
                        inputType={"text"}
                        placeholder={"Nhập địa chỉ cụ thể"}
                        inputClassName={"form-control"}
                      />
                    </div>
                    <div className="row">
                      <CommonMultipleTextInput
                        containerClassName={"form-group col-lg-12"}
                        value={values.note}
                        onBlur={handleBlur("note")}
                        onChange={handleChange("note")}
                        inputID={"note"}
                        labelText={"Ghi chú"}
                        inputClassName={"form-control"}
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
