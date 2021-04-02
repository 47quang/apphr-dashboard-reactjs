import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { JobTimelineSchema, NewContractSchema } from 'src/schema/formSchema';
import { createContract, deleteContract, fetchAllowances, fetchBranches, fetchContracts, fetchWagesByType } from 'src/stores/actions/contract';
import { fetchDepartments } from 'src/stores/actions/department';
import { fetchPositions } from 'src/stores/actions/position';
import { REDUX_STATE } from 'src/stores/states';
import { getCurrentDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';

const JobTimelineInfo = ({ t, history, match }) => {
  const profileId = match?.params?.id;
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
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
    typeWork: 0,
    probTime: 0,
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
    dispatch(fetchContracts({ profileId: +profileId }));
    dispatch(fetchBranches());
    dispatch(fetchAllowances());
    if (jobTimelineInfo.contractInfo.paymentType !== '0') {
      dispatch(fetchWagesByType({ type: jobTimelineInfo.contractInfo.paymentType }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (jobTimelineInfo.contractInfo.branchId) dispatch(fetchDepartments({ branchId: jobTimelineInfo.contractInfo.branchId }));
    if (jobTimelineInfo.contractInfo.departmentId) dispatch(fetchDepartments({ departmentId: jobTimelineInfo.contractInfo.departmentId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobTimelineInfo.contractInfo.branchId, jobTimelineInfo.contractInfo.departmentId]);

  async function create(form) {
    // form.provinceId = form.provinceId || null;
    form.profileId = +match.params.id;
    if (form.branchId === '0') delete form.branchId;
    else form['branchName'] = branches.filter((br) => br.id === parseInt(form.branchId))[0]?.branch;
    if (form.departmentId === '0') delete form.departmentId;
    else form['departmantName'] = departments.filter((br) => br.id === parseInt(form.departmentId))[0]?.name;
    if (form.positionId === '0') delete form.positionId;
    else form['positionName'] = positions.filter((br) => br.id === parseInt(form.positionId))[0]?.name;

    if (form.id) {
      // await dispatch(updateContract(form, t('message.successful_update')));
    } else {
      await dispatch(createContract(form, t('message.successful_create')));
    }
  }

  async function removeContract(contractId) {
    await dispatch(deleteContract(contractId, t('message.successful_delete')));
  }

  return (
    <CContainer fluid className="c-main">
      <div className="d-flex justify-content-center mb-4">
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
      </div>
      <div className="m-auto">
        <div>
          <Formik initialValues={newContract} validationSchema={NewContractSchema} enableReinitialize onSubmit={() => {}}>
            {({ values, errors, touched, handleReset, handleBlur, handleSubmit, handleChange, validateForm, setTouched, setFieldValue }) => {
              return (
                <Form id="newContract" hidden={true} className="p-0 m-0">
                  <div className="shadow bg-white rounded mx-4 p-4">
                    <h5>{'Tạo mới'}.</h5>
                    <hr className="mt-1" />
                    <>
                      <div className="row">
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
                          value={values?.typeTax ?? ''}
                          onBlur={handleBlur(`typeTax`)}
                          onChange={handleChange(`typeTax`)}
                          inputID={`typeTax`}
                          isRequiredField
                          labelText={t('label.personal_income_tax_type')}
                          selectClassName={'form-control'}
                          placeholder={t('placeholder.select_contract_type_tax')}
                          isTouched={touched.typeTax}
                          isError={errors?.typeTax && touched?.typeTax}
                          errorMessage={t(errors?.typeTax)}
                          lstSelectOptions={personalIncomeTaxType}
                        />
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values?.typeWork ?? ''}
                          onBlur={handleBlur(`typeWork`)}
                          onChange={handleChange(`typeWork`)}
                          inputID={`typeWork`}
                          labelText={t('label.job_type')}
                          selectClassName={'form-control'}
                          placeholder={t('placeholder.select_contract_type_work')}
                          isRequiredField
                          isTouched={touched?.typeWork}
                          isError={errors?.typeWork && touched?.typeWork}
                          errorMessage={t(errors?.typeWork)}
                          lstSelectOptions={typeWork}
                        />

                        <div className="form-group col-lg-4">
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
                      </div>
                      <div className="row">
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
                          value={values?.expiredDate ?? ''}
                          onBlur={handleBlur(`expiredDate`)}
                          onChange={handleChange(`expiredDate`)}
                          inputID={`expiredDate`}
                          labelText={t('label.expiration_date')}
                          inputType={'date'}
                          inputClassName={'form-control'}
                          isRequiredField
                          isTouched={touched?.expiredDate}
                          isError={errors?.expiredDate && touched?.expiredDate}
                          errorMessage={t(errors?.expiredDate)}
                        />
                      </div>
                      <div className="row">
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
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
                          containerClassName={'form-group col-lg-4'}
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
                        <CommonSelectInput
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
                        />
                      </div>
                      <h5 className="px-3">{t('label.gross_salary')}</h5>
                      <hr className="mt-1" />
                      <div className="row">
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values?.paymentType ?? ''}
                          onBlur={handleBlur(`paymentType`)}
                          onChange={(e) => {
                            if (e.target.value !== '0') {
                              dispatch(fetchWagesByType({ type: e.target.value }));
                              setFieldValue(`amount`, 0);
                              handleChange(`paymentType`)(e);
                            } else setFieldValue(`wageId`, 0);
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
                          containerClassName={'form-group col-lg-4'}
                          value={values?.wageId ?? ''}
                          onBlur={handleBlur(`wageId`)}
                          onChange={(e) => {
                            let thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                            setFieldValue(`amount`, thisWage[0].amount);
                            handleChange(`wageId`)(e);
                          }}
                          inputID={`wageId`}
                          labelText={t('label.salary_group')}
                          selectClassName={'form-control'}
                          placeholder={t('placeholder.select_contract_payment_method')}
                          isRequiredField
                          isTouched={touched?.wageId}
                          isError={errors?.wageId && touched?.wageId}
                          errorMessage={t(errors?.wageId)}
                          lstSelectOptions={wages}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
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
                      </div>
                      <h5 className="px-3">{t('label.allowance')}</h5>
                      <hr className="mt-2" />
                      <FieldArray
                        name={`allowance`}
                        render={({ insert, remove, push, replace }) => (
                          <div>
                            {values.allowance &&
                              values.allowance.length > 0 &&
                              values.allowance.map((allowance, allowanceIdx) => {
                                return (
                                  <div key={`allowance${allowanceIdx}`}>
                                    <div className="row">
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={allowance.name ?? ''}
                                        onBlur={handleBlur(`allowance.${allowanceIdx}.name`)}
                                        onChange={(e) => {
                                          let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                          if (thisSubsidizes && thisSubsidizes.length > 0)
                                            setFieldValue(`allowance.${allowanceIdx}.amount`, thisSubsidizes[0].amount);
                                          handleChange(`allowance.${allowanceIdx}.name`)(e);
                                        }}
                                        inputID={`allowance.${allowanceIdx}.name`}
                                        labelText={t('label.allowance')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_allowance_type')}
                                        isRequiredField
                                        isTouched={touched && touched?.allowance && touched?.allowance[allowanceIdx]?.name}
                                        isError={
                                          errors &&
                                          errors?.allowance &&
                                          errors?.allowance[allowanceIdx]?.name &&
                                          touched &&
                                          touched?.allowance &&
                                          touched?.allowance[allowanceIdx]?.name
                                        }
                                        errorMessage={t(errors && errors?.allowance && errors?.allowance[allowanceIdx]?.name)}
                                        lstSelectOptions={allowances}
                                      />
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={allowance.amount ?? ''}
                                        onBlur={handleBlur(`allowance.${allowanceIdx}.amount`)}
                                        onChange={handleChange(`allowance.${allowanceIdx}.amount`)}
                                        inputID={`allowance.${allowanceIdx}.amount`}
                                        labelText={t('label.allowance_level')}
                                        inputType={'number'}
                                        inputClassName={'form-control'}
                                        placeholder={t('placeholder.pension')}
                                        isDisable
                                        isTouched={touched && touched?.allowance && touched?.allowance[allowanceIdx]?.amount}
                                        isError={
                                          errors &&
                                          errors?.allowance &&
                                          errors?.allowance[allowanceIdx]?.amount &&
                                          touched &&
                                          touched?.allowance &&
                                          touched?.allowance[allowanceIdx]?.amount
                                        }
                                        errorMessage={t(errors && errors?.allowance && errors?.allowance[allowanceIdx]?.amount)}
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
                        name={`attaches`}
                        containerClassName="mt-3 "
                        buttonClassName="btn btn-primary"
                        value={values.attaches}
                      />
                    </>

                    <hr className="mt-1" />
                    {renderButtons([
                      {
                        type: 'button',
                        className: `btn btn-primary  mx-2`,
                        onClick: () => {
                          handleReset();
                          document.getElementById('newContract').hidden = true;
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
                          let data = values;
                          await create(data).then(() => dispatch(fetchContracts({ profileId: +profileId })));
                          handleReset();
                          document.getElementById('newContract').hidden = true;
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
                              <div key={index} className="shadow bg-white rounded m-4 p-4">
                                <div>
                                  <div style={{ fontSize: 18, fontWeight: 'bold', textOverflow: 'ellipsis' }}>
                                    <div className="pt-1 d-inline" role="button">
                                      {!values.contractInfo[index].isMinimize ? (
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
                                    {values.contractInfo[index].code + ' - ' + values.contractInfo[index].fullname}
                                  </div>

                                  <div style={{ fontSize: 14, paddingLeft: 82 }}>
                                    {t('label.from') + values.contractInfo[index].handleDate + t('label.to') + values.contractInfo[index].expiredDate}
                                  </div>
                                  {/* <div>
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
                                  </div> */}
                                </div>
                                <hr className="mt-1" />

                                {values.contractInfo[index].isMinimize && (
                                  <>
                                    <div className="row">
                                      <CommonTextInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={friend?.code ?? ''}
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
                                        value={friend?.fullname ?? ''}
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
                                        value={friend?.type ?? ''}
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
                                        value={friend?.typeTax ?? ''}
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
                                        value={friend?.typeWork ?? ''}
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
                                        <Label text={t('label.trial_period')} required />
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
                                        value={friend?.handleDate ?? ''}
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
                                        value={friend?.validDate ?? ''}
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
                                        value={friend?.expiredDate ?? ''}
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
                                        value={friend?.startWork ?? ''}
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
                                        value={friend?.branchId ?? ''}
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
                                      <CommonSelectInput
                                        containerClassName={'form-group col-4'}
                                        value={friend.departmentId ?? 0}
                                        onBlur={handleBlur(`contractInfo.${index}.departmentId`)}
                                        onChange={(e) => {
                                          dispatch(fetchPositions({ departmentId: e.target.value }));
                                          handleChange(`contractInfo.${index}.departmentId`)(e);
                                        }}
                                        inputID={`contractInfo.${index}.departmentId`}
                                        labelText={t('label.department')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_department')}
                                        lstSelectOptions={departments}
                                      />
                                      <CommonSelectInput
                                        containerClassName={'form-group col-4'}
                                        value={friend.positionId ?? 0}
                                        onBlur={handleBlur(`contractInfo.${index}.positionId`)}
                                        onChange={(e) => {
                                          handleChange(`contractInfo.${index}.positionId`)(e);
                                        }}
                                        inputID={`contractInfo.${index}.positionId`}
                                        labelText={t('label.position')}
                                        selectClassName={'form-control'}
                                        placeholder={t('placeholder.select_position')}
                                        lstSelectOptions={positions}
                                      />
                                    </div>
                                    <h5 className="px-3">{t('label.gross_salary')}</h5>
                                    <hr className="mt-1" />
                                    <div className="row">
                                      <CommonSelectInput
                                        containerClassName={'form-group col-lg-4'}
                                        value={friend?.paymentType ?? ''}
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
                                        value={friend?.wageId ?? ''}
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
                                        value={friend?.amount ?? ''}
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
                                                      value={friend?.allowance[allowanceIdx].name ?? ''}
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
                                                      value={friend?.allowance[allowanceIdx]?.amount ?? ''}
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
                                    {renderButtons([
                                      {
                                        type: 'button',
                                        className: `btn btn-primary px-4 mx-4`,
                                        onClick: async (e) => {
                                          await removeContract(friend.id).then(() => remove(index));
                                        },
                                        name: t('label.delete'),
                                        position: 'right',
                                      },
                                      {
                                        type: 'button',
                                        className: `btn btn-primary px-4 mx-4`,
                                        onClick: () => {
                                          setFieldValue(`contractInfo.${index}`, jobTimelineInfo.contractInfo[index]);
                                        },
                                        name: t('label.reset'),
                                        position: 'right',
                                      },
                                      {
                                        type: 'button',
                                        className: `btn btn-primary px-4 ml-4`,
                                        onClick: async () => {},
                                        name: friend.id ? t('label.save') : t('label.create_new'),
                                      },
                                    ])}
                                  </>
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

export default JobTimelineInfo;
