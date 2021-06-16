import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AlertSnackbar from 'src/components/alert_snackbar/AlertSnackbar';
import { LoginSchema } from 'src/schema/formSchema';
import { login } from 'src/stores/actions/user';

const Login = ({ location, history }) => {
  const { t } = useTranslation();
  const formValue = useRef();
  const dispatch = useDispatch();
  const handleLogin = (value) => {
    dispatch(login({ ...value }, history));
  };
  return (
    <>
      <Helmet>
        <title>{'APPHR | ' + t('title.login')}</title>
      </Helmet>
      <AlertSnackbar />
      <div className="c-app c-default-layout flex-column justify-content-center" style={{ background: '#3c4b64' }}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8} sm={12} lg={7} xl={6} xxl={5}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      innerRef={formValue}
                      validationSchema={LoginSchema}
                      initialValues={{
                        username: '',
                        password: '',
                      }}
                      onSubmit={(value) => {
                        handleLogin(value);
                      }}
                    >
                      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <CForm>
                          <h1>{t('title.login')}</h1>
                          <p className="text-muted">{t('message.sign_in')}</p>
                          <CInputGroup className="d-flex">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              value={values.username}
                              id="username"
                              placeholder={t('label.username')}
                              autoComplete="username"
                              name="username"
                              onChange={handleChange('username')}
                              onBlur={handleBlur('username')}
                            />
                          </CInputGroup>
                          <CRow className="ml-1 my-1">
                            {errors.username && touched.username && <small className={'text-danger'}> {t(errors.username)}</small>}
                          </CRow>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              id="password"
                              placeholder={t('label.password')}
                              autoComplete="current-password"
                              name="password"
                              onChange={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                            />
                          </CInputGroup>
                          <CRow className="ml-1 mt-1 mb-3">
                            {errors.password && touched.password && <small className={'text-danger'}> {t(errors.password)}</small>}
                          </CRow>
                          <CRow>
                            <CCol xs="12">
                              <CButton color="primary" className="px-4" onClick={handleSubmit}>
                                {t('title.login')}
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
