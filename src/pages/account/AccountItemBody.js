import { CContainer } from '@coreui/react';
import { Formik, Field, FieldArray } from 'formik';
import React from 'react';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { AccountInfoSchema } from 'src/schema/formSchema';
import Checkbox from '@material-ui/core/Checkbox';
import { renderButtons } from 'src/utils/formUtils';

const AccountItemBody = ({ accountRef, account, buttons, submitForm, branches, departments, positions, permissions, roles }) => {
  const initCheck = (groupPermission, checks) => {
    return groupPermission.every((val) => checks.indexOf(val) >= 0);
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="row">
        <div className="col-8 px-4">
          <div className="shadow bg-white rounded p-4 col-md-12">
            <Formik enableReinitialize initialValues={account} key="formAccount1">
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <FormHeader text="Thông tin cá nhân" />
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg?w=800&quality=85"
                        alt="alternatetext"
                        height="150px"
                      />
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <CommonTextInput
                          containerClassName={'form-group col-lg-6'}
                          value={values.name}
                          onBlur={handleBlur('name')}
                          onChange={handleChange('name')}
                          inputID={'name'}
                          labelText={'Họ và tên'}
                          inputType={'text'}
                          inputClassName={'form-control'}
                          isDisable={true}
                          placeholder={'Hàn Giang Nhạn'}
                        />
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-6'}
                          value={values.gender}
                          onBlur={handleBlur('gender')}
                          onChange={handleChange('gender')}
                          inputID={'gender'}
                          labelText={'Giới tính'}
                          selectClassName={'form-control'}
                          placeholder={'Nam'}
                          lstSelectOptions={[
                            { id: 1, name: 'Nam' },
                            { id: 2, name: 'Nữ' },
                          ]}
                          isDisable={true}
                        />
                      </div>
                      <div className="row">
                        <CommonTextInput
                          containerClassName={'form-group col-lg-6'}
                          value={values.email}
                          onBlur={handleBlur('email')}
                          onChange={handleChange('email')}
                          inputID={'email'}
                          labelText={'Email'}
                          inputType={'text'}
                          inputClassName={'form-control'}
                          isDisable={true}
                          placeholder={'nhan.han@gmail.com'}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-lg-6'}
                          value={values.startDate}
                          onBlur={handleBlur('startDate')}
                          onChange={handleChange('startDate')}
                          inputID={'startDate'}
                          labelText={'Ngày bắt đầu'}
                          inputType={'datetime-local'}
                          placeholder={'Nhập ngày bắt đầu'}
                          inputClassName={'form-control'}
                          isDisable={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-4'}
                      value={values.role}
                      onBlur={handleBlur('role')}
                      onChange={handleChange('role')}
                      inputID={'role'}
                      labelText={'Vai trò'}
                      selectClassName={'form-control'}
                      lstSelectOptions={[]}
                      isDisable={true}
                      placeholder={'Frontend Dev'}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-4'}
                      value={values.phone}
                      onBlur={handleBlur('phone')}
                      onChange={handleChange('phone')}
                      inputID={'phone'}
                      labelText={'Số điện thoại'}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      isDisable={true}
                      placeholder={'0123456789'}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-4'}
                      value={values.endDate}
                      onBlur={handleBlur('endDate')}
                      onChange={handleChange('endDate')}
                      inputID={'endDate'}
                      labelText={'Ngày kết thúc'}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isDisable={true}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-4 px-4">
          <div className="shadow bg-white rounded p-4 col-md-12">
            <Formik enableReinitialize initialValues={account} key="formAccount2">
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <FormHeader text="Vị trí làm việc" />
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.branchId}
                      labelText={'Chi nhánh'}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('branchId')}
                      onChange={handleChange('branchId')}
                      inputID={'branchId'}
                      lstSelectOptions={branches}
                      placeholder={'APPHR Quận 1'}
                      isDisable={true}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.departmentId}
                      labelText={'Phòng ban'}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('departmentId')}
                      onChange={handleChange('departmentId')}
                      inputID={'departmentId'}
                      lstSelectOptions={departments}
                      placeholder={'IT'}
                      isDisable={true}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.positionId}
                      onBlur={handleBlur('positionId')}
                      onChange={handleChange('positionId')}
                      inputID={'positionId'}
                      labelText={'Vị trí'}
                      selectClassName={'form-control'}
                      lstSelectOptions={positions}
                      placeholder={'Front-end Intern'}
                      isDisable={true}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
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
                    placeholder={'123456'}
                    inputClassName={'form-control'}
                    isDisable={true}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-3'}
                    value={values.role}
                    labelText={'Vai trò'}
                    selectClassName={'form-control'}
                    onBlur={handleBlur('role')}
                    onChange={handleChange('role')}
                    inputID={'role'}
                    lstSelectOptions={roles}
                    placeholder={'Chọn vai trò'}
                    isRequiredField
                    isTouched={touched.role}
                    isError={errors.role && touched.role}
                    errorMessage={errors.role}
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
                    placeholder={1.5}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={errors.coefficient}
                  />
                </div>
                <div className="row">
                  {permissions.map((permission) => {
                    return (
                      <div className="form-group col-lg-3">
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
                                  <div key={per.id}>
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

export default AccountItemBody;
