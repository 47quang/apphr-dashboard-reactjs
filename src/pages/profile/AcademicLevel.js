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
import { renderButtons } from 'src/utils/formUtils';

const AcademicLevel = ({ t, match }) => {
  const dispatch = useDispatch();
  const initialValues = useSelector((state) => state.profile.profile);
  const newDegree = useSelector((state) => state.profile.profile.newDegree);

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
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div className="">
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-success" onClick={() => (document.getElementById('newDegree').hidden = false)}>
              <Add /> {t('label.add')}
            </button>
          </div>
          <Formik initialValues={newDegree} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleSubmit, handleChange }) => {
              return (
                <Form id="newDegree" hidden={true}>
                  <div className="shadow bg-white rounded m-4 p-4">
                    <h5>{'New' + 1}.</h5>
                    <hr className="mt-1" />
                    <div className="row">
                      <div className="form-group col-lg-4">
                        <Label text={t('label.academic_level')} />
                        <Field className={'form-control'} name={`level`} component="select">
                          {academicLevels.map((ch, idx) => (
                            <option key={idx} value={ch.id}>
                              {ch.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="form-group col-lg-4">
                        <Label text={t('label.major')} />
                        <Field className={'form-control'} name={`name`} placeholder={t('placeholder.enter_major')} type="text" />
                      </div>
                      <div className="form-group col-lg-4">
                        <Label text={t('label.education_place')} />
                        <Field className={'form-control'} name={`provinceId`} placeholder={t('placeholder.enter_education_place')} type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-4">
                        <Label text={t('label.start_date2')} />
                        <input
                          type="date"
                          className={'form-control'}
                          rows={5}
                          name={`issuedDate`}
                          onChange={(e) => handleChange(`issuedDate`)(e)}
                          value={values.issuedDate}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-12">
                        <Label text={t('label.note')} />
                        <textarea className={'form-control'} rows={5} name={`note`} onChange={(e) => handleChange(`note`)(e)} value={values.note} />
                      </div>
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
                        className: `btn btn-primary px-4 mx-4`,
                        onClick: () => (document.getElementById('newDegree').hidden = true),
                        name: t('label.cancel'),
                        position: 'right',
                      },

                      {
                        type: 'button',
                        className: `btn btn-primary px-4 ml-4`,
                        onClick: () => create(values),
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
                            <div key={index} className="shadow bg-white rounded m-4 p-4">
                              <h5>{index + 1}.</h5>
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
                              <hr className="mt-1" />
                              {renderButtons([
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-4`,
                                  onClick: () => removeCertificate(friend, () => remove(index)),
                                  name: t('label.cancel'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 mx-4`,
                                  onClick: () => console.log(index),
                                  name: t('label.reset'),
                                  position: 'right',
                                },
                                {
                                  type: 'button',
                                  className: `btn btn-primary px-4 ml-4`,
                                  onClick: () => create(friend),
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
export default AcademicLevel;
