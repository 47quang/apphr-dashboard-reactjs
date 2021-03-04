import { Formik } from "formik";
import React from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import * as Yup from "yup";
import { getRegexExpression, VALIDATION_TYPE } from "src/utils/validationUtils";

const SettingGeneralInfoSchema = Yup.object().shape({
    companyName: Yup.string().trim().required("Bắt buộc nhập tên công ty"),
    phoneNumber: Yup.string()
        .matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), "hihi")
        .required("Bắt buộc nhập số điện thoại"),
    email: Yup.string().email("Email nhập sai").required("Bắt buộc nhập email"),
    tax: Yup.number(),
});

//TODO: translate
const SettingGeneralPage = () => {
    const lstEmployeeOption = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="m-auto">
            <div className="shadow bg-white rounded p-4 container col-md-10">
                <Formik
                    initialValues={{
                        companyName: "APPHR",
                        phoneNumber: "",
                        email: "",
                        address: "",
                        tax: "",
                        employeeAmount: "",
                        rollCallType: "",
                    }}
                    validationSchema={SettingGeneralInfoSchema}
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
                                    inputType={"number"}
                                    placeholder={"Nhập mã số thuế"}
                                    inputClassName={"form-control"}
                                    isRequiredField
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
    );
};

export default SettingGeneralPage;
