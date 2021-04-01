import { CContainer } from '@coreui/react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { createDiploma, deleteDiploma, fetchDiplomaByType, updateDiploma } from 'src/stores/actions/diploma';
import { renderButtons } from 'src/utils/formUtils';
import { CertificatesSchema, NewCertificateSchema } from 'src/schema/formSchema';
import { REDUX_STATE } from 'src/stores/states';

const CertificateInfo = ({ t, match }) => {
  const initialValues = useSelector((state) => state.profile.profile);
  let newCertificate = {
    name: '',
    certificateType: '',
    issuedPlace: '',
    issuedDate: '',
    expiredDate: '',
    note: '',
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'certificate' }));
  }, []);

  async function create(form) {
    form.type = 'certificate';
    form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    if (form.id) {
      await dispatch(updateDiploma(form, t('message.successful_update')));
    } else {
      await dispatch(createDiploma(form, t('message.successful_create')));
    }
  }

  function removeCertificate(certificateId) {
    dispatch(deleteDiploma(certificateId.id, t('message.successful_delete')));
  }

  return (
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-success"
              id="addBtn"
              onClick={() => {
                document.getElementById('newCertificate').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add /> {t('label.add')}
            </button>
          </div>
          <Formik initialValues={newCertificate} validationSchema={NewCertificateSchema} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange, validateForm, setTouched }) => {
              return (
                <Form id="newCertificate" hidden={true} className="p-0 m-0">
                  <div className="shadow bg-white rounded mx-4 p-4">
                    <h5>{'Tạo mới'}.</h5>
                    <hr className="mt-1" />
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.name ?? ''}
                        onBlur={handleBlur(`name`)}
                        onChange={handleChange(`name`)}
                        inputID={`name`}
                        labelText={t('label.certificate_name')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_certificate_name')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.name}
                        isError={errors.name && touched.name}
                        errorMessage={t(errors.name)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.certificateType ?? ''}
                        onBlur={handleBlur(`certificateType`)}
                        onChange={handleChange(`certificateType`)}
                        inputID={`certificateType`}
                        labelText={t('label.certificate_type')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_certificate_type')}
                        inputClassName={'form-control'}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.issuedPlace ?? ''}
                        onBlur={handleBlur(`issuedPlace`)}
                        onChange={handleChange(`issuedPlace`)}
                        inputID={`issuedPlace`}
                        labelText={t('label.grant_place')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_grant_place')}
                        inputClassName={'form-control'}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.issuedDate ?? ''}
                        onBlur={handleBlur(`issuedDate`)}
                        onChange={handleChange(`issuedDate`)}
                        inputID={`issuedDate`}
                        labelText={t('label.start_date2')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.issuedDate}
                        isError={errors.issuedDate && touched.issuedDate}
                        errorMessage={t(errors.issuedDate)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.expiredDate ?? ''}
                        onBlur={handleBlur(`expiredDate`)}
                        onChange={handleChange(`expiredDate`)}
                        inputID={`expiredDate`}
                        labelText={t('label.expiration_date')}
                        inputType={'date'}
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
                    <div className="row">
                      <CommonUploadFileButton
                        name={`attaches`}
                        containerClassName="form-group col-xl-12"
                        buttonClassName="btn btn-primary"
                        value={values.attaches}
                      />
                    </div>
                    <hr className="mt-1" />
                    {renderButtons([
                      {
                        type: 'button',
                        className: `btn btn-primary  mx-2`,
                        onClick: () => {
                          handleReset();
                          document.getElementById('newCertificate').hidden = true;
                          document.getElementById('addBtn').disabled = false;
                        },
                        name: t('label.cancel'),
                        position: 'right',
                      },

                      {
                        type: 'button',
                        className: `btn btn-primary px-4 ml-4`,
                        onClick: async () => {
                          let err = await validateForm();
                          if (err !== undefined && Object.keys(err).length !== 0) {
                            setTouched(err);
                            return;
                          }
                          await create(values).then(() => dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'certificate' })));
                          handleReset();
                          document.getElementById('newCertificate').hidden = true;
                          document.getElementById('addBtn').disabled = false;
                        },
                        name: t('label.save'),
                      },
                    ])}
                  </div>
                  <br />
                  <AutoSubmitToken />
                </Form>
              );
            }}
          </Formik>
          <Formik initialValues={initialValues} validationSchema={CertificatesSchema} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleSubmit, handleBlur, handleChange, validateForm, setFieldValue, setFieldTouched }) => {
              return (
                <Form>
                  <FieldArray
                    name="certificates"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.certificates &&
                          values.certificates.length > 0 &&
                          values.certificates.map((friend, index) => (
                            <div key={index} className="shadow bg-white rounded m-4 p-4">
                              <h5>{index + 1}.</h5>
                              <hr className="mt-1" />
                              <div className="row">
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  value={friend.name ?? ''}
                                  onBlur={handleBlur(`certificates.${index}.name`)}
                                  onChange={handleChange(`certificates.${index}.name`)}
                                  inputID={`certificates.${index}.name`}
                                  labelText={t('label.certificate_name')}
                                  inputType={'text'}
                                  placeholder={t('placeholder.enter_certificate_name')}
                                  inputClassName={'form-control'}
                                  isRequiredField
                                  isTouched={touched && touched.certificates && touched.certificates[index]?.name}
                                  isError={
                                    errors &&
                                    errors.certificates &&
                                    errors.certificates[index]?.name &&
                                    touched &&
                                    touched.certificates &&
                                    touched.certificates[index]?.name
                                  }
                                  errorMessage={t(errors && errors.certificates && errors.certificates[index]?.name)}
                                />
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  value={friend.certificateType ?? ''}
                                  onBlur={handleBlur(`certificates.${index}.certificateType`)}
                                  onChange={handleChange(`certificates.${index}.certificateType`)}
                                  inputID={`certificates.${index}.certificateType`}
                                  labelText={t('label.certificate_type')}
                                  inputType={'text'}
                                  placeholder={t('placeholder.enter_certificate_type')}
                                  inputClassName={'form-control'}
                                />
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  value={friend.issuedPlace ?? ''}
                                  onBlur={handleBlur(`certificates.${index}.issuedPlace`)}
                                  onChange={handleChange(`certificates.${index}.issuedPlace`)}
                                  inputID={`certificates.${index}.issuedPlace`}
                                  labelText={t('label.grant_place')}
                                  inputType={'text'}
                                  placeholder={t('placeholder.enter_grant_place')}
                                  inputClassName={'form-control'}
                                />
                              </div>

                              <div className="row">
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  value={friend.issuedDate ?? ''}
                                  onBlur={handleBlur(`certificates.${index}.issuedDate`)}
                                  onChange={(e) => handleChange(`certificates.${index}.issuedDate`)(e)}
                                  inputID={`certificates.${index}.issuedDate`}
                                  labelText={t('label.start_date2')}
                                  inputType={'date'}
                                  inputClassName={'form-control'}
                                  isRequiredField
                                  isTouched={touched && touched.certificates && touched.certificates[index]?.issuedDate}
                                  isError={
                                    errors &&
                                    errors.certificates &&
                                    errors.certificates[index]?.issuedDate &&
                                    touched &&
                                    touched.certificates &&
                                    touched.certificates[index]?.issuedDate
                                  }
                                  errorMessage={t(errors && errors.certificates && errors.certificates[index]?.issuedDate)}
                                />
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  value={friend.expiredDate ?? ''}
                                  onBlur={handleBlur(`certificates.${index}.expiredDate`)}
                                  onChange={(e) => handleChange(`certificates.${index}.expiredDate`)(e)}
                                  inputID={`certificates.${index}.expiredDate`}
                                  labelText={t('label.expiration_date')}
                                  inputType={'date'}
                                  inputClassName={'form-control'}
                                />
                              </div>
                              <div className="row">
                                <CommonMultipleTextInput
                                  containerClassName={'form-group col-xl-12'}
                                  value={friend.note}
                                  onBlur={handleBlur(`certificates.${index}.note`)}
                                  onChange={handleChange(`certificates.${index}.note`)}
                                  inputID={`certificates.${index}.note`}
                                  labelText={t('label.note')}
                                  inputClassName={'form-control'}
                                />
                              </div>
                              <div className="row">
                                <CommonUploadFileButton
                                  name={`certificates.${index}.attaches`}
                                  containerClassName="form-group col-xl-12"
                                  buttonClassName="btn btn-primary"
                                  value={values.certificates[index].attaches}
                                />
                              </div>
                              <hr className="mt-1" />

                              {renderButtons([
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-4`,
                                  onClick: async (e) => {
                                    await removeCertificate(friend.id).then(() => remove(index));
                                  },
                                  name: t('label.delete'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-4`,
                                  onClick: () => {
                                    setFieldValue(`certificates.${index}`, initialValues.certificates[index]);
                                  },
                                  name: t('label.reset'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 ml-4`,
                                  onClick: async () => {
                                    let err = await validateForm();
                                    let err_fields = err.certificates && Object.keys(err.certificates[index]);
                                    if (err.certificates && err.certificates[index] !== undefined && err_fields.length !== 0) {
                                      err_fields &&
                                        err_fields.length &&
                                        err_fields.forEach((val) => setFieldTouched(`certificates.${index}.${val}`, true));
                                      return;
                                    }
                                    create(friend);
                                    initialValues.certificates[index] = friend;
                                    setFieldValue(`certificates.${index}`, friend);
                                    //dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' }));
                                    document.getElementById('newDegree').hidden = true;
                                    document.getElementById('addBtn').disabled = false;
                                  },
                                  name: friend.id ? t('label.save') : t('label.create_new'),
                                },
                              ])}
                            </div>
                          ))}
                      </div>
                    )}
                  />
                  <br />

                  <AutoSubmitToken />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};
export default CertificateInfo;
