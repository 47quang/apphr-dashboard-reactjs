import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import Label from 'src/components/text/Label';
import { joinClassName } from 'src/utils/stringUtils';

const JobTimelineInfo = ({ t }) => {
  const jobTimelineInfo = {
    contractInfo: [
      {
        isMinimize: false,
        isOpen: true,
        contractCode: '',
        contractType: '',
        pTaxType: '',
        signee: '',
        jobType: 0,
        probationaryPeriod: 0,
        signedDate: '',
        effectiveDate: '',
        expiredDate: '',
        branchId: 0,
        startDate: '',
        payType: 0,
        salaryGroup: 0,
        salary: 0,
        allowance: [],
      },
    ],
  };
  const allowances = [
    { id: 0, name: 'Chọn trợ cấp', amount: 0 },
    { id: 1, name: 'Ăn trưa', amount: 1000000 },
    { id: 2, name: 'Ăn sáng', amount: 1000000 },
    { id: 3, name: 'Ăn vặt', amount: 1000000 },
    { id: 4, name: 'Ăn chiều', amount: 1000000 },
    { id: 5, name: 'Xăng xe', amount: 1000000 },
    { id: 6, name: 'Nhà ở', amount: 1000000 },
  ];
  const salaryGroup = [
    { id: 1, name: '13M' },
    { id: 2, name: '15M' },
    { id: 3, name: '23M' },
  ];
  const payType = [
    { id: 1, name: 'Chi trả một lần' },
    { id: 2, name: 'Chi trả theo giờ' },
    { id: 3, name: 'Chi trả theo tháng' },
    { id: 4, name: 'Chi trả theo ngày công' },
  ];
  const jobType = [
    { id: 1, name: 'Văn phòng' },
    { id: 2, name: 'Làm việc ngoài trời' },
  ];
  const personalIncomeTaxType = [
    { id: 1, name: 'Cư trú có hợp đồng lao động 3 tháng trở lên' },
    { id: 2, name: 'Cá nhân không cư trú' },
    { id: 3, name: 'Không tính thuế' },
    { id: 4, name: 'Hợp đồng lao động dưới 3 tháng' },
  ];

  const contractType = [
    { id: 'partTime', name: 'Bán thời gian' },
    { id: 'fullTime', name: 'Toàn thời gian' },
    { id: 'season', name: 'Thời vụ' },
  ];
  const employee = [{ shortname: 1, name: 'Nguyễn Văn An' }];
  const branches = [{ id: 1, name: 'APPHR Q1 - 12 Bến Nghé ' }];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded px-4 py-4">
          <Formik
            initialValues={jobTimelineInfo}
            enableReinitialize
            onSubmit={(values) => {
              console.log('JobTimeline ', values);
            }}
          >
            {({ values, handleBlur, handleSubmit, handleChange, errors, touched, setValues, setFieldValue }) => (
              <form>
                <FieldArray
                  name="contractInfo"
                  render={({ insert, remove, push, replace }) => (
                    <div>
                      {values.contractInfo &&
                        values.contractInfo.length > 0 &&
                        values.contractInfo.map((friend, index) => {
                          const changeMinimizeButton = () => {
                            replace(index, {
                              ...values.contractInfo[index],
                              isMinimize: !values.contractInfo[index].isMinimize,
                            });
                          };
                          return (
                            <div key={index} className={joinClassName([`${index !== 0 ? 'pt-5' : ''}`])}>
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
                                  {values.contractInfo[index].contractCode}
                                </div>
                                <DeleteIconButton onClick={() => remove(index)} />
                              </div>
                              <hr className="mt-1" />

                              {!values.contractInfo[index].isMinimize && (
                                <>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.contract_code')} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.contractCode`}
                                        placeholder={t('placeholder.enter_contract_code')}
                                        type="text"
                                        required
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.contract_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.personal_income_tax_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {personalIncomeTaxType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.signer')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {employee.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.jobType`} component="select">
                                        {jobType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.trial_period')} />
                                      <div className="input-group">
                                        <input type="number" className={'form-control'} rows={5} name={`contractInfo.${index}.probationaryPeriod`} />
                                        <span className="input-group-text" id="basic-addon2">
                                          {t('label.day')}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.signature_date')} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.signedDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.effective_date')} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.effectiveDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.expiration_date')} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.expiredDate`} />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_place')} />
                                      <Field className={'form-control'} name={`contractInfo.${index}.branchId`} component="select">
                                        {branches.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_start_date')} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                  </div>
                                  <h5 className="px-3">{t('label.gross_salary')}</h5>
                                  <hr className="mt-1" />
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.payment_method')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.payType`} component="select">
                                        {payType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.salary_group')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.salaryGroup`} component="select">
                                        {salaryGroup.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.salary_level')} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.salary`}
                                        placeholder={t('placeholder.enter_salary_level')}
                                        type="number"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <h5 className="px-3">{t('label.allowance')}</h5>
                                  <hr className="mt-1" />
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
                                                  <div className="form-group col-lg-4">
                                                    <Label text={t('label.allowance')} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.allowance.${allowanceIdx}.name`}
                                                      component="select"
                                                      placeholder={t('label.select_allowance_type')}
                                                      onChange={(e) => {
                                                        let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                                        console.log(thisSubsidizes);
                                                        if (thisSubsidizes && thisSubsidizes.length > 0)
                                                          setFieldValue(
                                                            `contractInfo.${index}.allowance.${allowanceIdx}.amount`,
                                                            thisSubsidizes[0].amount,
                                                          );
                                                      }}
                                                    >
                                                      {allowances.map((ch, idx) => (
                                                        <option key={idx} value={ch.id}>
                                                          {ch.name}
                                                        </option>
                                                      ))}
                                                    </Field>
                                                  </div>
                                                  <div className="form-group col-lg-4">
                                                    <Label text={t('label.salary_group')} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.allowance.${allowanceIdx}.amount`}
                                                      placeholder={t('placeholder.pension')}
                                                      type="number"
                                                      disabled
                                                    />
                                                  </div>
                                                  <div className="form-group d-flex align-items-end">
                                                    <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        <div className="d-flex justify-content-start">
                                          <button type="button" className="btn btn-primary" onClick={() => push({ name: 0, amount: 0 })}>
                                            <AddCircle /> {t('label.add_allowance')}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      <div className="pt-4 d-flex justify-content-center">
                        <button
                          type="button"
                          style={{ border: 'dotted 0.5px black' }}
                          className="px-5 py-1 bg-white"
                          onClick={() => {
                            push({
                              isMinimize: false,
                              isOpen: false,
                              contractCode: '',
                              contractType: '',
                              pTaxType: '',
                              signee: '',
                              jobType: 0,
                              probationaryPeriod: 0,
                              signedDate: '',
                              effectiveDate: '',
                              expiredDate: '',
                              branchId: 0,
                              startDate: '',
                              payType: 0,
                              salaryGroup: 0,
                              salary: 0,
                              allowance: [],
                            });
                          }}
                        >
                          <Add /> {t('label.add')}
                        </button>
                      </div>
                    </div>
                  )}
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
