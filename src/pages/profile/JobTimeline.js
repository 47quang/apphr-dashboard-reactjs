import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import DynamicField from 'src/components/dialog/DynamicField';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { PERMISSION } from 'src/constants/key';
import { NewContractSchema } from 'src/schema/formSchema';
import {
  createContract,
  deleteContract,
  fetchAllowances,
  fetchBranches,
  fetchContracts,
  fetchWagesByType,
  setEmptyContracts,
  updateContract,
} from 'src/stores/actions/contract';
import { fetchDepartments } from 'src/stores/actions/department';
import { api } from 'src/stores/apis';
import { getCurrentDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';

const JobTimelineInfo = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const profileId = +match?.params?.id;
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  // const positions = useSelector((state) => state.position.positions);
  // const departments = useSelector((state) => state.department.departments);
  let wages = useSelector((state) => state.contract.wages);
  const jobTimelineInfo = {
    contractInfo: useSelector((state) => state.contract.contracts),
  };
  const newContract = {
    isMinimize: false,
    isOpen: true,
    code: '',
    type: '',
    pTaxType: '',
    signee: '',
    probTime: 0,
    probPayRates: 0,
    handleDate: '',
    validDate: '',
    expiredDate: '',
    branchId: 0,
    startWork: '',
    paymentType: 0,
    salaryGroup: 0,
    salary: 0,
    allowance: [],
    files: [],
    attributes: [],
  };

  const allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
  ];
  const periodicPayment = [
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_date', name: 'Chi trả theo ngày' },
    { id: 'by_week', name: 'Chi trả theo tuần' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
  ];

  const personalIncomeTaxType = [
    { id: 'resident', name: 'Cá nhân có cư trứ' },
    { id: 'non_resident', name: 'Cá nhân không cư trú' },
  ];

  const type = [
    { id: 'limitation', name: 'Có xác định thời hạn' },
    { id: 'un_limitation', name: 'Không xác định thời hạn' },
    { id: 'season', name: 'Thuê khoán' },
  ];

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_CONTRACT)) {
      dispatch(fetchContracts({ profileId: +profileId }));
      dispatch(fetchBranches());
      dispatch(fetchAllowances());
      return () => {
        dispatch(setEmptyContracts());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (jobTimelineInfo.contractInfo.branchId) dispatch(fetchDepartments({ branchId: jobTimelineInfo.contractInfo.branchId }));
  //   if (jobTimelineInfo.contractInfo.departmentId) dispatch(fetchDepartments({ departmentId: jobTimelineInfo.contractInfo.departmentId }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [jobTimelineInfo.contractInfo.branchId, jobTimelineInfo.contractInfo.departmentId]);

  async function create(values) {
    let form = values;
    form.profileId = +match.params.id;

    if (form.branchId === '0') delete form.branchId;
    else form['branchName'] = branches.filter((br) => br.id === parseInt(form.branchId))[0]?.branch;
    // if (form.departmentId === '0') delete form.departmentId;
    // else form['departmentName'] = departments.filter((br) => br.id === parseInt(form.departmentId))[0]?.name;
    // if (form.positionId === '0') delete form.positionId;
    // else form['positionName'] = positions.filter((br) => br.id === parseInt(form.positionId))[0]?.name;

    if (form.id) {
      dispatch(updateContract(form, t('message.successful_update')));
    } else {
      //console.log('create', form);
      dispatch(createContract(form, t('message.successful_create'), handleResetNewContract));
    }
  }
  const BodyContract = ({ values, handleBlur, handleChange, touched, errors, setFieldValue, isCreate }) => {
    const [isOpenDynamicFieldForm, setIsOpenDynamicFieldForm] = useState(false);
    const handleConfirm = (val) => {
      values.attributes.push(val);
      setFieldValue('attributes', values.attributes);
      // dispatch(addField(values));
      setIsOpenDynamicFieldForm(false);
    };
    const handleCancel = () => {
      setIsOpenDynamicFieldForm(false);
    };
    return (
      <>
        <DynamicField isOpen={isOpenDynamicFieldForm} handleCancel={handleCancel} handleConfirm={handleConfirm} t={t} />
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.code ?? ''}
            onBlur={handleBlur(`code`)}
            onChange={handleChange(`code`)}
            inputID={`code`}
            labelText={t('label.contract_code')}
            inputType={'text'}
            isRequiredField
            placeholder={t('placeholder.enter_contract_code')}
            inputClassName={'form-control'}
            isTouched={touched.code}
            isError={errors.code && touched.code}
            errorMessage={t(errors.code)}
          />
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.fullname ?? ''}
            onBlur={handleBlur(`fullname`)}
            onChange={handleChange(`fullname`)}
            inputID={`fullname`}
            labelText={t('label.contract_fullname')}
            inputType={'text'}
            placeholder={t('placeholder.enter_contract_fullname')}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched.fullname}
            isError={errors.fullname && touched.fullname}
            errorMessage={t(errors.fullname)}
          />
          <CommonSelectInput
            containerClassName={'form-group col-xl-4'}
            value={values?.type ?? ''}
            onBlur={handleBlur(`type`)}
            onChange={handleChange(`type`)}
            inputID={`type`}
            labelText={t('label.contract_type')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_contract_type')}
            isRequiredField
            isTouched={touched?.type}
            isError={errors?.type && touched?.type}
            errorMessage={t(errors.type)}
            lstSelectOptions={type}
          />
        </div>
        <div className="row">
          <CommonSelectInput
            containerClassName={'form-group col-xl-4'}
            value={values?.typeTax ?? ''}
            onBlur={handleBlur(`typeTax`)}
            onChange={handleChange(`typeTax`)}
            inputID={`typeTax`}
            isRequiredField={['limitation', 'un_limitation'].includes(values.type)}
            isDisable={['0', 'season'].includes(values.type)}
            labelText={t('label.personal_income_tax_type')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_contract_type_tax')}
            isTouched={touched.typeTax}
            isError={errors.typeTax}
            errorMessage={t(errors.typeTax)}
            lstSelectOptions={personalIncomeTaxType}
          />

          <div className="form-group col-xl-4">
            <Label text={t('label.trial_period')} required />
            <div className="input-group">
              <input
                type="number"
                className={'form-control'}
                rows={5}
                name={`probTime`}
                onChange={(e) => handleChange(`probTime`)(e)}
                value={values.probTime}
              />
              <span className="input-group-text" id="basic-addon2">
                {t('label.day')}
              </span>
            </div>
            {errors && errors?.probTime && touched && touched?.probTime && t(errors && errors?.probTime) && (
              <div>
                <small className={'text-danger'}>{t(errors?.probTime)}</small>
              </div>
            )}
          </div>
          <div className="form-group col-xl-4">
            <Label text={t('label.trial_period_pay_rates')} required />
            <div className="input-group">
              <input
                type="number"
                className={'form-control'}
                rows={5}
                name={`probPayRates`}
                onChange={(e) => handleChange(`probPayRates`)(e)}
                value={values.probPayRates}
              />
              <span className="input-group-text" id="basic-addon2">
                {t('label.percentage')}
              </span>
            </div>
            {errors && errors?.probPayRates && touched && touched?.probPayRates && t(errors && errors?.probPayRates) && (
              <div>
                <small className={'text-danger'}>{t(errors?.probPayRates)}</small>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.handleDate ?? ''}
            onBlur={handleBlur(`handleDate`)}
            onChange={handleChange(`handleDate`)}
            inputID={`handleDate`}
            labelText={t('label.signature_date')}
            inputType={'date'}
            inputClassName={'form-control'}
            maxTime={getCurrentDate()}
            isRequiredField
            isTouched={touched?.handleDate}
            isError={errors?.handleDate && touched?.handleDate}
            errorMessage={t(errors?.handleDate)}
          />
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.validDate ?? ''}
            onBlur={handleBlur(`validDate`)}
            onChange={handleChange(`validDate`)}
            inputID={`validDate`}
            labelText={t('label.effective_date')}
            inputType={'date'}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched?.validDate}
            isError={errors && errors?.validDate && touched && touched?.validDate}
            errorMessage={t(errors?.validDate)}
          />
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.expiredDate ?? ''}
            onBlur={handleBlur(`expiredDate`)}
            onChange={handleChange(`expiredDate`)}
            inputID={`expiredDate`}
            labelText={values.type !== 'season' ? t('label.expiration_date') : t('label.end_date')}
            inputType={'date'}
            inputClassName={'form-control'}
            isRequiredField={['limitation'].includes(values.type)}
            isDisable={['0', 'un_limitation'].includes(values.type)}
            isTouched={touched?.expiredDate}
            isError={errors?.expiredDate}
            errorMessage={t(errors?.expiredDate)}
          />
        </div>
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-xl-4'}
            value={values?.startWork ?? ''}
            onBlur={handleBlur(`startWork`)}
            onChange={handleChange(`startWork`)}
            inputID={`startWork`}
            labelText={t('label.job_start_date')}
            inputType={'date'}
            inputClassName={'form-control'}
            isRequiredField
            isTouched={touched?.startWork}
            isError={errors?.startWork && touched?.startWork}
            errorMessage={t(errors?.startWork)}
          />
          <CommonSelectInput
            containerClassName={'form-group col-xl-4'}
            value={values?.branchId ?? ''}
            onBlur={handleBlur(`branchId`)}
            onChange={(e) => {
              dispatch(fetchDepartments({ branchId: e.target.value }));
              handleChange('branchId')(e);
            }}
            inputID={`branchId`}
            labelText={t('label.job_place')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_branch')}
            isTouched={touched?.branchId}
            isError={errors?.branchId && touched?.branchId}
            errorMessage={t(errors?.branchId)}
            lstSelectOptions={branches}
          />
          {/* <CommonSelectInput
            containerClassName={'form-group col-4'}
            value={values.departmentId ?? 0}
            onBlur={handleBlur('departmentId')}
            onChange={(e) => {
              dispatch(fetchPositions({ departmentId: e.target.value }));
              handleChange('departmentId')(e);
            }}
            inputID={'departmentId'}
            labelText={t('label.department')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_department')}
            lstSelectOptions={departments}
          />
          <CommonSelectInput
            containerClassName={'form-group col-4'}
            value={values.positionId ?? 0}
            onBlur={handleBlur('positionId')}
            onChange={(e) => {
              handleChange('positionId')(e);
            }}
            inputID={'positionId'}
            labelText={t('label.position')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_position')}
            lstSelectOptions={positions}
          /> */}
          {values.attributes &&
            values.attributes.length > 0 &&
            values.attributes.map((attribute, attributeIdx) => {
              return (
                <div key={`attribute${attributeIdx}`} className="form-group col-xl-4 d-flex">
                  {attribute.type !== 'textArea' ? (
                    <CommonTextInput
                      containerClassName={'form-group flex-grow-1 p-0 m-0'}
                      value={attribute?.value ?? ''}
                      onBlur={handleBlur(`attributes.${attributeIdx}.value`)}
                      onChange={handleChange(`attributes.${attributeIdx}.value`)}
                      inputID={`attributes.${attributeIdx}.value`}
                      labelText={attribute.name}
                      inputType={attribute.type}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={getIn(touched, `attributes.${attributeIdx}.value`)}
                      isError={getIn(errors, `attributes.${attributeIdx}.value`) && getIn(touched, `attributes.${attributeIdx}.value`)}
                      errorMessage={t(getIn(errors, `attributes.${attributeIdx}.value`))}
                    />
                  ) : (
                    <CommonMultipleTextInput
                      containerClassName={'form-group flex-grow-1 p-0 m-0'}
                      value={attribute.value ?? ''}
                      onBlur={handleBlur(`attributes.${attributeIdx}.value`)}
                      onChange={handleChange(`attributes.${attributeIdx}.value`)}
                      inputID={attribute.type}
                      labelText={attribute.name}
                      inputClassName={'form-control'}
                    />
                  )}
                  <DeleteIconButton
                    className="pl-2"
                    onClick={() => {
                      values.attributes.splice(attributeIdx, 1);
                      setFieldValue('attributes', values.attributes);
                    }}
                  />
                </div>
              );
            })}
          <div className="form-group col-xl-4">
            <Label text={t('label.add_new_field')} />
            <button
              type="button"
              className="btn btn-light form-control"
              onClick={() => {
                setIsOpenDynamicFieldForm(true);
              }}
            >
              <Add color="primary" />
            </button>
          </div>
        </div>
        <div className="row"></div>
        <h5 className="px-3">{t('label.gross_salary')}</h5>
        <hr className="mt-1" />
        {values.type !== 'season' ? (
          <div className="row">
            <CommonSelectInput
              containerClassName={'form-group col-xl-4'}
              value={values?.paymentType ?? ''}
              onBlur={handleBlur(`paymentType`)}
              onChange={async (e) => {
                if (isCreate) {
                  if (e.target.value !== '0') {
                    dispatch(fetchWagesByType({ type: e.target.value }));
                    setFieldValue(`amount`, 0);
                    handleChange(`paymentType`)(e);
                  } else setFieldValue(`wageId`, 0);
                } else {
                  if (e.target.value !== '0') {
                    handleChange(`paymentType`)(e);
                    let wage = await api.wage.getAll({ type: e.target.value }).then(({ payload }) => payload);

                    setFieldValue(`wages`, wage);
                  } else setFieldValue(`wages`, []);
                  setFieldValue(`wageId`, 0);
                  setFieldValue(`amount`, 0);
                }
              }}
              inputID={`paymentType`}
              labelText={t('label.payment_method')}
              selectClassName={'form-control'}
              placeholder={t('placeholder.select_contract_payment_method')}
              isRequiredField
              isTouched={touched?.paymentType}
              isError={errors?.paymentType && touched?.paymentType}
              errorMessage={t(errors?.paymentType)}
              lstSelectOptions={paymentType}
            />
            <CommonSelectInput
              containerClassName={'form-group col-xl-4'}
              value={values?.wageId ?? ''}
              onBlur={handleBlur(`wageId`)}
              onChange={(e) => {
                let thisWage;
                if (isCreate) thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                else thisWage = values.wages.filter((s) => s.id === parseInt(e.target.value));
                if (thisWage.length > 0) setFieldValue(`amount`, thisWage[0].amount);
                else setFieldValue(`amount`, 0);
                handleChange(`wageId`)(e);
              }}
              inputID={`wageId`}
              labelText={t('label.salary_group')}
              selectClassName={'form-control'}
              placeholder={t('placeholder.select_contract_payment_method')}
              isRequiredField
              isTouched={touched?.wageId}
              isError={errors?.wageId}
              errorMessage={t(errors?.wageId)}
              lstSelectOptions={isCreate ? wages : values.wages}
            />
            <CommonTextInput
              containerClassName={'form-group col-xl-4'}
              value={values?.amount ?? ''}
              onBlur={handleBlur(`amount`)}
              onChange={handleChange(`amount`)}
              inputID={`amount`}
              labelText={t('label.salary_level')}
              inputType={'number'}
              inputClassName={'form-control'}
              placeholder={t('placeholder.enter_salary_level')}
              isDisable
              isTouched={touched?.amount}
              isError={errors?.amount && touched?.amount}
              errorMessage={t(errors?.amount)}
            />

            <CommonTextInput
              containerClassName={'form-group col-xl-4'}
              value={values.dayOff}
              onBlur={handleBlur('dayOff')}
              onChange={handleChange('dayOff')}
              inputID={'dayOff'}
              labelText={t('label.wage_dayOff')}
              inputType={'number'}
              placeholder={t('placeholder.enter_dayOff')}
              inputClassName={'form-control'}
              isRequiredField
              isTouched={touched.dayOff}
              isError={errors.dayOff && touched.dayOff}
              errorMessage={t(errors.dayOff)}
            />
            <CommonSelectInput
              containerClassName={'form-group col-xl-4'}
              value={values?.periodicPayment ?? ''}
              onBlur={handleBlur(`periodicPayment`)}
              onChange={async (e) => {
                handleChange(`periodicPayment`)(e);
              }}
              inputID={`periodicPayment`}
              labelText={t('label.payment_method')}
              selectClassName={'form-control'}
              placeholder={t('placeholder.select_periodic_payment_method')}
              isRequiredField
              isTouched={touched?.periodicPayment}
              isError={errors?.periodicPayment && touched?.periodicPayment}
              errorMessage={t(errors?.periodicPayment)}
              lstSelectOptions={periodicPayment}
            />
          </div>
        ) : (
          <div className="row">
            <CommonTextInput
              containerClassName={'form-group col-xl-4'}
              value={values?.probPay ?? ''}
              onBlur={handleBlur(`probPay`)}
              onChange={handleChange(`probPay`)}
              inputID={`probPay`}
              isRequiredField={values.type === 'season'}
              labelText={t('label.salary_level')}
              inputType={'number'}
              inputClassName={'form-control'}
              placeholder={t('placeholder.enter_salary_level')}
              isTouched={touched?.probPay}
              isError={errors?.probPay}
              errorMessage={t(errors?.probPay)}
            />
          </div>
        )}

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
                          containerClassName={'form-group col-xl-4'}
                          value={allowance.id ?? ''}
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
                          isError={getIn(errors, `allowances.${allowanceIdx}.id`) && getIn(touched, `allowances.${allowanceIdx}.id`)}
                          errorMessage={t(getIn(errors, `allowances.${allowanceIdx}.id`))}
                          lstSelectOptions={allowances}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-xl-4'}
                          value={allowance.amount ?? ''}
                          onBlur={handleBlur(`allowances.${allowanceIdx}.amount`)}
                          onChange={handleChange(`allowances.${allowanceIdx}.amount`)}
                          inputID={`allowances.${allowanceIdx}.amount`}
                          labelText={t('label.allowance_level')}
                          inputType={'number'}
                          inputClassName={'form-control'}
                          placeholder={t('placeholder.pension')}
                          isDisable
                        />

                        <div className="form-group d-flex align-items-end">
                          <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="d-flex justify-content-start mb-4">
                <button type="button" className="btn btn-primary" onClick={() => push({ name: 0, amount: 0 })}>
                  <AddCircle /> {t('label.add_allowance')}
                </button>
              </div>
            </div>
          )}
        />
        <hr className="mt-1" />
        {isCreate ? (
          <CommonUploadFileButton
            isHide={!permissionIds.includes(PERMISSION.CREATE_CONTRACT)}
            name={`attaches`}
            containerClassName="mt-3 "
            buttonClassName="btn btn-primary"
            value={values.attaches}
          />
        ) : (
          <CommonUploadFileButton
            isHide={!permissionIds.includes(PERMISSION.UPDATE_CONTRACT)}
            name={`attaches`}
            containerClassName="mt-3 "
            buttonClassName="btn btn-primary"
            value={values.attaches}
          />
        )}
      </>
    );
  };

  const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);

  const handleCloseDeleteAlert = () => {
    setIsVisibleDeleteAlert(false);
  };

  const newContractRef = useRef();

  const handleResetNewContract = () => {
    newContractRef.current.handleReset();
    document.getElementById('newContract').hidden = true;
    document.getElementById('addBtn').disabled = false;
  };
  return (
    <CContainer fluid className="c-main">
      <div className="d-flex justify-content-center mb-4">
        <button
          type="button"
          hidden={!permissionIds.includes(PERMISSION.CREATE_CONTRACT)}
          className="btn btn-success"
          id="addBtn"
          onClick={() => {
            document.getElementById('newContract').hidden = false;
            document.getElementById('addBtn').disabled = true;
          }}
        >
          <Add /> {t('label.add')}
        </button>
      </div>
      <div className="m-auto">
        <Formik
          innerRef={newContractRef}
          initialValues={newContract}
          validationSchema={NewContractSchema}
          enableReinitialize
          onSubmit={async (values) => {
            // await create(values).then(() =>
            //   dispatch(
            //     fetchContracts({
            //       profileId: profileId,
            //     }),
            //   ),
            // );
            console.log(values);
          }}
        >
          {(props) => {
            props.isCreate = true;
            return (
              <form id="newContract" hidden={true} className="p-0 m-0">
                <div className="shadow bg-white rounded mx-4 p-4">
                  <h5>{t('label.create_new')}.</h5>
                  <hr className="mt-1" />
                  <BodyContract {...props} />

                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary  mx-2`,
                      onClick: (e) => {
                        handleResetNewContract();
                      },
                      name: t('label.cancel'),
                      position: 'right',
                    },
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit(e);
                      },
                      name: t('label.create_new'),
                    },
                  ])}
                </div>
                <br />
              </form>
            );
          }}
        </Formik>
        {permissionIds.includes(PERMISSION.LIST_CONTRACT) && jobTimelineInfo.contractInfo && jobTimelineInfo.contractInfo.length > 0 ? (
          jobTimelineInfo.contractInfo.map((contract, index) => {
            contract.isMinimize = false;
            return (
              <Formik
                key={index}
                initialValues={contract}
                validationSchema={NewContractSchema}
                enableReinitialize
                onSubmit={async (values) => {
                  await create(values).then(() =>
                    dispatch(
                      fetchContracts({
                        profileId: profileId,
                      }),
                    ),
                  );
                }}
              >
                {(props) => {
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
                            <BodyContract {...props} />
                            <hr className="mt-1" />
                            <WarningAlertDialog
                              isVisible={isVisibleDeleteAlert}
                              title={t('title.confirm')}
                              warningMessage={t('message.confirm_delete_contract')}
                              titleConfirm={t('label.agree')}
                              titleCancel={t('label.cancel')}
                              handleCancel={(e) => {
                                handleCloseDeleteAlert();
                              }}
                              handleConfirm={(e) => {
                                dispatch(deleteContract(contract.id, t('message.successful_delete'), handleCloseDeleteAlert));
                              }}
                            />
                            {renderButtons(
                              permissionIds.includes(PERMISSION.UPDATE_CONTRACT)
                                ? [
                                    {
                                      type: 'button',
                                      className: `btn btn-primary px-4 mx-2`,
                                      onClick: (e) => {
                                        setIsVisibleDeleteAlert(true);
                                      },
                                      name: t('label.delete'),
                                      position: 'right',
                                    },
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
                                      },
                                      name: t('label.save'),
                                    },
                                  ]
                                : [],
                            )}
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
    </CContainer>
  );
};

export default JobTimelineInfo;
