import { CContainer } from '@coreui/react';
import { Formik, Field, FieldArray } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { RoleInfoSchema } from 'src/schema/formSchema';
import Checkbox from '@material-ui/core/Checkbox';
import { renderButtons } from 'src/utils/formUtils';
import { CircularProgress } from '@material-ui/core';
import Label from 'src/components/text/Label';
import { generateCode } from 'src/utils/randomCode';

const RoleItemBody = ({ t, roleRef, role, buttons, submitForm, permissions, loading, isCreate }) => {
  const initCheck = (groupPermission, checks) => {
    return groupPermission.every((val) => checks.indexOf(val) >= 0);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 col-md-12">
            <Formik
              innerRef={roleRef}
              enableReinitialize
              validationSchema={RoleInfoSchema}
              initialValues={role}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setValues }) => (
                <form>
                  <FormHeader text={t('title.role')} />
                  <div className="row">
                    {isCreate ? (
                      <div className="form-group col-xl-6">
                        <Label text={t('label.role_code')} required />
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
                            placeholder={t('placeholder.enter_role_code')}
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
                      <div className="form-group col-xl-6">
                        <Label text={t('label.role')} required />
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
                            placeholder={t('placeholder.enter_role_code')}
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
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.role_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_role_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
                    />
                  </div>
                  <div className="row">
                    {permissions &&
                      permissions.length > 0 &&
                      permissions.map((permission) => {
                        return (
                          <div className="form-group col-xl-3" key={permission.id + 'group'}>
                            <Field
                              component={Checkbox}
                              color={'primary'}
                              name={permission.group}
                              value={permission.group}
                              checked={
                                permission.children &&
                                permission.children.length > 0 &&
                                initCheck(
                                  permission.children.map((per) => per.id),
                                  values.permissionIds,
                                )
                              }
                              onChange={(event) => {
                                const thisPermission =
                                  permission.children && permission.children.length > 0 ? permission.children.map((per) => per.id) : [];
                                setFieldValue(permission.group, event.target.checked);
                                if (event.target.checked) {
                                  setFieldValue('permissionIds', Array.from(new Set([...values.permissionIds, ...thisPermission])));
                                } else {
                                  setFieldValue(
                                    'permissionIds',
                                    values.permissionIds.filter((x) => !thisPermission.includes(x)),
                                  );
                                }
                              }}
                            />
                            {permission.name}
                            <FieldArray
                              name="permissionIds"
                              render={(arrayHelpers) => {
                                return (
                                  <div className="mx-4 px-2">
                                    {permission.children &&
                                      permission.children.length > 0 &&
                                      permission.children.map((per) => (
                                        <div key={per.id + 'child'}>
                                          <label>
                                            <Checkbox
                                              color="primary"
                                              name="permissionIds"
                                              type="checkbox"
                                              value={per.id}
                                              checked={values.permissionIds.includes(per.id)}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  arrayHelpers.push(per.id);
                                                } else {
                                                  const idx = values.permissionIds.indexOf(per.id);
                                                  arrayHelpers.remove(idx);
                                                }
                                              }}
                                            />
                                            {per.name}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                );
                              }}
                            />
                          </div>
                        );
                      })}
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

export default RoleItemBody;
