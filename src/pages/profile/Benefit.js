import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { PERMISSION } from 'src/constants/key';
import { NewActiveBenefitSchema } from 'src/schema/formSchema';
import { fetchAllowances, setEmptyContracts } from 'src/stores/actions/contract';
import { createActiveWage, fetchActiveContract, fetchActiveWage, updateWageHistory } from 'src/stores/actions/profile';
import { api } from 'src/stores/apis';
import { formatDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const Benefit = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const profileId = match?.params?.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const activeContract = useSelector((state) => state.profile.activeContract);

  const activeWage = useSelector((state) => state.profile.activeWage);
  const status = [
    { id: 'active', name: t('label.active') },
    { id: 'inactive', name: t('label.inactive') },
  ];
  let allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'by_hour', name: t('label.by_hour') },
    { id: 'by_month', name: t('label.by_month') },
  ];
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_WAGE_HISTORY)) {
      dispatch(fetchAllowances());
      dispatch(fetchActiveWage(+profileId, setLoading));
      dispatch(fetchActiveContract(+profileId));

      return () => {
        dispatch(setEmptyContracts());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let newBenefit = {
    profileId: '',
    contractId: '',
    type: '',
    wageId: '',
    amount: '',
    startDate: '',
    expiredDate: '',
    wages: [],
    code: '',
    status: '',
    contractType: '',
  };

  async function create(form, contractId) {
    form.profileId = +match.params.id;
    form.contractId = activeContract?.id ? +activeContract.id : '';
    form.wageId = parseInt(form.wageId);

    if (form.id) {
      dispatch(updateWageHistory(form, t('message.successful_update')));
    } else {
      dispatch(createActiveWage(form, t('message.successful_create'), handleResetNewWage));
    }
  }

  const BodyItem = ({
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    index,
    setFieldValue,
    validateForm,
    setFieldTouched,
    handleReset,
    setTouched,
    handleSubmit,
    isCreate,
    contractType,
  }) => {
    return (
      <>
        <h5>{t('label.payroll')}</h5>
        <div style={{ fontSize: 14 }}>
          {values?.expiredDate
            ? t('label.from') + formatDate(values.startDate) + t('label.to') + formatDate(values.expiredDate)
            : t('label.from') + formatDate(values.startDate)}
        </div>
        <hr className="mt-1" />
        <div className="row">
          {isCreate ? (
            <div className="form-group col-xl-4">
              <Label text={t('label.benefit_code')} required />
              <div className="input-group">
                <input
                  type="text"
                  className={'form-control col-10'}
                  rows={5}
                  onBlur={handleBlur('code')}
                  name={`code`}
                  onChange={(e) => handleChange(`code`)(e)}
                  value={values.code}
                  placeholder={t('placeholder.enter_benefit_code')}
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
          ) : (
            <div className="form-group col-xl-4">
              <Label text={t('label.benefit_code')} required />
              <div className="input-group">
                <input
                  type="text"
                  className={'form-control col-12'}
                  rows={5}
                  onBlur={handleBlur('code')}
                  name={`code`}
                  onChange={(e) => handleChange(`code`)(e)}
                  value={values.code}
                  disabled
                  placeholder={t('placeholder.enter_benefit_code')}
                />
              </div>
            </div>
          )}
          {contractType !== 'season' ? (
            <>
              <CommonSelectInput
                containerClassName={'form-group col-lg-4'}
                value={values?.type ?? ''}
                onBlur={handleBlur(`type`)}
                onChange={async (e) => {
                  handleChange(`type`)(e);
                  if (e.target.value !== '0') {
                    let wages = await api.wage.getAll({ type: e.target.value }).then(({ payload }) => payload);
                    setFieldValue(`wages`, wages);
                  } else setFieldValue(`wages`, []);
                  setFieldValue(`wageId`, '');
                  setFieldValue(`amount`, '');
                }}
                inputID={`type`}
                labelText={t('label.payment_method')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_contract_payment_method')}
                isRequiredField
                isTouched={getIn(touched, `type`)}
                isError={getIn(errors, `type`) && getIn(touched, `type`)}
                errorMessage={t(getIn(errors, `type`))}
                lstSelectOptions={paymentType}
              />
              <CommonSelectInput
                containerClassName={'form-group col-lg-4'}
                value={values?.wageId ?? ''}
                onBlur={handleBlur(`wageId`)}
                onChange={(e) => {
                  let thisWage = values.wages.filter((s) => s.id === parseInt(e.target.value));
                  thisWage.length > 0 ? setFieldValue(`amount`, thisWage[0].amount) : setFieldValue(`amount`, '');
                  handleChange(`wageId`)(e);
                }}
                inputID={`wageId`}
                labelText={t('label.salary_group')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_contract_payment_method')}
                isRequiredField
                isTouched={getIn(touched, `wageId`)}
                isError={getIn(errors, `wageId`) && getIn(touched, `wageId`)}
                errorMessage={t(getIn(errors, `wageId`))}
                lstSelectOptions={values.wages}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.amount ?? ''}
                onBlur={handleBlur(`wage.amount`)}
                onChange={handleChange(`wage.amount`)}
                inputID={`wage.amount`}
                labelText={t('label.salary_level')}
                inputType={'number'}
                inputClassName={'form-control'}
                placeholder={t('placeholder.enter_salary_level')}
                isDisable
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.startDate ?? ''}
                onBlur={handleBlur(`startDate`)}
                onChange={handleChange(`startDate`)}
                inputID={`startDate`}
                labelText={t('label.signature_date')}
                inputType={'date'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={getIn(touched, `startDate`)}
                isError={getIn(errors, `startDate`) && getIn(touched, `startDate`)}
                errorMessage={t(getIn(errors, `startDate`))}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.expiredDate ?? ''}
                onBlur={handleBlur(`expiredDate`)}
                onChange={handleChange(`expiredDate`)}
                inputID={`expiredDate`}
                labelText={t('label.expiration_date')}
                inputType={'date'}
                inputClassName={'form-control'}
              />
            </>
          ) : (
            <>
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.amount ?? ''}
                onBlur={handleBlur(`amount`)}
                onChange={handleChange(`amount`)}
                inputID={`amount`}
                isRequiredField
                labelText={t('label.salary_level')}
                inputType={'number'}
                inputClassName={'form-control'}
                placeholder={t('placeholder.enter_salary_level')}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.startDate ?? ''}
                onBlur={handleBlur(`startDate`)}
                onChange={handleChange(`startDate`)}
                inputID={`startDate`}
                labelText={t('label.signature_date')}
                inputType={'date'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={getIn(touched, `startDate`)}
                isError={getIn(errors, `startDate`) && getIn(touched, `startDate`)}
                errorMessage={t(getIn(errors, `startDate`))}
              />
            </>
          )}
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
            isRequiredField
            placeholder={t('placeholder.select_benefit_status')}
            isTouched={getIn(touched, `status`)}
            isError={getIn(errors, `status`) && getIn(touched, `status`)}
            errorMessage={t(getIn(errors, `status`))}
            lstSelectOptions={status}
          />
        </div>
        <h5 className="px-3">{t('label.allowance')}</h5>
        <hr className="mt-2" />
        <FieldArray
          name={`allowances`}
          render={({ insert, remove, push, replace }) => (
            <div>
              {values.allowances &&
                values.allowances.length > 0 &&
                values.allowances.map((allowance, allowanceIdx) => {
                  return (
                    <div key={`allowance${allowanceIdx}`}>
                      <div className="row">
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={allowance?.id ?? ''}
                          onBlur={handleBlur(`allowances.${allowanceIdx}.id`)}
                          onChange={(e) => {
                            let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                            if (thisSubsidizes && thisSubsidizes.length > 0)
                              setFieldValue(`allowances.${allowanceIdx}.amount`, thisSubsidizes[0].amount);
                            handleChange(`allowances.${allowanceIdx}.id`)(e);
                          }}
                          inputID={`allowances.${allowanceIdx}.id`}
                          labelText={t('label.allowance')}
                          selectClassName={'form-control'}
                          placeholder={t('placeholder.select_allowance_type')}
                          isRequiredField
                          isTouched={getIn(touched, `allowances.${allowanceIdx}.id`)}
                          isError={getIn(touched, `allowances.${allowanceIdx}.id`) && getIn(errors, `allowances.${allowanceIdx}.id`)}
                          errorMessage={t(getIn(errors, `allowances.${allowanceIdx}.id`))}
                          lstSelectOptions={allowances}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
                          value={allowance?.amount ?? ''}
                          onBlur={handleBlur(`allowances.${allowanceIdx}.amount`)}
                          onChange={handleChange(`allowances.${allowanceIdx}.amount`)}
                          inputID={`allowances.${allowanceIdx}.amount`}
                          labelText={t('label.allowance_level')}
                          inputType={'number'}
                          inputClassName={'form-control'}
                          placeholder={t('placeholder.pension')}
                          isDisable
                        />

                        <div className="pl-2" hidden={!permissionIds.includes(PERMISSION.CREATE_WAGE_HISTORY)}>
                          <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="d-flex justify-content-start mb-4">
                <button
                  hidden={!permissionIds.includes(PERMISSION.CREATE_WAGE_HISTORY)}
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
      </>
    );
  };
  const newWageRef = useRef();

  const handleResetNewWage = () => {
    newWageRef.current.handleReset();
    document.getElementById('newWage').hidden = true;
    document.getElementById('addBtn').disabled = false;
  };
  const [openWarning, setOpenWarning] = useState(false);
  const handleConfirmWarning = (e) => {
    create(newWageRef.current.values);
    setOpenWarning(!openWarning);
  };
  const handleCancelWarning = () => {
    setOpenWarning(!openWarning);
  };

  const updateWageRef = useRef();

  const preStatus = activeWage?.status;

  const [openUpdateWarning, setOpenUpdateWarning] = useState(false);

  const handleConfirmUpdateWarning = (e) => {
    create(updateWageRef.current.values);
    setOpenUpdateWarning(!openUpdateWarning);
  };

  const handleCancelUpdateWarning = () => {
    setOpenUpdateWarning(!openUpdateWarning);
  };
  return (
    <>
      {loading ? (
        <div className="text-center pt-4">
          <CircularProgress />
        </div>
      ) : (
        <CContainer fluid className="c-main m-auto p-4">
          <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 1000 }}>
            <button
              type="button"
              className="btn btn-success rounded-circle p-3"
              hidden={!permissionIds.includes(PERMISSION.CREATE_CONTRACT)}
              id="addBtn"
              onClick={() => {
                document.getElementById('newWage').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add fontSize="large" />
            </button>
          </div>
          {openWarning && (
            <WarningAlertDialog
              isVisible={openWarning}
              title={t('title.new_active_wage')}
              titleConfirm={t('label.agree')}
              handleConfirm={handleConfirmWarning}
              titleCancel={t('label.decline')}
              handleCancel={handleCancelWarning}
              warningMessage={t('message.new_active_wage_warning_message')}
            />
          )}
          {openUpdateWarning && (
            <WarningAlertDialog
              isVisible={openUpdateWarning}
              title={t('title.update_active_wage')}
              titleConfirm={t('label.agree')}
              handleConfirm={handleConfirmUpdateWarning}
              titleCancel={t('label.decline')}
              handleCancel={handleCancelUpdateWarning}
              warningMessage={t('message.update_active_wage_warning_message')}
            />
          )}

          <div className="m-auto">
            <div>
              {permissionIds.includes(PERMISSION.LIST_CONTRACT) && (
                <Formik
                  innerRef={newWageRef}
                  initialValues={newBenefit}
                  validationSchema={NewActiveBenefitSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    if (values?.status === 'active') setOpenWarning(true);
                    else create(values);
                  }}
                >
                  {(props) => {
                    props.isCreate = true;
                    props.contractType = activeContract?.type;
                    return (
                      <form id="newWage" hidden={true} className="p-0 m-0">
                        <div className="shadow bg-white rounded p-4">
                          <div>
                            <BodyItem {...props} />
                            <hr className="mt-1" />
                            {renderButtons([
                              {
                                type: 'button',
                                className: `btn btn-primary  mx-2`,
                                onClick: (e) => {
                                  handleResetNewWage();
                                },
                                name: t('label.cancel'),
                                position: 'right',
                              },
                              {
                                type: 'button',
                                className: `btn btn-primary px-4 ml-2`,
                                onClick: (e) => {
                                  props.handleSubmit(e);
                                  console.log(props.errors);
                                },
                                name: t('label.create_new'),
                              },
                            ])}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              )}
              {permissionIds.includes(PERMISSION.LIST_CONTRACT) && activeWage ? (
                <Formik
                  innerRef={updateWageRef}
                  initialValues={activeWage}
                  validationSchema={NewActiveBenefitSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    if (preStatus && values.status !== preStatus) setOpenUpdateWarning(true);
                    else create(values);
                  }}
                >
                  {(props) => {
                    props.isCreate = false;
                    props.contractType = activeContract?.type;
                    return (
                      <form className="p-0 m-0">
                        <div className="shadow bg-white rounded p-4">
                          <div>
                            <BodyItem {...props} />
                            <hr className="mt-1" />
                            {renderButtons(
                              permissionIds.includes(PERMISSION.UPDATE_CONTRACT)
                                ? [
                                    {
                                      type: 'button',
                                      className: `btn btn-primary px-4 mx-2`,
                                      onClick: (e) => {
                                        props.handleReset(e);
                                      },
                                      name: t('label.reset'),
                                      position: 'right',
                                    },
                                    {
                                      type: 'button',
                                      className: `btn btn-primary px-4 ml-2`,
                                      onClick: (e) => {
                                        props.handleSubmit(e);
                                        console.log(props.errors);
                                      },
                                      name: t('label.save'),
                                    },
                                  ]
                                : [],
                            )}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CContainer>
      )}
    </>
  );
};

export default Benefit;
