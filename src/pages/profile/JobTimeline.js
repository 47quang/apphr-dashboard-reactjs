import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { REDUX_STATE } from 'src/stores/states';
import { joinClassName } from 'src/utils/stringUtils';
import AddIcon from '@material-ui/icons/Add';
import { useEffect } from 'react';
import { fetchBranches, fetchContracts, fetchWagesByType, fetchAllowances, createContract } from 'src/stores/actions/contract';
import { fetchAccount, fetchProfiles } from 'src/stores/actions/account';
import { JobTimelineSchema } from 'src/schema/formSchema';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import { getCurrentDate } from 'src/utils/datetimeUtils';

const JobTimelineInfo = ({ t, history, match }) => {
  const profileId = match?.params?.id;
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  let wages = useSelector((state) => state.contract.wages);
  const jobTimelineInfo = {
    contractInfo: useSelector((state) => state.contract.contracts),
  };
  const allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'one_time', name: 'Chi trả một lần' },
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
    { id: 'by_date', name: 'Chi trả theo ngày công' },
  ];
  const typeWork = [
    { id: 'office', name: 'Văn phòng' },
    { id: 'out_door', name: 'Làm việc ngoài trời' },
  ];
  const personalIncomeTaxType = [
    { id: 'more_3_month', name: 'Cư trú có hợp đồng lao động 3 tháng trở lên' },
    { id: 'non_resident', name: 'Cá nhân không cư trú' },
    { id: 'no_tax', name: 'Không tính thuế' },
    { id: 'less_3_month', name: 'Hợp đồng lao động dưới 3 tháng' },
  ];

  const type = [
    { id: 'parttime', name: 'Bán thời gian' },
    { id: 'fulltime', name: 'Toàn thời gian' },
    { id: 'probationary', name: 'Thực tập' },
    { id: 'season', name: 'Thời vụ' },
  ];

  useEffect(() => {
    dispatch(fetchContracts({ profileId: parseInt(profileId) }));
    dispatch(fetchBranches());
    dispatch(fetchAllowances());
    if (jobTimelineInfo.contractInfo.paymentType !== '0') {
      dispatch(fetchWagesByType({ type: jobTimelineInfo.contractInfo.paymentType }));
    }
  }, []);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded px-4 py-4">
          <Formik
            initialValues={jobTimelineInfo}
            enableReinitialize
            validationSchema={JobTimelineSchema}
            onSubmit={(values) => {
              dispatch({
                type: REDUX_STATE.contract.SET_CONTRACTS,
                payload: values.contractInfo,
              });
            }}
          >
            {({
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              errors,
              touched,
              setTouched,
              setFieldTouched,
              setValues,
              setFieldValue,
              validateForm,
            }) => (
              <form>
                <FieldArray
                  name="contractInfo"
                  render={({ insert, remove, push, replace }) => {
                    return (
                      <div>
                        {values.contractInfo && values.contractInfo.length > 0 ? (
                          values.contractInfo.map((friend, index) => {
                            const changeMinimizeButton = () => {
                              replace(index, {
                                ...values.contractInfo[index],
                                isMinimize: !values.contractInfo[index].isMinimize,
                              });
                            };

                            return (
                              <div key={index} className={joinClassName([`${index !== 0 ? 'pt-5' : 'pt-3'}`])}>
                                <div className={'d-flex flex-row justify-content-between'}>
                                  <div style={{ fontSize: 18, fontWeight: 'bold' }} className="d-flex">
                                    <div className="pt-1" role="button">
                                      {values.contractInfo[index].isMinimize ? (
                                        <AddBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                      ) : (
                                        <IndeterminateCheckBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                      )}
                                    </div>
                                    <Switch
                                      checked={values.contractInfo[index].isOpen}
                                      name={`contractInfo.${index}.isOpen`}
                                      onChange={(e) => {
                                        setFieldValue(`contractInfo.${index}.isOpen`, e.target.checked);
                                      }}
                                    />
                                    {values.contractInfo[index].code}
                                  </div>
                                  <div>
                                    {!values.contractInfo[index]?.id && (
                                      <div role="button" className="d-inline pb-1">
                                        <AddIcon
                                          className="d-inline"
                                          onClick={async () => {
                                            let a = await validateForm();
                                            a = a.contractInfo;
                                            console.log('a', a);
                                            // console.log('idx', index);
                                            if (!Array.isArray(a)) {
                                              let data = values.contractInfo[index];
                                              if (data.branchId === '0') delete data.branchId;
                                              else data['branchName'] = branches.filter((br) => br.id === parseInt(data.branchId))[0]?.branch;
                                              console.log('create: ', data);

                                              dispatch(createContract(data, history, t('message.successful_create')));
                                              return;
                                            } else {
                                              console.log('a1', a);
                                              console.log(index);
                                              let err_fields = Object.keys(a[index]);
                                              err_fields &&
                                                err_fields.length &&
                                                err_fields.forEach((val) => setFieldTouched(`contractInfo.${index}.${val}`, true));
                                            }
                                          }}
                                          style={{ color: 'blue' }}
                                        />
                                      </div>
                                    )}
                                    <DeleteIconButton onClick={() => remove(index)} />
                                  </div>
                                </div>
                                <hr className="mt-1" />

                                {!values.contractInfo[index].isMinimize && (
                                  <>
                                    <div className="row">
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.code ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.code`)}
                                        onChange={handleChange(`contractInfo.${index}.code`)}
                                        inputID={`contractInfo.${index}.code`}
                                        labelText={t('label.contract_code')}
                                        inputType={'text'}
                                        placeholder={t('placeholder.enter_contract_code')}
                                        inputClassName={'form-control'}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.code}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.code &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.code
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.code)}
                                      />
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.fullname ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.fullname`)}
                                        onChange={handleChange(`contractInfo.${index}.fullname`)}
                                        inputID={`contractInfo.${index}.fullname`}
                                        labelText={t('label.contract_fullname')}
                                        inputType={'text'}
                                        placeholder={t('placeholder.enter_contract_fullname')}
                                        inputClassName={'form-control'}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.fullname}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.fullname &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.fullname
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.fullname)}
                                      />
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.type ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.type`)}
                                        onChange={handleChange(`contractInfo.${index}.type`)}
                                        inputID={`contractInfo.${index}.type`}
                                        labelText={t('label.contract_type')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_contract_type')}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.type}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.type &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.type
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.type)}
                                        lstSelectOptions={type}
                                      />
                                    </div>
                                    <div className="row">
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.typeTax ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.typeTax`)}
                                        onChange={handleChange(`contractInfo.${index}.typeTax`)}
                                        inputID={`contractInfo.${index}.typeTax`}
                                        labelText={t('label.personal_income_tax_type')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_contract_type_tax')}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.typeTax}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.typeTax &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.typeTax
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.typeTax)}
                                        lstSelectOptions={personalIncomeTaxType}
                                      />
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.typeWork ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.typeWork`)}
                                        onChange={handleChange(`contractInfo.${index}.typeWork`)}
                                        inputID={`contractInfo.${index}.typeWork`}
                                        labelText={t('label.job_type')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_contract_type_work')}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.typeWork}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.typeWork &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.typeWork
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.typeWork)}
                                        lstSelectOptions={typeWork}
                                      />

                                      <div className="form-group col-lg-4">
                                        <Label text={t('label.trial_period')} />
                                        <div className="input-group">
                                          <input
                                            type="number"
                                            className={'form-control'}
                                            rows={5}
                                            name={`contractInfo.${index}.probTime`}
                                            onChange={(e) => handleChange(`contractInfo.${index}.probTime`)(e)}
                                            value={values.contractInfo[index].probTime}
                                          />
                                          <span className="input-group-text" id="basic-addon2">
                                            {t('label.day')}
                                          </span>
                                        </div>
                                        {errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.probTime &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.probTime &&
                                          t(errors && errors.contractInfo && errors.contractInfo[index]?.probTime) && (
                                            <div>
                                              <small className={'text-danger'}>{t(errors.contractInfo[index]?.probTime)}</small>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.handleDate ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.handleDate`)}
                                        onChange={handleChange(`contractInfo.${index}.handleDate`)}
                                        inputID={`contractInfo.${index}.handleDate`}
                                        labelText={t('label.signature_date')}
                                        inputType={'date'}
                                        inputClassName={'form-control'}
                                        maxTime={getCurrentDate()}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.handleDate}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.handleDate &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.handleDate
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.handleDate)}
                                      />
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.validDate ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.validDate`)}
                                        onChange={handleChange(`contractInfo.${index}.validDate`)}
                                        inputID={`contractInfo.${index}.validDate`}
                                        labelText={t('label.effective_date')}
                                        inputType={'date'}
                                        inputClassName={'form-control'}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.validDate}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.validDate &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.validDate
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.validDate)}
                                      />
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.expiredDate ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.expiredDate`)}
                                        onChange={handleChange(`contractInfo.${index}.expiredDate`)}
                                        inputID={`contractInfo.${index}.expiredDate`}
                                        labelText={t('label.expiration_date')}
                                        inputType={'date'}
                                        inputClassName={'form-control'}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.expiredDate}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.expiredDate &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.expiredDate
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.expiredDate)}
                                      />
                                    </div>
                                    <div className="row">
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.startWork ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.startWork`)}
                                        onChange={handleChange(`contractInfo.${index}.startWork`)}
                                        inputID={`contractInfo.${index}.startWork`}
                                        labelText={t('label.job_start_date')}
                                        inputType={'date'}
                                        inputClassName={'form-control'}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.startWork}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.startWork &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.startWork
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.startWork)}
                                      />
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.branchId ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.branchId`)}
                                        onChange={handleChange(`contractInfo.${index}.branchId`)}
                                        inputID={`contractInfo.${index}.branchId`}
                                        labelText={t('label.job_place')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_branch')}
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.branchId}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.branchId &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.branchId
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.branchId)}
                                        lstSelectOptions={branches}
                                      />
                                    </div>
                                    <h5 className="px-3">{t('label.gross_salary')}</h5>
                                    <hr className="mt-1" />
                                    <div className="row">
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.paymentType ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.paymentType`)}
                                        onChange={(e) => {
                                          if (e.target.value !== '0') {
                                            dispatch(fetchWagesByType({ type: e.target.value }));
                                            setFieldValue(`contractInfo.${index}.amount`, 0);
                                            handleChange(`contractInfo.${index}.paymentType`)(e);
                                          } else setFieldValue(`contractInfo.${index}.wageId`, 0);
                                        }}
                                        inputID={`contractInfo.${index}.paymentType`}
                                        labelText={t('label.payment_method')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_contract_payment_method')}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.paymentType}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.paymentType &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.paymentType
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.paymentType)}
                                        lstSelectOptions={paymentType}
                                      />
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.wageId ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.wageId`)}
                                        onChange={(e) => {
                                          let thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                                          setFieldValue(`contractInfo.${index}.amount`, thisWage[0].amount);
                                          handleChange(`contractInfo.${index}.wageId`)(e);
                                        }}
                                        inputID={`contractInfo.${index}.wageId`}
                                        labelText={t('label.salary_group')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_contract_payment_method')}
                                        isRequiredField
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.wageId}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.wageId &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.wageId
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.wageId)}
                                        lstSelectOptions={wages}
                                      />
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={values?.contractInfo[index]?.amount ?? ''}
                                        onBlur={handleBlur(`contractInfo.${index}.amount`)}
                                        onChange={handleChange(`contractInfo.${index}.amount`)}
                                        inputID={`contractInfo.${index}.amount`}
                                        labelText={t('label.salary_level')}
                                        inputType={'number'}
                                        inputClassName={'form-control'}
                                        placeholder={t('placeholder.enter_salary_level')}
                                        isDisable
                                        isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.amount}
                                        isError={
                                          errors &&
                                          errors.contractInfo &&
                                          errors.contractInfo[index]?.amount &&
                                          touched &&
                                          touched.contractInfo &&
                                          touched.contractInfo[index]?.amount
                                        }
                                        errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.amount)}
                                      />
                                    </div>
                                    <h5 className="px-3">{t('label.allowance')}</h5>
                                    <hr className="mt-2" />
                                    <FieldArray
                                      name={`contractInfo.${index}.allowance`}
                                      render={({ insert, remove, push, replace }) => (
                                        <div>
                                          {values.contractInfo[index].allowance &&
                                            values.contractInfo[index].allowance.length > 0 &&
                                            values.contractInfo[index].allowance.map((allowance, allowanceIdx) => {
                                              return (
                                                <div key={`allowance${allowanceIdx}`}>
                                                  <div className="row">
                                                    <CommonSelectInput
                                                      containerClassName={'form-group col-lg-4'}
                                                      value={values?.contractInfo[index]?.allowance[allowanceIdx].name ?? ''}
                                                      onBlur={handleBlur(`contractInfo.${index}.allowance.${allowanceIdx}.name`)}
                                                      onChange={(e) => {
                                                        let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                                        if (thisSubsidizes && thisSubsidizes.length > 0)
                                                          setFieldValue(
                                                            `contractInfo.${index}.allowance.${allowanceIdx}.amount`,
                                                            thisSubsidizes[0].amount,
                                                          );
                                                        handleChange(`contractInfo.${index}.allowance.${allowanceIdx}.name`)(e);
                                                      }}
                                                      inputID={`contractInfo.${index}.allowance.${allowanceIdx}.name`}
                                                      labelText={t('label.allowance')}
                                                      selectClassName={'form-control'}
                                                      placeholder={t('placeholder.select_allowance_type')}
                                                      isRequiredField
                                                      isTouched={
                                                        touched &&
                                                        touched.contractInfo &&
                                                        touched.contractInfo[index]?.allowance &&
                                                        touched.contractInfo[index]?.allowance[allowanceIdx]?.name
                                                      }
                                                      isError={
                                                        errors &&
                                                        errors.contractInfo &&
                                                        errors.contractInfo[index]?.allowance &&
                                                        errors.contractInfo[index]?.allowance[allowanceIdx]?.name &&
                                                        touched &&
                                                        touched.contractInfo &&
                                                        touched.contractInfo[index]?.allowance &&
                                                        touched.contractInfo[index]?.allowance[allowanceIdx]?.name
                                                      }
                                                      errorMessage={t(
                                                        errors &&
                                                          errors.contractInfo &&
                                                          errors.contractInfo[index]?.allowance &&
                                                          errors.contractInfo[index]?.allowance[allowanceIdx]?.name,
                                                      )}
                                                      lstSelectOptions={allowances}
                                                    />
                                                    <CommonTextInput
                                                      containerClassName={'form-group col-lg-4'}
                                                      value={values?.contractInfo[index]?.allowance[allowanceIdx]?.amount ?? ''}
                                                      onBlur={handleBlur(`contractInfo.${index}.allowance.${allowanceIdx}.amount`)}
                                                      onChange={handleChange(`contractInfo.${index}.allowance.${allowanceIdx}.amount`)}
                                                      inputID={`contractInfo.${index}.allowance.${allowanceIdx}.amount`}
                                                      labelText={t('label.allowance_level')}
                                                      inputType={'number'}
                                                      inputClassName={'form-control'}
                                                      placeholder={t('placeholder.pension')}
                                                      isDisable
                                                      isTouched={
                                                        touched &&
                                                        touched.contractInfo &&
                                                        touched.contractInfo[index]?.allowance &&
                                                        touched.contractInfo[index]?.allowance[allowanceIdx]?.amount
                                                      }
                                                      isError={
                                                        errors &&
                                                        errors.contractInfo &&
                                                        errors.contractInfo[index]?.allowance &&
                                                        errors.contractInfo[index]?.allowance[allowanceIdx]?.amount &&
                                                        touched &&
                                                        touched.contractInfo &&
                                                        touched.contractInfo[index]?.allowance &&
                                                        touched.contractInfo[index]?.allowance[allowanceIdx]?.amount
                                                      }
                                                      errorMessage={t(
                                                        errors &&
                                                          errors.contractInfo &&
                                                          errors.contractInfo[index]?.allowance &&
                                                          errors.contractInfo[index]?.allowance[allowanceIdx]?.amount,
                                                      )}
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

                                    <CommonUploadFileButton
                                      name={`contractInfo.${index}.attaches`}
                                      containerClassName="mt-3 "
                                      buttonClassName="btn btn-primary"
                                      value={values.contractInfo[index].attaches}
                                    />
                                  </>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div />
                        )}
                        <div className="pt-4 d-flex justify-content-center">
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() => {
                              push({
                                isMinimize: false,
                                isOpen: false,
                                code: '',
                                type: '',
                                typeTax: '',
                                signee: '',
                                typeWork: 0,
                                probTime: 0,
                                handleDate: '',
                                validDate: '',
                                expiredDate: '',
                                branchId: 0,
                                startWork: '',
                                paymentType: '',
                                wageId: 0,
                                amount: 0,
                                allowance: [],
                                profileId: profileId,
                                attaches: [],
                              });
                            }}
                          >
                            <Add /> {t('label.add')}
                          </button>
                        </div>
                      </div>
                    );
                  }}
                />
                <AutoSubmitToken />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default JobTimelineInfo;
