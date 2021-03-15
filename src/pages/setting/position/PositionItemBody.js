import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { SettingPositionInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const PositionItemBody = ({ positionRef, position, departments, branches, submitForm, buttons }) => {
  const academicLevels = [
    { id: 'not_require', name: 'Không yêu cầu' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'college', name: 'Cao đẳng' },
    { id: 'university', name: 'Đại học' },
    { id: 'master', name: 'Thạc sĩ' },
    { id: 'doctor_of_philosophy', name: 'Tiến sĩ' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={positionRef}
            enableReinitialize
            initialValues={position}
            validationSchema={SettingPositionInfoSchema}
            onSubmit={(values) => submitForm(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form autoComplete="off">
                <FormHeader text="Thêm vị trí" />
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã vị trí'}
                    inputType={'text'}
                    placeholder={'Nhập mã vị trí'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.shortname}
                    isError={errors.shortname && touched.shortname}
                    errorMessage={errors.shortname}
                  />
                </div>

                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên vị trí'}
                    inputType={'text'}
                    placeholder={'Nhập tên vị trí'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={errors.name}
                  />
                </div>
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.departmentId}
                    labelText={'Phòng ban'}
                    selectClassName={'form-control'}
                    isRequiredField
                    onBlur={handleBlur('departmentId')}
                    onChange={handleChange('departmentId')}
                    inputID={'departmentId'}
                    lstSelectOptions={departments}
                    placeholder={'Chọn phòng ban'}
                    isTouched={touched.departmentId}
                    isError={errors.departmentId && touched.departmentId}
                    errorMessage={errors.departmentId}
                  />
                </div>
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.branchId}
                    labelText={'Chi nhánh'}
                    selectClassName={'form-control'}
                    isRequiredField
                    onBlur={handleBlur('branchId')}
                    onChange={handleChange('branchId')}
                    inputID={'branchId'}
                    lstSelectOptions={branches}
                    placeholder={'Chọn chi nhánh'}
                    isTouched={touched.branchId}
                    isError={errors.branchId && touched.branchId}
                    errorMessage={errors.branchId}
                  />
                </div>

                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.academicLevel}
                    onBlur={handleBlur('academicLevel')}
                    onChange={handleChange('academicLevel')}
                    inputID={'academicLevel'}
                    labelText={'Trình độ'}
                    selectClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.academicLevel}
                    isError={errors.academicLevel && touched.academicLevel}
                    errorMessage={errors.academicLevel}
                    lstSelectOptions={academicLevels}
                    placeholder={'Chọn trình độ'}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.expYear}
                    onBlur={handleBlur('expYear')}
                    onChange={handleChange('expYear')}
                    inputID={'expYear'}
                    labelText={'Năm kinh nghiệm'}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.expYear}
                    isError={errors.expYear && touched.expYear}
                    errorMessage={errors.expYear}
                  />
                </div>
                <div className="row">
                  <CommonMultipleTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.note}
                    onBlur={handleBlur('note')}
                    onChange={handleChange('note')}
                    inputID={'note'}
                    labelText={'Ghi chú'}
                    inputClassName={'form-control'}
                  />
                </div>
                {renderButtons(buttons)}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};
export default PositionItemBody;
