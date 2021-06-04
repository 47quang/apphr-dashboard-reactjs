import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import { PERMISSION } from 'src/constants/key';
import { NewCertificateSchema } from 'src/schema/formSchema';
import { createDiploma, deleteDiploma, fetchDiplomaByType, setEmptyCertificate, updateDiploma } from 'src/stores/actions/diploma';
import { renderButtons } from 'src/utils/formUtils';

const CertificateInfo = ({ t, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const initialValues = useSelector((state) => state.profile.profile);
  const [loading, setLoading] = useState(false);
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
    if (permissionIds.includes(PERMISSION.LIST_DIPLOMA)) {
      dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'certificate' }, setLoading));
      return () => {
        dispatch(setEmptyCertificate());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCertificate = (values) => {
    let form = values;
    form.type = 'certificate';
    form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    if (form.expiredDate === '') delete form.expiredDate;
    if (form.id) {
      dispatch(updateDiploma(form, t('message.successful_update')));
    } else {
      dispatch(createDiploma(form, t('message.successful_create'), handleResetNewCertificate));
    }
  };

  const getFormBody = (title, values, handleChange, handleBlur, touched, errors, isCreate) => {
    return (
      <>
        <h5>{title}.</h5>
        <hr className="mt-1" />
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values.name ?? ''}
            onBlur={handleBlur(`name`)}
            onChange={handleChange(`name`)}
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
            containerClassName={'form-group col-xl-4'}
            value={values.certificateType ?? ''}
            onBlur={handleBlur(`certificateType`)}
            onChange={handleChange(`certificateType`)}
            labelText={t('label.certificate_type')}
            inputType={'text'}
            placeholder={t('placeholder.enter_certificate_type')}
            inputClassName={'form-control'}
          />
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values.issuedPlace ?? ''}
            onBlur={handleBlur(`issuedPlace`)}
            onChange={handleChange(`issuedPlace`)}
            labelText={t('label.grant_place')}
            inputType={'text'}
            placeholder={t('placeholder.enter_grant_place')}
            inputClassName={'form-control'}
          />
        </div>
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values.issuedDate ?? ''}
            onBlur={handleBlur(`issuedDate`)}
            onChange={handleChange(`issuedDate`)}
            inputID={`issuedDate`}
            labelText={t('label.start_date2')}
            inputClassName={'form-control'}
            inputType={'date'}
            isRequiredField
            isTouched={touched.issuedDate}
            isError={errors.issuedDate && touched.issuedDate}
            errorMessage={t(errors.issuedDate)}
          />
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values.expiredDate ?? ''}
            onBlur={handleBlur(`expiredDate`)}
            onChange={handleChange(`expiredDate`)}
            labelText={t('label.expiration_date')}
            inputType={'date'}
            inputClassName={'form-control'}
            isError={errors.expiredDate && touched.expiredDate}
            errorMessage={t(errors.expiredDate)}
          />
        </div>
        <div className="row">
          <CommonMultipleTextInput
            containerClassName={'form-group col-xl-12'}
            value={values.note}
            onBlur={handleBlur('note')}
            onChange={handleChange('note')}
            labelText={t('label.note')}
            inputClassName={'form-control'}
          />
        </div>
        <div className="row">
          {isCreate ? (
            <CommonUploadFileButton
              isHide={!permissionIds.includes(PERMISSION.CREATE_DIPLOMA)}
              name={`attaches`}
              containerClassName="form-group col-xl-12"
              buttonClassName="btn btn-primary"
              value={values.attaches}
            />
          ) : (
            <CommonUploadFileButton
              isHide={!permissionIds.includes(PERMISSION.UPDATE_DIPLOMA)}
              name={`attaches`}
              containerClassName="form-group col-xl-12"
              buttonClassName="btn btn-primary"
              value={values.attaches}
            />
          )}
        </div>
        <hr className="mt-1" />
      </>
    );
  };
  const newCertificateRef = useRef();

  const handleResetNewCertificate = () => {
    newCertificateRef.current.handleReset();
    document.getElementById('newCertificate').hidden = true;
    document.getElementById('addBtn').disabled = false;
  };
  const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleCloseDeleteAlert = () => {
    setIsVisibleDeleteAlert(false);
  };
  return (
    <>
      {loading ? (
        <div className="text-center pt-4">
          <CircularProgress />
        </div>
      ) : (
        <CContainer fluid className="c-main m-auto p-4">
          <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 1000 }}>
            <button
              type="button"
              hidden={!permissionIds.includes(PERMISSION.CREATE_DIPLOMA)}
              className="btn btn-success rounded-circle p-3"
              id="addBtn"
              onClick={() => {
                document.getElementById('newCertificate').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add fontSize="large" />
            </button>
          </div>
          <div className="m-auto">
            <div>
              <Formik
                innerRef={newCertificateRef}
                initialValues={newCertificate}
                validationSchema={NewCertificateSchema}
                enableReinitialize
                onSubmit={(values) => {
                  createCertificate(values);
                }}
              >
                {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange }) => {
                  let isCreate = true;
                  return (
                    <form id="newCertificate" hidden={true} className="p-0 m-0">
                      <div className="shadow bg-white rounded p-4">
                        {getFormBody(t('label.create_new'), values, handleChange, handleBlur, touched, errors, isCreate)}
                        {renderButtons([
                          {
                            type: 'button',
                            className: `btn btn-primary mx-2`,
                            onClick: (e) => {
                              handleReset(e);
                              document.getElementById('newCertificate').hidden = true;
                              document.getElementById('addBtn').disabled = false;
                            },
                            name: t('label.cancel'),
                          },

                          {
                            type: 'button',
                            className: `btn btn-primary px-4 ml-4`,
                            onClick: (e) => {
                              handleSubmit(e);
                            },
                            name: t('label.create_new'),
                          },
                        ])}
                      </div>
                      <br />
                    </form>
                  );
                }}
              </Formik>
              {permissionIds.includes(PERMISSION.LIST_DIPLOMA) &&
                initialValues.certificates &&
                initialValues.certificates.length > 0 &&
                initialValues.certificates.map((certificate, index) => (
                  <Formik
                    key={'certificate ' + index}
                    initialValues={certificate}
                    validationSchema={NewCertificateSchema}
                    onSubmit={(values) => {
                      createCertificate(values);
                    }}
                  >
                    {({ values, errors, touched, handleChange, handleBlur, handleReset, handleSubmit }) => (
                      <div key={index} className="shadow bg-white rounded p-4">
                        {getFormBody(index + 1, values, handleChange, handleBlur, touched, errors)}
                        {renderButtons(
                          permissionIds.includes(PERMISSION.UPDATE_DIPLOMA)
                            ? [
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-2`,
                                  onClick: (e) => {
                                    setIsVisibleDeleteAlert(true);
                                    setDeleteId(certificate.id);
                                  },
                                  name: t('label.delete'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-2`,
                                  onClick: (e) => {
                                    handleReset(e);
                                  },
                                  name: t('label.reset'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 ml-2`,
                                  onClick: (e) => {
                                    handleSubmit(e);
                                  },
                                  name: t('label.save'),
                                },
                              ]
                            : [],
                        )}
                      </div>
                    )}
                  </Formik>
                ))}
              {isVisibleDeleteAlert && (
                <WarningAlertDialog
                  isVisible={isVisibleDeleteAlert}
                  title={t('title.confirm')}
                  warningMessage={t('message.confirm_delete_academic')}
                  titleConfirm={t('label.agree')}
                  titleCancel={t('label.cancel')}
                  handleCancel={(e) => {
                    handleCloseDeleteAlert();
                  }}
                  handleConfirm={(e) => {
                    dispatch(deleteDiploma(deleteId, t('message.successful_delete'), handleCloseDeleteAlert));
                  }}
                />
              )}
            </div>
          </div>
        </CContainer>
      )}
    </>
  );
};
export default CertificateInfo;
