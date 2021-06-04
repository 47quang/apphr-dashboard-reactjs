import { CContainer } from '@coreui/react';
import { CircularProgress, Switch } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { PERMISSION } from 'src/constants/key';
import { NewHistoryWorkingSchema, HistoryWorkingsSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/contract';
import { fetchDepartments } from 'src/stores/actions/department';
import {
  createHistoryWork,
  deleteHistoryWork,
  fetchHistoriesWork,
  setEmptyHistories,
  updateHistoryWork,
  activeWorking,
  inactiveWorking,
} from 'src/stores/actions/historyWork';
import { fetchPositions } from 'src/stores/actions/position';
import { formatDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';

const HistoryWorkingForm = ({ t, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
  const histories = useSelector((state) => state.historyWork.histories);
  const historyWorkingForm = {};
  historyWorkingForm.histories = histories;
  const profileId = +match?.params?.id;
  const [loading, setLoading] = useState(false);

  const newHistory = {
    profileId: profileId,
    branchId: '',
    departmentId: '',
    positionId: '',
    from: '',
    to: '',
    status: '',
  };
  const status = [
    { id: 'active', name: t('label.active') },
    { id: 'inactive', name: t('label.inactive') },
  ];

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_WORK_HISTORY)) {
      (async () => {
        dispatch(fetchBranches());
        dispatch(fetchPositions());
        dispatch(fetchDepartments());
      })();
      dispatch(
        fetchHistoriesWork(
          {
            profileId: profileId,
          },
          setLoading,
          departments,
          positions,
        ),
      );
    }
    return () => {
      dispatch(setEmptyHistories());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function create(form) {
    form.profileId = profileId;
    form.branchId = parseInt(form.branchId);
    form.departmentId = parseInt(form.departmentId);
    form.positionId = parseInt(form.positionId);
    if (!form.to) delete form.to;
    if (form.id) {
      dispatch(updateHistoryWork(form, t('message.successful_update')));
    } else {
      dispatch(createHistoryWork(form, t('message.successful_create'), handleResetNewHistory));
    }
  }

  const BodyItem = ({ values, handleBlur, handleChange, touched, errors, isCreate, setFieldValue }) => {
    return (
      <>
        <div className="row">
          <CommonSelectInput
            containerClassName={'form-group col-lg-4'}
            value={values.branchId ?? ''}
            onBlur={handleBlur(`branchId`)}
            onChange={(e) => {
              //dispatch(fetchDepartments({ branchId: e.target.value }));
              handleChange('branchId')(e);
              setFieldValue(
                'departments',
                departments.filter((x) => x.branch.id === +e.target.value),
              );
              setFieldValue('departmentId', '');
              setFieldValue('positionId', '');
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
              //dispatch(fetchPositions({ departmentId: e.target.value }));
              handleChange('departmentId')(e);
              setFieldValue(
                'positions',
                positions.filter((x) => x.department.id === +e.target.value),
              );
              setFieldValue('positionId', '');
            }}
            inputID={`departmentId`}
            labelText={t('label.department')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_department')}
            isRequiredField
            isTouched={touched.departmentId}
            isError={errors.departmentId && touched.departmentId}
            errorMessage={t(errors.departmentId)}
            lstSelectOptions={isCreate ? departments : values.departments}
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
            lstSelectOptions={isCreate ? positions : values.positions}
          />
          {isCreate ? (
            <CommonSelectInput
              containerClassName={'form-group col-lg-4'}
              value={values?.status ?? ''}
              onBlur={handleBlur(`status`)}
              onChange={(e) => {
                handleChange(`status`)(e);
              }}
              inputID={`status`}
              labelText={t('label.status')}
              selectClassName={'form-control'}
              placeholder={t('placeholder.select_history_working_status')}
              isRequiredField
              isTouched={touched.status}
              isError={errors.status && touched.status}
              errorMessage={t(errors.from)}
              lstSelectOptions={status}
            />
          ) : (
            <></>
          )}

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
            isTouched={touched.to}
            isError={errors.to && touched.to}
            errorMessage={t(errors.to)}
          />
        </div>
      </>
    );
  };
  const newHistoryRef = useRef();

  const handleResetNewHistory = () => {
    dispatch(
      fetchHistoriesWork(
        {
          profileId: profileId,
        },
        setLoading,
        departments,
        positions,
      ),
    );
  };
  const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleCloseDeleteAlert = () => {
    setIsVisibleDeleteAlert(false);
  };
  return (
    <>
      {loading ? (
        <div className="text-center pt-4">
          <CircularProgress />
        </div>
      ) : (
        <CContainer fluid className="c-main p-4 m-auto">
          <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 1000 }}>
            <button
              type="button"
              hidden={!permissionIds.includes(PERMISSION.CREATE_WORK_HISTORY)}
              className="btn btn-success rounded-circle p-3"
              id="addBtn"
              onClick={() => {
                document.getElementById('newHistory').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add fontSize="large" />
            </button>
          </div>
          <div className="m-auto">
            <div className="">
              <Formik
                innerRef={newHistoryRef}
                initialValues={newHistory}
                validationSchema={NewHistoryWorkingSchema}
                enableReinitialize
                onSubmit={(values) => {
                  create(values);
                }}
              >
                {(props) => {
                  props.isCreate = true;
                  return (
                    <Form id="newHistory" hidden={true} className="p-0 m-0">
                      <div className="shadow bg-white rounded p-4">
                        <h5>{t('label.create_new')}.</h5>

                        <hr className="mt-1" />
                        <BodyItem {...props} />
                        <hr className="mt-1" />
                        {renderButtons([
                          {
                            type: 'button',
                            className: `btn btn-primary  mx-2`,
                            onClick: () => {
                              props.handleReset();
                              document.getElementById('newHistory').hidden = true;
                              document.getElementById('addBtn').disabled = false;
                            },
                            name: t('label.cancel'),
                            position: 'right',
                          },
                          {
                            type: 'button',
                            className: `btn btn-primary px-4 ml-4`,
                            onClick: async (e) => {
                              props.handleSubmit(e);
                            },
                            name: t('label.create_new'),
                          },
                        ])}
                      </div>
                      <br />
                    </Form>
                  );
                }}
              </Formik>
              {permissionIds.includes(PERMISSION.LIST_WORK_HISTORY) && historyWorkingForm.histories && historyWorkingForm.histories.length > 0 ? (
                historyWorkingForm.histories.map((history, index) => {
                  return (
                    <Formik
                      key={'history ' + index}
                      initialValues={history}
                      validationSchema={HistoryWorkingsSchema}
                      enableReinitialize
                      onSubmit={async (values) => {
                        create(values);
                      }}
                    >
                      {(props) => {
                        return (
                          <Form className="p-0 m-0">
                            <div className="shadow bg-white rounded p-4">
                              <div style={{ fontSize: 18, fontWeight: 'bold', textOverflow: 'ellipsis' }}>
                                <Switch
                                  checked={props.values.status === 'active'}
                                  name={`status`}
                                  onChange={(e) => {
                                    e.target.checked
                                      ? dispatch(activeWorking(props.values.id, props.setFieldValue, t('message.successful_active')))
                                      : dispatch(inactiveWorking(props.values.id, props.setFieldValue, t('message.successful_inactive')));
                                  }}
                                />
                                {index + 1}
                              </div>
                              <div style={{ fontSize: 14 }}>
                                {props.values.to
                                  ? t('label.from') + formatDate(props.values.from) + t('label.to') + formatDate(props.values.to)
                                  : t('label.from') + formatDate(props.values.from)}
                              </div>

                              <hr className="mt-1" />
                              <BodyItem {...props} />
                              <hr className="mt-1" />
                              {renderButtons(
                                permissionIds.includes(PERMISSION.UPDATE_WORK_HISTORY)
                                  ? [
                                      {
                                        type: 'button',
                                        className: `btn btn-primary mx-2`,
                                        onClick: (e) => {
                                          setIsVisibleDeleteAlert(true);
                                          setDeleteId(history.id);
                                        },
                                        name: t('label.delete'),
                                        position: 'right',
                                      },
                                      {
                                        type: 'button',
                                        className: `btn btn-primary mx-2`,
                                        onClick: (e) => {
                                          props.handleReset(e);
                                        },
                                        name: t('label.reset'),
                                        position: 'right',
                                      },
                                      {
                                        type: 'button',
                                        className: `btn btn-primary px-4 mx-2`,
                                        onClick: async (e) => {
                                          props.handleSubmit(e);
                                        },
                                        name: t('label.save'),
                                      },
                                    ]
                                  : [],
                              )}
                            </div>
                            <br />
                          </Form>
                        );
                      }}
                    </Formik>
                  );
                })
              ) : (
                <div />
              )}
              {isVisibleDeleteAlert && (
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
                    dispatch(deleteHistoryWork(deleteId, t('message.successful_delete'), handleCloseDeleteAlert));
                  }}
                />
              )}
            </div>
          </div>
        </CContainer>
      )}
    </>
  );
};
export default HistoryWorkingForm;
