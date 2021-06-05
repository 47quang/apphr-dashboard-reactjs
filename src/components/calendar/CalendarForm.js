import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewTaskSchedule } from 'src/schema/formSchema';
import { fetchShifts } from 'src/stores/actions/shift';
import { renderButtons } from 'src/utils/formUtils';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const CalendarForm = ({ isOpen, handleConfirm, handleCancel, t, day }) => {
  let newTask = {
    shiftId: '',
    start: '',
    end: '',
    endTime: '',
  };
  const shifts = useSelector((state) => state.shift.shifts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchShifts({
        day: day,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={newTask}
            validationSchema={NewTaskSchedule}
            enableReinitialize
            onSubmit={(values) => {
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('label.new_task')}</h5>
                    <Cancel fontSize="large" onClick={handleCancel} role="button" style={{ color: '#969696' }} />
                  </div>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.shiftId ?? ''}
                      onBlur={props.handleBlur(`shiftId`)}
                      onChange={(e) => {
                        let selected = +e.target.value;
                        if (selected !== 0) {
                          let shift = shifts.payload.filter((x) => x.id === selected)[0];
                          props.setFieldValue('start', shift.startCC);
                          props.setFieldValue('end', shift.endCC);
                        } else {
                          props.setFieldValue('start', '');
                          props.setFieldValue('end', '');
                        }
                        props.handleChange(`shiftId`)(e);
                      }}
                      inputID={`shiftId`}
                      labelText={t('label.shift')}
                      selectClassName={'form-control'}
                      placeholder={t('placeholder.select_field_type')}
                      isRequiredField
                      isTouched={props.touched.shiftId}
                      isError={props.errors.shiftId && props.touched.shiftId}
                      errorMessage={t(props.errors.shiftId)}
                      lstSelectOptions={shifts.payload}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.start ?? ''}
                      onBlur={props.handleBlur(`start`)}
                      onChange={props.handleChange(`start`)}
                      inputID={`start`}
                      labelText={t('label.start_time')}
                      inputType={'Time'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isDisable
                    />

                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.end ?? ''}
                      onBlur={props.handleBlur(`end`)}
                      onChange={props.handleChange(`end`)}
                      inputID={`end`}
                      labelText={t('label.end_time')}
                      inputType={'Time'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isDisable
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.endTime ?? ''}
                      onBlur={props.handleBlur('endTime')}
                      onChange={props.handleChange('endTime')}
                      inputID={'endTime'}
                      labelText={t('label.end_time_repeat')}
                      inputType={'date'}
                      inputClassName={'form-control'}
                      isTouched={props.touched.endTime}
                      isError={props.errors.endTime && props.touched.endTime}
                      errorMessage={t(props.errors.endTime)}
                    />
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit();
                      },
                      name: t('label.create_new'),
                    },
                  ])}
                  <br />
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarForm;
