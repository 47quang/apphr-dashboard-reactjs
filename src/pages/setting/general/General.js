import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { SettingGeneralInfoSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { fetchGeneral, updateGeneral } from 'src/stores/actions/setting';
import { renderButtons } from 'src/utils/formUtils';

//TODO: translate
const SettingGeneralPage = ({ t, location }) => {
  const settingRef = useRef();
  const dispatch = useDispatch();
  const general = useSelector((state) => state.setting);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchGeneral(1));
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
    dispatch(updateGeneral(form));
  };
  const buttons = [
    {
      type: 'submit',
      className: `btn btn-primary`,
      onClick: updateSetting,
      name: 'Cập nhật',
    },
  ];

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-10">
          <Formik innerRef={settingRef} enableReinitialize initialValues={general} validationSchema={SettingGeneralInfoSchema}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên doanh nghiệp'}
                    inputType={'text'}
                    placeholder={'Nhập tên doanh nghiệp'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={errors.name}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Tên viết tắt của doanh nghiệp'}
                    inputType={'text'}
                    placeholder={'Nhập tên viết tắt'}
                    inputClassName={'form-control'}
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
                    value={values.taxCode}
                    onBlur={handleBlur('taxCode')}
                    onChange={handleChange('taxCode')}
                    inputID={'taxCode'}
                    labelText={'Mã số thuế'}
                    inputType={'text'}
                    placeholder={'Nhập mã số thuế'}
                    inputClassName={'form-control'}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.provinceId}
                    onBlur={handleBlur('provinceId')}
                    onChange={(e) => {
                      dispatch(fetchDistricts({ provinceId: e.target.value }));
                      dispatch({
                        type: 'SET_WARDS',
                        payload: [],
                      });
                      handleChange('provinceId')(e);
                    }}
                    inputID={'provinceId'}
                    labelText={'Tỉnh/Thành phố'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn Tỉnh/Thành phố'}
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
                    labelText={'Quận/Huyện'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn Quận/Huyện'}
                    lstSelectOptions={districts}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.wardId}
                    onBlur={handleBlur('wardId')}
                    onChange={handleChange('wardId')}
                    inputID={'wardId'}
                    labelText={'Phường/xã'}
                    selectClassName={'form-control'}
                    placeholder={'Chọn Phường/Xã'}
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
                    labelText={'Địa chỉ cụ thể'}
                    inputType={'text'}
                    placeholder={'Nhập địa chỉ cụ thể'}
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
                    labelText={'Ghi chú'}
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

export default SettingGeneralPage;
