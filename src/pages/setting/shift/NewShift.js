import { CContainer } from "@coreui/react";
import { StarRateTwoTone } from "@material-ui/icons";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import Label from "src/components/text/Label";
import { SettingShiftInfoSchema } from "src/schema/formSchema";
import { changeListButtonHeader } from "src/stores/actions/header";
import {
  createNewShift,
  fetchShift,
  updateShift,
} from "src/stores/actions/shift";
import { api } from "src/stores/apis";
import { REDUX_STATE } from "src/stores/states";

//TODO: translate
const DAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];
const typeCC = [
  { id: "WIFI", name: "WIFI" },
  { id: "QR_CODE", name: "QR_CODE" },
];
const listOfBranches = [
  { id: 1, name: "APPHR Thủ Đức" },
  { id: 2, name: "APPHR Quận 1" },
  { id: 3, name: "APPHR Quận 2" },
  { id: 4, name: "APPHR Quận 3" },
  { id: 5, name: "APPHR Quận 4" },
  { id: 6, name: "APPHR Quận 5" },
  { id: 7, name: "APPHR Quận 6" },
  { id: 8, name: "APPHR Quận 7" },
  { id: 9, name: "APPHR Quận 8" },
  { id: 10, name: "APPHR Quận 9" },
  { id: 11, name: "APPHR Quận 10" },
];

const NewShift = ({ t, location, match }) => {
  const params = match.params;
  const shiftInfoForm = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);
  const [isLoading, setIsLoading] = useState(true);
  const shiftId = params?.id;
  const getShiftInfo = (id) => {
    dispatch(fetchShift(id));
  };

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (shiftId) getShiftInfo(params.id);
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicShift"
          onClick={getOnSubmitInForm}
        >
          {shiftId ? "Cập nhật" : "Tạo mới"}
        </button>,
      ])
    );
    return () => {
      dispatch({ type: REDUX_STATE.shift.EMPTY_VALUE });
      dispatch(changeListButtonHeader([]));
      clearTimeout(wait);
    };
  }, []);

  const getOnSubmitInForm = (event) =>
    shiftInfoForm.current.handleSubmit(event);

  const enCodeChecked = (operateLoop) => {
    return operateLoop.reduce((acc, val) => {
      acc[parseInt(val)] = 1;
      return acc;
    }, Array(7).fill(0));
  };
  const formatTime = (time) => {
    return time + ":00";
  };
  const deCodeChecked = (_checked) =>
    _checked.reduce((acc, val, idx) => {
      if (val !== 0) acc.push(idx + 1 + "");
      return acc;
    }, []);

  const handleSubmitInfo = (values) => {
    let valuesTemp = values;
    valuesTemp.operateLoop = enCodeChecked(values.operateLoop);
    valuesTemp.startCC = formatTime(values.startCC);
    valuesTemp.endCC = formatTime(values.endCC);
    if (shiftId) dispatch(updateShift(values));
    else dispatch(createNewShift(values));
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={shiftInfoForm}
              enableReinitialize
              initialValues={shift}
              validationSchema={SettingShiftInfoSchema}
              onSubmit={(values) => handleSubmitInfo(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setValues,
                handleBlur,
              }) => (
                <form autoComplete="off">
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.shortname}
                      onBlur={handleBlur("shortname")}
                      onChange={handleChange("shortname")}
                      inputID={"shortname"}
                      labelText={"Mã ca làm"}
                      inputType={"text"}
                      placeholder={"Nhập mã ca làm"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.shortname}
                      isError={errors.shortname && touched.shortname}
                      errorMessage={errors.shortname}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.name}
                      onBlur={handleBlur("name")}
                      onChange={handleChange("name")}
                      inputID={"name"}
                      labelText={"Tên ca làm"}
                      inputType={"text"}
                      placeholder={"Nhập tên ca làm"}
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
                      value={values.startCC}
                      onBlur={handleBlur("startCC")}
                      onChange={handleChange("startCC")}
                      inputID={"startCC"}
                      labelText={"Giờ check-in"}
                      inputType={"Time"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.startCC}
                      isError={errors.startCC && touched.startCC}
                      errorMessage={errors.startCC}
                    />
                    <CommonTextInput
                      containerClassName={"form-group col-lg-6"}
                      value={values.endCC}
                      onBlur={handleBlur("endCC")}
                      onChange={handleChange("endCC")}
                      inputID={"endCC"}
                      labelText={"Giờ check-out"}
                      inputType={"Time"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.endCC}
                      isError={errors.endCC && touched.endCC}
                      errorMessage={errors.endCC}
                      minTime={values.startCC}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.coefficient}
                      onBlur={handleBlur("coefficient")}
                      onChange={handleChange("coefficient")}
                      inputID={"coefficient"}
                      labelText={"Hệ số giờ làm"}
                      inputType={"number"}
                      inputClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.coefficient}
                      isError={errors.coefficient && touched.coefficient}
                      errorMessage={errors.coefficient}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Thời gian hoạt động của ca làm:" />
                      <div
                        role="group"
                        className="d-flex flex-row flex-wrap justify-content-around"
                      >
                        {DAYS.map((day, index) => (
                          <label key={index}>
                            <Field
                              type="checkbox"
                              name="operateLoop"
                              value={index + ""}
                            />
                            &nbsp;{day}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Chi nhánh:" />
                      <div className="d-flex flex-row flex-wrap justify-content-between border">
                        <CommonMultiSelectInput
                          values={values.branchIds}
                          onChangeValues={handleChange("branchIds")}
                          listValues={listOfBranches}
                          setValues={setValues}
                          placeholder={"Chọn chi nhánh"}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.typeCC}
                      onBlur={handleBlur("typeCC")}
                      onChange={handleChange("typeCC")}
                      inputID={"typeCC"}
                      labelText={"Hình thức điểm danh"}
                      selectClassName={"form-control"}
                      isRequiredField
                      isTouched={touched.typeCC}
                      isError={errors.typeCC && touched.typeCC}
                      errorMessage={errors.typeCC}
                      lstSelectOptions={typeCC}
                      placeholder={"Chọn hình thức điểm danh"}
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
