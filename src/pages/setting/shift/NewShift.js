import { CContainer } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import Label from "src/components/text/Label";
import { SettingShiftInfoSchema } from "src/schema/formSchema";
import { useDispatch } from "react-redux";
import { changeListButtonHeader } from "src/stores/actions/header";

//TODO: translate
const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const typeOfRollUp = [
  "WIFI",
  "QR_CODE",
];

const NewShift = ({ t, location, match }) => {
  const params = match.params;
  const shiftInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(
    {
      shiftCode: "",
      shiftName: "",
      start: "",
      end: "",
      facOfShift: 1,
      checked: [],
      branches: [],
      typeOfRollUp: "",
    }
  );

  const handleChangeBranch = (newBranch) => {
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
        checked: ["3", "1", "5"],
        branches: [1, 3, 5],
        typeOfRollUp: typeOfRollUp[0],
      }
    );
  }

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (params?.id)
      getShiftInfo();
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicShift"
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
    shiftInfoForm.current.handleSubmit(event);

  const enCodeChecked = (checked) => checked.reduce((acc, val) => {
    acc[val - 1] = 1;
    return acc;
  }, Array(7).fill(0));

  const deCodeChecked = (_checked) => _checked.reduce((acc, val, idx) => {
    if (val !== 0)
      acc.push(idx + 1 + '');
    return acc
  }, []);


  const handleSubmitInfo = (values) => {
    console.log(values);
    values.checked = enCodeChecked(values.checked);
    values.checked = deCodeChecked(values.checked);
    console.log(values);
  };


  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (<div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={shiftInfoForm}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={SettingShiftInfoSchema}
            onSubmit={(values) => handleSubmitInfo(values)}
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
                        <Field type="checkbox" name="checked" value={index + ''} />
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
              </form>
            )}
          </Formik>
        </div>
      </div>
      )}
    </CContainer>
  );
};

export default NewShift;
