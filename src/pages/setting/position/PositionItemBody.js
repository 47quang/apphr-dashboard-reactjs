import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { SettingPositionInfoSchema } from 'src/schema/formSchema';
import { fetchDepartments } from 'src/stores/actions/department';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const PositionItemBody = ({ t, positionRef, position, branches, submitForm, buttons, loading, isCreate }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const academicLevels = [
    { id: 'not_require', name: t('label.not_require') },
    { id: 'intermediate', name: t('label.intermediate') },
    { id: 'college', name: t('label.college') },
    { id: 'university', name: t('label.university') },
    { id: 'master', name: t('label.master') },
    { id: 'doctor_of_philosophy', name: t('label.doctor_of_philosophy') },
  ];
  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-7">
            <Formik
              innerRef={positionRef}
              enableReinitialize
              initialValues={position}
              validationSchema={SettingPositionInfoSchema}
              onSubmit={(values) => submitForm(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                <form autoComplete="off">
                  {/* <FormHeader text={t('label.position_create')} /> */}
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.position_code')} required />
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
                            placeholder={t('placeholder.enter_position_code')}
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
                        <Label text={t('label.position_code')} required />
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
                            placeholder={t('placeholder.enter_position_code')}
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
                      labelText={t('label.position_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_position_name')}
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
                      labelText={t('label.branch')}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('branchId')}
                      onChange={(e) => {
                        dispatch(fetchDepartments({ branchId: e.target.value }));
                        handleChange('branchId')(e);
                      }}
                      inputID={'branchId'}
                      lstSelectOptions={branches?.payload ?? []}
                      placeholder={t('placeholder.select_branch')}
                      isTouched={touched.branchId}
                      isError={errors.branchId && touched.branchId}
                      errorMessage={t(errors.branchId)}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.departmentId}
                      labelText={t('label.department')}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('departmentId')}
                      onChange={handleChange('departmentId')}
                      inputID={'departmentId'}
                      lstSelectOptions={departments?.payload ?? []}
                      placeholder={t('placeholder.select_department')}
                      isTouched={touched.departmentId}
                      isError={errors.departmentId && touched.departmentId}
                      errorMessage={t(errors.departmentId)}
                    />
                  </div>

                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.academicLevel}
                      onBlur={handleBlur('academicLevel')}
                      onChange={handleChange('academicLevel')}
                      inputID={'academicLevel'}
                      labelText={t('label.academic_level')}
                      placeholder={t('placeholder.select_academic_level')}
                      selectClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.academicLevel}
                      isError={errors.academicLevel && touched.academicLevel}
                      errorMessage={t(errors.academicLevel)}
                      lstSelectOptions={academicLevels}
                    />
                  </div>
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.expYear}
                      onBlur={handleBlur('expYear')}
                      onChange={handleChange('expYear')}
                      inputID={'expYear'}
                      labelText={t('label.experience_year')}
                      inputType={'number'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.expYear}
                      isError={errors.expYear && touched.expYear}
                      errorMessage={t(errors.expYear)}
                    />
                  </div>
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.note}
                      onBlur={handleBlur('note')}
                      onChange={handleChange('note')}
                      inputID={'note'}
                      labelText={t('label.description')}
                      inputClassName={'form-control'}
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
export default PositionItemBody;
