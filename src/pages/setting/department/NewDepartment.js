import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';
import { createBranch, fetchBranches } from 'src/stores/actions/branch';

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
          console.log(form);
          // dispatch(createBranch(form));
        },
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
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
                    value={values.departmentCode}
                    onBlur={handleBlur('departmentCode')}
                    onChange={handleChange('departmentCode')}
                    inputID={'departmentCode'}
                    labelText={'Mã phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập mã phòng ban'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.departmentCode}
                    isError={errors.departmentCode && touched.departmentCode}
                    errorMessage={errors.departmentCode}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.departmentName}
                    onBlur={handleBlur('departmentName')}
                    onChange={handleChange('departmentName')}
                    inputID={'departmentName'}
                    labelText={'Tên phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập tên phòng ban'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.departmentName}
                    isError={errors.departmentName && touched.departmentName}
                    errorMessage={errors.departmentName}
                  />
                </div>
                <div className="row">
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
                </div>

                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.description}
                    onBlur={handleBlur('description')}
                    onChange={handleChange('description')}
                    inputID={'description'}
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
