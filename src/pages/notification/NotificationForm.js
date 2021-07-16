import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Editor from 'src/components/input/Editor';
import MultiSelectInput from 'src/components/input/MultiSelectInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { PERMISSION } from 'src/constants/key';
import { fetchTypes } from 'src/stores/actions/articleType';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { renderButtons } from 'src/utils/formUtils';
import { generateCode } from 'src/utils/randomCode';

const NotificationForm = ({ t, articleRef, article, buttons, submitForm, loading, isCreate }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const departments = useSelector((state) => state.department.departments);
  let departmentsSelect = [];
  const articleTypes = useSelector((state) => state.articleType.types);
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    dispatch(fetchTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container">
            <FormHeader text={t('Notification')} />
            <Formik
              innerRef={articleRef}
              initialValues={article}
              enableReinitialize
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched, handleSubmit, setFieldValue }) => (
                <form>
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-12">
                        <Label text={t('label.notification_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-10'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code ?? ''}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_notification_code')}
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
                        <Label text={t('label.notification_code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code ?? ''}
                            disabled={!isCreate}
                            placeholder={t('placeholder.enter_notification_code')}
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
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.typeId ?? ''}
                      onBlur={handleBlur('typeId')}
                      onChange={handleChange('typeId')}
                      inputID={'typeId'}
                      labelText={t('label.notification_type')}
                      selectClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.typeId}
                      isError={errors.typeId && touched.typeId}
                      errorMessage={t(errors.typeId)}
                      lstSelectOptions={articleTypes?.payload ?? []}
                      placeholder={t('placeholder.select_notification_type')}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.title}
                      onBlur={handleBlur('title')}
                      onChange={handleChange('title')}
                      inputID={'title'}
                      labelText={t('label.notification_title')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_notification_title')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.title}
                      isError={errors.title && touched.title}
                      errorMessage={errors.title}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-xl-12">
                      <Label text={t('Branch')} required={true} />

                      <MultiSelectInput
                        noOptionsMessage={() => t('message.no_options')}
                        values={values.branches}
                        onBlur={handleBlur('branches')}
                        listValues={branches.payload ?? []}
                        onChange={(e) => {
                          if (e.length === 0) {
                            setFieldValue('branches', []);
                            setFieldValue('branchIds', []);
                            setFieldValue('departments', []);
                            departmentsSelect = [];
                          } else {
                            let branchIds = e && e.length ? e.map((b) => b.id) : [];
                            setFieldValue('departments', []);
                            departmentsSelect = departments.payload.filter((dep) => branchIds.includes(dep.branchId));
                            setFieldValue('branches', e);
                            setFieldValue('branchIds', branchIds);
                          }
                        }}
                        placeholder={t('placeholder.select_departments')}
                        isTouched={touched.branches}
                        isError={errors.branches && touched.branches}
                        errorMessage={errors.branches}
                      />
                    </div>
                    <div className="form-group col-xl-12">
                      <Label text={t('Department')} />
                      <MultiSelectInput
                        noOptionsMessage={() => t('message.no_options')}
                        values={values.departments}
                        onBlur={handleBlur('departments')}
                        listValues={departmentsSelect}
                        onChange={(e) => {
                          setFieldValue('departments', e);
                          let departmentIds = e && e.length ? e.map((d) => d.id) : [];
                          setFieldValue('departmentIds', departmentIds);
                        }}
                        placeholder={t('placeholder.select_departments')}
                        isTouched={touched.departments}
                        isError={errors.departments && touched.departments}
                        errorMessage={errors.departments}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.description}
                      onBlur={handleBlur('description')}
                      onChange={handleChange('description')}
                      inputID={'description'}
                      labelText={t('label.notification_description')}
                      placeholder={t('placeholder.enter_notification_description')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.description}
                      isError={errors.description && touched.description}
                      errorMessage={errors.description}
                      rows={3}
                    />
                    <div className="form-group col-xl-12 wrapper">
                      <Label text={t('label.notification_content')} required />
                      <Editor placeholder={t('placeholder.enter_notification_content')} value={values.content} onChange={handleChange('content')} />
                    </div>
                    <CommonUploadFileButton
                      name={'uploads'}
                      containerClassName="form-group col-xl-12"
                      buttonClassName="btn btn-primary"
                      value={values.uploads}
                      isHide={!permissionIds.includes(PERMISSION.UPDATE_ARTICLE)}
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
export default NotificationForm;
