import { Formik } from 'formik';
import { CContainer } from '@coreui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActions } from 'src/stores/actions/header';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartment, resetDepartment, updateDepartment } from 'src/stores/actions/department';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';

const EditDepartment = ({ t, location, match }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Cập nhật',
        callback: () => {
          const form = departmentRef.current.values;
          form.branchId = parseInt(form.branchId);
          dispatch(updateDepartment(form));
        },
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    dispatch(fetchDepartment({ id: match.params.id }));
    return () => {
      dispatch(changeActions([]));
      dispatch(resetDepartment());
    };
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik innerRef={departmentRef} enableReinitialize initialValues={department} validationSchema={SettingDepartmentInfoSchema}>
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

export default EditDepartment;
