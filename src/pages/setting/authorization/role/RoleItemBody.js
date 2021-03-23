import { CContainer } from '@coreui/react';
import { Formik, Field, FieldArray } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { RoleInfoSchema } from 'src/schema/formSchema';
import Checkbox from '@material-ui/core/Checkbox';
import { renderButtons } from 'src/utils/formUtils';

const RoleItemBody = ({ t, roleRef, role, buttons, submitForm, permissions }) => {
  const initCheck = (groupPermission, checks) => {
    return groupPermission.every((val) => checks.indexOf(val) >= 0);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="row px-4">
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
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.id}
                    onBlur={handleBlur('id')}
                    onChange={handleChange('id')}
                    inputID={'id'}
                    labelText={t('label.role_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_role_code')}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
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
                    errorMessage={errors.name}
                  />
                </div>
                <div className="row">
                  {permissions.map((permission) => {
                    return (
                      <div className="form-group col-lg-3" key={permission.id + 'group'}>
                        <Field
                          component={Checkbox}
                          color={'primary'}
                          name={permission.group}
                          value={permission.group}
                          checked={initCheck(
                            permission.children.map((per) => per.id),
                            values.permissionIds,
                          )}
                          onChange={(event) => {
                            const thisPermission = permission.children.map((per) => per.id);
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
                                {permission.children.map((per) => (
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
      </div>
    </CContainer>
  );
};

export default RoleItemBody;
