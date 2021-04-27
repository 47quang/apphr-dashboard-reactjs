import { CContainer } from '@coreui/react';
import { AddCircle } from '@material-ui/icons';
import { FieldArray, Formik, getIn } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { ROUTE_PATH } from 'src/constants/key';
import { renderButtons } from 'src/utils/formUtils';
import { NewLeaveFormSchema } from 'src/schema/formSchema';

const NewLeaveForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
  const type = [
    { id: 'no_pay', name: t('label.not_have_salary') },
    { id: 'pay', name: t('label.have_salary') },
    { id: 'policy', name: t('label.leave_policy') },
  ];
  const status = [
    { id: 'new', name: 'Đang xữ lý' },
    { id: 'approve', name: 'Đã phê duyệt' },
    { id: 'reject', name: 'Đã từ chối' },
  ];
  const leaveRequest = {
    type: '',
    assignments: [],
    status: '',
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-6">
          <Formik
            enableReinitialize
            initialValues={leaveRequest}
            validationSchema={NewLeaveFormSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.leave_info')} />
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-12'}
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
                                <CommonTextInput
                                  containerClassName={'form-group col-lg-4'}
                                  inputClassName={'form-control'}
                                  value={assignment.date ?? ''}
                                  onBlur={handleBlur(`assignments.${assignmentIdx}.date`)}
                                  onChange={handleChange(`assignments.${assignmentIdx}.date`)}
                                  inputID={`assignments.${assignmentIdx}.date`}
                                  labelText={t('label.leave_date')}
                                  inputType={'date'}
                                  isRequiredField
                                  isTouched={getIn(touched, `assignments.${assignmentIdx}.date`)}
                                  isError={getIn(errors, `assignments.${assignmentIdx}.date`) && getIn(touched, `assignments.${assignmentIdx}.date`)}
                                  errorMessage={t(getIn(errors, `assignments.${assignmentIdx}.date`))}
                                />
                                <CommonSelectInput
                                  containerClassName={'form-group col-xl-6'}
                                  value={assignment.id ?? ''}
                                  onBlur={handleBlur(`assignments.${assignmentIdx}.id`)}
                                  onChange={handleChange(`assignments.${assignmentIdx}.id`)}
                                  inputID={`assignments.${assignmentIdx}.id`}
                                  labelText={t('label.leave_assignment')}
                                  inputType={'number'}
                                  selectClassName={'form-control'}
                                  placeholder={t('placeholder.pension')}
                                  isTouched={getIn(touched, `assignments.${assignmentIdx}.id`)}
                                  isError={getIn(errors, `assignments.${assignmentIdx}.id`) && getIn(touched, `assignments.${assignmentIdx}.id`)}
                                  errorMessage={t(getIn(errors, `assignments.${assignmentIdx}.id`))}
                                  lstSelectOptions={status}
                                />

                                <div className="form-group d-flex align-items-end pb-1">
                                  <DeleteIconButton onClick={() => remove(assignmentIdx)} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <div className="d-flex justify-content-start mb-4">
                        <button type="button" className="btn btn-primary" onClick={() => push({ date: '', id: 0 })}>
                          <AddCircle /> {t('label.add_assignment')}
                        </button>
                      </div>
                    </div>
                  )}
                />
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-12'}
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
                    containerClassName={'form-group col-lg-12'}
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
                      console.log(touched);
                      console.log(getIn(errors, `assignments.${0}.date`));
                      console.log(getIn(touched, `assignments.${0}.date`));
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
