import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import Label from "src/components/text/Label";
import { TheHeader } from "src/layouts";
import { CContainer } from "@coreui/react";
import { SettingShiftInfoSchema } from "src/schema/formSchema";

//TODO: translate
const NewShift = ({ t, location, match }) => {
  const params = match.params;
  const [initialValues, setInitialValues] = useState({
    shiftCode: "",
    shiftName: "",
    start: "",
    end: "",
    facOfShift: 1,
    checked: [],
    branches: [],
  });

  const handleChangeBranch = (newBranch) => {
    setInitialValues({
      ...initialValues,
      branches: newBranch,
    });
  };

  const mapChecked = (values) => {
    return values.reduce(
      (acc, val) => {
        acc[+val] = 1;
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0]
    );
  };

  const getShiftInfo = async () => {
    setInitialValues({
      shiftCode: "SĐ",
      shiftName: "Dđ",
      start: "08:30",
      end: "14:30:00.00",
      facOfShift: 3,
      checked: [],
    });
  };
  useEffect(() => {
    if (params?.id) getShiftInfo();
  }, [params]);
  // console.log(initialValues);

  // const handleCheckbox = (checkboxValue) => {
  //   console.log(checkboxValue);
  //   let temp = [...initialValues.checkBoxState];

  //   temp[checkboxValue] = !temp[checkboxValue];

  //   setInitialValues(prevState => ({
  //     ...prevState,
  //     checkBoxState: temp,
  //   }))
  // }
  const listDateOfWeek = [
    { value: "0", label: "Chủ nhật" },
    { value: "2", label: "Thứ hai" },
    { value: "3", label: "Thứ ba" },
    { value: "4", label: "Thứ " },
    { value: "5", label: "Thứ năm" },
    { value: "6", label: "Thứ sáu" },
    { value: "7", label: "Thứ bảy" },
  ];
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3 px-4">
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SettingShiftInfoSchema}
              onSubmit={(values) => {
                if (params?.id) {
                  console.log("Update Shift Success: ", values);
                } else {
                  console.log("Create Shift Success: ", values);
                }
                console.log(mapChecked(values.checked));

                window.history.back();
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
                      containerClassName={"form-group col-lg-12"}
                      value={values.shiftCode}
                      onBlur={handleBlur("shiftCode")}
                      onChange={handleChange("shiftCode")}
                      inputID={"shiftCode"}
                      labelText={"Mã ca làm"}
                      inputType={"text"}
                      placeholder={"Nhập mã ca làm"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.shiftCode}
                      isError={errors.shiftCode && touched.shiftCode}
                      errorMessage={errors.shiftCode}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.shiftName}
                      onBlur={handleBlur("shiftName")}
                      onChange={handleChange("shiftName")}
                      inputID={"shiftName"}
                      labelText={"Tên ca làm"}
                      inputType={"text"}
                      placeholder={"Nhập tên ca làm"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.shiftName}
                      isError={errors.shiftName && touched.shiftName}
                      errorMessage={errors.shiftName}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.start}
                      onBlur={handleBlur("start")}
                      onChange={handleChange("start")}
                      inputID={"start"}
                      labelText={"Giờ check-in"}
                      inputType={"Time"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.start}
                      isError={errors.start && touched.start}
                      errorMessage={errors.start}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.end}
                      onBlur={handleBlur("end")}
                      onChange={handleChange("end")}
                      inputID={"end"}
                      labelText={"Giờ check-out"}
                      inputType={"Time"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.end}
                      isError={errors.end && touched.end}
                      errorMessage={errors.end}
                      minTime={values.start}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.facOfShift}
                      onBlur={handleBlur("facOfShift")}
                      onChange={handleChange("facOfShift")}
                      inputID={"facOfShift"}
                      labelText={"Hệ số giờ làm"}
                      inputType={"number"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.facOfShift}
                      isError={errors.facOfShift && touched.facOfShift}
                      errorMessage={errors.facOfShift}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Thời gian hoạt động của ca làm" />

                      <div
                        role="group"
                        className="d-flex flex-row flex-wrap justify-content-around"
                      >
                        {listDateOfWeek.map((value, index) => (
                          <label key={index}>
                            <Field
                              type="checkbox"
                              name="checked"
                              value={value.value}
                            />
                            &nbsp;{value.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Chi nhánh:" />
                      <div
                        role="group"
                        className="d-flex flex-row flex-wrap justify-content-between"
                      >
                        <CommonMultiSelectInput
                          branches={values.branches}
                          onChangeBranch={handleChangeBranch}
                        />
                      </div>
                    </div>
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

export default NewShift;
