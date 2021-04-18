import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Editor from 'src/components/input/Editor';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { PERMISSION } from 'src/constants/key';
import { fetchTypes } from 'src/stores/actions/articleType';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { renderButtons } from 'src/utils/formUtils';

const NotificationForm = ({ t, articleRef, article, buttons, submitForm }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const departments = useSelector((state) => state.department.departments);
  let departmentsSelect = departments;
  const articleTypes = useSelector((state) => state.articleType.types);
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    dispatch(fetchTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shadow bg-white rounded p-4 container">
      <FormHeader text="Thông báo" />
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
                lstSelectOptions={articleTypes}
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
                <Label text="Chi nhánh" required={true} />
                {/* <Multiselect
                  options={branches}
                  closeIcon="close"
                  placeholder="Chọn chi nhánh"
                  selectedValues={values.branchIds}
                  onSelect={handleChange('branchIds')}
                  displayValue="name"
                  style={{
                    chips: { color: 'red', outline: 'solid' },
                    searchBox: { border: 'none', borderBottom: '1px solid blue', borderRadius: '0px' },
                  }}
                /> */}
                <div className="d-flex flex-row flex-wrap justify-content-between border">
                  <CommonMultiSelectInput
                    values={values.branchIds}
                    listValues={branches}
                    onChangeValues={(e) => {
                      let branchIds = e.target.value;
                      departmentsSelect = departments.filter((dep) => branchIds.includes(dep.branchId));
                      handleChange('branchIds')(e);
                      setFieldValue('departmentIds', []);
                    }}
                  />
                </div>
              </div>
              <div className="form-group col-xl-12">
                <Label text="Phòng ban" />
                <div className="d-flex flex-row flex-wrap justify-content-between border">
                  <CommonMultiSelectInput
                    values={values.departmentIds}
                    listValues={departmentsSelect}
                    onChangeValues={handleChange('departmentIds')}
                  />
                </div>
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
              <div className="form-group col-xl-12">
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
  );
};
export default NotificationForm;
