import CommonTextInput from 'src/components/input/CommonTextInput';

const { CContainer } = require('@coreui/react');
const { Formik } = require('formik');

const JobTimelineInfo = () => {
  const jobTimelineInfo = {
    startDate: '',
    contractDate: '',
    endDate: '',
    note: '',
    isFired: '',
    firedNote: '',
    firedDate: '',
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik initialValues={jobTimelineInfo}>
            {({ values, handleBlur, handleSubmit, handleChange, errors, touched }) => (
              <form>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.startDate}
                    onBlur={handleBlur('startDate')}
                    onChange={handleChange('startDate')}
                    inputID={'startDate'}
                    labelText={'Ngày bắt đầu'}
                    inputType={'date'}
                    placeholder={'Ngày bắt đầu làm việc'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.startDate}
                    isError={errors.startDate && touched.startDate}
                    errorMessage={errors.startDate}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.contractDate}
                    onBlur={handleBlur('contractDate')}
                    onChange={handleChange('contractDate')}
                    inputID={'contractDate'}
                    labelText={'Ngày ký hợp đồng'}
                    inputType={'date'}
                    placeholder={'Ngày ký hợp đồng'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.contractDate}
                    isError={errors.contractDate && touched.contractDate}
                    errorMessage={errors.contractDate}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.endDate}
                    onBlur={handleBlur('endDate')}
                    onChange={handleChange('endDate')}
                    inputID={'endDate'}
                    labelText={'Ngày kết thúc'}
                    inputType={'date'}
                    placeholder={'Ngày kêt thúc làm việc'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.endDate}
                    isError={errors.startDate && touched.endDate}
                    errorMessage={errors.endDate}
                  />
                </div>
                <div className="row"></div>
                <div className="row"></div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default JobTimelineInfo;

{
  /* <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <Formik>{({ values, handleBlur, handleSubmit, errors, touched }) => <form></form>}</Formik>
        </div>
      </div>
    </CContainer> */
}
