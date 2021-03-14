import { CContainer } from "@coreui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonSelectInput from "src/components/input/CommonSelectInput";
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import FormHeader from "src/components/text/FormHeader";
import Label from "src/components/text/Label";
import { SettingPositionInfoSchema } from "src/schema/formSchema";
import { fetchBranches } from "src/stores/actions/branch";
import {
  fetchDepartment,
  fetchDepartments,
} from "src/stores/actions/department";
import { changeActions } from "src/stores/actions/header";
import {
  fetchPosition,
  setEmptyPosition,
  createPosition,
  updatePosition,
} from "src/stores/actions/position";

//TODO: translate
const listOfBranches = [
  { id: 1, name: 'APPHR Thủ Đức' },
  { id: 2, name: 'APPHR Quận 1' },
  { id: 3, name: 'APPHR Quận 2' },
  { id: 4, name: 'APPHR Quận 3' },
  { id: 5, name: 'APPHR Quận 4' },
  { id: 6, name: 'APPHR Quận 5' },
  { id: 7, name: 'APPHR Quận 6' },
  { id: 8, name: 'APPHR Quận 7' },
  { id: 9, name: 'APPHR Quận 8' },
  { id: 10, name: 'APPHR Quận 9' },
  { id: 11, name: 'APPHR Quận 10' },
];

const listOfShifts = [
  { id: 1, name: 'Ca sáng 1' },
  { id: 2, name: 'Ca sáng 2' },
  { id: 3, name: 'Ca sáng 3' },
  { id: 4, name: 'Ca chiều 1' },
  { id: 5, name: 'Ca chiều 2' },
  { id: 6, name: 'Ca chiều 3' },
  { id: 7, name: 'Ca tối 1' },
  { id: 8, name: 'Ca tối 2' },
  { id: 9, name: 'Ca tối 3' },
];

const NewPositionPage = ({ t, location, match, history }) => {
  const params = match.params;
  const positionInfoForm = useRef();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const branches = useSelector((state) => state.branch.branches);
  const position = useSelector((state) => state.position.position);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let wait = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (params?.id) dispatch(fetchPosition(params.id));
    else dispatch(setEmptyPosition());

    const actions = [
      {
        type: "primary",
        name: params?.id ? "Cập nhật" : "Tạo mới",
        callback: params?.id ? btnUpdatePosition : btnCreatePosition,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    dispatch(fetchDepartments());

    return () => {
      clearTimeout(wait);
    };
  }, []);

  const btnCreatePosition = () => {
    const form = positionInfoForm.current.values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    delete form.id;
    dispatch(createPosition(form));
    history.push("/setting/position");
  };
  const btnUpdatePosition = () => {
    const form = positionInfoForm.current.values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    dispatch(updatePosition(form, params.id));
    history.push("/setting/position");
  };

  const getOnSubmitInForm = (event) =>
    positionInfoForm.current.handleSubmit(event);

  const handleSubmitInfo = (values) => {
    console.log(values);
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={positionInfoForm}
              enableReinitialize
              initialValues={position}
              validationSchema={SettingPositionInfoSchema}
              onSubmit={(values) => handleSubmitInfo(values)}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <form autoComplete="off">
                  <FormHeader text="Thêm vị trí" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.shortname}
                      onBlur={handleBlur('shortname')}
                      onChange={handleChange('shortname')}
                      inputID={'shortname'}
                      labelText={'Mã vị trí'}
                      inputType={'text'}
                      placeholder={'Nhập mã vị trí'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.shortname}
                      isError={errors.shortname && touched.shortname}
                      errorMessage={errors.shortname}
                    />
                  </div>

                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={'Tên vị trí'}
                      inputType={'text'}
                      placeholder={'Nhập tên vị trí'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={errors.name}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.branchId}
                      labelText={"Chi nhánh"}
                      selectClassName={"form-control"}
                      isRequiredField
                      onBlur={handleBlur("branchId")}
                      onChange={handleChange("branchId")}
                      inputID={"branchId"}
                      lstSelectOptions={branches}
                      placeholder={"Chọn chi nhánh"}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={"form-group col-lg-12"}
                      value={values.departmentId}
                      labelText={"Phòng ban"}
                      selectClassName={"form-control"}
                      isRequiredField
                      onBlur={handleBlur("departmentId")}
                      onChange={handleChange("departmentId")}
                      inputID={"departmentId"}
                      lstSelectOptions={departments}
                      placeholder={"Chọn phòng ban"}
                    />
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Ca làm việc" />
                      <div role="group" className="d-flex flex-row flex-wrap justify-content-between border">
                        <CommonMultiSelectInput
                          values={values.shifts}
                          onChangeValues={handleChange('shifts')}
                          listValues={listOfShifts}
                          placeholder={'Chọn ca làm việc'}
                        />
                      </div>
                    </div>
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
        </div>
      )}
    </CContainer>
  );
};

export default NewPositionPage;
