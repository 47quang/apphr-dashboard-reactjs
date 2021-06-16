import { CContainer } from '@coreui/react';
import { AddCircle } from '@material-ui/icons';
import { FieldArray, Formik, getIn } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { ROUTE_PATH } from 'src/constants/key';
import { renderButtons } from 'src/utils/formUtils';
import { NewLeaveFormSchema } from 'src/schema/formSchema';
import { api } from 'src/stores/apis';
import { fetchProfiles } from 'src/stores/actions/account';
import { parseLocalTime } from 'src/utils/datetimeUtils';
import { createLeaveRequest } from 'src/stores/actions/request';
import { generateCode } from 'src/utils/randomCode';
import Label from 'src/components/text/Label';

const NewLeaveForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.account.profiles);

  const type = [
    { id: 'no-pay', name: t('label.no-pay') },
    { id: 'pay', name: t('label.pay') },
    { id: 'policy', name: t('label.policy') },
  ];
  const status = [
    { id: 'new', name: t('label.new') },
    { id: 'approve', name: t('label.approve') },
    { id: 'reject', name: t('label.reject') },
  ];
  const leaveRequest = {
    type: '',
    assignments: [],
    status: '',
    profileId: '',
  };

  useEffect(() => {
    dispatch(fetchProfiles({ fields: ['id', 'firstname', 'lastname', 'code'] }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-6">
          <Formik
            enableReinitialize
            initialValues={leaveRequest}
            validationSchema={NewLeaveFormSchema}
            onSubmit={(values) => {
              let data = { ...values };
              data.assignmentIds = values.assignments && values.assignments.length > 0 ? values.assignments.map((ass) => +ass.id) : [];
              delete data.assignments;
              data.profileId = parseInt(data.profileId);

              dispatch(createLeaveRequest(data, history, t('message.successful_create')));
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.leave_info')} />
                <div className="row">
                  <div className="form-group col-xl-12  ">
                    <Label text={t('label.code')} required />
                    <div className="input-group">
                      <input
                        type="text"
                        className={'form-control col-10'}
                        rows={5}
                        onBlur={handleBlur('code')}
                        name={`code`}
                        onChange={(e) => handleChange(`code`)(e)}
                        value={values.code ?? ''}
                        placeholder={t('placeholder.enter_leave_code')}
                      />
                      <div
                        className="input-group-text col-2 d-flex justify-content-center"
                        id="basic-addon2"
                        type="button"
                        onClick={(e) => {
                          let randomCode = generateCode();
                          setFieldValue('code', randomCode);
                        }}
                      >
                        {t('label.random')}
                      </div>
                    </div>
                    {errors.code && touched.code && t(errors.code) ? (
                      <div>
                        <small className={'text-danger'}>{t(errors.code)}</small>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-12  '}
                    value={values.type ?? ''}
                    onBlur={handleBlur('type')}
                    onChange={handleChange('type')}
                    inputID={'type'}
                    labelText={t('label.leave_type')}
                    selectClassName={'form-control'}
                    placeholder={t('placeholder.select_leave_type')}
                    isRequiredField
                    lstSelectOptions={type}
                    isTouched={touched.type}
                    isError={touched.type && errors.type}
                    errorMessage={t(errors.type)}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.profileId ?? ''}
                    labelText={t('label.profileId')}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('profileId')}
                    onChange={(e) => {
                      handleChange('profileId')(e);
                      setFieldValue('assignments', []);
                    }}
                    inputID={t('label.profileId')}
                    lstSelectOptions={profiles}
                    isRequiredField
                    placeholder={t('placeholder.select_profile')}
                    isTouched={touched.profileId}
                    isError={touched.profileId && errors.profileId}
                    errorMessage={t(errors.profileId)}
                  />
                </div>
                <FieldArray
                  name={`assignments`}
                  render={({ insert, remove, push, replace }) => (
                    <div>
                      {values.assignments &&
                        values.assignments.length > 0 &&
                        values.assignments.map((assignment, assignmentIdx) => {
                          return (
                            <div key={`assignment${assignmentIdx}`}>
                              <div className="row">
                                <div className="row col-11">
                                  <CommonTextInput
                                    containerClassName={'form-group col-lg-6'}
                                    inputClassName={'form-control'}
                                    value={assignment.date ?? ''}
                                    onBlur={handleBlur(`assignments.${assignmentIdx}.date`)}
                                    onChange={async (e) => {
                                      handleChange(`assignments.${assignmentIdx}.date`)(e);
                                      let from = new Date(e.target.value);
                                      from.setHours(0);
                                      let to = new Date(e.target.value);
                                      to.setHours(23);
                                      to.setMinutes(59);
                                      if (values.profileId && e.target.value) {
                                        let assignments = await api.assignment
                                          .getAll({
                                            profileId: values.profileId,
                                            from: from,
                                            to: to,
                                          })
                                          .then(({ payload }) => {
                                            payload =
                                              payload && payload.length > 0
                                                ? payload.map((ass) => {
                                                    ass.name =
                                                      parseLocalTime(ass.shift.startCC) +
                                                      ' - ' +
                                                      parseLocalTime(ass.shift.endCC) +
                                                      ' ' +
                                                      ass.shift.branch.name;
                                                    return ass;
                                                  })
                                                : [];
                                            return payload;
                                          });
                                        setFieldValue(`assignments.${assignmentIdx}.assignments`, assignments);
                                      }
                                    }}
                                    inputID={`assignments.${assignmentIdx}.date`}
                                    labelText={t('label.leave_date')}
                                    inputType={'date'}
                                    isRequiredField
                                    isDisable={values.profileId === '0' || values.profileId === ''}
                                    isTouched={getIn(touched, `assignments.${assignmentIdx}.date`)}
                                    isError={
                                      getIn(errors, `assignments.${assignmentIdx}.date`) && getIn(touched, `assignments.${assignmentIdx}.date`)
                                    }
                                    errorMessage={t(getIn(errors, `assignments.${assignmentIdx}.date`))}
                                  />
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-6'}
                                    value={assignment.id ?? ''}
                                    onBlur={handleBlur(`assignments.${assignmentIdx}.id`)}
                                    onChange={handleChange(`assignments.${assignmentIdx}.id`)}
                                    inputID={`assignments.${assignmentIdx}.id`}
                                    labelText={t('label.leave_assignment')}
                                    inputType={'number'}
                                    selectClassName={'form-control'}
                                    isDisable={values.profileId === '0' || values.profileId === ''}
                                    isRequiredField
                                    placeholder={t('placeholder.select_leave_assignment')}
                                    isTouched={getIn(touched, `assignments.${assignmentIdx}.id`)}
                                    isError={getIn(errors, `assignments.${assignmentIdx}.id`) && getIn(touched, `assignments.${assignmentIdx}.id`)}
                                    errorMessage={t(
                                      getIn(
                                        errors,
                                        `assignments.${assignmentIdx}.id`,
                                        typeof errors.assignments === 'string' ? errors.assignments : '',
                                      ),
                                    )}
                                    lstSelectOptions={assignment.assignments}
                                  />
                                </div>

                                <div className="form-group pb-2 col-1">
                                  <DeleteIconButton onClick={() => remove(assignmentIdx)} />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      <div className="d-flex justify-content-start mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => push({ date: '', id: 0, assignments: [] })}>
                          <AddCircle /> {t('label.add_assignment')}
                        </button>
                        {errors && errors.assignments && typeof errors.assignments === 'string' && (
                          <div className="pt-2">
                            <small className={'text-danger ml-4'}> {t(errors.assignments)}</small>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-12  '}
                    value={values.status ?? ''}
                    onBlur={handleBlur('status')}
                    onChange={handleChange('status')}
                    inputID={'status'}
                    labelText={t('label.status')}
                    selectClassName={'form-control'}
                    isRequiredField
                    placeholder={t('placeholder.select_leave_status')}
                    lstSelectOptions={status}
                    isTouched={touched.status}
                    isError={touched.status && errors.status}
                    errorMessage={t(errors.status)}
                  />
                </div>
                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12 '}
                    value={values.note ?? ''}
                    onBlur={handleBlur(`note`)}
                    onChange={handleChange(`note`)}
                    labelText={t('label.note')}
                    inputClassName={'form-control'}
                    placeholder={t('placeholder.enter_note')}
                  />
                </div>
                {renderButtons([
                  {
                    type: 'button',
                    className: `btn btn-primary mr-4`,

                    onClick: (e) => {
                      history.push(ROUTE_PATH.LEAVE);
                    },
                    name: t('label.back'),
                    position: 'left',
                  },
                  {
                    type: 'button',
                    className: `btn btn-success`,
                    onClick: (e) => {
                      handleSubmit();
                    },
                    name: t('label.create_new'),
                  },
                ])}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default NewLeaveForm;
