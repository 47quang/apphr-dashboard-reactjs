import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'src/components/input/Editor';
import Label from 'src/components/text/Label';
import { fetchPolicy, updatePolicy } from 'src/stores/actions/holiday';
import { renderButtons } from 'src/utils/formUtils';

const DayOffPolicy = ({ t, location, history }) => {
  const policy = useSelector((state) => state.holiday.policy);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPolicy());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-xl-8">
          <Formik
            enableReinitialize
            initialValues={policy}
            onSubmit={(values) => {
              dispatch(
                updatePolicy(
                  {
                    key: '__policy',
                    data: values.content,
                  },
                  t('message.successful_update'),
                ),
              );
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
              <form autoComplete="off">
                <div className="wrapper">
                  <div className="form-group col-xl-12">
                    <Label text={t('label.day_off_policy')} required />
                    <Editor placeholder={t('placeholder.enter_day_off_policy')} value={values.content} onChange={handleChange('content')} />
                  </div>
                </div>
                {renderButtons([
                  {
                    type: 'button',
                    className: `btn btn-primary`,
                    onClick: (e) => {
                      handleSubmit(e);
                    },
                    name: t('label.update'),
                  },
                ])}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default DayOffPolicy;
