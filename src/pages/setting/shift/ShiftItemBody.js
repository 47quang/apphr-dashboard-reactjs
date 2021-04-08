import { CContainer } from '@coreui/react';
import { Field, Formik } from 'formik';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { renderButtons } from 'src/utils/formUtils';

const ShiftItemBody = ({ t, shiftRef, shift, validationSchema, branches, buttons, submitForm }) => {
  const DAYS = [
    t('label.sunday'),
    t('label.monday'),
    t('label.tuesday'),
    t('label.wednesday'),
    t('label.thursday'),
    t('label.friday'),
    t('label.saturday'),
  ];

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-8">
          <Formik
            innerRef={shiftRef}
            enableReinitialize
            initialValues={shift.shift ?? shift}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {({ values, errors, touched, handleChange, setValues, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.code}
                    onBlur={handleBlur('code')}
                    onChange={handleChange('code')}
                    inputID={'code'}
                    labelText={t('label.shift_code')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_shift_code')}
                    isDisable={true}
                    inputClassName={'form-control'}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={t('label.shift_name')}
                    inputType={'text'}
                    placeholder={t('placeholder.enter_shift_name')}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={t(errors.name)}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.startCC}
                    onBlur={handleBlur('startCC')}
                    onChange={handleChange('startCC')}
                    inputID={'startCC'}
                    labelText={t('label.check_in_time')}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.startCC}
                    isError={errors.startCC && touched.startCC}
                    errorMessage={t(errors.startCC)}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-xl-6'}
                    value={values.endCC}
                    onBlur={handleBlur('endCC')}
                    onChange={handleChange('endCC')}
                    inputID={'endCC'}
                    labelText={t('label.check_out_time')}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.endCC}
                    isError={errors.endCC && touched.endCC}
                    errorMessage={t(errors.endCC)}
                    minTime={values.startCC}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-xl-12'}
                    value={values.coefficient}
                    onBlur={handleBlur('coefficient')}
                    onChange={handleChange('coefficient')}
                    inputID={'coefficient'}
                    labelText={t('label.working_time_coefficient')}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={t(errors.coefficient)}
                  />
                </div>
                <div className="row">
                  <div className="form-group col-xl-12">
                    <Label text={t('label.shift_time')} required={true} />
                    <div role="group" className="d-flex flex-row flex-wrap justify-content-around">
                      {DAYS.map((day, index) => (
                        <label key={index}>
                          <Field type="checkbox" name="operateLoop" value={index + ''} />
                          &nbsp;{day}
                        </label>
                      ))}
                    </div>
                    {touched.operateLoop && errors.operateLoop && (
                      <div>
                        <small className={'text-danger'}>{t(errors.operateLoop)}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-xl-12">
                    <Label text={t('label.branch')} required={true} />
                    <div className="d-flex flex-row flex-wrap justify-content-between border">
                      <CommonMultiSelectInput
                        values={values.branchIds}
                        onChangeValues={handleChange('branchIds')}
                        listValues={branches}
                        setValues={setValues}
                        placeholder={t('placeholder.select_branch')}
                      />
                    </div>
                    {touched.branchIds && errors.branchIds && (
                      <div>
                        <small className={'text-danger'}>{t(errors.branchIds)}</small>
                      </div>
                    )}
                  </div>
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

export default ShiftItemBody;
