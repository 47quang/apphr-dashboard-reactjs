import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import BasicLoader from "src/components/loader/BasicLoader";
import { SettingGeneralInfoSchema } from "src/schema/formSchema";
import { changeListButtonHeader } from "src/stores/actions/header";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "src/stores/actions/location";

//TODO: translate
const SettingGeneralPage = ({ t, location }) => {
  const companyInfoForm = useRef();
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
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
    }, 500);
  };
  useEffect(() => {
    dispatch(fetchProvinces());
    getCompanyInfo();
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          onClick={getOnSubmitInForm}
          key="submit"
        >
          Submit form
        </button>,
      ])
    );
    return () => {
      dispatch(changeListButtonHeader([]));
    };
  }, []);
  const getOnSubmitInForm = (event) =>
    companyInfoForm.current.handleSubmit(event);

  const handleSubmitInfo = (values) => {
    console.log(values);
  };

  const getDistricts = (id) => {
    dispatch(fetchDistricts({ provinceID: id }));
  };

  const getWards = (id) => {
    dispatch(fetchWards({ districtID: id }));
  };

  const getAddressInfo = (handeChange, getInfo) => {};
  return (
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
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.provinceId}
                      onBlur={handleBlur("provinceId")}
                      onChange={(e) => {
                        getDistricts(e.target.value);
                        handleChange("provinceId")(e);
                      }}
                      inputID={"provinceId"}
                      labelText={"Tỉnh/Thành phố"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Tỉnh/Thành phố"}
                      lstSelectOptions={provinces}
                    />
                  </div>

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.districtId}
                      onBlur={handleBlur("districtId")}
                      onChange={(e) => {
                        getWards(e.target.value);
                        handleChange("districtId")(e);
                      }}
                      inputID={"districtId"}
                      labelText={"Quận/Huyện"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Quận/Huyện"}
                      lstSelectOptions={districts}
                    />
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.wardId}
                      onBlur={handleBlur("wardId")}
                      onChange={handleChange("wardId")}
                      inputID={"wardId"}
                      labelText={"Phường/xã"}
                      selectClassName={"form-control"}
                      placeholder={"Chọn Phường/Xã"}
                      lstSelectOptions={wards}
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
  );
};

export default SettingGeneralPage;
