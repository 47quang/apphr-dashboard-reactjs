import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { REDUX_STATE } from 'src/stores/states';
import { joinClassName } from 'src/utils/stringUtils';
import AddIcon from '@material-ui/icons/Add';
import { useEffect } from 'react';

const JobTimelineInfo = ({ t, profile }) => {
  const dispatch = useDispatch();
  const jobTimelineInfo = {
    contractInfo: profile?.contracts ?? [],
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
  const wage = [
    { id: 1, name: '13M' },
    { id: 2, name: '15M' },
    { id: 3, name: '23M' },
  ];
  const paymentType = [
    { id: 1, name: 'Chi trả một lần' },
    { id: 2, name: 'Chi trả theo giờ' },
    { id: 3, name: 'Chi trả theo tháng' },
    { id: 4, name: 'Chi trả theo ngày công' },
  ];
  const typeWord = [
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
    { id: 'partTime', name: 'Bán thời gian' },
    { id: 'fullTime', name: 'Toàn thời gian' },
    { id: 'season', name: 'Thời vụ' },
  ];
  const employee = [{ shortname: 1, name: 'Nguyễn Văn An' }];
  const branches = [{ id: 1, name: 'APPHR Q1 - 12 Bến Nghé ' }];

  useEffect(() => {}, []);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded px-4 py-4">
          <Formik
            initialValues={jobTimelineInfo}
            enableReinitialize
            onSubmit={(values) => {
              dispatch({
                type: REDUX_STATE.profile.SET_JOB_TIMELINE,
                payload: values.contractInfo,
              });
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
                                  {values.contractInfo[index].code}
                                </div>
                                <div>
                                  {values.contractInfo[index].id === null && (
                                    <div role="button" className="d-inline pb-1">
                                      <AddIcon
                                        className="d-inline"
                                        onClick={() => console.log(values.contractInfo[index].id === null)}
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
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.contract_code')} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.code`}
                                        placeholder={t('placeholder.enter_contract_code')}
                                        type="text"
                                        required
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.contract_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.type`} component="select">
                                        {type.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.personal_income_tax_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.typeTax`} component="select">
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
                                      <Field className={'form-control'} name={`contractInfo.${index}.type`} component="select">
                                        {employee.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_type')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.typeWord`} component="select">
                                        {typeWord.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
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
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.signature_date')} required />
                                      <input
                                        type="date"
                                        onChange={(e) => handleChange(`contractInfo.${index}.handleDate`)(e)}
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.handleDate`}
                                        value={values.contractInfo[index].handleDate}
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.effective_date')} required />
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.validDate`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.validDate`)(e)}
                                        value={values.contractInfo[index].validDate}
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.expiration_date')} />
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.expiredDate`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.expiredDate`)(e)}
                                        value={values.contractInfo[index].expiredDate}
                                      />
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
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.startWork`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.startWork`)(e)}
                                        value={values.contractInfo[index].startWork}
                                      />
                                    </div>
                                  </div>
                                  <h5 className="px-3">{t('label.gross_salary')}</h5>
                                  <hr className="mt-1" />
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.payment_method')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.paymentType`} component="select">
                                        {paymentType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.salary_group')} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.wage`} component="select">
                                        {wage.map((ch, idx) => (
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
                                                  <div className="form-group col-lg-4">
                                                    <Label text={t('label.allowance')} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.allowance.${allowanceIdx}.name`}
                                                      component="select"
                                                      placeholder={t('label.select_allowance_type')}
                                                      onChange={(e) => {
                                                        let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));

                                                        if (thisSubsidizes && thisSubsidizes.length > 0)
                                                          setFieldValue(
                                                            `contractInfo.${index}.allowance.${allowanceIdx}.amount`,
                                                            thisSubsidizes[0].amount,
                                                          );
                                                        handleChange(`contractInfo.${index}.allowance.${allowanceIdx}.name`)(e);
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
                                    name={`contractInfo.${index}.files`}
                                    containerClassName="mt-3 "
                                    buttonClassName="btn btn-primary"
                                    value={values.contractInfo[index].files}
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
                              id: 0,
                              isMinimize: false,
                              isOpen: false,
                              code: '',
                              type: '',
                              typeTax: '',
                              signee: '',
                              typeWord: 0,
                              probTime: 0,
                              handleDate: '',
                              validDate: '',
                              expiredDate: '',
                              branchId: 0,
                              startWork: '',
                              paymentType: 0,
                              wage: 0,
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
