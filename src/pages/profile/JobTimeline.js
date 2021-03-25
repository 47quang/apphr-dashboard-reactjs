import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import Label from 'src/components/text/Label';
import FormHeader from 'src/components/text/FormHeader';

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
        jobType: 'Văn phòng',
        probationaryPeriod: 0,
        signedDate: '',
        effectiveDate: '',
        expiredDate: '',
        branchId: 0,
        startDate: '',
        payType: 0,
        salaryGroup: 0,
        salary: 13000,
        subsidize: [
          {
            id: 1,
            name: 'Ăn trưa',
            amount: 1000,
          },
        ],
      },
    ],
  };
  const subsidizes = [
    { id: 1, name: 'Ăn trưa', amount: 1000000 },
    { id: 2, name: 'Ăn sáng', amount: 1000000 },
    { id: 3, name: 'Ăn vặt', amount: 1000000 },
    { id: 4, name: 'Ăn chiều', amount: 1000000 },
    { id: 5, name: 'Xăng xe', amount: 1000000 },
    { id: 6, name: 'Nhà ở', amount: 1000000 },
  ];
  const salaryGroups = [
    { id: 1, name: '13M' },
    { id: 2, name: '15M' },
    { id: 3, name: '23M' },
  ];
  const payTypes = [
    { id: 1, name: 'Chi trả một lần' },
    { id: 2, name: 'Chi trả theo giờ' },
    { id: 3, name: 'Chi trả theo tháng' },
    { id: 4, name: 'Chi trả theo ngày công' },
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
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik initialValues={jobTimelineInfo}>
            {({ values, handleBlur, handleSubmit, handleChange, errors, touched, setValues }) => (
              <form>
                <FieldArray
                  name="contractInfo"
                  render={({ insert, remove, push, replace }) => (
                    <div>
                      {values.contractInfo.length > 0 &&
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
                                <div className="pt-2">
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
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
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
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày có hiệu lực'} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày hết hạn'} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Địa điểm làm việc'} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.contractCode`}
                                        placeholder="Nhập số hợp đồng"
                                        type="text"
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Ngày bắt đầu làm việc'} />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                  </div>
                                  <h4 className="pt-4">Lương</h4>
                                  <hr className="mt-1" />
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={'Hình thức chi trả'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={'Nhóm lương'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
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
                                        name={`contractInfo.${index}.contractCode`}
                                        placeholder="Nhập số hợp đồng"
                                        type="text"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <h4 className="pt-4">Trợ cấp</h4>
                                  <hr className="mt-1" />
                                  <FieldArray
                                    name={`contractInfo${index}.subsidize`}
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
                                                      name={`contractInfo.${index}.subsidize.${subsidizeIdx}.type`}
                                                      component="select"
                                                    >
                                                      {contractType.map((ch, idx) => (
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
                                                      placeholder="Nhập số hợp đồng"
                                                      type="text"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        <div className="d-flex justify-content-center">
                                          <button
                                            type="button"
                                            style={{ border: 'dotted 0.5px black', width: '20%', paddingBottom: '20' }}
                                            className="px-5 py-1 bg-white"
                                            onClick={() => {
                                              push({
                                                type: 0,
                                                amount: 0,
                                              });
                                              console.log(values.contractInfo[index].subsidize);
                                            }}
                                          >
                                            <Add /> {t('label.add')}
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
                      <div className="d-flex justify-content-center">
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
                              subsidize: [
                                {
                                  type: 1,
                                  amount: 1000,
                                },
                              ],
                            });
                            console.log(values.contractInfo);
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
