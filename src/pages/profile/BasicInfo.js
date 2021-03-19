import { CContainer } from '@coreui/react';
import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonCheckbox from 'src/components/checkox/CommonCheckbox';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { fetchProvinces } from 'src/stores/actions/location';

const BasicInfo = () => {
  const provinces = useSelector((state) => state.location.provinces);
  const branches = useSelector((state) => state.branch.branches);
  // const roles = useSelector((state) => state.role.roles);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();
  const employeeInfo = {
    name: '',
    code: '',
    phone: '',
    email: '',
    birthday: Date.now(),
    gender: 1,
    id: '',
    have_id: false,
    id_date: '',
    id_place: '',
    have_passport: false,
    passport: '',
    passport_start: '',
    passport_end: '',
    passport_place: '',
  };
  const positionInfo = {
    department: '',
    position: '',
    role: '',
    branch: '',
    manager: '',
  };
  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);
  const genders = [
    { id: 0, name: 'Nam' },
    { id: 1, name: 'Nữ' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto row">
        <div className="col-8">
          <div className="shadow bg-white rounded p-4 container">
            <FormHeader text="Thông tin cơ bản" />
            <Formik initialValues={employeeInfo}>
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.code}
                      onBlur={handleBlur('code')}
                      onChange={handleChange('code')}
                      inputID={'code'}
                      labelText={'Mã nhân viên'}
                      inputType={'text'}
                      placeholder={'Nhập mã nhân viên'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.code}
                      isError={errors.code && touched.code}
                      errorMessage={errors.code}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={'Tên nhân viên'}
                      inputType={'text'}
                      placeholder={'Nhập tên nhân viên'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={errors.name}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.phone}
                      onBlur={handleBlur('phone')}
                      onChange={handleChange('phone')}
                      inputID={'phone'}
                      labelText={'Số điện thoại'}
                      inputType={'text'}
                      placeholder={'Nhập số điện thoại'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.phone}
                      isError={errors.phone && touched.phone}
                      errorMessage={errors.phone}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      inputID={'email'}
                      labelText={'Email'}
                      inputType={'email'}
                      placeholder={'Nhập email'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.email}
                      isError={errors.email && touched.email}
                      errorMessage={errors.email}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.birthday}
                      onBlur={handleBlur('birthday')}
                      onChange={handleChange('birthday')}
                      inputID={'birthday'}
                      labelText={'Ngày sinh'}
                      inputType={'date'}
                      placeholder={'Chọn ngày sinh'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.birthday}
                      isError={errors.birthday && touched.birthday}
                      errorMessage={errors.birthday}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.gender}
                      onBlur={handleBlur('gender')}
                      onChange={handleChange('gender')}
                      inputID={'gender'}
                      labelText={'Giới tính'}
                      selectClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.gender}
                      isError={errors.gender && touched.gender}
                      errorMessage={errors.gender}
                      lstSelectOptions={genders}
                      placeholder={'Chọn giới tính'}
                    />
                  </div>
                  <Label text="Chứng minh thư/Hộ chiếu" labelID="checkbox-id-password" />
                  <div className="row" role="group" aria-labelledby="checkbox-id-password">
                    <div className="col-lg-6 pl-4">
                      <CommonCheckbox label={'CMND/CCCD'} value={values.have_id} onBlur={handleBlur('have_id')} onChange={handleChange('have_id')} />
                    </div>
                    <div className="col-lg-6 pl-4">
                      <CommonCheckbox
                        label={'Hộ chiếu'}
                        value={values.have_passport}
                        onBlur={handleBlur('have_passport')}
                        onChange={handleChange('have_passport')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      {values.have_id && (
                        <>
                          <CommonTextInput
                            containerClassName={'form-group'}
                            value={values.id}
                            onBlur={handleBlur('id')}
                            onChange={handleChange('id')}
                            inputID={'id'}
                            labelText={'Số CMND/CCCD'}
                            inputType={'text'}
                            placeholder={'Nhập số CMND/CCCD'}
                            inputClassName={'form-control'}
                          />
                          <CommonTextInput
                            containerClassName={'form-group'}
                            value={values.id_date}
                            onBlur={handleBlur('id_date')}
                            onChange={handleChange('id_date')}
                            inputID={'id_date'}
                            labelText={'Ngày cấp'}
                            inputType={'date'}
                            placeholder={'Chọn ngày cấp'}
                            inputClassName={'form-control'}
                          />
                          <CommonSelectInput
                            containerClassName={'form-group'}
                            value={values.id_place}
                            onBlur={handleBlur('id_place')}
                            onChange={handleChange('id_place')}
                            inputID={'id_place'}
                            labelText={'Nơi cấp'}
                            selectClassName={'form-control'}
                            placeholder={'Chọn tỉnh/thành phố'}
                            lstSelectOptions={provinces}
                          />
                        </>
                      )}
                    </div>
                    <div className="col-lg-6">
                      {values.have_passport && (
                        <>
                          <CommonTextInput
                            containerClassName={'form-group'}
                            value={values.passport}
                            onBlur={handleBlur('passport')}
                            onChange={handleChange('passport')}
                            inputID={'passport'}
                            labelText={'Hộ chiếu'}
                            inputType={'text'}
                            placeholder={'Nhập hộ chiếu'}
                            inputClassName={'form-control'}
                          />
                          <div className="row">
                            <CommonTextInput
                              containerClassName={'form-group col-6'}
                              value={values.passport_start}
                              onBlur={handleBlur('passport_start')}
                              onChange={handleChange('passport_start')}
                              inputID={'passport_start'}
                              labelText={'Ngày cấp'}
                              inputType={'date'}
                              placeholder={'Chọn ngày'}
                              inputClassName={'form-control'}
                            />
                            <CommonTextInput
                              containerClassName={'form-group col-6'}
                              value={values.passport_end}
                              onBlur={handleBlur('passport_end')}
                              onChange={handleChange('passport_end')}
                              inputID={'passport_end'}
                              labelText={'Ngày hết hạn'}
                              inputType={'date'}
                              placeholder={'Chọn ngày'}
                              inputClassName={'form-control'}
                            />
                          </div>
                          <CommonSelectInput
                            containerClassName={'form-group'}
                            value={values.passport_place}
                            onBlur={handleBlur('passport_place')}
                            onChange={handleChange('passport_place')}
                            inputID={'passport_place'}
                            labelText={'Nơi cấp'}
                            selectClassName={'form-control'}
                            placeholder={'Chọn tỉnh/thành phố'}
                            lstSelectOptions={provinces}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-4">
          <div className="shadow bg-white rounded p-4 container">
            <FormHeader text="Vị trí làm việc" />
            <Formik initialValues={positionInfo}>
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <form>
                  <CommonSelectInput
                    containerClassName={'form-group'}
                    value={values.department}
                    onBlur={handleBlur('department')}
                    onChange={handleChange('department')}
                    inputID={'department'}
                    labelText={'Phòng ban'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn phòng ban'}
                    lstSelectOptions={departments}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group'}
                    value={values.branch}
                    onBlur={handleBlur('branch')}
                    onChange={handleChange('branch')}
                    inputID={'branch'}
                    labelText={'Chi nhánh'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn chi nhánh'}
                    lstSelectOptions={branches}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group'}
                    value={values.position}
                    onBlur={handleBlur('position')}
                    onChange={handleChange('position')}
                    inputID={'position'}
                    labelText={'Vị trí'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn vị trí làm việc'}
                    lstSelectOptions={positions}
                  />
                  <CommonTextInput
                    containerClassName={'form-group'}
                    value={values.manager}
                    onBlur={handleBlur('manager')}
                    onChange={handleChange('manager')}
                    inputID={'manager'}
                    labelText={'Quản lý trực tiếp'}
                    inputType={'text'}
                    placeholder={'Quản lý trước tiếp'}
                    inputClassName={'form-control'}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </CContainer>
  );
};
export default BasicInfo;
