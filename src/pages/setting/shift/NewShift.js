import { CContainer } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import Label from "src/components/label/label";
import { TheHeader } from "src/layouts";
import { SettingShiftInfoSchema } from "src/schema/formSchema";

const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const typeOfRollUp = [
  "WIFI",
  "QR_CODE",
];



//TODO: translate
const NewShift = ({ t, location, match }) => {
  const params = match.params;
  const [initialValues, setInitialValues] = useState(
    {
      shiftCode: "",
      shiftName: "",
      start: "",
      end: "",
      facOfShift: 1,
      checked: [0, 0, 0, 0, 0, 0, 0],
      branches: [],
      typeOfRollUp: ""
    }
  );

  const handleChangeBranch = (newBranch) => {
    // console.log("handleChangeBranch");

    setInitialValues({
      ...initialValues,
      branches: newBranch,
    });
  };


  const getShiftInfo = () => {
    setInitialValues(
      {
        shiftCode: "SĐ",
        shiftName: "Dđ",
        start: "08:30",
        end: "14:30:00.00",
        facOfShift: 3,
        checked: [0, 1, 0, 1, 0, 1, 0],
        branches: [1, 3, 5],
        typeOfRollUp: typeOfRollUp[0],
      }
    );
  }

  useEffect(() => {
    if (params?.id)
      getShiftInfo();
  }, [params]);


  const handleChangeCheckbox = (e) => {
    const id = e.target.id;
    let temp = [...initialValues.checked];
    temp[id] = (temp[id] + 1) % 2;

    setInitialValues({
      ...initialValues,
      checked: temp,
    })
  }

  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={SettingShiftInfoSchema}
            onSubmit={(values) => {
              if (params?.id) {
                console.log("Update Shift Success: ", values);
              }
              else {
                console.log("Create Shift Success: ", values);
              }

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
                    <Label text="Thời gian hoạt động của ca làm:" />
                    <div role="group" className="d-flex flex-row flex-wrap justify-content-around">
                      {DAYS.map((day, index) => (<label key={index}>
                        <Field type="checkbox" name="checked" id={index} checked={values.checked[index]} onChange={handleChangeCheckbox} />
                      &nbsp;{day}
                      </label>))}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Chi nhánh:" />
                    <div className="d-flex flex-row flex-wrap justify-content-between">
                      <CommonMultiSelectInput branches={values.branches} onChangeBranch={handleChangeBranch} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <CommonSelectInput
                    containerClassName={"form-group col-lg-12"}
                    value={values.typeOfRollUp}
                    onBlur={handleBlur("typeOfRollUp")}
                    onChange={handleChange("typeOfRollUp")}
                    inputID={"typeOfRollUp"}
                    labelText={"Hình thức điểm danh"}
                    selectClassName={"form-control"}
                    isRequiredField
                    isTouched={touched.typeOfRollUp}
                    isError={errors.typeOfRollUp && touched.typeOfRollUp}
                    errorMessage={errors.typeOfRollUp}
                    lstSelectOptions={typeOfRollUp}
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

      </CContainer>
    </>
  );
};

export default NewShift;
