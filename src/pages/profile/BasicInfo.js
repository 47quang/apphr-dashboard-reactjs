import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonCheckbox from 'src/components/checkox/CommonCheckbox';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { fetchProvinces } from 'src/stores/actions/location';
import { fetchPositions } from 'src/stores/actions/position';
import { getDateInput } from 'src/utils/datetimeUtils';

const BasicInfo = ({ t, isCreate, profile }) => {
  const provinces = useSelector((state) => state.location.provinces);
  const branches = useSelector((state) => state.branch.branches);
  // const roles = useSelector((state) => state.role.roles);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();
  const employeeInfo = {
    fullname: profile.fullname ?? '',
    shortname: profile.shortname ?? '',
    phone: profile.phone ?? '',
    email: profile.email ?? '',
    dateOfBirth: profile.dayOfBirth ? getDateInput(profile.dateOfBirth) : '',
    gender: profile.gender === 'male' ? 1 : 2,
    cmnd: profile.cmnd ?? '',
    have_id: profile.cmnd !== '',
    cmnd_date: profile.cmndIssuedDate ?? '',
    cmnd_place: '',
    have_passport: profile.passport !== '',
    passport: profile.passport ?? '',
    passport_start: profile.passportIssuedDate ?? '',
    passport_end: '',
    passport_place: '',
    departmentId: +profile.departmentId,
    positionId: +profile.positionId,
    role: 0,
    branchId: +profile.branchId,
    manager: '',
  };
  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchBranches());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const genders = [
    { id: 1, name: t('label.male') },
    { id: 2, name: t('label.female') },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <FormHeader text={t('label.profile_basic_info')} />
          <Formik initialValues={employeeInfo} enableReinitialize>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form>
                <div className="row">
                  <div className="col-xl-2 text-center mb-4">
                    <img src="https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg?w=800&quality=85" alt="Ảnh đại diện" height="200px" />
                  </div>
                  <div className="col-xl-10">
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.shortname}
                        onBlur={handleBlur('shortname')}
                        onChange={handleChange('shortname')}
                        inputID={'shortname'}
                        labelText={t('label.employee_code')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_employee_code')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.shortname}
                        isError={errors.shortname && touched.shortname}
                        errorMessage={t(errors.shortname)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.fullname}
                        onBlur={handleBlur('fullname')}
                        onChange={handleChange('fullname')}
                        inputID={'fullname'}
                        labelText={t('label.employee_full_name')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_employee_full_name')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.fullname}
                        isError={errors.fullname && touched.fullname}
                        errorMessage={t(errors.fullname)}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.phone}
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        inputID={'phone'}
                        labelText={t('label.phone_number')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_phone_number')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.phone}
                        isError={errors.phone && touched.phone}
                        errorMessage={t(errors.phone)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        inputID={'email'}
                        labelText={t('label.email')}
                        inputType={'email'}
                        placeholder={t('placeholder.enter_email')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.email}
                        isError={errors.email && touched.email}
                        errorMessage={t(errors.email)}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.dateOfBirth}
                        onBlur={handleBlur('dateOfBirth')}
                        onChange={handleChange('dateOfBirth')}
                        inputID={'dateOfBirth'}
                        labelText={t('label.birthday')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.dateOfBirth}
                        isError={errors.dateOfBirth && touched.dateOfBirth}
                        errorMessage={t(errors.dateOfBirth)}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.gender}
                        onBlur={handleBlur('gender')}
                        onChange={handleChange('gender')}
                        inputID={'gender'}
                        labelText={t('label.sex')}
                        selectClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.gender}
                        isError={errors.gender && touched.gender}
                        errorMessage={t(errors.gender)}
                        lstSelectOptions={genders}
                        placeholder={t('placeholder.select_sex')}
                      />
                    </div>
                    <Label text={t('label.ID_passport')} labelID="checkbox-id-password" className="py-2" />
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="pl-12">
                          <CommonCheckbox
                            label={t('label.ID')}
                            value={values.have_id}
                            onBlur={handleBlur('have_id')}
                            onChange={handleChange('have_id')}
                          />
                        </div>
                        {values.have_id && (
                          <>
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.cmnd}
                              onBlur={handleBlur('cmnd')}
                              onChange={handleChange('cmnd')}
                              inputID={'cmnd'}
                              labelText={t('label.ID_number')}
                              inputType={'text'}
                              placeholder={t('placeholder.enter_ID_number')}
                              inputClassName={'form-control'}
                            />
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.cmnd_date}
                              onBlur={handleBlur('cmnd_date')}
                              onChange={handleChange('cmnd_date')}
                              inputID={'cmnd_date'}
                              labelText={t('label.start_date2')}
                              inputType={'date'}
                              inputClassName={'form-control'}
                            />
                            <CommonSelectInput
                              containerClassName={'form-group'}
                              value={values.cmnd_place}
                              onBlur={handleBlur('cmnd_place')}
                              onChange={handleChange('cmnd_place')}
                              inputID={'cmnd_place'}
                              labelText={t('label.grant_place')}
                              selectClassName={'form-control'}
                              placeholder={t('placeholder.select_province')}
                              lstSelectOptions={provinces}
                            />
                          </>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <div className="pl-2">
                          <CommonCheckbox
                            label={t('label.passport')}
                            value={values.have_passport}
                            onBlur={handleBlur('have_passport')}
                            onChange={handleChange('have_passport')}
                          />
                        </div>
                        {values.have_passport && (
                          <>
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.passport}
                              onBlur={handleBlur('passport')}
                              onChange={handleChange('passport')}
                              inputID={'passport'}
                              labelText={t('label.passport')}
                              inputType={'text'}
                              placeholder={t('placeholder.enter_passport_number')}
                              inputClassName={'form-control'}
                            />
                            <div className="row">
                              <CommonTextInput
                                containerClassName={'form-group col-6'}
                                value={values.passport_start}
                                onBlur={handleBlur('passport_start')}
                                onChange={handleChange('passport_start')}
                                inputID={'passport_start'}
                                labelText={t('label.start_date2')}
                                inputType={'date'}
                                inputClassName={'form-control'}
                              />
                              <CommonTextInput
                                containerClassName={'form-group col-6'}
                                value={values.passport_end}
                                onBlur={handleBlur('passport_end')}
                                onChange={handleChange('passport_end')}
                                inputID={'passport_end'}
                                labelText={t('label.expiration_date')}
                                inputType={'date'}
                                inputClassName={'form-control'}
                              />
                            </div>
                            <CommonSelectInput
                              containerClassName={'form-group'}
                              value={values.passport_place}
                              onBlur={handleBlur('passport_place')}
                              onChange={handleChange('passport_place')}
                              inputID={'passport_place'}
                              labelText={t('label.grant_place')}
                              selectClassName={'form-control'}
                              placeholder={t('placeholder.select_province')}
                              lstSelectOptions={provinces}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.branchId}
                        onBlur={handleBlur('branchId')}
                        onChange={(e) => {
                          dispatch(fetchDepartments({ branchId: e.target.value }));
                          handleChange('branchId')(e);
                        }}
                        inputID={'branchId'}
                        labelText={t('label.branch')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_branch')}
                        lstSelectOptions={branches}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.departmentId}
                        onBlur={handleBlur('departmentId')}
                        onChange={(e) => {
                          dispatch(fetchPositions({ departmentId: e.target.value }));
                          handleChange('departmentId')(e);
                        }}
                        inputID={'departmentId'}
                        labelText={t('label.department')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_department')}
                        lstSelectOptions={departments}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.positionId}
                        onBlur={handleBlur('positionId')}
                        onChange={handleChange('positionId')}
                        inputID={'positionId'}
                        labelText={t('label.position')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_position')}
                        lstSelectOptions={positions}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-6'}
                        value={values.manager}
                        onBlur={handleBlur('manager')}
                        onChange={handleChange('manager')}
                        inputID={'manager'}
                        labelText={t('label.direct_manager')}
                        inputType={'text'}
                        placeholder={t('placeholder.select_direct_manager')}
                        inputClassName={'form-control'}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};
export default BasicInfo;
