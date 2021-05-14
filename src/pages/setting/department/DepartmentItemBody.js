import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const DepartmentItemBody = ({ t, departmentRef, department, branches, buttons, submitForm, loading }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-8">
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
                      containerClassName={'form-group col-xl-12'}
                      value={values.code}
                      onBlur={handleBlur('code')}
                      onChange={handleChange('code')}
                      inputID={'code'}
                      labelText={t('label.department_code')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_department_code')}
                      inputClassName={'form-control'}
                      isDisable={true}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.department_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_department_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.branchId}
                      onBlur={handleBlur('branchId')}
                      onChange={handleChange('branchId')}
                      inputID={'branchId'}
                      labelText={t('label.branch')}
                      isRequiredField
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_branch')}
                      lstSelectOptions={branches}
                      isTouched={touched.branchId}
                      isError={errors.branchId && touched.branchId}
                      errorMessage={t(errors.branchId)}
                    />
                  </div>

                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.note}
                      onBlur={handleBlur('note')}
                      onChange={handleChange('note')}
                      inputID={'note'}
                      rows={10}
                      labelText={t('label.description')}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_description')}
                    />
                  </div>
                  {renderButtons(buttons)}
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </CContainer>
  );
};

export default DepartmentItemBody;
