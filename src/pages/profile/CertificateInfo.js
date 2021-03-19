import { CContainer } from '@coreui/react';
import { Add, Delete } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import Label from 'src/components/text/Label';

const CertificateInfo = () => {
  const initialCertificateInfo = {
    certificateInfo: [
      {
        name: 'skype',
        certificateType: 'klaus@formik.com',
        certificatePlace: 'ĐHBK',
        note: 'ádkjfhakdjfh',
        startDate: '',
        endDate: '',
      },
    ],
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik
            initialValues={initialCertificateInfo}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleReset, handleSubmit }) => {
              return (
                <Form>
                  <FieldArray
                    name="certificateInfo"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.certificateInfo.length > 0 &&
                          values.certificateInfo.map((friend, index) => (
                            <div key={index}>
                              <div className={'d-flex justify-content-between'}>
                                <h5>{index + 1}.</h5>
                                <div className="pt-2">
                                  <Delete onClick={() => remove(index)} style={{ color: 'red' }} />
                                </div>
                              </div>
                              <hr className="mt-1" />
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={'Tên chứng chỉ'} />
                                  <Field
                                    type="text"
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.academicLevel`}
                                    placeholder="Nhập tên chứng chỉ"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={'Loại chứng chỉ'} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificateType`}
                                    placeholder="Nhập loại chứng chỉ"
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={'Nơi cấp'} />
                                  <Field
                                    className={'form-control'}
                                    name={`certificateInfo.${index}.certificatePlace`}
                                    placeholder="Nhập nơi cấp"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={'Ngày cấp bằng'} />
                                  <input type="date" className={'form-control'} rows={5} name={`certificateInfo.${index}.stateDate`} />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={'Ngày hết hạn'} />
                                  <input type="date" className={'form-control'} rows={5} name={`certificateInfo.${index}.endDate`} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={'Ghi chú'} />
                                  <textarea className={'form-control'} rows={5} name={`certificateInfo.${index}.note`} />
                                </div>
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          {/* <button type="button" className="btn btn-primary" onClick={() => push({name: 'skype', certificateType: '' })}>
                            <AddCircle /> Thêm kênh liên lạc
                          </button> */}
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() =>
                              push({
                                name: 'skype',
                                certificateType: 'klaus@formik.com',
                                certificatePlace: 'ĐHBK',
                                note: 'ádkjfhakdjfh',
                                startDate: '',
                                endDate: '',
                              })
                            }
                          >
                            <Add /> Thêm
                          </button>
                        </div>
                      </div>
                    )}
                  />
                  <br />
                  <div className="row col-12">
                    <button
                      type="button"
                      className="btn btn-primary mr-3"
                      onClick={(event) => {
                        event.preventDefault();
                        handleReset();
                      }}
                    >
                      Khôi phục
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mr-3"
                      onClick={(event) => {
                        handleSubmit();
                      }}
                    >
                      Lưu
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};
export default CertificateInfo;
