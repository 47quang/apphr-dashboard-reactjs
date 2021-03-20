import { CContainer } from '@coreui/react';
import { Formik, Field, FieldArray } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { RoleInfoSchema } from 'src/schema/formSchema';
import Checkbox from '@material-ui/core/Checkbox';
import { renderButtons } from 'src/utils/formUtils';

const RoleItemBody = ({ roleRef, role, buttons, submitForm, permissions }) => {
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
                <FormHeader text="Vị trí làm việc" />
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.id}
                    onBlur={handleBlur('id')}
                    onChange={handleChange('id')}
                    inputID={'id'}
                    labelText={'Mã vai trò'}
                    inputType={'text'}
                    placeholder={'Nhập tên vai trò'}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên vai trò'}
                    inputType={'text'}
                    placeholder={'Nhập tên vai trò'}
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
                            values.permissions,
                          )}
                          onChange={(event) => {
                            const thisPermission = permission.children.map((per) => per.id);
                            setFieldValue(permission.group, event.target.checked);
                            if (event.target.checked) {
                              setFieldValue('permissions', Array.from(new Set([...values.permissions, ...thisPermission])));
                            } else {
                              setFieldValue(
                                'permissions',
                                values.permissions.filter((x) => !thisPermission.includes(x)),
                              );
                            }
                          }}
                        />
                        {permission.name}
                        <FieldArray
                          name="permissions"
                          render={(arrayHelpers) => {
                            return (
                              <div className="mx-4 px-2">
                                {permission.children.map((per) => (
                                  <div key={per.id + 'child'}>
                                    <label>
                                      <Checkbox
                                        color="primary"
                                        name="permissions_"
                                        type="checkbox"
                                        value={per.id}
                                        checked={values.permissions.includes(per.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            arrayHelpers.push(per.id);
                                          } else {
                                            const idx = values.permissions.indexOf(per.id);
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
