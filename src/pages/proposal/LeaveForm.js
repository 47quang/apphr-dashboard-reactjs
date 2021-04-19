import { CContainer } from '@coreui/react';
import Label from 'src/components/text/Label';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { fetchDistricts, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import FormHeader from 'src/components/text/FormHeader';

const LeaveForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
  const type = [
    { id: 'no_pay', name: t('label.not_have_salary') },
    { id: 'pay', name: t('label.have_salary') },
  ];
  const leaveRequest = {};
  const assigments = [];
  const basicInfo = {};
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,

      onClick: (e) => {},
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-danger mr-4`,
      onClick: (e) => {},
      name: t('label.deny'),
    },
    {
      type: 'button',
      className: `btn btn-success`,
      onClick: (e) => {},
      name: t('label.accept'),
    },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-10">
          <Formik
            //            innerRef={branchRef}
            enableReinitialize
            initialValues={leaveRequest}
            // validationSchema={LeaveFormSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.leave_info')} />
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.type}
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
                    value={values.createdAt}
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
                    <Label text="Các ca xin nghỉ" required={true} />
                    <CommonMultiSelectInput
                      values={values.assigmentIds}
                      listValues={assigments}
                      onChangeValues={(e) => {
                        handleChange('assigmentIds')(e);
                      }}
                    />
                  </div>
                </div>

                <div className="row" hidden={values.status}>
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.status}
                    onBlur={handleBlur('status')}
                    onChange={handleChange('status')}
                    inputID={'status'}
                    labelText={t('label.status')}
                    inputType={'text'}
                    placeholder={t('placeholder.status')}
                    inputClassName={'form-control'}
                    isDisable
                    isRequiredField
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.handler}
                    onBlur={handleBlur('handler')}
                    onChange={handleChange('handler')}
                    inputID={'handler'}
                    labelText={t('label.handler')}
                    inputType={'text'}
                    inputClassName={'form-control'}
                    isDisable
                    isRequiredField
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.handleDate}
                    onBlur={handleBlur('handleDate')}
                    onChange={handleChange('handleDate')}
                    inputID={'handleDate'}
                    labelText={t('label.handleDate')}
                    inputType={'datetime-local'}
                    placeholder={t('placeholder.handleDate')}
                    inputClassName={'form-control'}
                    isDisable
                    isRequiredField
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
                {renderButtons(buttons)}
              </form>
            )}
          </Formik>
        </div>
        <br />
        <div className="shadow bg-white rounded p-4 container col-xl-10">
          <Formik
            //            innerRef={branchRef}
            enableReinitialize
            initialValues={basicInfo}
            // validationSchema={LeaveFormSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.basic_info')} />

                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.code ?? ''}
                    onBlur={handleBlur('code')}
                    onChange={handleChange('code')}
                    inputID={'code'}
                    labelText={t('label.employee_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_employee_code')}
                    inputClassName={'form-control'}
                    isDisable
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.fullname ?? ''}
                    onBlur={handleBlur('fullname')}
                    onChange={handleChange('fullname')}
                    inputID={'fullname'}
                    labelText={t('label.employee_first_name')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_employee_fullname')}
                    inputClassName={'form-control'}
                    isDisable
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.phone ?? ''}
                    onBlur={handleBlur('phone')}
                    onChange={handleChange('phone')}
                    inputID={'phone'}
                    labelText={t('label.phone_number')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_phone_number')}
                    inputClassName={'form-control'}
                    isDisable
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.email ?? ''}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    inputID={'email'}
                    labelText={t('label.email')}
                    inputType={'email'}
                    placeholder={t('placeholder.enter_email')}
                    inputClassName={'form-control'}
                    isDisable
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.branch ?? ''}
                    onBlur={handleBlur('branch')}
                    onChange={handleChange('branch')}
                    inputID={'branch'}
                    labelText={t('label.branch')}
                    inputType={'text'}
                    inputClassName={'form-control'}
                    isDisable
                  />
                </div>

                <div className="row" hidden={values.status}>
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.department ?? ''}
                    onBlur={handleBlur('department')}
                    onChange={handleChange('department')}
                    inputID={'department'}
                    labelText={t('label.department')}
                    inputType={'text'}
                    inputClassName={'form-control'}
                    isDisable
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.position ?? ''}
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
      </div>
    </CContainer>
  );
};

export default LeaveForm;
