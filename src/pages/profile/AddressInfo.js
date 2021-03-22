import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';

const { CContainer } = require('@coreui/react');
const { Formik, FieldArray, Field, Form } = require('formik');
const { default: CommonTextInput } = require('src/components/input/CommonTextInput');
const { default: FormHeader } = require('src/components/text/FormHeader');

const AddressInfo = () => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);
  const permanentAddressInfo = {
    permanentAddress: '',
    wardId: '',
    districtId: '',
    provinceId: '',
    domicile: '',
    currentAddress: '',
  };
  const urgentContactInfo = {
    name: '',
    employeeRelation: '',
    phone: '',
    contactAddress: '',
  };
  const channels = [
    {
      id: 'skype',
      name: 'Skype',
    },
    { id: 'facebook', name: 'Facebook' },
  ];

  const initialContactChannelValues = {
    contactChannels: [
      {
        channelType: 'skype',
        link: 'klaus@formik.com',
      },
      {
        channelType: 'facebook',
        link: 'hans@formik.com',
      },
    ],
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto row">
        <div className="col-xl-7">
          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={'Địa chỉ thường trú'} />
            <Formik initialValues={permanentAddressInfo}>
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={'Địa chỉ thường trú'}
                      value={values.permanentAddress}
                      onChange={handleChange('permanentAddress')}
                      onBlur={handleBlur('permanentAddress')}
                      inputID={'permanentAddress'}
                      placeholder={'Nhập địa chỉ thường trú'}
                    />
                  </div>
                  <div className={'row'}>
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
                  </div>
                  <div className={'row'}>
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
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.domicile}
                      onBlur={handleBlur('domicile')}
                      onChange={handleChange('domicile')}
                      inputID={'domicile'}
                      labelText={'Nguyên quán'}
                      inputClassName={'form-control'}
                      placeholder={'Nhập nguyên quán'}
                    />
                  </div>
                  <div className={'row'}>
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={'Địa chỉ hiện tại'}
                      value={values.currentAddress}
                      onChange={handleChange('currentAddress')}
                      onBlur={handleBlur('currentAddress')}
                      inputID={'currentAddress'}
                      placeholder={'Nhập địa chỉ hiện tại'}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={'Liên hệ khẩn cấp'} />
            <Formik initialValues={urgentContactInfo}>
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={'Họ và tên người liên hệ'}
                      value={values.name}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      inputID={'name'}
                      placeholder={'Nhập đầy đủ tên người liên hệ'}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={'Quan hệ với nhân viên'}
                      value={values.employeeRelation}
                      onChange={handleChange('employeeRelation')}
                      onBlur={handleBlur('employeeRelation')}
                      inputID={'employeeRelation'}
                      placeholder={'Nhập quan hệ với nhân viên'}
                    />
                  </div>
                  <div className={'row'}>
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
                    />
                  </div>
                  <div className={'row'}>
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={'Địa chỉ liên hệ'}
                      value={values.contactAddress}
                      onChange={handleChange('contactAddress')}
                      onBlur={handleBlur('contactAddress')}
                      inputID={'contactAddress'}
                      placeholder={'Nhập địa chỉ liên hệ'}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={'col-xl-5'}>
          <div className="shadow bg-white rounded p-4">
            <FormHeader text="Kênh liên lạc" />
            <Formik
              initialValues={initialContactChannelValues}
              onSubmit={(values) => {
                console.log(values);
              }}
              render={({ values, errors, touched, handleReset, handleSubmit }) => {
                return (
                  <Form>
                    <FieldArray
                      name="contactChannels"
                      render={({ insert, remove, push }) => (
                        <div>
                          {values.contactChannels.length > 0 &&
                            values.contactChannels.map((friend, index) => (
                              <div className="row" key={index}>
                                <div className="form-group col-lg-4">
                                  <Field
                                    className={'form-control'}
                                    name={`contactChannels.${index}.channelType`}
                                    placeholder="Chọn kênh"
                                    component="select"
                                  >
                                    {channels.map((ch, idx) => (
                                      <option key={idx} value={ch.id}>
                                        {ch.name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="form-group col-lg-7">
                                  <Field className={'form-control'} name={`contactChannels.${index}.link`} placeholder="Nhập link" type="text" />
                                </div>
                                <div className="form-group pt-2">
                                  <RemoveCircle onClick={() => remove(index)} />
                                </div>
                              </div>
                            ))}
                          <div className="row col-12">
                            <button type="button" className="btn btn-primary" onClick={() => push({ channelType: 'skype', link: '' })}>
                              <AddCircle /> Thêm kênh liên lạc
                            </button>
                          </div>
                        </div>
                      )}
                    />
                    <br />
                    <div className="row col-12">
                      <button
                        type="button"
                        className="btn btn-primary mr-3"
                        onClick={(event) => {
                          event.preventDefault();
                          handleReset();
                        }}
                      >
                        Hoàn tác
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mr-3"
                        onClick={(event) => {
                          handleSubmit();
                        }}
                      >
                        Lưu
                      </button>
                    </div>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default AddressInfo;
