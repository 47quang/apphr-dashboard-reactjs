import { CContainer } from '@coreui/react';
import { Add, Delete } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
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
            onSubmit={(values) => {
              console.log(values);
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
                                <div className="pt-2">
                                  <Delete onClick={() => remove(index)} style={{ color: 'red' }} />
                                </div>
                              </div>
                              <hr className="mt-1" />
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.certificate_name')} />
                                  <Field
                                    type="text"
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.academicLevel`}
                                    placeholder={t('placeholder.certificate_name')}
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('placeholder.certificate_type')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificateType`}
                                    placeholder={t('placeholder.certificate_type')}
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.grant_place')} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificatePlace`}
                                    placeholder={t('placeholder.grant_place')}
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
                  <div className="row col-12">
                    {/* <button
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
    </CContainer>
  );
};
export default CertificateInfo;
