import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { renderButtons } from 'src/utils/formUtils';

const ArticleTypeItemBody = ({ t, typeRef, type, validationSchema, submitForm, buttons, loading }) => {
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="shadow bg-white rounded p-4 container col-xl-6">
            <Formik
              innerRef={typeRef}
              enableReinitialize
              initialValues={type}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <form autoComplete="off">
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.code}
                      onBlur={handleBlur('code')}
                      onChange={handleChange('code')}
                      inputID={'code'}
                      labelText={t('label.article_type_code')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_article_type_code')}
                      inputClassName={'form-control'}
                      isDisable={true}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.name}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      inputID={'name'}
                      labelText={t('label.article_type_name')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_article_type_name')}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={t(errors.name)}
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

export default ArticleTypeItemBody;
