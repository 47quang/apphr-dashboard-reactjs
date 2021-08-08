import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { setEmptyBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchWards } from 'src/stores/actions/location';
import { api } from 'src/stores/apis';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const BranchItemBody = ({ t, branchRef, effectFunction, validationSchema, provinces, districts, wards, submitForm, buttons, loading, isCreate }) => {
  const dispatch = useDispatch();
  const typeCC = [
    { id: 'WIFI', name: t('label.wi_fi') },
    { id: 'QR_CODE', name: t('label.qr_code') },
  ];
  const branch = useSelector((state) => state.branch.branch);
  useEffect(() => {
    effectFunction();
    return () => {
      dispatch(setEmptyBranch());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (branch.provinceId) {
      dispatch(fetchDistricts({ provinceId: branch.provinceId }));
    }
    if (branch.districtId) {
      dispatch(fetchWards({ districtId: branch.districtId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch.provinceId, branch.districtId]);
  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-10">
            <Formik
              innerRef={branchRef}
              enableReinitialize
              initialValues={branch}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                <form autoComplete="off">
                  <FormHeader text={t('label.branch_info')} />
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-6">
                        <Label text={t('label.branch_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-10'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_branch_code')}
                          />
                          <div
                            className="input-group-text col-2 d-flex justify-content-center"
                            id="basic-addon2"
                            type="button"
                            onClick={(e) => {
                              let randomCode = generateCode();
                              setFieldValue('code', randomCode);
                            }}
                          >
                            {t('label.random')}
                          </div>
                        </div>
                        {errors.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="form-group col-xl-6">
                        <Label text={t('label.branch_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_branch_code')}
                          />
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.branch_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_branch_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.typeCC}
                      onBlur={handleBlur('typeCC')}
                      onChange={(e) => {
                        handleChange('typeCC')(e);
                      }}
                      inputID={'typeCC'}
                      labelText={t('label.roll_call_type')}
                      selectClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.typeCC}
                      isError={errors.typeCC && touched.typeCC}
                      errorMessage={t(errors.typeCC)}
                      lstSelectOptions={typeCC}
                      placeholder={t('placeholder.select_roll_call_type')}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.bssid}
                      onBlur={handleBlur('bssid')}
                      onChange={handleChange('bssid')}
                      inputID={'bssid'}
                      labelText={t('label.branch_ip_router')}
                      inputType={'text'}
                      isRequiredField={values.typeCC === 'WIFI'}
                      isDisable={values.typeCC !== 'WIFI'}
                      placeholder={t('placeholder.enter_branch_ip_router')}
                      inputClassName={'form-control'}
                      isTouched={touched.bssid}
                      isError={errors.bssid && touched.bssid}
                      errorMessage={t(errors.bssid)}
                    />
                  </div>

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.provinceId}
                      onBlur={handleBlur('provinceId')}
                      onChange={async (e) => {
                        handleChange('provinceId')(e);
                        if (isCreate) {
                          dispatch(fetchDistricts({ provinceId: e.target.value }));
                          dispatch({
                            type: REDUX_STATE.location.SET_WARDS,
                            payload: [],
                          });
                        } else {
                          let newDistricts = await api.location.getDistricts(+e.target.value).then(({ payload }) => payload);
                          setFieldValue('districts', newDistricts);
                          setFieldValue('wards', []);
                        }
                      }}
                      inputID={'provinceId'}
                      labelText={t('label.province')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_province')}
                      lstSelectOptions={isCreate ? provinces : values.provinces}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.districtId}
                      onBlur={handleBlur('districtId')}
                      onChange={async (e) => {
                        handleChange('districtId')(e);
                        if (isCreate) dispatch(fetchWards({ districtId: e.target.value }));
                        else {
                          let newWards = await api.location.getWards(+e.target.value).then(({ payload }) => payload);
                          setFieldValue('wards', newWards);
                        }
                      }}
                      inputID={'districtId'}
                      labelText={t('label.district')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_district')}
                      lstSelectOptions={isCreate ? districts : values.districts}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.wardId}
                      onBlur={handleBlur('wardId')}
                      onChange={handleChange('wardId')}
                      inputID={'wardId'}
                      labelText={t('label.ward')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_ward')}
                      lstSelectOptions={isCreate ? wards : values.wards}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.address}
                      onBlur={handleBlur('address')}
                      onChange={handleChange('address')}
                      inputID={'address'}
                      labelText={t('label.branch_address')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_branch_address')}
                      inputClassName={'form-control'}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.phone}
                      onBlur={handleBlur('phone')}
                      onChange={handleChange('phone')}
                      inputID={'phone'}
                      labelText={t('label.phone_number')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_phone_number')}
                      inputClassName={'form-control'}
                      isTouched={touched.phone}
                      isError={errors.phone && touched.phone}
                      errorMessage={t(errors.phone)}
                    />
                    {/* <CommonPlaceAutocomplete /> */}
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

export default BranchItemBody;
