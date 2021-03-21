import { CAlert, CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { fetchDistricts, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BranchItemBody = ({ branchRef, branch, validationSchema, provinces, districts, wards, submitForm, buttons }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.branch.alert);

  return (
    <>
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
                      isDisable={true}
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
                      value={values.ipRouter}
                      onBlur={handleBlur('ipRouter')}
                      onChange={handleChange('ipRouter')}
                      inputID={'ipRouter'}
                      labelText={'IP Router'}
                      inputType={'text'}
                      placeholder={'Nhập IP Router'}
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
                      value={values.note}
                      onBlur={handleBlur('note')}
                      onChange={handleChange('note')}
                      inputID={'note'}
                      labelText={'Mô tả'}
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
    </>
  );
};

export default BranchItemBody;
