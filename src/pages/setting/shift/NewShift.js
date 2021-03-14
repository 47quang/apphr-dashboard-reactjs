import { CContainer } from '@coreui/react';
import { Field, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { SettingShiftInfoSchema } from 'src/schema/formSchema';
import { fetchBranches } from 'src/stores/actions/branch';
import { changeActions } from 'src/stores/actions/header';
import { createNewShift } from 'src/stores/actions/shift';
import { REDUX_STATE } from 'src/stores/states';

const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const typeCC = [
  { id: 'WIFI', name: 'WIFI' },
  { id: 'QR_CODE', name: 'QR_CODE' },
];

const NewShift = ({ t, location, history }) => {
  const shiftRef = useRef();
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.shift.shift);
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    dispatch({ type: REDUX_STATE.shift.EMPTY_VALUE });

    dispatch(
      fetchBranches({
        page: 0,
        perpage: 1000,
      }),
    );
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
    };
  }, [dispatch]);

  const handleSubmit = () => {
    const enCodeChecked = (operateLoop) => {
      return operateLoop.reduce((acc, val) => {
        acc[parseInt(val)] = 1;
        return acc;
      }, Array(7).fill(0));
    };

    const convertTime = (time) => {
      return time + ':00';
    };
    const form = shiftRef.current.values;
    form.operateLoop = enCodeChecked(form.operateLoop);
    form.startCC = convertTime(form.startCC);
    form.endCC = convertTime(form.endCC);
    dispatch(createNewShift(form));
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik innerRef={shiftRef} enableReinitialize initialValues={shift?.shift ? shift.shift : shift} validationSchema={SettingShiftInfoSchema}>
            {({ values, errors, touched, handleChange, setValues, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã ca làm'}
                    inputType={'text'}
                    placeholder={'Nhập mã ca làm'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.shortname}
                    isError={errors.shortname && touched.shortname}
                    errorMessage={errors.shortname}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên ca làm'}
                    inputType={'text'}
                    placeholder={'Nhập tên ca làm'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.name}
                    isError={errors.name && touched.name}
                    errorMessage={errors.name}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.startCC}
                    onBlur={handleBlur('startCC')}
                    onChange={handleChange('startCC')}
                    inputID={'startCC'}
                    labelText={'Giờ check-in'}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.startCC}
                    isError={errors.startCC && touched.startCC}
                    errorMessage={errors.startCC}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.endCC}
                    onBlur={handleBlur('endCC')}
                    onChange={handleChange('endCC')}
                    inputID={'endCC'}
                    labelText={'Giờ check-out'}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.endCC}
                    isError={errors.endCC && touched.endCC}
                    errorMessage={errors.endCC}
                    minTime={values.startCC}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.coefficient}
                    onBlur={handleBlur('coefficient')}
                    onChange={handleChange('coefficient')}
                    inputID={'coefficient'}
                    labelText={'Hệ số giờ làm'}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={errors.coefficient}
                  />
                </div>
                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Thời gian hoạt động của ca làm" required={true} />
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
                        <small className={'text-danger'}>{errors.operateLoop}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Chi nhánh" required={true} />
                    <div className="d-flex flex-row flex-wrap justify-content-between border">
                      <CommonMultiSelectInput
                        values={values.branchIds}
                        onChangeValues={handleChange('branchIds')}
                        listValues={branches}
                        setValues={setValues}
                        placeholder={'Chọn chi nhánh'}
                      />
                    </div>
                    {touched.branchIds && errors.branchIds && (
                      <div>
                        <small className={'text-danger'}>{errors.branchIds}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.typeCC}
                    onBlur={handleBlur('typeCC')}
                    onChange={handleChange('typeCC')}
                    inputID={'typeCC'}
                    labelText={'Hình thức điểm danh'}
                    selectClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.typeCC}
                    isError={errors.typeCC && touched.typeCC}
                    errorMessage={errors.typeCC}
                    lstSelectOptions={typeCC}
                    placeholder={'Chọn hình thức điểm danh'}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default NewShift;
