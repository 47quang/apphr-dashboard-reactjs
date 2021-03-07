import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import FormHeader from "src/components/text/FormHeader";
import { TheHeader } from "src/layouts";
import { SettingBranchInfoSchema } from "src/schema/formSchema";

//TODO: translate
const NewBranchPage = ({ t, location, match }) => {
  const params = match.params;
  const [initialValues, setInitialValues] = useState({
    branchName: "",
    branchCode: "",
    address: "",
    description: "",
  });

  const getShiftInfo = async () => {
    setInitialValues({
      branchName: "",
      branchCode: "",
      address: "",
      description: "",
    });
  };
  useEffect(() => {
    if (params?.id) getShiftInfo();
  }, [params]);

  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SettingBranchInfoSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form autoComplete="off">
                  <FormHeader text={"Thêm chi nhánh"} />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.branchCode}
                      onBlur={handleBlur("branchCode")}
                      onChange={handleChange("branchCode")}
                      inputID={"branchCode"}
                      labelText={"Mã chi nhánh"}
                      inputType={"text"}
                      placeholder={"Nhập mã chi nhánh"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.branchCode}
                      isError={errors.branchCode && touched.branchCode}
                      errorMessage={errors.branchCode}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.branchName}
                      onBlur={handleBlur("branchName")}
                      onChange={handleChange("branchName")}
                      inputID={"branchName"}
                      labelText={"Tên chi nhánh"}
                      inputType={"text"}
                      placeholder={"Nhập tên chi nhánh"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.branchName}
                      isError={errors.branchName && touched.branchName}
                      errorMessage={errors.branchName}
                    />
                  </div>

                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.address}
                      onBlur={handleBlur("address")}
                      onChange={handleChange("address")}
                      inputID={"address"}
                      labelText={"Địa chỉ chi nhánh"}
                      inputType={"text"}
                      placeholder={"Nhập địa chỉ chi nhánh"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.address}
                      isError={errors.address && touched.address}
                      errorMessage={errors.address}
                    />
                  </div>
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.description}
                      onBlur={handleBlur("description")}
                      onChange={handleChange("description")}
                      inputID={"description"}
                      labelText={"Mô tả"}
                      inputClassName={"form-control"}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit form
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </CContainer>
    </>
  );
};

export default NewBranchPage;
