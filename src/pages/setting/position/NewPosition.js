import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { SettingPositionInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';
import { setEmptyPosition, createPosition } from 'src/stores/actions/position';
import { fetchShifts } from 'src/stores/actions/shift';

const NewPositionPage = ({ t, location, match, history }) => {
  const positionRef = useRef();
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const departments = useSelector((state) => state.department.departments);
  const branches = useSelector((state) => state.branch.branches);
  const position = useSelector((state) => state.position.position);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: handleSubmit,
      },
    ];
    dispatch(fetchShifts());
    dispatch(changeActions(actions));
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    return () => {
      dispatch(setEmptyPosition());
      dispatch(changeActions([]));
    };
  }, []);

  const handleSubmit = () => {
    const form = positionRef.current.values;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    dispatch(createPosition(form));
    history.push('/setting/position');
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik innerRef={positionRef} enableReinitialize initialValues={position} validationSchema={SettingPositionInfoSchema}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
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
                    containerClassName={'form-group col-lg-12'}
                    value={values.branchId}
                    labelText={'Chi nhánh'}
                    selectClassName={'form-control'}
                    isRequiredField
                    onBlur={handleBlur('branchId')}
                    onChange={handleChange('branchId')}
                    inputID={'branchId'}
                    lstSelectOptions={branches}
                    placeholder={'Chọn chi nhánh'}
                  />
                </div>
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.departmentId}
                    labelText={'Phòng ban'}
                    selectClassName={'form-control'}
                    isRequiredField
                    onBlur={handleBlur('departmentId')}
                    onChange={handleChange('departmentId')}
                    inputID={'departmentId'}
                    lstSelectOptions={departments}
                    placeholder={'Chọn phòng ban'}
                  />
                </div>

                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Ca làm việc" />
                    <div role="group" className="d-flex flex-row flex-wrap justify-content-between border">
                      <CommonMultiSelectInput
                        values={values.shifts}
                        onChangeValues={handleChange('shifts')}
                        listValues={shifts}
                        placeholder={'Chọn ca làm việc'}
                      />
                    </div>
                  </div>
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

export default NewPositionPage;
