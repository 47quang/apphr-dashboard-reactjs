import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { ROUTE_PATH } from 'src/constants/key';
import { NewOvertimeFormSchema } from 'src/schema/formSchema';
import { fetchProfiles } from 'src/stores/actions/account';
import { createOvertimeRequest } from 'src/stores/actions/request';
import { fetchShifts } from 'src/stores/actions/shift';
import { renderButtons } from 'src/utils/formUtils';

const NewOvertimeForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.account.profiles);
  const shifts = useSelector((state) => state.shift.shifts);
  const status = [
    { id: 'new', name: 'Đang xử lý' },
    { id: 'approve', name: 'Đã phê duyệt' },
    { id: 'reject', name: 'Đã từ chối' },
  ];
  const overtimeRequest = {
    date: '',
    shiftId: '',
    status: '',
    profileId: '',
  };

  useEffect(() => {
    dispatch(fetchProfiles({ fields: ['id', 'firstname', 'lastname', 'code'] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-6">
          <Formik
            enableReinitialize
            initialValues={overtimeRequest}
            validationSchema={NewOvertimeFormSchema}
            onSubmit={(values) => {
              let data = { ...values };
              data.profileId = parseInt(data.profileId);
              data.shiftId = parseInt(data.shiftId);
              dispatch(createOvertimeRequest(data, history, t('message.successful_create')));
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.leave_info')} />
                <div className="row">
                  <div className="row col-11 ml-2">
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.profileId ?? ''}
                      labelText={t('label.profileId')}
                      selectClassName={'form-control'}
                      onBlur={handleBlur('profileId')}
                      onChange={handleChange('profileId')}
                      inputID={t('label.profileId')}
                      lstSelectOptions={profiles}
                      isRequiredField
                      placeholder={t('placeholder.select_profile')}
                      isTouched={touched.profileId}
                      isError={touched.profileId && errors.profileId}
                      errorMessage={t(errors.profileId)}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      inputClassName={'form-control'}
                      value={values.date ?? ''}
                      onBlur={handleBlur(`date`)}
                      onChange={async (e) => {
                        handleChange(`date`)(e);
                        if (e.target.value) {
                          dispatch(
                            fetchShifts({
                              day: new Date(e.target.value).getDay(),
                            }),
                          );
                        }
                      }}
                      inputID={`date`}
                      labelText={t('label.overtime_date')}
                      inputType={'date'}
                      isRequiredField
                      isDisable={values.profileId === '0' || values.profileId === ''}
                      isTouched={touched.date}
                      isError={touched.date && errors.date}
                      errorMessage={t(errors.date)}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.shiftId ?? ''}
                      labelText={t('label.shift')}
                      selectClassName={'form-control'}
                      onBlur={handleBlur('shiftId')}
                      onChange={handleChange('shiftId')}
                      inputID={'shiftId'}
                      lstSelectOptions={shifts}
                      isRequiredField
                      isDisable={values.profileId === '0' || values.profileId === ''}
                      placeholder={t('placeholder.select_shift')}
                      isTouched={touched.shiftId}
                      isError={touched.shiftId && errors.shiftId}
                      errorMessage={t(errors.shiftId)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-11">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12 ml-2'}
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
                </div>
                <div className="row">
                  <div className="col-11">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-lg-12 ml-2'}
                      value={values.note ?? ''}
                      onBlur={handleBlur(`note`)}
                      onChange={handleChange(`note`)}
                      labelText={t('label.note')}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_note')}
                    />
                  </div>
                </div>
                {renderButtons([
                  {
                    type: 'button',
                    className: `btn btn-primary mr-4`,

                    onClick: (e) => {
                      history.push(ROUTE_PATH.REMOTE);
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

export default NewOvertimeForm;
