import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik } from 'formik';
import React from 'react';
import { NewTaskSchedule } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';

const CalendarForm = ({ isOpen, handleConfirm, handleCancel, t, shifts }) => {
  // const handleChange = (event) => {
  //   setType(event.target.value);
  // };
  let newTask = {
    shiftId: '',
    start: '',
    end: '',
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={newTask}
            validationSchema={NewTaskSchedule}
            enableReinitialize
            onSubmit={(values) => {
              // setNewField(values);
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <h5>{t('label.new_task')}.</h5>
                  <hr className="mt-1" />
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={props.values.shiftId ?? ''}
                      onBlur={props.handleBlur(`shiftId`)}
                      onChange={(e) => {
                        let selected = +e.target.value;
                        console.log(selected);
                        if (selected !== 0) {
                          let shift = shifts.filter((x) => x.id === selected)[0];
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
                      lstSelectOptions={shifts}
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
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary  mx-2`,
                      onClick: (e) => {
                        handleCancel();
                      },
                      name: t('label.cancel'),
                      position: 'right',
                    },
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
