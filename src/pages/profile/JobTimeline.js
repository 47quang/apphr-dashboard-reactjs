import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, Delete, Remove } from '@material-ui/icons';
import { Field, FieldArray, Formik } from 'formik';
import Label from 'src/components/text/Label';

const JobTimelineInfo = ({ t }) => {
  const jobTimelineInfo = {
    contractInfo: [
      {
        isMinimize: true,
        isOpen: true,
        contractCode: 'C1XOC',
        probationaryPeriod: '',
        contractType: 'partTime',
        startDate: '',
      },
    ],
  };
  const contractType = [
    { id: 'partTime', name: 'Bán thời gian' },
    { id: 'fullTime', name: 'Toàn thời gian' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          {/* <FormHeader text="Thông tin hợp đồng" /> */}
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
                                    <Add onClick={(e) => changeMinimizeButton()} />
                                  ) : (
                                    <Remove onClick={(e) => changeMinimizeButton()} />
                                  )}
                                  {values.contractInfo[index].contractCode}{' '}
                                  <Switch checked={values.contractInfo[index].isOpen} name={`contractInfo.${index}.contractCode`} />
                                </div>
                                <div className="pt-2">
                                  <Delete onClick={() => remove(index)} style={{ color: 'red' }} />
                                </div>
                              </div>
                              <hr className="mt-1" />

                              {!values.contractInfo[index].isMinimize && (
                                <>
                                  <div className="row">
                                    <div className="form-group col-lg-6">
                                      <Label text={'Số hợp đồng'} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.contractCode`}
                                        placeholder="Nhập số hợp đồng"
                                        type="text"
                                      />
                                    </div>
                                    <div className="form-group col-lg-6">
                                      <Label text={'Loại hợp đồng'} required />
                                      <Field className={'form-control'} name={`contractInfo.${index}.contractType`} component="select">
                                        {contractType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-6">
                                      <Label text={'Ngày ký'} required />
                                      <input type="date" className={'form-control'} rows={5} name={`contractInfo.${index}.stateDate`} />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-6">
                                      <Label text={'Thời gian thử việc'} />
                                      <div className="input-group">
                                        <input type="text" className={'form-control'} rows={5} name={`contractInfo.${index}.probationaryPeriod`} />
                                        <span class="input-group-text" id="basic-addon2">
                                          tháng
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          style={{ border: 'dotted 0.5px black' }}
                          className="px-5 py-1 bg-white"
                          onClick={() =>
                            push({
                              isMinimize: false,
                              isOpen: false,
                              contractCode: 'C1XOC',
                              probationaryPeriod: '',
                              contractType: 'partTime',
                              startDate: '',
                            })
                          }
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
