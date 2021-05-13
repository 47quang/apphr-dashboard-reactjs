/* eslint-disable react-hooks/exhaustive-deps */
import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { PERMISSION } from 'src/constants/key';
import { SettingGeneralInfoSchema } from 'src/schema/formSchema';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { fetchGeneral, updateGeneral } from 'src/stores/actions/setting';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

//TODO: translate
const SettingGeneralPage = ({ t, location }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const settingRef = useRef();
  const dispatch = useDispatch();
  const general = useSelector((state) => state.setting);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (provinces.length === 0) dispatch(fetchProvinces());
    dispatch(fetchGeneral(1, setLoading));
  }, []);

  useEffect(() => {
    if (general.provinceId) {
      dispatch(fetchDistricts({ provinceId: general.provinceId }));
    }
    if (general.districtId) {
      dispatch(fetchWards({ districtId: general.districtId }));
    }
  }, [general.provinceId, general.districtId]);

  const updateSetting = () => {
    const form = settingRef.current.values;
    form.provinceId = parseInt(form.provinceId);
    form.districtId = parseInt(form.districtId);
    form.wardId = parseInt(form.wardId);
    dispatch(updateGeneral(form, t('message.successful_update')));
  };
  const buttons = permissionIds.includes(PERMISSION.UPDATE_GENERAL)
    ? [
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: updateSetting,
          name: t('label.update'),
        },
      ]
    : [];

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-10">
            <Formik innerRef={settingRef} enableReinitialize initialValues={general} validationSchema={SettingGeneralInfoSchema}>
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.company_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_company_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.shortname}
                      onBlur={handleBlur('shortname')}
                      onChange={handleChange('shortname')}
                      inputID={'shortname'}
                      labelText={t('label.company_short_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_company_short_name')}
                      inputClassName={'form-control'}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-6'}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      inputID={'email'}
                      labelText={'Email'}
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
                      containerClassName={'form-group col-xl-6'}
                      value={values.taxCode}
                      onBlur={handleBlur('taxCode')}
                      onChange={handleChange('taxCode')}
                      inputID={'taxCode'}
                      labelText={t('label.tax_code')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_tax_code')}
                      inputClassName={'form-control'}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.provinceId}
                      onBlur={handleBlur('provinceId')}
                      onChange={(e) => {
                        dispatch(fetchDistricts({ provinceId: e.target.value }));
                        dispatch({
                          type: REDUX_STATE.location.SET_WARDS,
                          payload: [],
                        });
                        handleChange('provinceId')(e);
                      }}
                      inputID={'provinceId'}
                      labelText={t('label.province')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_province')}
                      lstSelectOptions={provinces}
                    />
                  </div>

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.districtId}
                      onBlur={handleBlur('districtId')}
                      onChange={(e) => {
                        dispatch(fetchWards({ districtId: e.target.value }));
                        handleChange('districtId')(e);
                      }}
                      inputID={'districtId'}
                      labelText={t('label.district')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_district')}
                      lstSelectOptions={districts}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.wardId}
                      onBlur={handleBlur('wardId')}
                      onChange={handleChange('wardId')}
                      inputID={'wardId'}
                      labelText={t('label.ward')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_ward')}
                      lstSelectOptions={wards}
                    />
                  </div>

                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.address}
                      onBlur={handleBlur('address')}
                      onChange={handleChange('address')}
                      inputID={'address'}
                      labelText={t('label.company_address')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_company_address')}
                      inputClassName={'form-control'}
                    />
                  </div>
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.note}
                      onBlur={handleBlur('note')}
                      onChange={handleChange('note')}
                      inputID={'note'}
                      labelText={t('label.note')}
                      inputClassName={'form-control'}
                    />
                  </div>
                  {renderButtons(buttons)}
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </CContainer>
  );
};

export default SettingGeneralPage;
