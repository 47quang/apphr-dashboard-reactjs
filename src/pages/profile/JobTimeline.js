import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import Label from 'src/components/text/Label';

const JobTimelineInfo = ({ t }) => {
  const jobTimelineInfo = {
    contractInfo: [
      {
        isMinimize: true,
        isOpen: true,
        contractCode: 'C1XOC',
        contractType: 'partTime',
        pTaxType: '',
        signee: '',
        jobType: 1,
        probationaryPeriod: 0,
        signedDate: '',
        effectiveDate: '',
        expiredDate: '',
        branchId: 0,
        startDate: '',
        payType: 0,
        salaryGroup: 0,
        salary: 13000,
        subsidize: [],
      },
    ],
  };
  const subsidizes = [
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
        <div className="shadow bg-white rounded p-4">
          <Formik initialValues={jobTimelineInfo}>
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
                            <div key={index}>
                              <div className={'d-flex flex-row justify-content-between'}>
                                <div style={{ fontSize: 18 }}>
                                  {values.contractInfo[index].isMinimize ? (
                                    <AddBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                  ) : (
                                    <IndeterminateCheckBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                  )}
                                  {values.contractInfo[index].contractCode}{' '}
                                  <Switch checked={values.contractInfo[index].isOpen} name={`contractInfo.${index}.contractCode`} />
                                </div>
                                <div className="pt-2" role="button">
                                  <Delete className="pb-1" onClick={() => remove(index)} style={{ color: 'red' }} />
                                </div>
                              </div>
                              <hr className="mt-1" />

                              {!values.contractInfo[index].isMinimize && (
                                <>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Số hợp đồng'} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.contractCode`}
                                        placeholder="Nhập số hợp đồng"
                                        type="text"
                                        required
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Loại hợp đồng'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Loại thuế thu nhập cá nhân'} required />
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
                                      <Label text={'Người ký'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {employee.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Loại công việc'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.jobType`} component="select">
                                        {jobType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Thời gian thử việc'} />
                                      <div className="input-group">
                                        <input type="number" className={'form-control'} rows={5} name={`contractInfo.${index}.probationaryPeriod`} />
                                        <span className="input-group-text" id="basic-addon2">
                                          ngày
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày ký'} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.signedDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày có hiệu lực'} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.effectiveDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày hết hạn'} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.expiredDate`} />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Địa điểm làm việc'} />
                                      <Field className={'form-control'} name={`contractInfo.${index}.branchId`} component="select">
                                        {branches.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày bắt đầu làm việc'} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                  </div>
                                  <h4 className="pt-4 p-4">Lương</h4>
                                  <hr className="mt-1" />
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Hình thức chi trả'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.payType`} component="select">
                                        {payType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Nhóm lương'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.salaryGroup`} component="select">
                                        {salaryGroup.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Mức lương'} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.salary`}
                                        placeholder="Nhập số hợp đồng"
                                        type="number"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <h5 className="p-4">Trợ cấp</h5>
                                  <hr className="mt-1" />
                                  <FieldArray
                                    name={`contractInfo.${index}.subsidize`}
                                    render={({ insert, remove, push, replace }) => (
                                      <div>
                                        {values.contractInfo[index].subsidize &&
                                          values.contractInfo[index].subsidize.length > 0 &&
                                          values.contractInfo[index].subsidize.map((subsidize, subsidizeIdx) => {
                                            return (
                                              <div key={`subsidize${subsidizeIdx}`}>
                                                <div className="row">
                                                  <div className="form-group col-lg-4">
                                                    <Label text={'Trợ cấp'} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.subsidize.${subsidizeIdx}.name`}
                                                      component="select"
                                                      placeholder="Chọn loại trợ cấp"
                                                      onChange={(e) => {
                                                        let thisSubsidizes = subsidizes.filter((s) => s.id === parseInt(e.target.value));
                                                        console.log(thisSubsidizes);
                                                        if (thisSubsidizes && thisSubsidizes.length > 0)
                                                          setFieldValue(
                                                            `contractInfo.${index}.subsidize.${subsidizeIdx}.amount`,
                                                            thisSubsidizes[0].amount,
                                                          );
                                                      }}
                                                    >
                                                      {subsidizes.map((ch, idx) => (
                                                        <option key={idx} value={ch.id}>
                                                          {ch.name}
                                                        </option>
                                                      ))}
                                                    </Field>
                                                  </div>
                                                  <div className="form-group col-lg-4">
                                                    <Label text={'Nhóm lương'} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.subsidize.${subsidizeIdx}.amount`}
                                                      placeholder="Khoảng trợ cấp"
                                                      type="number"
                                                      disabled
                                                    />
                                                  </div>
                                                  <div className="form-group d-flex align-items-end">
                                                    <div role="button" className="btn btn-white">
                                                      <Delete className="pb-1" onClick={() => remove(subsidizeIdx)} style={{ color: 'red' }} />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        <div className="d-flex justify-content-center">
                                          <button
                                            type="button"
                                            style={{ border: 'dotted 0.5px black', width: '20%', paddingBottom: '20' }}
                                            className="px-0 py-1 bg-white"
                                            onClick={() => {
                                              push({
                                                name: 0,
                                                amount: 0,
                                              });
                                              console.log(values);
                                            }}
                                          >
                                            <Add /> {t('label.addSubsidize')}
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
                          style={{ border: 'dotted 0.5px black', width: '40%' }}
                          className="px-5 py-1 bg-white"
                          onClick={() => {
                            push({
                              isMinimize: false,
                              isOpen: false,
                              contractCode: 'C1XOC',
                              probationaryPeriod: '',
                              contractType: 'partTime',
                              startDate: '',
                              subsidize: [],
                            });
                          }}
                        >
                          <Add /> {t('label.add')}
                        </button>
                      </div>
                    </div>
                  )}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default JobTimelineInfo;
