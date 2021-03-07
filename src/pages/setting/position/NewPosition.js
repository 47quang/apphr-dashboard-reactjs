import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import Label from "src/components/text/Label";
import { TheHeader } from "src/layouts";
import { CContainer } from "@coreui/react";
import {
  SettingPositionInfoSchema,
  SettingShiftInfoSchema,
} from "src/schema/formSchema";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import FormHeader from "src/components/text/FormHeader";

//TODO: translate
const NewPositionPage = ({ t, location, match }) => {
  const params = match.params;
  const [initialValues, setInitialValues] = useState({
    positionName: "",
    positionCode: "",
    department: "",
    branch: "",
    shift: [],
    description: "",
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
      positionName: "",
      positionCode: "",
      department: "",
      branch: "",
      shift: [],
      description: "",
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
              validationSchema={SettingPositionInfoSchema}
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
                  <FormHeader text="Thêm vị trí" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.positionCode}
                      onBlur={handleBlur("positionCode")}
                      onChange={handleChange("positionCode")}
                      inputID={"positionCode"}
                      labelText={"Mã vị trí"}
                      inputType={"text"}
                      placeholder={"Nhập mã vị trí"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.positionCode}
                      isError={errors.positionCode && touched.positionCode}
                      errorMessage={errors.positionCode}
                    />
                  </div>

                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.positionName}
                      onBlur={handleBlur("positionName")}
                      onChange={handleChange("positionName")}
                      inputID={"positionName"}
                      labelText={"Tên vị trí"}
                      inputType={"text"}
                      placeholder={"Nhập tên vị trí"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.positionName}
                      isError={errors.positionName && touched.positionName}
                      errorMessage={errors.positionName}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.department}
                      labelText={"Phòng ban"}
                      selectClassName={"form-control"}
                      isRequiredField
                      onBlur={handleBlur("department")}
                      onChange={handleChange("department")}
                      inputID={"department"}
                      lstSelectOptions={["p1", "p2"]}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Chi nhánh" />
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
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Ca làm việc" />
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
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.description}
                      onBlur={handleBlur("description")}
                      onChange={handleChange("description")}
                      inputID={"description"}
                      labelText={"Ghi chú"}
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

export default NewPositionPage;
