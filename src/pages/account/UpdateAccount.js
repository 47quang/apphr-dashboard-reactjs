import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { Field, FieldArray, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { AccountUpdateInfoSchema } from 'src/schema/formSchema';
import { fetchAccount, setEmptyAccount, updateAccount } from 'src/stores/actions/account';
import { fetchPermissions } from 'src/stores/actions/role';
import { renderButtons } from 'src/utils/formUtils';
import Page404 from '../page404/Page404';

const UpdateAccount = ({ t, history, match }) => {
  const accountId = +match?.params?.id;
  const accountRef = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissionGroups = useSelector((state) => state.role.permissions);
  const roles = useSelector((state) => state.account.roles);
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const [loading, setLoading] = useState(false);

  const initCheck = (groupPermission, checks) => {
    return checks ? groupPermission.every((val) => checks.indexOf(val) >= 0) : false;
  };
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_USER)) dispatch(fetchAccount(accountId, setLoading));
    if (permissionGroups && permissionGroups.length === 0) dispatch(fetchPermissions());
    return () => {
      dispatch(setEmptyAccount());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    let form = values;
    delete form.rollUp;
    delete form.profile;
    form.roleId = parseInt(form.roleId);
    if (form.profileId !== '0' && form.profileId !== '') form.profileId = +form.profileId;
    else delete form.profileId;
    dispatch(updateAccount(form, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_USER)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.ACCOUNT);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            accountRef.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            accountRef.current.handleSubmit();
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            history.push(ROUTE_PATH.ACCOUNT);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  const returnComponent = (
    <CContainer fluid className="c-main m-auto p-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 col-md-10 m-auto">
            <Formik
              innerRef={accountRef}
              enableReinitialize
              validationSchema={AccountUpdateInfoSchema}
              initialValues={account}
              key="formAccount3"
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                values.password = values.password ?? '';
                return (
                  <form autoComplete="off">
                    <FormHeader text={t('label.account_info')} />
                    <div className="row" style={{ paddingBottom: 40 }}>
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.username ?? ''}
                        onBlur={handleBlur('username')}
                        onChange={handleChange('username')}
                        inputID={'username'}
                        labelText={t('label.username')}
                        inputType={'text'}
                        placeholder={t('placeholder.enter_username')}
                        inputClassName={'form-control'}
                        isRequiredField
                        isDisable
                        isTouched={touched.username}
                        isError={errors.username && touched.username}
                        errorMessage={t(errors.username)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.profileName ?? ''}
                        onBlur={handleBlur('profileName')}
                        onChange={handleChange('profileName')}
                        inputID={'profileName'}
                        labelText={t('label.profileId')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.email ?? ''}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        inputID={'email'}
                        labelText={t('label.email')}
                        inputType={'email'}
                        isRequiredField
                        placeholder={t('placeholder.enter_email')}
                        inputClassName={'form-control'}
                        isError={errors.email && touched.email}
                        errorMessage={t(errors.email)}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.phone ?? ''}
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        inputID={'phone'}
                        labelText={t('label.phone_number')}
                        inputType={'text'}
                        isRequiredField
                        placeholder={t('placeholder.enter_phone_number')}
                        inputClassName={'form-control'}
                        isError={errors.phone && touched.phone}
                        errorMessage={t(errors.phone)}
                      />
                    </div>
                    <FormHeader text={t('title.permission')} />
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-12'}
                        value={values.roleId ?? ''}
                        labelText={t('label.role')}
                        selectClassName={'form-control'}
                        //onBlur={handleBlur('roleId')}
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
                                    permissionGroup.children && permissionGroup.children.length > 0
                                      ? permissionGroup.children.map((per) => per.id)
                                      : [];
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
                                        permissionGroup.children.map((per) => {
                                          return (
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
                                          );
                                        })}
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
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </CContainer>
  );

  if (permissionIds.includes(PERMISSION.GET_USER)) return returnComponent;
  else return <Page404 />;
};

export default UpdateAccount;
