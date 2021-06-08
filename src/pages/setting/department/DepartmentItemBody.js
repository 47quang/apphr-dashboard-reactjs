import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { SettingDepartmentInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const DepartmentItemBody = ({ t, departmentRef, department, branches, buttons, submitForm, loading, isCreate }) => {
  return (
    <CContainer fluid className="c-main m-auto p-4">
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
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                <form autoComplete="off">
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.department_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-10'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_department_code')}
                          />
                          <div
                            className="input-group-text col-2 d-flex justify-content-center"
                            id="basic-addon2"
                            type="button"
                            onClick={(e) => {
                              let randomCode = generateCode();
                              setFieldValue('code', randomCode);
                            }}
                          >
                            {t('label.random')}
                          </div>
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.department_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_department_code')}
                          />
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
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
                      lstSelectOptions={branches?.payload ?? []}
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
