import { CContainer } from '@coreui/react';
import { Add } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import { NewDegreeSchema } from 'src/schema/formSchema';
import { createDiploma, deleteDiploma, fetchDiplomaByType, setEmptyAcademic, updateDiploma } from 'src/stores/actions/diploma';
import { renderButtons } from 'src/utils/formUtils';

const AcademicLevel = ({ t, match }) => {
  const dispatch = useDispatch();
  const initialValues = useSelector((state) => state.profile.profile);

  const newDegree = {
    level: '',
    name: '',
    issuedPlace: '',
    issuedDate: '',
    note: '',
    attaches: [],
  };

  const academicLevels = [
    { id: 'intermediate', name: t('label.intermediate') },
    { id: 'college', name: t('label.college') },
    { id: 'university', name: t('label.university') },
    { id: 'master', name: t('label.master') },
    { id: 'doctor_of_philosophy', name: t('label.doctor_of_philosophy') },
  ];
  useEffect(() => {
    dispatch(setEmptyAcademic());
    dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDegree = (values) => {
    let form = values;
    form.type = 'degree';
    form.profileId = +match.params.id;
    if (form.id) {
      dispatch(updateDiploma(form, t('message.successful_update')));
    } else {
      dispatch(createDiploma(form, t('message.successful_create'), handleResetNewDegree));
    }
  };
  const getFormBody = (title, values, handleChange, handleBlur, touched, errors) => {
    return (
      <>
        <h5>{title}.</h5>
        <hr className="mt-1" />
        <div className="row">
          <CommonSelectInput
            containerClassName={'form-group col-lg-4'}
            value={values.level ?? ''}
            onBlur={handleBlur(`level`)}
            onChange={handleChange(`level`)}
            labelText={t('label.academic_level')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_academic_level')}
            isRequiredField
            isTouched={touched.level}
            isError={errors.level && touched.level}
            errorMessage={t(errors.level)}
            lstSelectOptions={academicLevels}
          />
          <CommonTextInput
            containerClassName={'form-group col-lg-4'}
            value={values.name ?? ''}
            onBlur={handleBlur(`name`)}
            onChange={handleChange(`name`)}
            labelText={t('label.major')}
            inputType={'text'}
            placeholder={t('placeholder.enter_academic_major')}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched.name}
            isError={errors.name && touched.name}
            errorMessage={t(errors.name)}
          />
          <CommonTextInput
            containerClassName={'form-group col-lg-4'}
            value={values.issuedPlace ?? ''}
            onBlur={handleBlur(`issuedPlace`)}
            onChange={handleChange(`issuedPlace`)}
            labelText={t('label.education_place')}
            inputType={'text'}
            placeholder={t('placeholder.enter_education_place')}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched.issuedPlace}
            isError={errors.issuedPlace && touched.issuedPlace}
            errorMessage={t(errors.issuedPlace)}
          />
        </div>
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-lg-4'}
            value={values.issuedDate ?? ''}
            onBlur={handleBlur(`issuedDate`)}
            onChange={handleChange(`issuedDate`)}
            labelText={t('label.start_date2')}
            inputType={'date'}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched.issuedDate}
            isError={errors.issuedDate && touched.issuedDate}
            errorMessage={t(errors.issuedDate)}
          />
        </div>
        <div className="row">
          <CommonMultipleTextInput
            containerClassName={'form-group col-lg-12'}
            value={values.note}
            onBlur={handleBlur(`note`)}
            onChange={handleChange(`note`)}
            labelText={t('label.note')}
            inputClassName={'form-control'}
          />
        </div>
        <div className="row">
          <CommonUploadFileButton
            name={`attaches`}
            containerClassName="form-group col-lg-12"
            buttonClassName="btn btn-primary"
            value={values.attaches}
          />
        </div>
        <hr className="mt-1" />
      </>
    );
  };
  const newDegreeRef = useRef();
  const handleResetNewDegree = () => {
    newDegreeRef.current.handleReset();
    document.getElementById('newDegree').hidden = true;
    document.getElementById('addBtn').disabled = false;
  };
  const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);
  const handleCloseDeleteAlert = () => {
    setIsVisibleDeleteAlert(false);
  };
  return (
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-success"
              id="addBtn"
              onClick={(e) => {
                document.getElementById('newDegree').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add /> {t('label.add')}
            </button>
          </div>
          <Formik
            initialValues={newDegree}
            innerRef={newDegreeRef}
            validationSchema={NewDegreeSchema}
            enableReinitialize
            onSubmit={(values) => {
              createDegree(values);
            }}
          >
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange }) => {
              return (
                <form id="newDegree" hidden={true} className="p-0 m-0">
                  <div className="shadow bg-white rounded mx-4 p-4">
                    {getFormBody(t('label.create_new'), values, handleChange, handleBlur, touched, errors)}
                    {renderButtons([
                      {
                        type: 'button',
                        className: `btn btn-primary  mx-2`,
                        onClick: (e) => {
                          handleReset(e);
                          document.getElementById('newDegree').hidden = true;
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
          {initialValues.degrees && initialValues.degrees.length > 0 ? (
            initialValues.degrees.map((degree, index) => (
              <Formik
                initialValues={degree}
                key={'degree' + index}
                validationSchema={NewDegreeSchema}
                onSubmit={(values) => {
                  createDegree(values);
                }}
              >
                {({ values, errors, touched, handleBlur, handleSubmit, handleChange, handleReset }) => (
                  <div className="shadow bg-white rounded m-4 p-4">
                    {getFormBody(index + 1, values, handleChange, handleBlur, touched, errors)}
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
                        dispatch(deleteDiploma(degree.id, t('message.successful_delete'), handleCloseDeleteAlert));
                      }}
                    />

                    {renderButtons([
                      {
                        type: 'button',
                        className: `btn btn-primary px-4 mx-2`,
                        onClick: (e) => {
                          setIsVisibleDeleteAlert(true);
                        },
                        name: t('label.delete'),
                      },
                      {
                        type: 'button',
                        className: `btn btn-primary px-4 mx-2`,
                        onClick: (e) => {
                          handleReset(e);
                        },
                        name: t('label.reset'),
                      },
                      {
                        type: 'button',
                        className: `btn btn-primary px-4 ml-2`,
                        onClick: (e) => {
                          handleSubmit(e);
                        },
                        name: t('label.save'),
                      },
                    ])}
                  </div>
                )}
              </Formik>
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    </CContainer>
  );
};
export default AcademicLevel;
