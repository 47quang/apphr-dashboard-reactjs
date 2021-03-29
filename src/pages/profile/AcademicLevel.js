import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { createDiploma, deleteDiploma, fetchDiplomaByType, updateDiploma } from 'src/stores/actions/diploma';

const AcademicLevel = ({ t, profile, match }) => {
  const dispatch = useDispatch();
  const initialValues = useSelector((state) => state.profile.profile);
  const academicLevels = [
    { id: 'intermediate', name: t('label.intermediate') },
    { id: 'college', name: t('label.college') },
    { id: 'university', name: t('label.university') },
    { id: 'master', name: t('label.master') },
    { id: 'doctor_of_philosophy', name: t('label.doctor_of_philosophy') },
  ];

  useEffect(() => {
    dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' }));
  }, []);

  function create(form) {
    form.type = 'degree';
    form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    if (form.id) {
      dispatch(updateDiploma(form, t('message.successful_create')));
    } else {
      dispatch(createDiploma(form, t('message.successful_create')));
    }
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
                    name="degrees"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.degrees &&
                          values.degrees.length > 0 &&
                          values.degrees.map((friend, index) => (
                            <div key={index}>
                              <div className={'d-flex justify-content-between'}>
                                <h5>{index + 1}.</h5>
                                <div>
                                  <Button size="small" variant="contained" color="primary" onClick={() => create(friend)} style={{ marginRight: 10 }}>
                                    {friend.id ? 'Cập nhật' : 'Tạo'}
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => removeCertificate(friend, () => remove(index))}
                                  >
                                    Xóa
                                  </Button>
                                </div>
                              </div>
                              <hr className="mt-1" />
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.academic_level')} />
                                  <Field className={'form-control'} name={`degrees.${index}.level`} component="select">
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
                                    name={`degrees.${index}.name`}
                                    placeholder={t('placeholder.enter_major')}
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={t('label.education_place')} />
                                  <Field
                                    className={'form-control'}
                                    name={`degrees.${index}.provinceId`}
                                    placeholder={t('placeholder.enter_education_place')}
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
                                    name={`degrees.${index}.issuedDate`}
                                    onChange={(e) => handleChange(`degrees.${index}.issuedDate`)(e)}
                                    value={values.degrees[index].date}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={t('label.note')} />
                                  <textarea
                                    className={'form-control'}
                                    rows={5}
                                    name={`degrees.${index}.note`}
                                    onChange={(e) => handleChange(`degrees.${index}.note`)(e)}
                                    value={values.degrees[index].note}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <CommonUploadFileButton
                                  name={`degrees.${index}.attaches`}
                                  containerClassName="form-group col-xl-12"
                                  buttonClassName="btn btn-primary"
                                  value={values.degrees[index].attaches}
                                />
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() => push({ level: '', name: '', provinceId: 0, note: '', issuedDate: '', attaches: [] })}
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
export default AcademicLevel;
