import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import BasicLoader from "src/components/loader/BasicLoader";
import FormHeader from "src/components/text/FormHeader";
import { SettingBranchInfoSchema } from "src/schema/formSchema";
import { changeListButtonHeader } from "src/stores/actions/header";

//TODO: translate

const NewBranchPage = ({ t, location, match }) => {
  const params = match.params;
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    shortname: "",
    address: "",
    ip: "",
    description: "",
  });

  const getBranchInfo = () => {
    setInitialValues({
      name: "APPHR Thủ Đức",
      shortname: "TD",
      address: "Tầng 5 Vincom Thủ Đức",
      ip: "192.168.54.32",
      description: "Trụ sở chính",
    });
  };

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (params?.id) getBranchInfo();
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicBranch"
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
    branchInfoForm.current.handleSubmit(event);

  const getListOfProvinces = () => {
    let lstOfProvinces = [
      { id: 1, name: "Hồ Chí Minh" },
      { id: 5, name: "Bình Dương" },
    ];
    return lstOfProvinces;
  };
  const getListOfDistricts = (provinceID) => {
    if (provinceID === "1")
      return [
        { id: 1, name: "Quận 1" },
        { id: 2, name: "Quận 2" },
        { id: 3, name: "Quận 3" },
        { id: 4, name: "Quận 4" },
        { id: 5, name: "Quận 5" },
        { id: 6, name: "Quận 10" },
        { id: 10, name: "Quận Thủ Đức" },
      ];
    else if (provinceID === "5")
      return [
        { id: 1, name: "Dĩ An" },
        { id: 2, name: "Thủ Dầu Một" },
      ];
  };

  const getListOfWars = (districtID) => {
    let lstWars = [
      { id: 1, name: "Phường 01" },
      { id: 2, name: "Phường 02" },
      { id: 3, name: "Phường 03" },
      { id: 5, name: "Phường 05" },
      { id: 7, name: "Phường 07" },
      { id: 9, name: "Phường 09" },
    ];
    return lstWars;
  };

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
                      containerClassName={"form-group col-lg-6"}
                      value={values.shortname}
                      onBlur={handleBlur("shortname")}
                      onChange={handleChange("shortname")}
                      inputID={"shortname"}
                      labelText={"Mã chi nhánh"}
                      inputType={"text"}
                      placeholder={"Nhập mã chi nhánh"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.shortname}
                      isError={errors.shortname && touched.shortname}
                      errorMessage={errors.shortname}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.name}
                      onBlur={handleBlur("name")}
                      onChange={handleChange("name")}
                      inputID={"name"}
                      labelText={"Tên chi nhánh"}
                      inputType={"text"}
                      placeholder={"Nhập tên chi nhánh"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={errors.name}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-6"}
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
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.provinceId}
                      onBlur={handleBlur("provinceId")}
                      onChange={handleChange("provinceId")}
                      inputID={"provinceId"}
                      labelText={"Tỉnh/Thành phố"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Tỉnh/Thành phố"}
                      lstSelectOptions={getListOfProvinces()}
                    />
                  </div>

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.districtId}
                      onBlur={handleBlur("districtId")}
                      onChange={handleChange("districtId")}
                      inputID={"districtId"}
                      labelText={"Quận huyện"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Quận/Huyện"}
                      lstSelectOptions={getListOfDistricts(values.provinceId)}
                    />
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.wardId}
                      onBlur={handleBlur("wardId")}
                      onChange={handleChange("wardId")}
                      inputID={"wardId"}
                      labelText={"Phường xã"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Phường/Xã"}
                      lstSelectOptions={getListOfWars(values.provinceId)}
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
