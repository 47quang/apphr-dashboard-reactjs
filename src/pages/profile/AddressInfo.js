import { CContainer } from '@coreui/react';
import { Popover } from '@material-ui/core';
import { AddCircle, Delete, Save, WarningOutlined } from '@material-ui/icons';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { CONTACT_TYPE } from 'src/constants/key';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import {
  createNewContact,
  fetchContacts,
  updatePermanentAddress,
  updateRelationship,
  updateContact,
  deleteContact,
} from 'src/stores/actions/profile';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import { joinClassName } from 'src/utils/stringUtils';
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
  const contacts = useSelector((state) => state.profile.contacts);

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
  const getContactFormBody = (values, handleBlur, handleChange, errors, touched, isUpdated) => {
    return (
      <>
        <CommonSelectInput
          containerClassName={'form-group col-sm-5'}
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
          containerClassName={joinClassName(['form-group', `${isUpdated ? 'col-sm-5' : 'col-sm-7'}`])}
          inputClassName="form-control"
          value={values.url}
          onBlur={handleBlur('url')}
          onChange={handleChange('url')}
          inputID={'url'}
          isTouched={touched.url}
          isError={errors.url && touched.url}
          errorMessage={t(errors.url)}
        />
      </>
    );
  };
  const getContactFormCreate = () => {
    return (
      <Formik
        initialValues={initialContact}
        validationSchema={ContactSchema}
        onSubmit={(values) => {
          dispatch(createNewContact(values, profile.id, t('message.successful_create_contact')));
          setShowCreateContact(true);
        }}
      >
        {({ values, errors, touched, handleReset, handleSubmit, handleBlur, handleChange }) => {
          return (
            <form>
              <div className="bg-light bg-gradient p-3 mt-3">
                <div className="row">{getContactFormBody(values, handleBlur, handleChange, errors, touched)}</div>
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
            </form>
          );
        }}
      </Formik>
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const getContactFormUpdate = (contactValues) => {
    const handleDelete = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const setClosePopOver = () => {
      setAnchorEl(null);
    };
    return (
      <Formik
        initialValues={contactValues}
        enableReinitialize
        validationSchema={ContactSchema}
        onSubmit={(values) => {
          dispatch(updateContact(values, profile.id, t('message.successful_update_contact')));
        }}
      >
        {({ values, errors, touched, handleReset, handleSubmit, handleBlur, handleChange }) => {
          return (
            <form>
              <div className="row">
                {getContactFormBody(values, handleBlur, handleChange, errors, touched, true)}
                <div className={'col-sm-2 d-flex flex-row justify-content-around pt-1'}>
                  <div role="button" onClick={handleSubmit}>
                    <Save style={{ color: 'blue' }} />
                  </div>
                  <div role="button" onClick={handleDelete} aria-describedby={'deleteContact'}>
                    <Delete style={{ color: 'red' }} />
                  </div>{' '}
                  <Popover
                    id={'deleteContact'}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    elevation={1}
                  >
                    <div className="bg-warning p-2" style={{ fontSize: 15 }}>
                      <WarningOutlined style={{ color: 'white', fontSize: 20 }} className="mr-2" />
                      {t('title.confirm')}
                    </div>
                    <div className={'p-2'}>{t('message.confirm_delete_contact')}</div>
                    <div className="p-2 d-flex flex-row justify-content-around">
                      <button
                        type="button"
                        autoFocus
                        onClick={(e) => {
                          setClosePopOver();
                        }}
                        className="btn btn-secondary mx-auto text-white"
                      >
                        {t('label.cancel')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning mx-auto text-white"
                        onClick={(e) => {
                          dispatch(deleteContact(contactValues.id, profile.id, setClosePopOver, t('message.successful_delete_contact')));
                        }}
                      >
                        {t('label.agree')}
                      </button>
                    </div>
                  </Popover>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  };
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
                      containerClassName={'form-group col-xl-12'}
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
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-12'}
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
                      containerClassName={'form-group col-xl-6'}
                      inputClassName={'form-control'}
                      labelText={t('label.relative_full_name')}
                      value={values.name ?? ''}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      inputID={'name'}
                      placeholder={t('placeholder.enter_relative_full_name')}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-6'}
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
                      containerClassName={'form-group col-xl-12'}
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
            {contacts && contacts.length > 0 && contacts.map((contact, index) => <div key={index}>{getContactFormUpdate(contact)}</div>)}

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
            {!showCreateContact && getContactFormCreate()}
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default AddressInfo;
