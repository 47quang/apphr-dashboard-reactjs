import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { BenefitsSchema } from 'src/schema/formSchema';
import { deleteWageHistory, fetchAllowances, fetchContracts, setEmptyContracts } from 'src/stores/actions/contract';
import { api } from 'src/stores/apis';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

const Benefit = ({ t, history, match }) => {
  const profileId = match?.params?.id;
  const dispatch = useDispatch();

  const benefitTab = {
    contracts: useSelector((state) => state.contract.contracts),
  };

  const allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'one_time', name: 'Chi trả một lần', value: 'one_time' },
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
    { id: 'by_date', name: 'Chi trả theo ngày công' },
  ];
  useEffect(() => {
    dispatch(setEmptyContracts());
    dispatch(fetchAllowances());
    dispatch(fetchContracts({ profileId: +profileId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create(form, contractId) {
    // form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    form.contractId = contractId;
    form.wageId = parseInt(form.wageId);

    if (form.id) {
      form.allowanceIds = form && form.allowances.length > 0 ? form.allowances.map((a) => parseInt(a.id)) : [];
      form.expiredDate = form.expiredDate === '' ? null : form.expiredDate;
      api.wageHistory
        .put(form)
        .then(({ payload }) => {
          dispatch({
            type: REDUX_STATE.notification.SET_NOTI,
            payload: { open: true, type: 'success', message: t('message.successful_update') },
          });
          return payload;
        })
        .catch((err) => {
          dispatch({
            type: REDUX_STATE.notification.SET_NOTI,
            payload: { open: true, type: 'error', message: err },
          });
        });
      return;
    } else {
      delete form.id;
      delete form.wage;
      delete form.wages;
      form.allowanceIds = form && form.allowances.length > 0 ? form.allowances.map((a) => parseInt(a.id)) : [];
      let newWage = await api.wageHistory
        .post(form)
        .then(({ payload }) => {
          dispatch({
            type: REDUX_STATE.notification.SET_NOTI,
            payload: { open: true, type: 'success', message: t('message.successful_create') },
          });
          return payload;
        })
        .catch((err) => {
          dispatch({
            type: REDUX_STATE.notification.SET_NOTI,
            payload: { open: true, type: 'error', message: err },
          });
        });
      return newWage.id;
    }
  }

  async function removeWageHistory(wageHistoryId) {
    await dispatch(deleteWageHistory(wageHistoryId, t('message.successful_delete')));
  }
  const BodyItem = ({ values, handleChange, handleBlur, touched, errors, index, setFieldValue, validateForm, setFieldTouched, setTouched }) => {
    const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);
    const [deleteWageHistoryId, setDeleteWageHistoryId] = useState();
    const [deleteWageHistoryIndex, setDeleteWageHistoryIndex] = useState();

    const handleCloseDeleteAlert = () => {
      setIsVisibleDeleteAlert(false);
    };
    return (
      <>
        <FieldArray
          name={`wageHistories`}
          render={({ insert, remove, push, replace, unshift }) => {
            return (
              <div>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    type="button"
                    className="btn btn-success"
                    id={`addBtn${index}`}
                    onClick={() => {
                      insert(0, {
                        id: '',
                        wageId: '',
                        allowanceIds: [],
                        allowances: [],
                        startDate: '',
                        expiredDate: '',
                      });
                      document.getElementById(`addBtn${index}`).disabled = true;
                    }}
                  >
                    <Add /> {t('label.add')}
                  </button>
                </div>

                {values.wageHistories && values.wageHistories.length > 0 ? (
                  values.wageHistories.map((benefit, benefitIndex) => {
                    return (
                      <div
                        key={'benefit:' + benefitIndex}
                        id={values.id + benefitIndex}
                        className="shadow bg-white border border-secondary rounded m-4 p-4"
                      >
                        <>
                          <h5 className="px-3">{t('label.payroll')}</h5>
                          <div style={{ fontSize: 14 }}>{'Từ ' + benefit.startDate + ' đến ' + benefit.expiredDate}</div>
                          <hr className="mt-1" />
                          <div className="row">
                            <CommonSelectInput
                              containerClassName={'form-group col-lg-4'}
                              value={benefit?.type ?? ''}
                              onBlur={handleBlur(`wageHistories.${benefitIndex}.type`)}
                              onChange={async (e) => {
                                handleChange(`wageHistories.${benefitIndex}.type`)(e);
                                if (e.target.value !== '0') {
                                  let wages = await api.wage.getAll({ type: e.target.value }).then(({ payload }) => payload);
                                  setFieldValue(`wageHistories.${benefitIndex}.wages`, wages);
                                } else setFieldValue(`wageHistories.${benefitIndex}.wages`, []);
                                setFieldValue(`wageHistories.${benefitIndex}.wageId`, 0);
                                setFieldValue(`wageHistories.${benefitIndex}.amount`, 0);
                              }}
                              inputID={`wageHistories.${benefitIndex}.type`}
                              labelText={t('label.payment_method')}
                              selectClassName={'form-control'}
                              placeholder={t('placeholder.select_contract_payment_method')}
                              isRequiredField
                              isTouched={getIn(touched, `wageHistories.${benefitIndex}.type`)}
                              isError={getIn(errors, `wageHistories.${benefitIndex}.type`) && getIn(touched, `wageHistories.${benefitIndex}.type`)}
                              errorMessage={t(getIn(errors, `wageHistories.${benefitIndex}.type`))}
                              lstSelectOptions={paymentType}
                            />
                            <CommonSelectInput
                              containerClassName={'form-group col-lg-4'}
                              value={benefit?.wageId ?? ''}
                              onBlur={handleBlur(`wageHistories.${benefitIndex}.wageId`)}
                              onChange={(e) => {
                                let thisWage = benefit.wages.filter((s) => s.id === parseInt(e.target.value));
                                thisWage.length > 0
                                  ? setFieldValue(`wageHistories.${benefitIndex}.amount`, thisWage[0].amount)
                                  : setFieldValue(`wageHistories.${benefitIndex}.amount`, 0);
                                handleChange(`wageHistories.${benefitIndex}.wageId`)(e);
                              }}
                              inputID={`wageHistories.${benefitIndex}.wageId`}
                              labelText={t('label.salary_group')}
                              selectClassName={'form-control'}
                              placeholder={t('placeholder.select_contract_payment_method')}
                              isRequiredField
                              isTouched={getIn(touched, `wageHistories.${benefitIndex}.wageId`)}
                              isError={
                                getIn(errors, `wageHistories.${benefitIndex}.wageId`) && getIn(touched, `wageHistories.${benefitIndex}.wageId`)
                              }
                              errorMessage={t(getIn(errors, `wageHistories.${benefitIndex}.wageId`))}
                              lstSelectOptions={benefit.wages}
                            />
                            <CommonTextInput
                              containerClassName={'form-group col-lg-4'}
                              value={benefit?.amount ?? ''}
                              onBlur={handleBlur(`wageHistories.${benefitIndex}.wage.amount`)}
                              onChange={handleChange(`wageHistories.${benefitIndex}.wage.amount`)}
                              inputID={`wageHistories.${benefitIndex}.wage.amount`}
                              labelText={t('label.salary_level')}
                              inputType={'number'}
                              inputClassName={'form-control'}
                              placeholder={t('placeholder.enter_salary_level')}
                              isDisable
                            />
                          </div>
                          <div className="row">
                            <CommonTextInput
                              containerClassName={'form-group col-lg-4'}
                              value={benefit?.startDate ?? ''}
                              onBlur={handleBlur(`wageHistories.${benefitIndex}.startDate`)}
                              onChange={handleChange(`wageHistories.${benefitIndex}.startDate`)}
                              inputID={`wageHistories.${benefitIndex}.startDate`}
                              labelText={t('label.signature_date')}
                              inputType={'date'}
                              inputClassName={'form-control'}
                              isRequiredField
                              isTouched={getIn(touched, `wageHistories.${benefitIndex}.startDate`)}
                              isError={
                                getIn(errors, `wageHistories.${benefitIndex}.startDate`) && getIn(touched, `wageHistories.${benefitIndex}.startDate`)
                              }
                              errorMessage={t(getIn(errors, `wageHistories.${benefitIndex}.startDate`))}
                            />
                            <CommonTextInput
                              containerClassName={'form-group col-lg-4'}
                              value={benefit?.expiredDate ?? ''}
                              onBlur={handleBlur(`wageHistories.${benefitIndex}.expiredDate`)}
                              onChange={handleChange(`wageHistories.${benefitIndex}.expiredDate`)}
                              inputID={`wageHistories.${benefitIndex}.expiredDate`}
                              labelText={t('label.expiration_date')}
                              inputType={'date'}
                              inputClassName={'form-control'}
                              isRequiredField
                              isTouched={getIn(touched, `wageHistories.${benefitIndex}.expiredDate`)}
                              isError={
                                getIn(errors, `wageHistories.${benefitIndex}.expiredDate`) &&
                                getIn(touched, `wageHistories.${benefitIndex}.expiredDate`)
                              }
                              errorMessage={t(getIn(errors, `wageHistories.${benefitIndex}.expiredDate`))}
                            />
                          </div>
                          <h5 className="px-3">{t('label.allowance')}</h5>
                          <hr className="mt-2" />
                          <FieldArray
                            name={`wageHistories.${benefitIndex}.allowances`}
                            render={({ insert, remove, push, replace }) => (
                              <div>
                                {benefit.allowances &&
                                  benefit.allowances.length > 0 &&
                                  benefit.allowances.map((allowance, allowanceIdx) => {
                                    return (
                                      <div key={`allowance${allowanceIdx}`}>
                                        <div className="row">
                                          <CommonSelectInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={allowance?.id ?? ''}
                                            onBlur={handleBlur(`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`)}
                                            onChange={(e) => {
                                              let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                              if (thisSubsidizes && thisSubsidizes.length > 0)
                                                setFieldValue(
                                                  `wageHistories.${benefitIndex}.allowances.${allowanceIdx}.amount`,
                                                  thisSubsidizes[0].amount,
                                                );
                                              handleChange(`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`)(e);
                                            }}
                                            inputID={`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`}
                                            labelText={t('label.allowance')}
                                            selectClassName={'form-control'}
                                            placeholder={t('placeholder.select_allowance_type')}
                                            isRequiredField
                                            isTouched={getIn(touched, `wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`)}
                                            isError={
                                              getIn(touched, `wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`) &&
                                              getIn(errors, `wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`)
                                            }
                                            errorMessage={t(getIn(errors, `wageHistories.${benefitIndex}.allowances.${allowanceIdx}.id`))}
                                            lstSelectOptions={allowances}
                                          />
                                          <CommonTextInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={allowance?.amount ?? ''}
                                            onBlur={handleBlur(`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.amount`)}
                                            onChange={handleChange(`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.amount`)}
                                            inputID={`wageHistories.${benefitIndex}.allowances.${allowanceIdx}.amount`}
                                            labelText={t('label.allowance_level')}
                                            inputType={'number'}
                                            inputClassName={'form-control'}
                                            placeholder={t('placeholder.pension')}
                                            isDisable
                                          />
                                          <div className="form-group pt-4 mt-1">
                                            <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                <div className="d-flex justify-content-start mb-4">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                      push({ name: '', amount: 0 });
                                    }}
                                  >
                                    <AddCircle /> {t('label.add_allowance')}
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                          <hr className="mt-1" />
                          <WarningAlertDialog
                            isVisible={isVisibleDeleteAlert}
                            title={t('title.confirm')}
                            warningMessage={t('message.confirm_delete_academic')}
                            titleConfirm={t('label.agree')}
                            titleCancel={t('label.cancel')}
                            handleCancel={(e) => {
                              handleCloseDeleteAlert();
                            }}
                            handleConfirm={async (e) => {
                              console.log(deleteWageHistoryId);
                              await removeWageHistory(deleteWageHistoryId).then(() => {
                                handleCloseDeleteAlert();
                                remove(deleteWageHistoryIndex);
                              });
                            }}
                          />
                          {renderButtons(
                            benefit.id // Update
                              ? [
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: async (e) => {
                                      setIsVisibleDeleteAlert(true);
                                      setDeleteWageHistoryId(benefit.id);
                                      setDeleteWageHistoryIndex(benefitIndex);
                                    },
                                    name: t('label.delete'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: () => {
                                      setFieldValue(`wageHistories.${benefitIndex}`, benefitTab.contracts[index]?.wageHistories[benefitIndex]);
                                    },
                                    name: t('label.reset'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 ml-4`,
                                    onClick: async () => {
                                      let err = await validateForm();
                                      err.wageHistories = err.wageHistories.map((wage, idx) => {
                                        return idx === benefitIndex ? wage : undefined;
                                      });

                                      if (
                                        err &&
                                        err.wageHistories && // 👈 null and undefined check
                                        Object.keys(err.wageHistories).length !== 0 &&
                                        err.wageHistories.constructor === Array
                                      )
                                        setTouched(err);
                                      else {
                                        await create(benefit, values.id);
                                        benefit.expiredDate = benefit.expiredDate ?? '';
                                        benefitTab.contracts[index].wageHistories[benefitIndex] = benefit;
                                      }
                                    },
                                    name: benefit.id ? t('label.save') : t('label.create_new'),
                                  },
                                ]
                              : [
                                  //Create
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 mx-4`,
                                    onClick: async (e) => {
                                      remove(benefitIndex);
                                      document.getElementById(`addBtn${index}`).disabled = false;
                                    },
                                    name: t('label.delete'),
                                    position: 'right',
                                  },
                                  {
                                    type: 'button',
                                    className: `btn btn-primary px-4 ml-4`,
                                    onClick: async () => {
                                      let err = await validateForm();
                                      err && err.wageHistories && err.wageHistories.splice(1);
                                      if (
                                        err &&
                                        err.wageHistories && // 👈 null and undefined check
                                        Object.keys(err.wageHistories).length !== 0 &&
                                        err.wageHistories.constructor === Array
                                      )
                                        setTouched(err);
                                      else {
                                        let wages = benefit.wages;
                                        let newWage = await create(benefit, values.id);
                                        benefit.id = newWage;
                                        benefit.wages = wages;
                                        setFieldValue(`wageHistories.${0}`, benefit);
                                        document.getElementById(`addBtn${index}`).disabled = true;
                                      }
                                    },
                                    name: t('label.create_new'),
                                  },
                                ],
                          )}
                        </>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            );
          }}
        />
      </>
    );
  };
  return (
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div>
          {benefitTab.contracts && benefitTab.contracts.length > 0 ? (
            benefitTab.contracts.map((contract, index) => {
              contract.isMinimize = false;
              return (
                <Formik
                  key={index}
                  initialValues={contract}
                  validationSchema={BenefitsSchema}
                  enableReinitialize
                  onSubmit={async (values) => {
                    // await create(values).then(() =>
                    //   dispatch(
                    //     fetchContracts({
                    //       profileId: profileId,
                    //     }),
                    //   ),
                    // );
                  }}
                >
                  {(props) => {
                    props.index = index;
                    return (
                      <form className="p-0 m-0">
                        <div className="shadow bg-white rounded mx-4 p-4 mb-4">
                          <div style={{ fontSize: 18, fontWeight: 'bold', textOverflow: 'ellipsis' }}>
                            <div className="pt-1 d-inline" role="button">
                              {!props.values.isMinimize ? (
                                <AddBoxOutlinedIcon className="pb-1" onClick={(e) => props.setFieldValue(`isMinimize`, !props.values.isMinimize)} />
                              ) : (
                                <IndeterminateCheckBoxOutlinedIcon
                                  className="pb-1"
                                  onClick={(e) => props.setFieldValue('isMinimize', !props.values.isMinimize)}
                                />
                              )}
                            </div>
                            <Switch
                              checked={props.values.isOpen}
                              name={`isOpen ${index}`}
                              onChange={(e) => {
                                props.setFieldValue(`isOpen ${index}`, e.target.checked);
                              }}
                            />
                            {props.values.code + ' - ' + props.values.fullname}
                          </div>

                          <div style={{ fontSize: 14, paddingLeft: 82 }}>
                            {t('label.from') + props.values.handleDate + t('label.to') + props.values.expiredDate}
                          </div>
                          <hr className="mt-1" />
                          {props.values.isMinimize && (
                            <div>
                              <BodyItem {...props} />
                              <hr className="mt-1" />
                            </div>
                          )}
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    </CContainer>
  );
};

export default Benefit;
