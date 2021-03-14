import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';
import { fetchBranches } from 'src/stores/actions/branch';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import { createDepartment, resetDepartment } from 'src/stores/actions/department';

const NewDepartment = ({ t, location }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => {
          const form = departmentRef.current.values;
          form.branchId = parseInt(form.branchId);
          dispatch(createDepartment(form));
        },
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    return () => {
      dispatch(changeActions([]));
      dispatch(resetDepartment());
    }
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={departmentRef}
            enableReinitialize
            initialValues={department}
            validationSchema={SettingDepartmentInfoSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập mã phòng ban'}
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
                    labelText={'Tên phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập tên phòng ban'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={errors.name}
                  />
                </div>
                {/* <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Chi nhánh:" />
                    <div className="d-flex flex-row flex-wrap justify-content-between border rounded-3">
                      <CommonMultiSelectInput
                        values={values.branches}
                        onChangeValues={handleChange('branches')}
                        listValues={branches}
                        placeholder={'Chọn chi nhánh'}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.branchId}
                    onBlur={handleBlur('branchId')}
                    onChange={handleChange('branchId')}
                    inputID={'branchId'}
                    labelText={'Chi nhánh'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn chi nhánh'}
                    lstSelectOptions={branches}
                  />
                </div>

                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.note}
                    onBlur={handleBlur('note')}
                    onChange={handleChange('note')}
                    inputID={'note'}
                    labelText={'Ghi chú'}
                    inputClassName={'form-control'}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default NewDepartment;
