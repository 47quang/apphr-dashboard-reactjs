import { CContainer } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import Label from "src/components/text/Label";
import { SettingShiftInfoSchema } from "src/schema/formSchema";
import { fetchBranches } from "src/stores/actions/branch";
import {
  changeActions,
  changeListButtonHeader,
} from "src/stores/actions/header";
import { fetchShift, updateShift } from "src/stores/actions/shift";

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

const UpdateShift = ({ t, location, match }) => {
  const shiftInfoForm = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);
  const [isLoading, setIsLoading] = useState(true);
  const shiftId = match.params.id;
  const wait = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    wait();
    dispatch(fetchShift(shiftId));

    dispatch(
      fetchBranches({
        page: 0,
        perpage: 1000,
      })
    );
    dispatch(
      changeListButtonHeader([
        <button
          className="btn btn-primary"
          type="submit"
          key="magicShift"
          onClick={getOnSubmitInForm}
        >
          {"Cập nhật"}
        </button>,
      ])
    );
    const actions = [
      {
        type: "primary",
        name: "Cập nhật",
        callback: getOnSubmitInForm,
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
      clearTimeout(wait);
    };
  }, [dispatch, shiftId]);

  const getOnSubmitInForm = (event) =>
    shiftInfoForm.current.handleSubmit(event);

  const enCodeChecked = (operateLoop) => {
    return operateLoop.reduce((acc, val) => {
      acc[parseInt(val)] = 1;
      return acc;
    }, Array(7).fill(0));
  };

  const convertTime = (time) => {
    const timeTemp = time.split(":");
    return timeTemp.length === 2 ? time + ":00" : time;
  };

  const handleSubmitInfo = (values) => {
    let valuesTemp = values;
    valuesTemp.operateLoop = enCodeChecked(values.operateLoop);
    valuesTemp.startCC = convertTime(values.startCC);
    valuesTemp.endCC = convertTime(values.endCC);
    setIsLoading(true);
    dispatch(updateShift(valuesTemp, shiftId));
    wait();
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
              initialValues={shift?.shift ? shift.shift : shift}
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
                      <Label
                        text="Thời gian hoạt động của ca làm"
                        required={true}
                      />
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
                      {touched.operateLoop && errors.operateLoop && (
                        <div>
                          <small className={"text-danger"}>
                            {errors.operateLoop}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Chi nhánh" required={true} />
                      <div className="d-flex flex-row flex-wrap justify-content-between border">
                        <CommonMultiSelectInput
                          values={values.branchIds}
                          onChangeValues={handleChange("branchIds")}
                          listValues={
                            branches?.branches ? branches.branches : branches
                          }
                          setValues={setValues}
                          placeholder={"Chọn chi nhánh"}
                          isTouched={touched.branchIds}
                          isError={errors.branchIds && touched.branchIds}
                          errorMessage={errors.branchIds}
                        />
                      </div>
                      {touched.branchIds && errors.branchIds && (
                        <div>
                          <small className={"text-danger"}>
                            {errors.branchIds}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

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

export default UpdateShift;
