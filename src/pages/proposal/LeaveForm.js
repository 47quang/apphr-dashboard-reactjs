import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { PROFILE_TABS, REQUEST_TABS, ROUTE_PATH } from 'src/constants/key';
import { setSubTabName, setTabName } from 'src/stores/actions/profile';
import { approveLeaveRequest, fetchLeaveRequest, rejectLeaveRequest, setEmptyLeaveRequest } from 'src/stores/actions/request';
import { renderButtons } from 'src/utils/formUtils';

const LeaveForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
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
  const leaveRequest = useSelector((state) => state.request.leaveForm);
  const [loading, setLoading] = useState(false);
  const requestId = match?.params?.id;
  const fullyButtons = [
    {
      type: 'button',
      className: `btn btn-primary`,

      onClick: (e) => {
        history.push(ROUTE_PATH.LEAVE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-danger mr-4`,
      onClick: (e) => {
        dispatch(rejectLeaveRequest(requestId, t('label.deny_success')));
      },
      name: t('label.deny'),
    },
    {
      type: 'button',
      className: `btn btn-success`,
      onClick: (e) => {
        dispatch(approveLeaveRequest(requestId, t('label.accept_success')));
      },
      name: t('label.accept'),
    },
  ];
  const handledButtons = [
    {
      type: 'button',
      className: `btn btn-primary `,
      onClick: (e) => {
        console.log(history);
        history.goBack();
      },
      name: t('label.back'),
      position: 'left',
    },
  ];
  useEffect(() => {
    if (match.path.includes('profile') && match.path.includes('leave.id=')) {
      dispatch(setTabName(PROFILE_TABS.REQUEST));
      dispatch(setSubTabName(REQUEST_TABS.LEAVE_REQUEST));
    }
    if (requestId) dispatch(fetchLeaveRequest(requestId, setLoading));

    return () => {
      dispatch(setEmptyLeaveRequest());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            <div className="shadow bg-white rounded p-4 container col-xl-4">
              <Formik
                //            innerRef={branchRef}
                enableReinitialize
                initialValues={leaveRequest}
                // validationSchema={LeaveFormSchema}
                onSubmit={(values) => {
                  // console.log(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <form autoComplete="off">
                    <FormHeader text={t('label.basic_info')} />

                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.profileCode ?? ''}
                        onBlur={handleBlur('profileCode')}
                        onChange={handleChange('profileCode')}
                        inputID={'profileCode'}
                        labelText={t('label.employee_code')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.profileFullName ?? ''}
                        onBlur={handleBlur('profileFullName')}
                        onChange={handleChange('profileFullName')}
                        inputID={'profileFullName'}
                        labelText={t('label.employee_first_name')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.phone ?? ''}
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        inputID={'phone'}
                        labelText={t('label.phone_number')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.email ?? ''}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        inputID={'email'}
                        labelText={t('label.email')}
                        inputType={'email'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.branch ?? ''}
                        onBlur={handleBlur('branch')}
                        onChange={handleChange('branch')}
                        inputID={'branch'}
                        labelText={t('label.branch')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.department ?? ''}
                        onBlur={handleBlur('department')}
                        onChange={handleChange('department')}
                        inputID={'department'}
                        labelText={t('label.department')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>

                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values?.position ?? ''}
                        onBlur={handleBlur('position')}
                        onChange={handleChange('position')}
                        inputID={'position'}
                        labelText={t('label.position')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            <div className="shadow bg-white rounded p-4 container col-xl-7">
              <Formik
                enableReinitialize
                initialValues={leaveRequest}
                // validationSchema={LeaveFormSchema}
                onSubmit={(values) => {}}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
                  <form autoComplete="off">
                    <FormHeader text={t('label.leave_info')} />
                    <div className="row">
                      <div className="form-group col-xl-6">
                        <Label text={t('label.code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code ?? ''}
                            disabled
                            placeholder={t('placeholder.enter_leave_code')}
                          />
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
                        containerClassName={'form-group col-xl-6'}
                        value={values.type ?? ''}
                        onBlur={handleBlur('type')}
                        onChange={handleChange('type')}
                        inputID={'type'}
                        labelText={t('label.leave_type')}
                        selectClassName={'form-control'}
                        isRequiredField
                        isDisable
                        lstSelectOptions={type}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-xl-6'}
                        value={values.createdAt ?? ''}
                        onBlur={handleBlur('createdAt')}
                        onChange={handleChange('createdAt')}
                        inputID={'createdAt'}
                        labelText={t('label.sent_date')}
                        inputType={'datetime-local'}
                        inputClassName={'form-control'}
                        isDisable
                        isRequiredField
                      />
                    </div>
                    <div className="row">
                      <div className="form-group col-xl-12">
                        <Label text={t('label.assignment_requests')} required={true} />
                        <CommonMultiSelectInput
                          values={values.assignmentIds ?? []}
                          listValues={values.assignments}
                          onChangeValues={(e) => {
                            handleChange('assignmentIds')(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-xl-6'}
                        value={values.status ?? ''}
                        onBlur={handleBlur('status')}
                        onChange={handleChange('status')}
                        inputID={'status'}
                        labelText={t('label.status')}
                        selectClassName={'form-control'}
                        isRequiredField
                        isDisable
                        lstSelectOptions={status}
                      />

                      <CommonTextInput
                        containerClassName={'form-group col-xl-6'}
                        value={values.handler ?? ''}
                        onBlur={handleBlur('handler')}
                        onChange={handleChange('handler')}
                        inputID={'handler'}
                        labelText={t('label.handler')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isHide={values.handler ? false : true}
                        isDisable
                        isRequiredField
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-xl-6'}
                        value={values.handleDate ?? ''}
                        onBlur={handleBlur('handleDate')}
                        onChange={handleChange('handleDate')}
                        inputID={'handleDate'}
                        labelText={t('label.handleDate')}
                        inputType={'datetime-local'}
                        placeholder={t('placeholder.handleDate')}
                        inputClassName={'form-control'}
                        isHide={values.handler ? false : true}
                        isDisable
                        isRequiredField
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
                    <div>{values.status === 'new' ? renderButtons(fullyButtons) : renderButtons(handledButtons)}</div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </CContainer>
  );
};

export default LeaveForm;
