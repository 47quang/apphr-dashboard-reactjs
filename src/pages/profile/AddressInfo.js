import { CContainer } from '@coreui/react';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';

const AddressInfo = ({ t }) => {
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  useEffect(() => {
    dispatch(fetchProvinces());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        link: 'trungvuive1999',
      },
    ],
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto row">
        <div className="col-xl-7">
          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={t('title.permanent_address')} />
            <Formik initialValues={permanentAddressInfo}>
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={t('label.permanent_address')}
                      value={values.permanentAddress}
                      onChange={handleChange('permanentAddress')}
                      onBlur={handleBlur('permanentAddress')}
                      inputID={'permanentAddress'}
                      placeholder={t('placeholder.enter_permanent_address')}
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
                      labelText={t('label.province')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_province')}
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
                      labelText={t('label.district')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_district')}
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
                      labelText={t('label.ward')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_ward')}
                      lstSelectOptions={wards}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.domicile}
                      onBlur={handleBlur('domicile')}
                      onChange={handleChange('domicile')}
                      inputID={'domicile'}
                      labelText={t('label.domicile')}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_domicile')}
                    />
                  </div>
                  <div className={'row'}>
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={t('label.current_address')}
                      value={values.currentAddress}
                      onChange={handleChange('currentAddress')}
                      onBlur={handleBlur('currentAddress')}
                      inputID={'currentAddress'}
                      placeholder={t('placeholder.enter_current_address')}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={t('title.urgent_contact_info')} />
            <Formik initialValues={urgentContactInfo}>
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={t('label.relative_full_name')}
                      value={values.name}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      inputID={'name'}
                      placeholder={t('placeholder.enter_relative_full_name')}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={t('label.employee_relation')}
                      value={values.employeeRelation}
                      onChange={handleChange('employeeRelation')}
                      onBlur={handleBlur('employeeRelation')}
                      inputID={'employeeRelation'}
                      placeholder={t('placeholder.enter_employee_relation')}
                    />
                  </div>
                  <div className={'row'}>
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
                    />
                  </div>
                  <div className={'row'}>
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={t('label.contact_address')}
                      value={values.contactAddress}
                      onChange={handleChange('contactAddress')}
                      onBlur={handleBlur('contactAddress')}
                      inputID={'contactAddress'}
                      placeholder={t('placeholder.enter_contact_address')}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={'col-xl-5'}>
          <div className="shadow bg-white rounded p-4">
            <FormHeader text={t('title.contact_channel')} />
            <Formik
              initialValues={initialContactChannelValues}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleReset, handleSubmit }) => {
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
                                    placeholder={t('placeholder.select_contact_channel')}
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
                              <AddCircle /> {t('label.add')}
                            </button>
                          </div>
                        </div>
                      )}
                    />
                    <br />
                    <div className="row col-12">
                      {/* {renderButtons([])}
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
                      </button> */}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default AddressInfo;
