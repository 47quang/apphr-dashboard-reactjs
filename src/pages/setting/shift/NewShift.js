import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import CommonTextInput from "src/components/input/CommonTextInput";
import * as Yup from "yup";
import moment from 'moment';

const isBefore = (startTime, endTime) => {
  return moment(startTime, "HH:mm").isBefore(moment(endTime, "HH:mm"));
};

const SettingShiftInfoSchema = Yup.object().shape({
  shiftCode: Yup.string().trim().required("Bắt buộc nhập mã ca làm"),
  shiftName: Yup.string().trim().required("Bắt buộc nhập tên ca làm"),
  start: Yup.string()
    .test(
      'not empty',
      'Bắt buộc chọn giờ check-in',
      function (value) {
        return !!value;
      }
    ),
  end: Yup.string()
    .test(
      'not empty',
      'Bắt buộc chọn giờ check-out',
      function (value) {
        return !!value;
      }
    ).test(
      "end_time_test",
      "Giờ check-out phải sau giờ check-in",
      function (value) {
        const { start } = this.parent;
        return isBefore(start, value);
      }
    ),
  facOfShift: Yup.number().min(0, "Hệ số giờ làm phải là một số không âm").required("Bắt buộc phải nhập hệ số giờ làm")
});

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
    }
  );
  const getShiftInfo = async () => {

    setInitialValues(
      {
        shiftCode: "SĐ",
        shiftName: "Dđ",
        start: "08:30:00.000",
        end: "14:30:00.00",
        facOfShift: 3,
      }
    );
  }
  useEffect(() => {
    if (params?.id)
      getShiftInfo();
  }, [params]);
  console.log(initialValues);


  return (
    <div className="m-auto">
      <div className="shadow bg-white rounded p-4 container col-md-6">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={SettingShiftInfoSchema}
          onSubmit={(values) => {
            if (params?.id){
              console.log("Update Shift Success: ", values);
            }
            else{
              console.log("Create Shift Success: ", values);
            }
            
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

export default NewShift;
