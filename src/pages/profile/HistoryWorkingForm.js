import { CContainer } from '@coreui/react';
import { Add } from '@material-ui/icons';
import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import { HistoryWorkingsSchema, NewHistoryWorkingSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/contract';
import { fetchDepartments } from 'src/stores/actions/department';
import { createDiploma, deleteDiploma, fetchDiplomaByType, updateDiploma } from 'src/stores/actions/diploma';
import { fetchPositions } from 'src/stores/actions/position';
import { fetchRoles } from 'src/stores/actions/role';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

const HistoryWorkingForm = ({ t, match }) => {
  const dispatch = useDispatch();
  const initialValues = useSelector((state) => state.profile.profile);
  let branches = useSelector((state) => state.contract.branches);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
  const roles = useSelector((state) => state.role.roles);
  const profileId = +match?.params?.id;
  const newHistory = {
    profileId: profileId,
    branchId: '',
    departmentId: '',
    positionId: '',
    roleId: '',
    startDate: '',
    endDate: '',
  };
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchRoles());
  }, []);

  async function create(form) {
    // form.provinceId = form.provinceId || null;
    if (form.id) {
      await dispatch(updateDiploma(form, t('message.successful_update')));
    } else {
      await dispatch(createDiploma(form, t('message.successful_create')));
    }
  }

  async function removeCertificate(form) {
    await dispatch(deleteDiploma(form.id, t('message.successful_delete')));
  }

  return (
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div className="">
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-success"
              id="addBtn"
              onClick={() => {
                document.getElementById('newHistory').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add /> {t('label.add')}
            </button>
          </div>
          <Formik initialValues={newHistory} validationSchema={NewHistoryWorkingSchema} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange, validateForm, setTouched }) => {
              return (
                <Form id="newHistory" hidden={true} className="p-0 m-0">
                  <div className="shadow bg-white rounded mx-4 p-4">
                    <h5>{'Tạo mới'}.</h5>
                    <hr className="mt-1" />
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.branchId ?? ''}
                        onBlur={handleBlur(`branchId`)}
                        onChange={(e) => {
                          dispatch(fetchDepartments({ branchId: e.target.value }));
                          handleChange('branchId')(e);
                        }}
                        inputID={`branchId`}
                        labelText={t('label.branch')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_branch')}
                        isRequiredField
                        isTouched={touched.branchId}
                        isError={errors.branchId && touched.branchId}
                        errorMessage={t(errors.branchId)}
                        lstSelectOptions={branches}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.departmentId ?? ''}
                        onBlur={handleBlur(`departmentId`)}
                        onChange={(e) => {
                          dispatch(fetchPositions({ departmentId: e.target.value }));
                          handleChange('departmentId')(e);
                        }}
                        inputID={`departmentId`}
                        labelText={t('label.department')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_department')}
                        isRequiredField
                        isTouched={touched.departmentId}
                        isError={errors.departmentId && touched.departmentId}
                        errorMessage={t(errors.departmentId)}
                        lstSelectOptions={departments}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.positionId ?? ''}
                        onBlur={handleBlur(`positionId`)}
                        onChange={(e) => {
                          handleChange('positionId')(e);
                        }}
                        inputID={`positionId`}
                        labelText={t('label.position')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_position')}
                        isRequiredField
                        isTouched={touched.positionId}
                        isError={errors.positionId && touched.positionId}
                        errorMessage={t(errors.positionId)}
                        lstSelectOptions={positions}
                      />
                    </div>
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.roleId ?? ''}
                        onBlur={handleBlur(`roleId`)}
                        onChange={(e) => {
                          handleChange('roleId')(e);
                        }}
                        inputID={`roleId`}
                        labelText={t('label.role')}
                        selectClassName={'form-control'}
                        placeholder={t('placeholder.select_role')}
                        isRequiredField
                        isTouched={touched.roleId}
                        isError={errors.roleId && touched.roleId}
                        errorMessage={t(errors.roleId)}
                        lstSelectOptions={roles}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.startDate ?? ''}
                        onBlur={handleBlur(`startDate`)}
                        onChange={handleChange(`startDate`)}
                        inputID={`startDate`}
                        labelText={t('label.start_date')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.startDate}
                        isError={errors.startDate && touched.startDate}
                        errorMessage={t(errors.startDate)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.endDate ?? ''}
                        onBlur={handleBlur(`endDate`)}
                        onChange={handleChange(`endDate`)}
                        inputID={`endDate`}
                        labelText={t('label.end_date')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.endDate}
                        isError={errors.endDate && touched.endDate}
                        errorMessage={t(errors.endDate)}
                      />
                    </div>
                    <hr className="mt-1" />
                    {renderButtons([
                      {
                        type: 'button',
                        className: `btn btn-primary  mx-2`,
                        onClick: () => {
                          handleReset();
                          document.getElementById('newHistory').hidden = true;
                          document.getElementById('addBtn').disabled = false;
                        },
                        name: t('label.cancel'),
                        position: 'right',
                      },

                      {
                        type: 'button',
                        className: `btn btn-primary px-4 ml-4`,
                        onClick: async () => {
                          let err = await validateForm();
                          if (err !== undefined && Object.keys(err).length !== 0) {
                            setTouched(err);
                            return;
                          }
                          await create(values).then(() => dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' })));
                          handleReset();
                          document.getElementById('newHistory').hidden = true;
                          document.getElementById('addBtn').disabled = false;
                        },
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
          <Formik initialValues={initialValues} enableReinitialize validationSchema={HistoryWorkingsSchema} onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange, validateForm, setFieldValue, setFieldTouched }) => {
              return (
                <Form>
                  <FieldArray
                    name="historyWorkings"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.historyWorkings &&
                          values.historyWorkings.length > 0 &&
                          values.historyWorkings.map((friend, index) => (
                            <div>
                              <div key={'degree' + index} className="shadow bg-white rounded m-4 p-4">
                                <h5>{index + 1}.</h5>
                                <hr className="mt-1" />
                                <div className="row">
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.branchId ?? ''}
                                    onBlur={handleBlur(`historyWorkings.${index}.branchId`)}
                                    onChange={(e) => {
                                      dispatch(fetchDepartments({ branchId: e.target.value }));
                                      handleChange(`historyWorkings.${index}.branchId`)(e);
                                    }}
                                    inputID={`historyWorkings.${index}.branchId`}
                                    labelText={t('label.branch')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_branch')}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.branchId}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].branchId &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.branchId
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].branchId)}
                                    lstSelectOptions={branches}
                                  />
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.departmentId ?? ''}
                                    onBlur={handleBlur(`historyWorkings.${index}.departmentId`)}
                                    onChange={(e) => {
                                      dispatch(fetchPositions({ departmentId: e.target.value }));
                                      handleChange(`historyWorkings.${index}.departmentId`)(e);
                                    }}
                                    inputID={`historyWorkings.${index}.departmentId`}
                                    labelText={t('label.department')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_department')}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.departmentId}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].departmentId &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.departmentId
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].departmentId)}
                                    lstSelectOptions={departments}
                                  />
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.positionId ?? ''}
                                    onBlur={handleBlur(`positionId`)}
                                    onChange={(e) => {
                                      handleChange('positionId')(e);
                                    }}
                                    inputID={`positionId`}
                                    labelText={t('label.position')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_position')}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.positionId}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].positionId &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.positionId
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].positionId)}
                                    lstSelectOptions={positions}
                                  />
                                </div>
                                <div className="row">
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.roleId ?? ''}
                                    onBlur={handleBlur(`roleId`)}
                                    onChange={(e) => {
                                      handleChange('roleId')(e);
                                    }}
                                    inputID={`roleId`}
                                    labelText={t('label.role')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_role')}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.roleId}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].roleId &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.roleId
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].roleId)}
                                    lstSelectOptions={roles}
                                  />
                                  <CommonTextInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.startDate ?? ''}
                                    onBlur={handleBlur(`startDate`)}
                                    onChange={handleChange(`startDate`)}
                                    inputID={`startDate`}
                                    labelText={t('label.start_date')}
                                    inputType={'date'}
                                    inputClassName={'form-control'}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.startDate}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].startDate &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.startDate
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].startDate)}
                                  />
                                  <CommonTextInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.endDate ?? ''}
                                    onBlur={handleBlur(`endDate`)}
                                    onChange={handleChange(`endDate`)}
                                    inputID={`endDate`}
                                    labelText={t('label.end_date')}
                                    inputType={'date'}
                                    inputClassName={'form-control'}
                                    isRequiredField
                                    isTouched={touched && touched.historyWorkings && touched.historyWorkings[index]?.endDate}
                                    isError={
                                      errors &&
                                      errors.historyWorkings &&
                                      errors.historyWorkings[index].endDate &&
                                      touched &&
                                      touched.historyWorkings &&
                                      touched.historyWorkings[index]?.endDate
                                    }
                                    errorMessage={t(errors && errors.historyWorkings && errors.historyWorkings[index].endDate)}
                                  />
                                </div>

                                <hr className="mt-1" />

                                {renderButtons([
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: async (e) => {
                                      await removeCertificate(friend.id).then(() => remove(index));
                                      dispatch({
                                        type: REDUX_STATE.notification.SET_NOTI,
                                        payload: { open: true, type: 'success', message: t('message.successful_delete') },
                                      });
                                    },
                                    name: t('label.delete'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: () => {
                                      setFieldValue(`degrees.${index}`, initialValues.historyWorkings[index]);
                                    },
                                    name: t('label.reset'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 ml-4`,
                                    onClick: async () => {
                                      let err = await validateForm();
                                      let err_fields = err.historyWorkings && Object.keys(err.historyWorkings[index]);
                                      if (err.historyWorkings && err.historyWorkings[index] !== undefined && err_fields.length !== 0) {
                                        err_fields &&
                                          err_fields.length &&
                                          err_fields.forEach((val) => setFieldTouched(`historyWorkings.${index}.${val}`, true));
                                        return;
                                      }
                                      create(friend);
                                      initialValues.historyWorkings[index] = friend;
                                      setFieldValue(`historyWorkings.${index}`, friend);
                                      //dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' }));
                                      document.getElementById('newHistory').hidden = true;
                                      document.getElementById('addBtn').disabled = false;
                                    },
                                    name: friend.id ? t('label.save') : t('label.create_new'),
                                  },
                                ])}
                              </div>
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
export default HistoryWorkingForm;
