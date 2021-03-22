import CommonCheckbox from 'src/components/checkox/CommonCheckbox';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';

const { CContainer } = require('@coreui/react');
const { Formik } = require('formik');

const JobTimelineInfo = () => {
  const jobTimelineInfo = {
    startDate: '',
    contractDate: '',
    endDate: '',
    note: '',
    isFired: false,
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
                <FormHeader text="Thông tin hợp đồng" />

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
                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    inputClassName={'form-control'}
                    value={values.note}
                    inputID={'note'}
                    onChange={handleChange('note')}
                    onBlur={handleBlur('note')}
                    labelText={'Ghi chú'}
                  />
                </div>
                <div className={'row'}>
                  <CommonCheckbox
                    containerClassName={'col-lg-12'}
                    inputClassName={''}
                    checkboxId={'isFired'}
                    label={'Nghỉ việc'}
                    onChange={handleChange('isFired')}
                    onBlur={handleBlur('isFired')}
                    value={values.isFired}
                  />
                </div>
                {values.isFired && (
                  <>
                    <div className={'row'}>
                      <CommonMultipleTextInput
                        containerClassName={'form-group col-lg-12'}
                        inputClassName={'form-control'}
                        value={values.firedNote}
                        inputID={'reason'}
                        onChange={handleChange('firedNote')}
                        onBlur={handleBlur('firedNote')}
                        labelText={'Lý do nghỉ việc'}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.firedDate}
                        onBlur={handleBlur('firedDate')}
                        onChange={handleChange('firedDate')}
                        inputID={'firedDate'}
                        labelText={'Ngày nghỉ việc'}
                        inputType={'date'}
                        placeholder={'Ngày nghỉ việc'}
                        inputClassName={'form-control'}
                      />
                    </div>
                  </>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default JobTimelineInfo;
