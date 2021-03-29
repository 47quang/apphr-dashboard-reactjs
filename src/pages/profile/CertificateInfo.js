import { CContainer } from '@coreui/react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { createDiploma, deleteDiploma, fetchDiplomaByType, updateDiploma } from 'src/stores/actions/diploma';

const CertificateInfo = ({ t, profile, match }) => {
  const initialValues = profile;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'certificate' }));
  }, []);

  function create(form) {
    form.type = 'certificate';
    form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    console.log({ form });
    // if (form.id) {
    //   dispatch(updateDiploma(form, t('message.successful_create')));
    // } else {
    //   dispatch(createDiploma(form, t('message.successful_create')));
    // }
  }

  function removeCertificate(form, cb) {
    if (form.id) {
      dispatch(deleteDiploma(form.id));
    } else {
      cb();
    }
  }

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleSubmit, handleChange }) => {
              return (
                <Form>
                  <FieldArray
                    name="certificates"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.certificates.length > 0 &&
                          values.certificates.map((friend, index) => (
                            <div key={index}>
                              <div className={'d-flex justify-content-between'}>
                                <h5>{index + 1}.</h5>
                                <div>
                                  <Button size="small" variant="contained" color="primary" onClick={() => create(friend)} style={{marginRight: 10}}>
                                    {friend.id ? 'Cập nhật' : 'Tạo'}
                                  </Button>
                                  <Button size="small" variant="contained" color="secondary" onClick={() => removeCertificate(friend, () => remove(index))}>Xóa</Button>
                                </div>
                              </div>
                              <hr className="mt-1" />
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.certificate_name')} />
                                  <Field
                                    type="text"
                                    className={'form-control'}
                                    name={`certificates.${index}.name`}
                                    placeholder={t('placeholder.enter_certificate_name')}
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.certificate_type')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificates.${index}.certificateType`}
                                    placeholder={t('placeholder.enter_certificate_type')}
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.grant_place')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificates.${index}.provinceId`}
                                    placeholder={t('placeholder.enter_grant_place')}
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.start_date2')} />
                                  <input
                                    type="date"
                                    className={'form-control'}
                                    rows={5}
                                    name={`certificates.${index}.issuedDate`}
                                    onChange={(e) => handleChange(`certificates.${index}.issuedDate`)(e)}
                                    value={values.certificates[index].issuedDate}
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.expiration_date')} />
                                  <input
                                    type="date"
                                    className={'form-control'}
                                    rows={5}
                                    name={`certificates.${index}.expiredDate`}
                                    onChange={(e) => handleChange(`certificates.${index}.expiredDate`)(e)}
                                    value={values.certificates[index].expiredDate}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={t('label.note')} />
                                  <textarea
                                    className={'form-control'}
                                    rows={5}
                                    name={`certificates.${index}.note`}
                                    onChange={(e) => handleChange(`certificates.${index}.note`)(e)}
                                    value={values.certificates[index].note}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <CommonUploadFileButton
                                  name={`certificates.${index}.attaches`}
                                  containerClassName="form-group col-xl-12"
                                  buttonClassName="btn btn-primary"
                                  value={values.certificates[index].attaches}
                                />
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() =>
                              push({
                                name: '',
                                certificateType: '',
                                provinceId: 0,
                                note: '',
                                issuedDate: '',
                                expiredDate: '',
                                attaches: [],
                              })
                            }
                          >
                            <Add /> {t('label.add')}
                          </button>
                        </div>
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
