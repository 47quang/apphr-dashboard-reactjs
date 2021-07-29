import { CContainer } from '@coreui/react';
import { AddCircle } from '@material-ui/icons';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import CommonCheckbox from 'src/components/checkox/CommonCheckbox';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonAutoCompleteInput from 'src/components/input/CommonAutoCompleteInput';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { NewContractSchemaWithProfileID } from 'src/schema/formSchema';
import { fetchProfiles } from 'src/stores/actions/account';
import { fetchAttributes } from 'src/stores/actions/attribute';
import { createContract, fetchAllowances, fetchWagesByType } from 'src/stores/actions/contract';
import { api } from 'src/stores/apis';
import { getCurrentDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const NewContract = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  let wages = useSelector((state) => state.contract.wages);
  const profiles = useSelector((state) => state.account.profiles);
  const status = [
    { id: 'active', name: t('label.active') },
    { id: 'inactive', name: t('label.inactive') },
  ];
  const newContract = {
    isMinimize: false,
    code: '',
    fullname: '',
    type: '',
    typeTax: '',
    signee: '',
    standardHours: '',
    handleDate: '',
    validDate: '',
    expiredDate: '',
    startWork: '',
    formOfPayment: '',
    wageId: '',
    dayOff: '',
    dependant: '',
    salaryGroup: '',
    salary: '',
    allowances: [],
    files: [],
    status: '',
  };
  const newContractRef = useRef();

  const [openWarning, setOpenWarning] = useState(false);
  const handleConfirmWarning = (e) => {
    create(newContractRef.current.values);
    setOpenWarning(!openWarning);
  };
  const handleCancelWarning = () => {
    setOpenWarning(!openWarning);
  };
  const attributes = useSelector((state) => state.attribute.attributes);
  newContract.attributes = attributes?.payload ?? [];
  const allowances = useSelector((state) => state.contract.allowances);
  const paymentType = [
    { id: 'by_hour', name: t('label.by_hour') },
    { id: 'by_month', name: t('label.by_month') },
  ];

  const personalIncomeTaxType = [
    { id: 'resident', name: t('label.resident') },
    { id: 'non_resident', name: t('label.non_resident') },
  ];

  const type = [
    { id: 'limitation', name: t('label.limitation') },
    { id: 'un_limitation', name: t('label.un_limitation') },
    { id: 'season', name: t('label.season') },
  ];

  useEffect(() => {
    if (permissionIds.includes(PERMISSION.LIST_CONTRACT)) {
      dispatch(fetchAllowances());
      dispatch(fetchAttributes());
      dispatch(fetchProfiles({ fields: ['id', 'firstname', 'lastname', 'code'] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function create(values) {
    let form = values;

    if (!form.expiredDate) delete form.expiredDate;
    if (form.type === 'season') {
      delete form.wageId;
      delete form.formOfPayment;
      delete form.amount;
      delete form.dayOff;
      delete form.typeTax;
      delete form.salaryGroup;
      delete form.wageId;
      delete form.salary;
      delete form.dependant;
      delete form.standardHours;
    } else {
      form.standardHours = +form.standardHours;
    }
    dispatch(createContract(form, t('message.successful_create'), undefined, history));
  }
  const BodyContract = ({ values, handleBlur, handleChange, touched, errors, setFieldValue, isCreate }) => {
    return (
      <>
        <div className="row">
          <CommonAutoCompleteInput
            containerClassName={'form-group col-lg-4'}
            value={values.profileId ?? 0}
            labelText={t('label.profileId')}
            selectClassName={'form-control'}
            onBlur={handleBlur('profileId')}
            onChange={handleChange('profileId')}
            inputID={t('label.profileId')}
            lstSelectOptions={profiles}
            isRequiredField
            placeholder={t('placeholder.select_profile')}
            isTouched={touched.profileId}
            isError={errors.profileId && touched.profileId}
            errorMessage={t(errors.profileId)}
          />
          <div className="form-group col-xl-4">
            <Label text={t('label.contract_code')} required />
            <div className="input-group">
              <input
                type="text"
                className={'form-control col-10'}
                rows={5}
                onBlur={handleBlur('code')}
                name={`code`}
                onChange={(e) => handleChange(`code`)(e)}
                value={values.code}
                disabled={!isCreate}
                placeholder={t('placeholder.enter_contract_code')}
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
            onChange={(e) => {
              if (e.target.value === 'un_limitation') setFieldValue('expiredDate', '');
              handleChange(`type`)(e);
            }}
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
                </div>
              );
            })}
        </div>
        <div className="row"></div>
        <h5 className="px-3">{t('label.gross_salary')}</h5>
        <hr className="mt-1" />
        {values.type !== 'season' ? (
          <div>
            <div className="row">
              <CommonSelectInput
                containerClassName={'form-group col-xl-4'}
                value={values.formOfPayment ?? ''}
                onBlur={handleBlur(`formOfPayment`)}
                onChange={async (e) => {
                  if (isCreate) {
                    if (e.target.value !== '0') {
                      dispatch(fetchWagesByType({ type: e.target.value }));
                      setFieldValue(`amount`, 0);
                      handleChange(`formOfPayment`)(e);
                    } else setFieldValue(`wageId`, '');
                  } else {
                    if (e.target.value !== '0') {
                      handleChange(`formOfPayment`)(e);
                      let wage = await api.wage.getAll({ type: e.target.value }).then(({ payload }) => payload);
                      setFieldValue(`wages`, wage);
                    } else setFieldValue(`wages`, []);
                    setFieldValue(`wageId`, '');
                    setFieldValue(`amount`, '');
                  }
                }}
                inputID={`formOfPayment`}
                labelText={t('label.payment_method')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_contract_payment_method')}
                isRequiredField
                isTouched={touched.formOfPayment}
                isError={errors.formOfPayment && touched.formOfPayment}
                errorMessage={t(errors.formOfPayment)}
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
                isError={errors?.wageId && touched.wageId}
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
              />
              <div className="form-group col-xl-4">
                <Label text={t('label.standard_hours')} required={values.formOfPayment === 'by_month'} />
                <div className="input-group">
                  <input
                    type="number"
                    className={'form-control col-10'}
                    rows={5}
                    onBlur={handleBlur('standardHours')}
                    name={`standardHours`}
                    onChange={(e) => handleChange(`standardHours`)(e)}
                    value={values.standardHours ?? 0}
                    placeholder={t('placeholder.enter_standard_hours')}
                    disabled={values.formOfPayment !== 'by_month'}
                  />
                  <span className="input-group-text col-2 d-flex justify-content-center" id="basic-addon2">
                    {t('label.hours')}
                  </span>
                </div>
                {errors.standardHours && touched.standardHours && t(errors.standardHours) && (
                  <div>
                    <small className={'text-danger'}>{t(errors.standardHours)}</small>
                  </div>
                )}
              </div>
              <CommonTextInput
                containerClassName={'form-group col-xl-4'}
                value={values.dayOff ?? ''}
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
              <CommonTextInput
                containerClassName={'form-group col-xl-4'}
                value={values.dependant ?? ''}
                onBlur={handleBlur('dependant')}
                onChange={handleChange('dependant')}
                inputID={'dependant'}
                labelText={t('label.wage_dependant')}
                inputType={'number'}
                placeholder={t('placeholder.enter_dependant')}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={touched.dependant}
                isError={errors.dependant && touched.dependant}
                errorMessage={t(errors.dependant)}
              />
            </div>

            <CommonCheckbox
              label={t('label.insurance')}
              value={values.isIns ?? false}
              onBlur={handleBlur('isIns')}
              onChange={handleChange('isIns')}
            />
            {values.isIns && (
              <div className="row">
                {/* <CommonTextInput
                  containerClassName={'form-group col-xl-4'}
                  value={values.gross_salary ?? ''}
                  onBlur={handleBlur('gross_salary')}
                  onChange={handleChange('gross_salary')}
                  inputID={'gross_salary'}
                  labelText={t('label.gross_salary')}
                  inputType={'number'}
                  placeholder={t('placeholder.enter_gross_salary')}
                  inputClassName={'form-control'}
                /> */}
                <CommonTextInput
                  containerClassName={'form-group col-xl-4'}
                  value={values.amountIns ?? ''}
                  onBlur={handleBlur('amountIns')}
                  onChange={handleChange('amountIns')}
                  inputID={'amountIns'}
                  labelText={t('label.social_insurance')}
                  inputType={'number'}
                  placeholder={t('placeholder.enter_insurance_salary')}
                  inputClassName={'form-control'}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="row">
            <CommonTextInput
              containerClassName={'form-group col-xl-4'}
              value={values?.seasonWage ?? ''}
              onBlur={handleBlur(`seasonWage`)}
              onChange={handleChange(`seasonWage`)}
              inputID={`seasonWage`}
              isRequiredField={values.type === 'season'}
              labelText={t('label.salary_level')}
              inputType={'number'}
              inputClassName={'form-control'}
              placeholder={t('placeholder.enter_salary_level')}
              isTouched={touched?.seasonWage}
              isError={errors?.seasonWage}
              errorMessage={t(errors?.seasonWage)}
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

                        <div className="form-group pb-2 col-1">
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

  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {openWarning && (
          <WarningAlertDialog
            isVisible={openWarning}
            title={t('title.new_contract')}
            titleConfirm={t('label.agree')}
            handleConfirm={handleConfirmWarning}
            titleCancel={t('label.decline')}
            handleCancel={handleCancelWarning}
            warningMessage={t('message.new_contract_warning_message')}
          />
        )}
        <Formik
          innerRef={newContractRef}
          initialValues={newContract}
          validationSchema={NewContractSchemaWithProfileID}
          enableReinitialize
          onSubmit={(values) => {
            if (values?.status === 'active') setOpenWarning(true);
            else create(values);
          }}
        >
          {(props) => {
            props.isCreate = true;
            return (
              <form id="newContract" className="p-0 m-0">
                <div className="shadow bg-white rounded mx-4 p-4">
                  <h5>{t('label.create_new')}.</h5>
                  <hr className="mt-1" />
                  <BodyContract {...props} />

                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary mr-4`,
                      onClick: (e) => {
                        history.push(ROUTE_PATH.NAV_CONTRACT);
                      },
                      name: t('label.back'),
                      position: 'left',
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
      </div>
    </CContainer>
  );
};

export default NewContract;
