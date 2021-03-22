import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { fetchDistricts, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

const BranchItemBody = ({ t, branchRef, branch, validationSchema, provinces, districts, wards, submitForm, buttons }) => {
  const dispatch = useDispatch();

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={branchRef}
            enableReinitialize
            initialValues={branch}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                {/* <FormHeader text={t('title.branch_create')} /> */}
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={t('label.branch_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.branch_code')}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={t('label.branch_name')}
                    inputType={'text'}
                    placeholder={t('placeholder.branch_name')}
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
                    value={values.ipRouter}
                    onBlur={handleBlur('ipRouter')}
                    onChange={handleChange('ipRouter')}
                    inputID={'ipRouter'}
                    labelText={t('label.branch_ip_router')}
                    inputType={'text'}
                    placeholder={t('placeholder.branch_ip_router')}
                    inputClassName={'form-control'}
                    isTouched={touched.ipRouter}
                    isError={errors.ip && touched.ipRouter}
                    errorMessage={errors.ipRouter}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-6'}
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
                    placeholder={t('placeholder.province')}
                    lstSelectOptions={provinces}
                  />
                </div>

                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-6'}
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
                    containerClassName={'form-group col-lg-6'}
                    value={values.wardId}
                    onBlur={handleBlur('wardId')}
                    onChange={handleChange('wardId')}
                    inputID={'wardId'}
                    labelText={t('label.ward')}
                    selectClassName={'form-control'}
                    placeholder={t('placeholder.ward')}
                    lstSelectOptions={wards}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.address}
                    onBlur={handleBlur('address')}
                    onChange={handleChange('address')}
                    inputID={'address'}
                    labelText={t('label.branch_address')}
                    inputType={'text'}
                    placeholder={t('placeholder.branch_address')}
                    inputClassName={'form-control'}
                  />
                </div>
                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.note}
                    onBlur={handleBlur('note')}
                    onChange={handleChange('note')}
                    inputID={'note'}
                    labelText={t('label.description')}
                    inputClassName={'form-control'}
                  />
                </div>
                {renderButtons(buttons)}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default BranchItemBody;
