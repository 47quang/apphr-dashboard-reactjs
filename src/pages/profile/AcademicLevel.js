import { CContainer } from '@coreui/react';
import { Add, Delete } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import Label from 'src/components/text/Label';

const AcademicLevel = () => {
  const initialAcademicLevelInfo = {
    academicInfo: [
      {
        academicLevel: 'skype',
        major: 'klaus@formik.com',
        educationPlace: 'ĐHBK',
        note: 'ádkjfhakdjfh',
        date: '',
      },
    ],
  };
  const academicLevels = [
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'college', name: 'Cao đẳng' },
    { id: 'university', name: 'Đại học' },
    { id: 'master', name: 'Thạc sĩ' },
    { id: 'doctor_of_philosophy', name: 'Tiến sĩ' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik
            initialValues={initialAcademicLevelInfo}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched, handleReset, handleSubmit }) => {
              return (
                <Form>
                  <FieldArray
                    name="academicInfo"
                    render={({ insert, remove, push }) => (
                      <div>
                        {values.academicInfo.length > 0 &&
                          values.academicInfo.map((friend, index) => (
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
                                  <Label text={'Trình độ'} />
                                  <Field className={'form-control'} name={`academicInfo.${index}.academicLevel`} component="select">
                                    {academicLevels.map((ch, idx) => (
                                      <option key={idx} value={ch.id}>
                                        {ch.name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={'Chuyên ngành'} />
                                  <Field
                                    className={'form-control'}
                                    name={`academicInfo.${index}.major`}
                                    placeholder="Nhập chuyên ngành"
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-lg-4">
                                  <Label text={'Nơi đào tạo'} />
                                  <Field
                                    className={'form-control'}
                                    name={`academicInfo.${index}.educationPlace`}
                                    placeholder="Nhập nơi đào tạo"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-4">
                                  <Label text={'Ngày cấp bằng'} />
                                  <input type="date" className={'form-control'} rows={5} name={`academicInfo.${index}.date`} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-lg-12">
                                  <Label text={'Ghi chú'} />
                                  <textarea className={'form-control'} rows={5} name={`academicInfo.${index}.note`} />
                                </div>
                              </div>
                            </div>
                          ))}
                        <div className="d-flex justify-content-center">
                          {/* <button type="button" className="btn btn-primary" onClick={() => push({ academicLevel: 'skype', major: '' })}>
                            <AddCircle /> Thêm kênh liên lạc
                          </button> */}
                          <button
                            type="button"
                            style={{ border: 'dotted 0.5px black' }}
                            className="px-5 py-1 bg-white"
                            onClick={() =>
                              push({ academicLevel: 'skype', major: 'klaus@formik.com', educationPlace: 'ĐHBK', note: 'ádkjfhakdjfh', date: '' })
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
export default AcademicLevel;
