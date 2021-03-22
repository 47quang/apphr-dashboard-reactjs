import { CContainer } from '@coreui/react';
import { Formik, Field, FieldArray } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { AccountInfoSchema } from 'src/schema/formSchema';
import Checkbox from '@material-ui/core/Checkbox';
import { renderButtons } from 'src/utils/formUtils';
import { REDUX_STATE } from 'src/stores/states';
import { useDispatch } from 'react-redux';

const AccountItemBody = ({ accountRef, account, buttons, submitForm, branches, departments, positions, permissionGroups, roles, profiles }) => {
  const dispatch = useDispatch();
  const initCheck = (groupPermission, checks) => {
    return groupPermission.every((val) => checks.indexOf(val) >= 0);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="row px-4">
        <div className="shadow bg-white rounded p-4 col-md-12">
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
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setValues }) => (
              <form>
                <FormHeader text="Vị trí làm việc" />
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.username}
                    onBlur={handleBlur('username')}
                    onChange={handleChange('username')}
                    inputID={'username'}
                    labelText={'Tên tài khoản'}
                    inputType={'text'}
                    placeholder={'Nhập tên tài khoản'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.username}
                    isError={errors.username && touched.username}
                    errorMessage={errors.username}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    inputID={'password'}
                    labelText={'Mật khẩu'}
                    inputType={'password'}
                    placeholder={'Nhập tên mật khấu'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.password}
                    isError={errors.password && touched.password}
                    errorMessage={errors.password}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.roleId}
                    labelText={'Vai trò'}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('roleId')}
                    onChange={(e) => {
                      if (e.target.value == 0) {
                        setFieldValue('permissionIds', []);
                      } else {
                        let permissionIds = roles.filter((x) => x.id === parseInt(e.target.value))[0].permissionIds;
                        permissionIds = permissionIds.map((val) => +val);
                        setFieldValue('permissionIds', permissionIds);
                      }
                      handleChange('roleId')(e);
                    }}
                    inputID={'roleId'}
                    lstSelectOptions={roles}
                    placeholder={'Chọn vai trò'}
                    isRequiredField
                    isTouched={touched.roleId}
                    isError={errors.roleId && touched.roleId}
                    errorMessage={errors.roleId}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.coefficient}
                    onBlur={handleBlur('coefficient')}
                    onChange={handleChange('coefficient')}
                    inputID={'coefficient'}
                    labelText={'Hệ số công'}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    placeholder={'Nhập hệ số công'}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={errors.coefficient}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    inputID={'email'}
                    labelText={'Email'}
                    inputType={'email'}
                    placeholder={'Nhập email'}
                    inputClassName={'form-control'}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.phone}
                    onBlur={handleBlur('phone')}
                    onChange={handleChange('phone')}
                    inputID={'phone'}
                    labelText={'Số điện thoại'}
                    inputType={'text'}
                    placeholder={'Nhập số điện thoại'}
                    inputClassName={'form-control'}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.profileId}
                    labelText={'Hồ sơ'}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('profileId')}
                    onChange={handleChange('profileId')}
                    inputID={'profileId'}
                    lstSelectOptions={profiles}
                    placeholder={'Chọn hồ sơ'}
                  />
                </div>
                <div className="row">
                  {permissionGroups.map((permissionGroup) => {
                    return (
                      <div className="form-group col-lg-3">
                        <Field
                          component={Checkbox}
                          color={'primary'}
                          name={permissionGroup.group}
                          value={permissionGroup.group}
                          checked={initCheck(
                            permissionGroup.children.map((per) => per.id),
                            values.permissionIds,
                          )}
                          onChange={(event) => {
                            const thisPermission = permissionGroup.children.map((per) => per.id);
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
                                {permissionGroup.children.map((per) => (
                                  <div key={per.id}>
                                    <label>
                                      <Checkbox
                                        color="primary"
                                        name="permissions_"
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

export default AccountItemBody;
