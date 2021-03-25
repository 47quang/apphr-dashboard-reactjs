import { CContainer } from '@coreui/react';
import Checkbox from '@material-ui/core/Checkbox';
import { Field, FieldArray, Formik } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { AccountInfoSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';

const AccountItemBody = ({ t, accountRef, account, buttons, submitForm, branches, departments, positions, permissionGroups, roles, profiles }) => {
  const initCheck = (groupPermission, checks) => {
    // console.log(checks);
    return groupPermission.every((val) => checks.indexOf(val) >= 0);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="row px-4">
        <div className="shadow bg-white rounded p-4 col-md-9 m-auto">
          <Formik
            innerRef={accountRef}
            enableReinitialize
            validationSchema={AccountInfoSchema}
            initialValues={account}
            key="formAccount3"
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
              <form autoComplete="off">
                <FormHeader text={t('label.account_info')} />
                <div className="row" style={{ paddingBottom: 40 }}>
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.username}
                    onBlur={handleBlur('username')}
                    onChange={handleChange('username')}
                    inputID={'username'}
                    labelText={t('label.username')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_username')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.username}
                    isError={errors.username && touched.username}
                    errorMessage={t(errors.username)}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    inputID={'password'}
                    labelText={t('label.password')}
                    inputType={'password'}
                    placeholder={t('placeholder.enter_password')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.password}
                    isError={errors.password && touched.password}
                    errorMessage={t(errors.password)}
                  />

                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    inputID={'email'}
                    labelText={t('label.email')}
                    inputType={'email'}
                    placeholder={t('placeholder.enter_email')}
                    inputClassName={'form-control'}
                    isError={errors.email && touched.email}
                    errorMessage={t(errors.email)}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.phone}
                    onBlur={handleBlur('phone')}
                    onChange={handleChange('phone')}
                    inputID={'phone'}
                    labelText={t('label.phone_number')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_phone_number')}
                    inputClassName={'form-control'}
                    isError={errors.phone && touched.phone}
                    errorMessage={t(errors.phone)}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-8'}
                    value={values.profileId}
                    labelText={t('label.profileId')}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('profileId')}
                    onChange={handleChange('profileId')}
                    inputID={t('label.profileId')}
                    lstSelectOptions={profiles}
                    placeholder={t('placeholder.select_profile')}
                  />
                </div>
                <FormHeader text={t('title.permission')} />
                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.roleId}
                    labelText={t('label.role')}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('roleId')}
                    onChange={(e) => {
                      if (e.target.value === '0') {
                        setFieldValue('permissionIds', []);
                      } else {
                        let permissionIds = roles.filter((x) => x.id === parseInt(e.target.value))[0].permissionIds;
                        permissionIds = permissionIds && permissionIds.length > 0 ? permissionIds.map((val) => +val) : [];
                        setFieldValue('permissionIds', permissionIds);
                      }
                      handleChange('roleId')(e);
                    }}
                    inputID={'roleId'}
                    lstSelectOptions={roles}
                    placeholder={t('placeholder.select_role')}
                    isRequiredField
                    isTouched={touched.roleId}
                    isError={errors.roleId && touched.roleId}
                    errorMessage={t(errors.roleId)}
                  />
                </div>
                <div className="row">
                  {permissionGroups &&
                    permissionGroups.length > 0 &&
                    permissionGroups.map((permissionGroup) => {
                      return (
                        <div className="form-group col-lg-4" key={permissionGroup.id}>
                          <Field
                            component={Checkbox}
                            disabled={true}
                            color={'primary'}
                            name={permissionGroup.group}
                            value={permissionGroup.group}
                            checked={
                              permissionGroup.children &&
                              permissionGroup.children.length > 0 &&
                              initCheck(
                                permissionGroup.children.map((per) => per.id),
                                values.permissionIds,
                              )
                            }
                            onChange={(event) => {
                              const thisPermission =
                                permissionGroup.children && permissionGroup.children.length > 0 ? permissionGroup.children.map((per) => per.id) : [];
                              setFieldValue(permissionGroup.group, event.target.checked);
                              let payload = Array.from(new Set([...values.permissionIds, ...thisPermission]));
                              if (event.target.checked) {
                                setFieldValue('permissionIds', payload);
                              } else {
                                setFieldValue(
                                  'permissionIds',
                                  values.permissionIds.filter((x) => !thisPermission.includes(x)),
                                );
                              }
                            }}
                          />
                          {permissionGroup.name}
                          <FieldArray
                            name="permissionIds"
                            render={(arrayHelpers) => {
                              return (
                                <div className="mx-4 px-2">
                                  {permissionGroup.children &&
                                    permissionGroup.children.length > 0 &&
                                    permissionGroup.children.map((per) => (
                                      <div key={per.id}>
                                        <label>
                                          <Checkbox
                                            color="primary"
                                            name="permissions_"
                                            type="checkbox"
                                            disabled={true}
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

export default AccountItemBody;
