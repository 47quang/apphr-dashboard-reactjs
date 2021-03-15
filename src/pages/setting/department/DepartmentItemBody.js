import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const DepartmentItemBody = ({ departmentRef, department, branches, buttons, submitForm }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={departmentRef}
            enableReinitialize
            initialValues={department}
            validationSchema={SettingDepartmentInfoSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập mã phòng ban'}
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
                    labelText={'Tên phòng ban'}
                    inputType={'text'}
                    placeholder={'Nhập tên phòng ban'}
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
                    value={values.branchId}
                    onBlur={handleBlur('branchId')}
                    onChange={handleChange('branchId')}
                    inputID={'branchId'}
                    labelText={'Chi nhánh'}
                    isRequiredField
                    selectClassName={'form-control'}
                    placeholder={'Chọn chi nhánh'}
                    lstSelectOptions={branches}
                    isTouched={touched.branchId}
                    isError={errors.branchId && touched.branchId}
                    errorMessage={errors.branchId}
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
                    placeholder={'Nhập vào ghi chú'}
                    isRequiredField
                    isTouched={touched.note}
                    isError={errors.note && touched.note}
                    errorMessage={errors.note}
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

export default DepartmentItemBody;
