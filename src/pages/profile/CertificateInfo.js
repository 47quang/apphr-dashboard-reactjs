import { CContainer } from '@coreui/react';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import Label from 'src/components/text/Label';

const CertificateInfo = ({ t }) => {
  const initialCertificateInfo = {
    certificateInfo: [
      {
        name: '',
        certificateType: '',
        certificatePlace: '',
        note: '',
        startDate: '',
        endDate: '',
      },
    ],
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik
            initialValues={initialCertificateInfo}
            enableReinitialize
            onSubmit={(values) => {
              console.log('Certificate: ', values);
            }}
          >
            {({ values, errors, touched, handleReset, handleSubmit }) => {
              return (
                <Form>
                  <FieldArray
                    name="certificateInfo"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.certificateInfo.length > 0 &&
                          values.certificateInfo.map((friend, index) => (
                            <div key={index}>
                              <div className={'d-flex justify-content-between'}>
                                <h5>{index + 1}.</h5>
                                <DeleteIconButton onClick={() => remove(index)} />
                              </div>
                              <hr className="mt-1" />
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.certificate_name')} />
                                  <Field
                                    type="text"
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.academicLevel`}
                                    placeholder={t('placeholder.enter_certificate_name')}
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.certificate_type')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificateType`}
                                    placeholder={t('placeholder.enter_certificate_type')}
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.grant_place')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificatePlace`}
                                    placeholder={t('placeholder.enter_grant_place')}
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.start_date2')} />
                                  <input type="date" className={'form-control'} rows={5} name={`certificateInfo.${index}.stateDate`} />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.expiration_date')} />
                                  <input type="date" className={'form-control'} rows={5} name={`certificateInfo.${index}.endDate`} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={t('label.note')} />
                                  <textarea className={'form-control'} rows={5} name={`certificateInfo.${index}.note`} />
                                </div>
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          {/* <button type="button" className="btn btn-primary" onClick={() => push({name: 'skype', certificateType: '' })}>
                            <AddCircle /> Thêm kênh liên lạc
                          </button> */}
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() =>
                              push({
                                name: '',
                                certificateType: '',
                                certificatePlace: '',
                                note: '',
                                startDate: '',
                                endDate: '',
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
