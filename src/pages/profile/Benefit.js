import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { FieldArray, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { JobTimelineSchema } from 'src/schema/formSchema';
import { fetchAllowances, fetchContracts, fetchWagesByType } from 'src/stores/actions/contract';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';

const Benefit = ({ t, history, match }) => {
  const profileId = match?.params?.id;
  const dispatch = useDispatch();
  let wages = useSelector((state) => state.contract.wages);
  let _contracts = [
    {
      id: 1,
      code: 'HD001',
      fullname: 'Hợp đồng lao động ',
      handleDate: '2021-01-10',
      expiredDate: '2022-01-10',
      newBenefit: {
        paymentType: '',
        wageId: '',
        allowances: [],
        allowanceIds: [],
        startDate: '2021-01-01',
        expiredDate: '2021-12-12',
      },
      benefits: [
        {
          id: 1,
          wageId: 1,
          allowanceIds: [1, 2, 3],
          allowances: [],
          startDate: '2021-01-01',
          expiredDate: '2021-12-12',
        },
        {
          id: 2,
          wageId: 2,
          allowanceIds: [1, 2, 3],
          allowances: [],
          startDate: '2021-01-01',
          expiredDate: '2021-12-12',
        },
      ],
      files: [],
    },
  ];
  const benefitTab = {
    // contracts: useSelector((state) => state.contract.contracts),
    contracts: _contracts,
  };
  console.log('benefit', benefitTab);

  const allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'one_time', name: 'Chi trả một lần' },
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
    { id: 'by_date', name: 'Chi trả theo ngày công' },
  ];
  useEffect(() => {
    dispatch(fetchAllowances());
    dispatch(fetchContracts({ profileId: +profileId }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function create(form) {
  //   // form.provinceId = form.provinceId || null;
  //   form.profileId = +match.params.id;

  //   if (form.id) {
  //     // await dispatch(updateContract(form, t('message.successful_update')));
  //   } else {
  //     await dispatch(createContract(form, t('message.successful_create')));
  //   }
  // }

  // async function removeBenefit(contractId) {
  //   // await dispatch(deleteContract(contractId, t('message.successful_delete')));
  // }

  return (
    <CContainer fluid className="c-main">
      <div className="m-auto">
        <div>
          {/* <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-success"
              id="addBtn"
              onClick={() => {
                document.getElementById('newContract').hidden = false;
                document.getElementById('addBtn').disabled = true;
              }}
            >
              <Add /> {t('label.add')}
            </button>
          </div> */}
          <Formik
            initialValues={benefitTab}
            enableReinitialize
            validationSchema={JobTimelineSchema}
            onSubmit={(values) => {
              dispatch({
                type: REDUX_STATE.contract.SET_BENEFITS,
                payload: values.benefits,
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
                  name="contracts"
                  render={({ insert, remove, push, replace }) => {
                    return (
                      <div>
                        {values.contracts && values.contracts.length > 0 ? (
                          values.contracts.map((contract, index) => {
                            const changeMinimizeButton = () => {
                              replace(index, {
                                ...values.contracts[index],
                                isMinimize: !values.contracts[index].isMinimize,
                              });
                            };

                            return (
                              <div key={'contract:' + index} className="shadow bg-white rounded m-4 p-4">
                                <div style={{ fontSize: 18, fontWeight: 'bold', textOverflow: 'ellipsis' }}>
                                  <div className="pt-1 d-inline" role="button">
                                    {!values.contracts[index].isMinimize ? (
                                      <AddBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                    ) : (
                                      <IndeterminateCheckBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                    )}
                                  </div>
                                  <Switch
                                    checked={values.contracts[index].isOpen}
                                    name={`contracts.${index}.isOpen`}
                                    onChange={(e) => {
                                      setFieldValue(`contracts.${index}.isOpen`, e.target.checked);
                                    }}
                                  />
                                  {values.contracts[index].code + ' - ' + values.contracts[index].fullname}
                                </div>
                                <div style={{ fontSize: 14, paddingLeft: 82 }}>
                                  {'Từ ' + values.contracts[index].handleDate + ' đến ' + values.contracts[index].expiredDate}
                                </div>

                                <hr className="mt-1" />

                                {values.contracts[index].isMinimize && (
                                  <div>
                                    {/* <div className="shadow bg-pink rounded m-4 p-4">
                                      <>
                                        <h5 className="px-3">{t('label.payroll')}</h5>
                                        <div style={{ fontSize: 14 }}>
                                          {'Từ ' + contract[index]?.newBenefit.startDate + ' đến ' + contract[index]?.newBenefit.expiredDate}
                                        </div>
                                        <hr className="mt-1" />
                                        <div className="row">
                                          <CommonSelectInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={contract[index]?.newBenefit?.paymentType ?? ''}
                                            onBlur={handleBlur(`contracts.${index}?.newBenefit.paymentType`)}
                                            onChange={(e) => {
                                              if (e.target.value !== '0') {
                                                dispatch(fetchWagesByType({ type: e.target.value }));
                                                setFieldValue(`contracts.${index}?.newBenefit.amount`, 0);
                                                handleChange(`contracts.${index}?.newBenefit.paymentType`)(e);
                                              } else setFieldValue(`contracts.${index}?.newBenefit.wageId`, 0);
                                            }}
                                            inputID={`contracts.${index}?.newBenefit.paymentType`}
                                            labelText={t('label.payment_method')}
                                            selectClassName={'form-control'}
                                            placeholder={t('placeholder.select_contract_payment_method')}
                                            isRequiredField
                                            isTouched={
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.paymentType
                                            }
                                            isError={
                                              errors &&
                                              errors.contracts &&
                                              errors.contracts[index]?.newBenefit &&
                                              errors.contracts[index]?.newBenefit?.paymentType &&
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.paymentType
                                            }
                                            errorMessage={t(
                                              errors &&
                                                errors.contracts &&
                                                errors.contracts[index]?.newBenefit &&
                                                errors.contracts[index]?.newBenefit?.paymentType,
                                            )}
                                            lstSelectOptions={paymentType}
                                          />
                                          <CommonSelectInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={contract[index]?.newBenefit?.wageId ?? ''}
                                            onBlur={handleBlur(`contracts.${index}.newBenefit.wageId`)}
                                            onChange={(e) => {
                                              let thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                                              setFieldValue(`contracts.${index}.newBenefit.amount`, thisWage[0].amount);
                                              handleChange(`contracts.${index}.newBenefit.wageId`)(e);
                                            }}
                                            inputID={`contracts.${index}.newBenefit.wageId`}
                                            labelText={t('label.salary_group')}
                                            selectClassName={'form-control'}
                                            placeholder={t('placeholder.select_contract_payment_method')}
                                            isRequiredField
                                            isTouched={
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.wageId
                                            }
                                            isError={
                                              errors &&
                                              errors.contracts &&
                                              errors.contracts[index]?.newBenefit &&
                                              errors.contracts[index]?.newBenefit?.wageId &&
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.wageId
                                            }
                                            errorMessage={t(
                                              errors &&
                                                errors.contracts &&
                                                errors.contracts[index].benefits &&
                                                errors.contracts[index].benefits?.wageId,
                                            )}
                                            lstSelectOptions={wages}
                                          />
                                          <CommonTextInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={values.contracts[index]?.newBenefit?.amount ?? ''}
                                            onBlur={handleBlur(`contracts.${index}.newBenefit.amount`)}
                                            onChange={handleChange(`contracts.${index}.newBenefit.amount`)}
                                            inputID={`contracts.${index}.newBenefit.amount`}
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
                                            value={values.contracts[index]?.newBenefit?.startDate ?? ''}
                                            onBlur={handleBlur(`contracts.${index}.newBenefit.startDate`)}
                                            onChange={handleChange(`contracts.${index}.newBenefit.startDate`)}
                                            inputID={`contracts.${index}.newBenefit.startDate`}
                                            labelText={t('label.signature_date')}
                                            inputType={'date'}
                                            inputClassName={'form-control'}
                                            isRequiredField
                                            isTouched={
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.startDate
                                            }
                                            isError={
                                              errors &&
                                              errors.contracts &&
                                              errors.contracts[index].benefits &&
                                              errors.contracts[index].newBenefit?.startDate &&
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.startDate
                                            }
                                            errorMessage={t(
                                              errors &&
                                                errors.contracts &&
                                                errors.contracts[index]?.newBenefit &&
                                                errors.contracts[index]?.newBenefit?.startDate,
                                            )}
                                          />
                                          <CommonTextInput
                                            containerClassName={'form-group col-lg-4'}
                                            value={values.contracts[index].newBenefit?.expiredDate ?? ''}
                                            onBlur={handleBlur(`contracts.${index}.newBenefit.expiredDate`)}
                                            onChange={handleChange(`contracts.${index}.newBenefit.expiredDate`)}
                                            inputID={`contracts.${index}.newBenefit.expiredDate`}
                                            labelText={t('label.effective_date')}
                                            inputType={'date'}
                                            inputClassName={'form-control'}
                                            isRequiredField
                                            isTouched={
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.expiredDate
                                            }
                                            isError={
                                              errors &&
                                              errors.contracts &&
                                              errors.contracts[index]?.newBenefit &&
                                              errors.contracts[index]?.newBenefit?.expiredDate &&
                                              touched &&
                                              touched.contracts &&
                                              touched.contracts[index]?.newBenefit &&
                                              touched.contracts[index]?.newBenefit?.expiredDate
                                            }
                                            errorMessage={t(
                                              errors &&
                                                errors.contracts &&
                                                errors.contracts[index]?.newBenefit &&
                                                errors.contracts[index]?.newBenefit?.expiredDate,
                                            )}
                                          />
                                        </div>
                                        <h5 className="px-3">{t('label.allowance')}</h5>
                                        <hr className="mt-2" />
                                        <FieldArray
                                          name={`contracts.${index}.newBenefits.allowances`}
                                          render={({ insert, remove, push, replace }) => (
                                            <div>
                                              {values.contracts[index]?.newBenefit.allowances &&
                                                values.contracts[index]?.newBenefit.allowances.length > 0 &&
                                                values.contracts[index]?.newBenefit.allowances.map((allowance, allowanceIdx) => {
                                                  return (
                                                    <div key={`allowance${allowanceIdx}`}>
                                                      <div className="row">
                                                        <CommonSelectInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={allowance?.name ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.newBenefit.allowances.${allowanceIdx}.name`)}
                                                          onChange={(e) => {
                                                            let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                                            if (thisSubsidizes && thisSubsidizes.length > 0)
                                                              setFieldValue(
                                                                `contracts.${index}.newBenefit.allowances.${allowanceIdx}.amount`,
                                                                thisSubsidizes[0].amount,
                                                              );
                                                            handleChange(`contracts.${index}.newBenefit.allowances.${allowanceIdx}.name`)(e);
                                                          }}
                                                          inputID={`contracts.${index}.newBenefit.allowances.${allowanceIdx}.name`}
                                                          labelText={t('label.allowance')}
                                                          selectClassName={'form-control'}
                                                          placeholder={t('placeholder.select_allowance_type')}
                                                          isRequiredField
                                                          isTouched={
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index]?.newBenefit &&
                                                            touched.contracts[index]?.newBenefit.allowances &&
                                                            touched.contracts[index]?.newBenefit.allowances[allowanceIdx]?.name
                                                          }
                                                          isError={
                                                            errors &&
                                                            errors.contracts &&
                                                            errors.contracts[index]?.newBenefit &&
                                                            errors.contracts[index]?.newBenefit.allowances &&
                                                            errors.contracts[index]?.newBenefit.allowances[allowanceIdx]?.name &&
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index]?.newBenefit &&
                                                            touched.contracts[index]?.newBenefit.allowances &&
                                                            touched.contracts[index]?.newBenefit.allowances[allowanceIdx]?.name
                                                          }
                                                          errorMessage={t(
                                                            errors &&
                                                              errors.contracts &&
                                                              errors.contracts[index]?.newBenefit &&
                                                              errors.contracts[index]?.newBenefit.allowances &&
                                                              errors.contracts[index]?.newBenefit.allowances[allowanceIdx]?.name,
                                                          )}
                                                          lstSelectOptions={allowances}
                                                        />
                                                        <CommonTextInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={contract.newBenefit.allowance?.amount ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.newBenefit.allowances.${allowanceIdx}.amount`)}
                                                          onChange={handleChange(`contracts.${index}.newBenefit.allowances.${allowanceIdx}.amount`)}
                                                          inputID={`contracts.${index}.newBenefit.allowances.${allowanceIdx}.amount`}
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
                                                <button
                                                  type="button"
                                                  className="btn btn-primary"
                                                  onClick={() => {
                                                    push({ name: '', amount: 0 });
                                                    console.log(values);
                                                  }}
                                                >
                                                  <AddCircle /> {t('label.add_allowance')}
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        />
                                        <hr className="mt-1" />

                                        {renderButtons([
                                          {
                                            type: 'button',
                                            className: `btn btn-primary px-4 mx-4`,
                                            onClick: async (e) => {
                                              // await removeBenefit(benefit.id).then(() => remove(index));
                                            },
                                            name: t('label.delete'),
                                            position: 'right',
                                          },
                                          {
                                            type: 'button',
                                            className: `btn btn-primary px-4 mx-4`,
                                            onClick: () => {
                                              // setFieldValue(`contracts.${index}`, benefitTab.contracts[index]);
                                            },
                                            name: t('label.reset'),
                                            position: 'right',
                                          },
                                          {
                                            type: 'button',
                                            className: `btn btn-primary px-4 ml-4`,
                                            onClick: async () => {
                                              console.log(values);
                                            },
                                            name: t('label.save'),
                                          },
                                        ])}
                                      </>
                                    </div> */}
                                    <FieldArray
                                      name={`contracts.${index}.benefits`}
                                      render={({ insert, remove, push, replace }) => {
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

                                            {values.contracts[index].benefits && values.contracts[index].benefits.length > 0 ? (
                                              values.contracts[index].benefits.map((benefit, benefitIndex) => {
                                                return (
                                                  <div
                                                    key={'benefit:' + benefitIndex}
                                                    id={contract.id + benefitIndex}
                                                    className="shadow bg-white border border-secondary rounded m-4 p-4"
                                                  >
                                                    <>
                                                      <h5 className="px-3">{t('label.payroll')}</h5>
                                                      <div style={{ fontSize: 14 }}>{'Từ ' + benefit.startDate + ' đến ' + benefit.expiredDate}</div>
                                                      <hr className="mt-1" />
                                                      <div className="row">
                                                        <CommonSelectInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={benefit?.paymentType ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.benefits.${benefitIndex}.paymentType`)}
                                                          onChange={(e) => {
                                                            if (e.target.value !== '0') {
                                                              dispatch(fetchWagesByType({ type: e.target.value }));
                                                              setFieldValue(`contracts.${index}.benefits.${benefitIndex}.amount`, 0);
                                                              handleChange(`contracts.${index}.benefits.${benefitIndex}.paymentType`)(e);
                                                            } else setFieldValue(`contracts.${index}.benefits.${benefitIndex}.wageId`, 0);
                                                          }}
                                                          inputID={`contracts.${index}.benefits.${benefitIndex}.paymentType`}
                                                          labelText={t('label.payment_method')}
                                                          selectClassName={'form-control'}
                                                          placeholder={t('placeholder.select_contract_payment_method')}
                                                          isRequiredField
                                                          isTouched={
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.paymentType
                                                          }
                                                          isError={
                                                            errors &&
                                                            errors.contracts &&
                                                            errors.contracts[index].benefits &&
                                                            errors.contracts[index].benefits[benefitIndex]?.paymentType &&
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.paymentType
                                                          }
                                                          errorMessage={t(
                                                            errors &&
                                                              errors.contracts &&
                                                              errors.contracts[index].benefits &&
                                                              errors.contracts[index].benefits[benefitIndex]?.paymentType,
                                                          )}
                                                          lstSelectOptions={paymentType}
                                                        />
                                                        <CommonSelectInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={benefit?.wageId ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.benefits.${benefitIndex}.wageId`)}
                                                          onChange={(e) => {
                                                            let thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                                                            setFieldValue(`contracts.${index}.benefits.${benefitIndex}.amount`, thisWage[0].amount);
                                                            handleChange(`contracts.${index}.benefits.${benefitIndex}.wageId`)(e);
                                                          }}
                                                          inputID={`contracts.${index}.benefits.${benefitIndex}.wageId`}
                                                          labelText={t('label.salary_group')}
                                                          selectClassName={'form-control'}
                                                          placeholder={t('placeholder.select_contract_payment_method')}
                                                          isRequiredField
                                                          isTouched={
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.wageId
                                                          }
                                                          isError={
                                                            errors &&
                                                            errors.contracts &&
                                                            errors.contracts[index].benefits &&
                                                            errors.contracts[index].benefits[benefitIndex]?.wageId &&
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.wageId
                                                          }
                                                          errorMessage={t(
                                                            errors &&
                                                              errors.contracts &&
                                                              errors.contracts[index].benefits &&
                                                              errors.contracts[index].benefits[benefitIndex]?.wageId,
                                                          )}
                                                          lstSelectOptions={wages}
                                                        />
                                                        <CommonTextInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={benefit?.amount ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.benefits.${benefitIndex}.amount`)}
                                                          onChange={handleChange(`contracts.${index}.benefits.${benefitIndex}.amount`)}
                                                          inputID={`contracts.${index}.benefits.${benefitIndex}.amount`}
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
                                                          onBlur={handleBlur(`contracts.${index}.benefits.${benefitIndex}.startDate`)}
                                                          onChange={handleChange(`contracts.${index}.benefits.${benefitIndex}.startDate`)}
                                                          inputID={`contracts.${index}.benefits.${benefitIndex}.startDate`}
                                                          labelText={t('label.signature_date')}
                                                          inputType={'date'}
                                                          inputClassName={'form-control'}
                                                          isRequiredField
                                                          isTouched={
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.startDate
                                                          }
                                                          isError={
                                                            errors &&
                                                            errors.contracts &&
                                                            errors.contracts[index].benefits &&
                                                            errors.contracts[index].benefits[benefitIndex]?.startDate &&
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.startDate
                                                          }
                                                          errorMessage={t(
                                                            errors &&
                                                              errors.contracts &&
                                                              errors.contracts[index].benefits &&
                                                              errors.contracts[index].benefits[benefitIndex]?.startDate,
                                                          )}
                                                        />
                                                        <CommonTextInput
                                                          containerClassName={'form-group col-lg-4'}
                                                          value={benefit?.expiredDate ?? ''}
                                                          onBlur={handleBlur(`contracts.${index}.benefits.${benefitIndex}.expiredDate`)}
                                                          onChange={handleChange(`contracts.${index}.benefits.${benefitIndex}.expiredDate`)}
                                                          inputID={`contracts.${index}.benefits.${benefitIndex}.expiredDate`}
                                                          labelText={t('label.effective_date')}
                                                          inputType={'date'}
                                                          inputClassName={'form-control'}
                                                          isRequiredField
                                                          isTouched={
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.expiredDate
                                                          }
                                                          isError={
                                                            errors &&
                                                            errors.contracts &&
                                                            errors.contracts[index].benefits &&
                                                            errors.contracts[index].benefits[benefitIndex]?.expiredDate &&
                                                            touched &&
                                                            touched.contracts &&
                                                            touched.contracts[index].benefits &&
                                                            touched.contracts[index].benefits[benefitIndex]?.expiredDate
                                                          }
                                                          errorMessage={t(
                                                            errors &&
                                                              errors.contracts &&
                                                              errors.contracts[index].benefits &&
                                                              errors.contracts[index].benefits[benefitIndex]?.expiredDate,
                                                          )}
                                                        />
                                                      </div>
                                                      <h5 className="px-3">{t('label.allowance')}</h5>
                                                      <hr className="mt-2" />
                                                      <FieldArray
                                                        name={`contracts.${index}.benefits.${benefitIndex}.allowances`}
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
                                                                        value={allowance?.name ?? ''}
                                                                        onBlur={handleBlur(
                                                                          `contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.name`,
                                                                        )}
                                                                        onChange={(e) => {
                                                                          let thisSubsidizes = allowances.filter(
                                                                            (s) => s.id === parseInt(e.target.value),
                                                                          );
                                                                          if (thisSubsidizes && thisSubsidizes.length > 0)
                                                                            setFieldValue(
                                                                              `contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.amount`,
                                                                              thisSubsidizes[0].amount,
                                                                            );
                                                                          handleChange(
                                                                            `contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.name`,
                                                                          )(e);
                                                                        }}
                                                                        inputID={`contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.name`}
                                                                        labelText={t('label.allowance')}
                                                                        selectClassName={'form-control'}
                                                                        placeholder={t('placeholder.select_allowance_type')}
                                                                        isRequiredField
                                                                        isTouched={
                                                                          touched &&
                                                                          touched.contracts &&
                                                                          touched.contracts[index].benefits &&
                                                                          touched.contracts[index].benefits[benefitIndex].allowances &&
                                                                          touched.contracts[index].benefits[benefitIndex].allowances[allowanceIdx]
                                                                            ?.name
                                                                        }
                                                                        isError={
                                                                          errors &&
                                                                          errors.contracts &&
                                                                          errors.contracts[index].benefits &&
                                                                          errors.contracts[index].benefits[benefitIndex].allowances &&
                                                                          errors.contracts[index].benefits[benefitIndex].allowances[allowanceIdx]
                                                                            ?.name &&
                                                                          touched &&
                                                                          touched.contracts &&
                                                                          touched.contracts[index].benefits &&
                                                                          touched.contracts[index].benefits[benefitIndex].allowances &&
                                                                          touched.contracts[index].benefits[benefitIndex].allowances[allowanceIdx]
                                                                            ?.name
                                                                        }
                                                                        errorMessage={t(
                                                                          errors &&
                                                                            errors.contracts &&
                                                                            errors.contracts[index].benefits &&
                                                                            errors.contracts[index].benefits[benefitIndex].allowances &&
                                                                            errors.contracts[index].benefits[benefitIndex].allowances[allowanceIdx]
                                                                              ?.name,
                                                                        )}
                                                                        lstSelectOptions={allowances}
                                                                      />
                                                                      <CommonTextInput
                                                                        containerClassName={'form-group col-lg-4'}
                                                                        value={allowance?.amount ?? ''}
                                                                        onBlur={handleBlur(
                                                                          `contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.amount`,
                                                                        )}
                                                                        onChange={handleChange(
                                                                          `contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.amount`,
                                                                        )}
                                                                        inputID={`contracts.${index}.benefits.${benefitIndex}.allowances.${allowanceIdx}.amount`}
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
                                                              <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                  push({ name: '', amount: 0 });
                                                                  console.log(values);
                                                                }}
                                                              >
                                                                <AddCircle /> {t('label.add_allowance')}
                                                              </button>
                                                            </div>
                                                          </div>
                                                        )}
                                                      />
                                                      <hr className="mt-1" />

                                                      {renderButtons(
                                                        benefit.id
                                                          ? [
                                                              {
                                                                type: 'button',
                                                                className: `btn btn-primary px-4 mx-4`,
                                                                onClick: async (e) => {
                                                                  // await removeBenefit(benefit.id).then(() => remove(index));
                                                                },
                                                                name: t('label.delete'),
                                                                position: 'right',
                                                              },
                                                              {
                                                                type: 'button',
                                                                className: `btn btn-primary px-4 mx-4`,
                                                                onClick: () => {
                                                                  // setFieldValue(`contracts.${index}`, benefitTab.contracts[index]);
                                                                },
                                                                name: t('label.reset'),
                                                                position: 'right',
                                                              },
                                                              {
                                                                type: 'button',
                                                                className: `btn btn-primary px-4 ml-4`,
                                                                onClick: async () => {
                                                                  console.log(values);
                                                                },
                                                                name: benefit.id ? t('label.save') : t('label.create_new'),
                                                              },
                                                            ]
                                                          : [
                                                              {
                                                                type: 'button',
                                                                className: `btn btn-primary px-4 mx-4`,
                                                                onClick: async (e) => {
                                                                  remove(benefitIndex);
                                                                  document.getElementById(`addBtn${index}`).disabled = false;
                                                                  // await removeBenefit(benefit.id).then(() => remove(index));
                                                                },
                                                                name: t('label.delete'),
                                                                position: 'right',
                                                              },
                                                              {
                                                                type: 'button',
                                                                className: `btn btn-primary px-4 ml-4`,
                                                                onClick: async () => {
                                                                  console.log(values);
                                                                },
                                                                name: benefit.id ? t('label.save') : t('label.create_new'),
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
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div />
                        )}
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

export default Benefit;
