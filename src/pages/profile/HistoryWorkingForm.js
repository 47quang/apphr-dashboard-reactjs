import { CContainer } from '@coreui/react';
import { Add } from '@material-ui/icons';
import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { NewHistoryWorkingSchema, HistoryWorkingsSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/contract';
import { fetchDepartments } from 'src/stores/actions/department';
import {
  createHistoryWork,
  deleteHistoryWork,
  fetchHistoriesWork,
  updateHistoryWork,
  onChangeDepartment,
  onChangePosition,
} from 'src/stores/actions/historyWork';
import { fetchPositions } from 'src/stores/actions/position';
import { api } from 'src/stores/apis';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

const HistoryWorkingForm = ({ t, match }) => {
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  const positions = useSelector((state) => state.position.positions);
  const historyWorkingForm = {
    histories: useSelector((state) => state.historyWork.histories),
  };
  const departments = useSelector((state) => state.department.departments);
  const profileId = +match?.params?.id;
  const newHistory = {
    profileId: profileId,
    branchId: '',
    departmentId: '',
    positionId: '',
    from: '',
    to: '',
  };
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(
      fetchHistoriesWork({
        profileId: profileId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create(form) {
    // form.provinceId = form.provinceId || null;
    form.profileId = profileId;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    form.positionId = parseInt(form.positionId);

    console.log(form);
    if (form.id) {
      await dispatch(updateHistoryWork(form, t('message.successful_update')));
    } else {
      await dispatch(createHistoryWork(form, t('message.successful_create')));
    }
  }
  async function removeHistoryWork(id) {
    await dispatch(deleteHistoryWork(id, t('message.successful_delete')));
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
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.from ?? ''}
                        onBlur={handleBlur(`from`)}
                        onChange={handleChange(`from`)}
                        inputID={`from`}
                        labelText={t('label.start_date')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.from}
                        isError={errors.from && touched.from}
                        errorMessage={t(errors.from)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.to ?? ''}
                        onBlur={handleBlur(`to`)}
                        onChange={handleChange(`to`)}
                        inputID={`to`}
                        labelText={t('label.end_date')}
                        inputType={'date'}
                        inputClassName={'form-control'}
                        //isRequiredField
                        isTouched={touched.to}
                        isError={errors.to && touched.to}
                        errorMessage={t(errors.to)}
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
                          await create(values).then(() => dispatch(fetchHistoriesWork({ profileId: profileId })));
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
          <Formik initialValues={historyWorkingForm} enableReinitialize validationSchema={HistoryWorkingsSchema} onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange, validateForm, setFieldValue, setFieldTouched }) => {
              return (
                <Form>
                  <FieldArray
                    name="histories"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.histories &&
                          values.histories.length > 0 &&
                          values.histories.map((friend, index) => (
                            <div>
                              <div key={'degree' + index} className="shadow bg-white rounded m-4 p-4">
                                <h5>{index + 1}.</h5>
                                <hr className="mt-1" />
                                <div className="row">
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.branchId ?? ''}
                                    onBlur={handleBlur(`histories.${index}.branchId`)}
                                    onChange={async (e) => {
                                      handleChange(`histories.${index}.branchId`)(e);
                                      if (+e.target.value !== 0) {
                                        let x = await api.department.getAll({ branchId: e.target.value }).then(({ payload }) => payload);
                                        console.log(x);
                                        setFieldValue(`histories.${index}.departments`, x);
                                      } else {
                                        setFieldValue(`histories.${index}.departments`, []);
                                      }
                                      setFieldValue(`histories.${index}.departmentId`, 0);
                                      setFieldValue(`histories.${index}.positionId`, 0);
                                      // dispatch(onChangeDepartment({ branchId: e.target.value }, index));

                                      // handleChange(`histories.${index}.departments`)(x);
                                    }}
                                    inputID={`histories.${index}.branchId`}
                                    labelText={t('label.branch')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_branch')}
                                    isRequiredField
                                    isTouched={touched && touched.histories && touched.histories[index]?.branchId}
                                    isError={
                                      errors &&
                                      errors.histories &&
                                      errors.histories[index]?.branchId &&
                                      touched &&
                                      touched.histories &&
                                      touched.histories[index]?.branchId
                                    }
                                    errorMessage={t(errors && errors.histories && errors.histories[index]?.branchId)}
                                    lstSelectOptions={friend.branches}
                                  />
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.departmentId ?? ''}
                                    onBlur={handleBlur(`histories.${index}.departmentId`)}
                                    onChange={async (e) => {
                                      // dispatch(onChangePosition({ departmentId: e.target.value }, index));
                                      handleChange(`histories.${index}.departmentId`)(e);
                                      if (+e.target.value !== 0) {
                                        let x = await api.position.getAll({ departmentId: e.target.value }).then(({ payload }) => payload);
                                        setFieldValue(`histories.${index}.positions`, x);
                                      } else {
                                        setFieldValue(`histories.${index}.positions`, []);
                                      }
                                      setFieldValue(`histories.${index}.positionId`, 0);
                                    }}
                                    inputID={`histories.${index}.departmentId`}
                                    labelText={t('label.department')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_department')}
                                    isRequiredField
                                    isTouched={touched && touched.histories && touched.histories[index]?.departmentId}
                                    isError={
                                      errors &&
                                      errors.histories &&
                                      errors.histories[index]?.departmentId &&
                                      touched &&
                                      touched.histories &&
                                      touched.histories[index]?.departmentId
                                    }
                                    errorMessage={t(errors && errors.histories && errors.histories[index]?.departmentId)}
                                    lstSelectOptions={friend.departments}
                                  />
                                  <CommonSelectInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.positionId ?? ''}
                                    onBlur={handleBlur(`positionId`)}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      // handleChange('positionId')(e);
                                      setFieldValue(`histories.${index}.positionId`, +e.target.value);
                                    }}
                                    inputID={`positionId`}
                                    labelText={t('label.position')}
                                    selectClassName={'form-control'}
                                    placeholder={t('placeholder.select_position')}
                                    isRequiredField
                                    isTouched={touched && touched.histories && touched.histories[index]?.positionId}
                                    isError={
                                      errors &&
                                      errors.histories &&
                                      errors.histories[index]?.positionId &&
                                      touched &&
                                      touched.histories &&
                                      touched.histories[index]?.positionId
                                    }
                                    errorMessage={t(errors && errors.histories && errors.histories[index]?.positionId)}
                                    lstSelectOptions={friend.positions}
                                  />
                                </div>
                                <div className="row">
                                  <CommonTextInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.from ?? ''}
                                    onBlur={handleBlur(`from`)}
                                    onChange={handleChange(`from`)}
                                    inputID={`from`}
                                    labelText={t('label.start_date')}
                                    inputType={'date'}
                                    inputClassName={'form-control'}
                                    isRequiredField
                                    isTouched={touched && touched.histories && touched.histories[index]?.from}
                                    isError={
                                      errors &&
                                      errors.histories &&
                                      errors.histories[index]?.from &&
                                      touched &&
                                      touched.histories &&
                                      touched.histories[index]?.from
                                    }
                                    errorMessage={t(errors && errors.histories && errors.histories[index]?.from)}
                                  />
                                  <CommonTextInput
                                    containerClassName={'form-group col-lg-4'}
                                    value={friend.to ?? ''}
                                    onBlur={handleBlur(`to`)}
                                    onChange={handleChange(`to`)}
                                    inputID={`to`}
                                    labelText={t('label.end_date')}
                                    inputType={'date'}
                                    inputClassName={'form-control'}
                                    //isRequiredField
                                    isTouched={touched && touched.histories && touched.histories[index]?.to}
                                    isError={
                                      errors &&
                                      errors.histories &&
                                      errors.histories[index]?.to &&
                                      touched &&
                                      touched.histories &&
                                      touched.histories[index]?.to
                                    }
                                    errorMessage={t(errors && errors.histories && errors.histories[index]?.to)}
                                  />
                                </div>

                                <hr className="mt-1" />

                                {renderButtons([
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: async (e) => {
                                      await removeHistoryWork(friend.id).then(() => remove(index));
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
                                      setFieldValue(`histories.${index}`, historyWorkingForm.histories[index]);
                                    },
                                    name: t('label.reset'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 ml-4`,
                                    onClick: async () => {
                                      let err = await validateForm();
                                      let err_fields = err.histories && Object.keys(err.histories[index]);
                                      if (err.histories && err.histories[index] !== undefined && err_fields.length !== 0) {
                                        err_fields &&
                                          err_fields.length &&
                                          err_fields.forEach((val) => setFieldTouched(`histories.${index}.${val}`, true));
                                        return;
                                      }
                                      create(friend);
                                      historyWorkingForm.histories[index] = friend;
                                      setFieldValue(`histories.${index}`, friend);
                                      //dispatch(fetchDiplomaByType({ profileId: match.params.id, type: 'degree' }));
                                      document.getElementById('newHistory').hidden = true;
                                      document.getElementById('addBtn').disabled = false;
                                    },
                                    name: t('label.save'),
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
