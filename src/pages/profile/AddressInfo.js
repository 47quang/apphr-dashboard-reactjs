import { CContainer } from '@coreui/react';
import { AddCircle } from '@material-ui/icons';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { CONTACT_TYPE } from 'src/constants/key';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { createNewContact, fetchContacts, updatePermanentAddress, updateRelationship } from 'src/stores/actions/profile';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import { ContactSchema } from '../../schema/formSchema';

const AddressInfo = ({ t, profile, history }) => {
  const ADDRESS_INFO = {
    PERMANENT_INFO: 'Permanent Info',
    RELATION_INFO: 'Relation Info',
  };
  const permanentAddressRef = useRef();
  const relationInfoRef = useRef();
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);
  const contacts = useSelector((state) => state.profile.contact);

  useEffect(() => {
    if (provinces.length === 0) dispatch(fetchProvinces());
    dispatch(fetchContacts(profile.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (profile.provinceId) {
      dispatch(fetchDistricts({ provinceId: profile.provinceId }));
    }
    if (profile.districtId) {
      dispatch(fetchWards({ districtId: profile.districtId }));
    }
  }, [profile.provinceId, profile.districtId, dispatch]);
  const relationInfo = profile.relationship ?? {
    name: '',
    relation: '',
    phone: '',
    address: '',
  };
  const channels = [
    {
      id: CONTACT_TYPE.SKYPE,
      name: 'Skype',
    },
    { id: CONTACT_TYPE.FACEBOOK, name: 'Facebook' },
    { id: CONTACT_TYPE.INSTAGRAM, name: 'Instagram' },
    { id: CONTACT_TYPE.LINKEDIN, name: 'LinkedIn' },
    { id: CONTACT_TYPE.ZALO, name: 'Zalo' },
  ];

  const initialContact = {
    type: '',
    url: '',
  };
  const getButtonsUpdate = (action) => {
    return [
      {
        type: 'reset',
        className: `btn btn-primary mr-4`,
        onClick: (e) => {
          if (action === ADDRESS_INFO.PERMANENT_INFO) permanentAddressRef.current.handleReset(e);
          else relationInfoRef.current.handleReset(e);
        },
        name: t('label.reset'),
      },
      {
        type: 'button',
        className: `btn btn-primary`,
        onClick: (e) => {
          if (action === ADDRESS_INFO.PERMANENT_INFO) permanentAddressRef.current.handleSubmit(e);
          else relationInfoRef.current.handleSubmit(e);
        },
        name: t('label.update'),
        position: 'right',
      },
    ];
  };
  const [showCreateContact, setShowCreateContact] = useState(true);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto row">
        <div className="col-xl-7">
          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={t('title.permanent_address')} />
            <Formik
              initialValues={profile}
              enableReinitialize
              innerRef={permanentAddressRef}
              onSubmit={(values) => {
                dispatch(updatePermanentAddress(values, provinces, districts, wards, t('message.successful_update')));
              }}
            >
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      labelText={t('label.permanent_address')}
                      value={values.permanentAddress ?? ''}
                      onChange={handleChange('permanentAddress')}
                      onBlur={handleBlur('permanentAddress')}
                      inputID={'permanentAddress'}
                      placeholder={t('placeholder.enter_permanent_address')}
                    />
                  </div>
                  <div className={'row'}>
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.provinceId ?? 0}
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
                      value={values.districtId ?? 0}
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
                      value={values.wardId ?? 0}
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
                      value={values.homeTown ?? ''}
                      onBlur={handleBlur('homeTown')}
                      onChange={handleChange('homeTown')}
                      inputID={'homeTown'}
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
                      value={values.temporaryAddress ?? ''}
                      onChange={handleChange('temporaryAddress')}
                      onBlur={handleBlur('temporaryAddress')}
                      inputID={'temporaryAddress'}
                      placeholder={t('placeholder.enter_current_address')}
                    />
                  </div>
                  {renderButtons(getButtonsUpdate(ADDRESS_INFO.PERMANENT_INFO))}
                </form>
              )}
            </Formik>
          </div>

          <div className="shadow bg-white rounded p-4 mb-4">
            <FormHeader text={t('title.urgent_contact_info')} />
            <Formik
              initialValues={relationInfo}
              enableReinitialize
              innerRef={relationInfoRef}
              onSubmit={(values) => {
                dispatch(updateRelationship(values, profile.id, t('message.successful_update')));
              }}
            >
              {({ values, handleBlur, handleSubmit, errors, touched, handleChange }) => (
                <form>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={t('label.relative_full_name')}
                      value={values.name ?? ''}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      inputID={'name'}
                      placeholder={t('placeholder.enter_relative_full_name')}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      inputClassName={'form-control'}
                      labelText={t('label.employee_relation')}
                      value={values.relation ?? ''}
                      onChange={handleChange('relation')}
                      onBlur={handleBlur('relation')}
                      inputID={'relation'}
                      placeholder={t('placeholder.enter_employee_relation')}
                    />
                  </div>
                  <div className={'row'}>
                    <CommonTextInput
                      containerClassName={'form-group col-lg-6'}
                      value={values.phone ?? ''}
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
                      value={values.address ?? ''}
                      onChange={handleChange('address')}
                      onBlur={handleBlur('address')}
                      inputID={'address'}
                      placeholder={t('placeholder.enter_contact_address')}
                    />
                  </div>
                  {renderButtons(getButtonsUpdate(ADDRESS_INFO.RELATION_INFO))}
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={'col-xl-5'}>
          <div className="shadow bg-white rounded p-4">
            <FormHeader text={t('title.contact_channel')} />
            {contacts}

            {showCreateContact && (
              <div className="row col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    setShowCreateContact(false);
                  }}
                >
                  <AddCircle /> {t('label.add')}
                </button>
              </div>
            )}
            {!showCreateContact && (
              <Formik
                initialValues={initialContact}
                validationSchema={ContactSchema}
                onSubmit={(values) => {
                  dispatch(createNewContact(values, profile.id));
                  setShowCreateContact(true);
                }}
              >
                {({ values, errors, touched, handleReset, handleSubmit, handleBlur, handleChange }) => {
                  return (
                    <form>
                      <div className="bg-light bg-gradient p-3 mt-3">
                        <div className="row">
                          <CommonSelectInput
                            containerClassName={'form-group col-5'}
                            value={values.type}
                            selectClassName={'form-control'}
                            onBlur={handleBlur('type')}
                            onChange={handleChange('type')}
                            inputID={t('label.profileId')}
                            lstSelectOptions={channels}
                            isTouched={touched.type}
                            isError={errors.type && touched.type}
                            errorMessage={t(errors.type)}
                          />
                          <CommonTextInput
                            containerClassName="form-group col-7"
                            inputClassName="form-control"
                            value={values.url}
                            onBlur={handleBlur('url')}
                            onChange={handleChange('url')}
                            inputID={'url'}
                            isTouched={touched.url}
                            isError={errors.url && touched.url}
                            errorMessage={t(errors.url)}
                          />
                        </div>
                        {renderButtons([
                          {
                            type: 'button',
                            className: `btn btn-primary mr-4`,
                            onClick: (e) => {
                              setShowCreateContact(true);
                            },
                            name: t('label.cancel'),
                          },
                          {
                            type: 'button',
                            className: `btn btn-primary`,
                            onClick: (e) => {
                              handleSubmit(e);
                            },
                            name: t('label.create_new'),
                            position: 'right',
                          },
                        ])}
                      </div>
                      {/* <div className="row" key={index}>
                            <div className="form-group col-4">
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
                            
                            <div className="form-group col-7">
                              <Field className={'form-control'} name={`contactChannels.${index}.link`} placeholder="Nhập link" type="text" />
                            </div>
                            <div className="form-group pt-2">
                              <CancelOutlined onClick={() => remove(index)} style={{ color: 'red' }} />
                            </div>
                          </div>
                        ))}
                      
                    </div>
                    )} />
                    <br /> */}
                    </form>
                  );
                }}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default AddressInfo;
