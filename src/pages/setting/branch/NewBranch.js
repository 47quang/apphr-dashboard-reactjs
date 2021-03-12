import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import { SettingBranchInfoSchema } from "src/schema/formSchema";
import { useDispatch } from "react-redux";
import { changeListButtonHeader } from "src/stores/actions/header";
import FormHeader from "src/components/text/FormHeader";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";


//TODO: translate

const NewBranchPage = ({ t, location, match }) => {
  const params = match.params;
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    branchName: "",
    branchCode: "",
    address: "",
    ip: "",
    description: "",
  });


  const getBranchInfo = () => {
    setInitialValues(
      {
        branchName: "APPHR Thủ Đức",
        branchCode: "TD",
        address: "Tầng 5 Vincom Thủ Đức",
        ip: "192.168.54.32",
        description: "Trụ sở chính",
      }
    );
  }

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (params?.id)
      getBranchInfo();
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicBranch"
          onClick={getOnSubmitInForm}
        >
          {(params?.id) ? "Cập nhật" : "Tạo mới"}
        </button>,
      ])
    );
    return () => {
      dispatch(changeListButtonHeader([]));
      clearTimeout(wait);
    };
  }, []);

  const getOnSubmitInForm = (event) =>
    branchInfoForm.current.handleSubmit(event);



  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={branchInfoForm}
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
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.ip}
                      onBlur={handleBlur("ip")}
                      onChange={handleChange("ip")}
                      inputID={"ip"}
                      labelText={"IP Router"}
                      inputType={"text"}
                      placeholder={"Nhập IP Router"}
                      inputClassName={"form-control"}
                      isTouched={touched.ip}
                      isError={errors.ip && touched.ip}
                      errorMessage={errors.ip}
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
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </CContainer>
  );
};

export default NewBranchPage;
