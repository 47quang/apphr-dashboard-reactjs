import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import FormHeader from 'src/components/text/FormHeader';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { createBranch, fetchBranch, updateBranch, setEmptyDBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { changeActions } from 'src/stores/actions/header';

//TODO: translate

const NewBranchPage = ({ t, location, match, history }) => {
  const params = match.params;
  const branch = useSelector((state) => state.branch.branch);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  const branchInfoForm = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.id) dispatch(fetchBranch(params.id));
    else dispatch(setEmptyDBranch());

    const actions = [
      {
        type: 'primary',
        name: params?.id ? 'Cập nhật' : 'Tạo mới',
        callback: getOnSubmitInForm,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchProvinces());
    return () => {
      dispatch(changeActions([]));
    };
  }, [dispatch]);

  useEffect(() => {
    if (branch.provinceId) {
      dispatch(fetchDistricts({ provinceId: branch.provinceId }));
    }
    if (branch.districtId) {
      dispatch(fetchWards({ districtId: branch.districtId }));
    }
  }, [branch.provinceId, branch.districtId]);

  const getOnSubmitInForm = (event) => {
    branchInfoForm.current.handleSubmit(event);
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={branchInfoForm}
            enableReinitialize
            initialValues={branch}
            validationSchema={SettingBranchInfoSchema}
            onSubmit={(values) => {
              let form = values;
              form.provinceId = parseInt(form.provinceId);
              form.districtId = parseInt(form.districtId);
              form.wardId = parseInt(form.wardId);
              if (params?.id) {
                // Call API UPDATE
                dispatch(updateBranch(form, params.id, history));
              } else {
                // Call API CREATE
                delete form.id;
                dispatch(createBranch({ data: form, history: history }));
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <FormHeader text={'Thêm chi nhánh'} />
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã chi nhánh'}
                    inputType={'text'}
                    placeholder={'Nhập mã chi nhánh'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.shortname}
                    isError={errors.shortname && touched.shortname}
                    errorMessage={errors.shortname}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên chi nhánh'}
                    inputType={'text'}
                    placeholder={'Nhập tên chi nhánh'}
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
                    value={values.ip}
                    onBlur={handleBlur('ip')}
                    onChange={handleChange('ip')}
                    inputID={'ip'}
                    labelText={'IP Router'}
                    inputType={'text'}
                    placeholder={'Nhập IP Router'}
                    inputClassName={'form-control'}
                    isTouched={touched.ip}
                    isError={errors.ip && touched.ip}
                    errorMessage={errors.ip}
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
                    labelText={'Quận huyện'}
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
                    labelText={'Phường xã'}
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
                    labelText={'Địa chỉ chi nhánh'}
                    inputType={'text'}
                    placeholder={'Nhập địa chỉ chi nhánh'}
                    inputClassName={'form-control'}
                  />
                </div>
                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.description}
                    onBlur={handleBlur('description')}
                    onChange={handleChange('description')}
                    inputID={'description'}
                    labelText={'Mô tả'}
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

export default NewBranchPage;
