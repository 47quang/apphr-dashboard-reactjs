import { CContainer } from '@coreui/react';
import { Add, Delete } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import Label from 'src/components/text/Label';

const AcademicLevel = ({ t }) => {
  const initialAcademicLevelInfo = {
    academicInfo: [
      {
        academicLevel: '',
        major: '',
        educationPlace: '',
        note: '',
        date: '',
      },
    ],
  };
  const academicLevels = [
    { id: 'intermediate', name: t('label.intermediate') },
    { id: 'college', name: t('label.college') },
    { id: 'university', name: t('label.university') },
    { id: 'master', name: t('label.master') },
    { id: 'doctor_of_philosophy', name: t('label.doctor_of_philosophy') },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik
            initialValues={initialAcademicLevelInfo}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleReset, handleSubmit }) => {
              return (
                <Form>
                  <FieldArray
                    name="academicInfo"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.academicInfo.length > 0 &&
                          values.academicInfo.map((friend, index) => (
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
                                  <Label text={t('label.academic_level')} />
                                  <Field className={'form-control'} name={`academicInfo.${index}.academicLevel`} component="select">
                                    {academicLevels.map((ch, idx) => (
                                      <option key={idx} value={ch.id}>
                                        {ch.name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.major')} />
                                  <Field
                                    className={'form-control'}
                                    name={`academicInfo.${index}.major`}
                                    placeholder={t('placeholder.major')}
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.education_place')} />
                                  <Field
                                    className={'form-control'}
                                    name={`academicInfo.${index}.educationPlace`}
                                    placeholder={t('placeholder.education_place')}
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.start_date2')} />
                                  <input type="date" className={'form-control'} rows={5} name={`academicInfo.${index}.date`} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={t('label.note')} />
                                  <textarea className={'form-control'} rows={5} name={`academicInfo.${index}.note`} />
                                </div>
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() => push({ academicLevel: '', major: '', educationPlace: '', note: '', date: '' })}
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
export default AcademicLevel;
