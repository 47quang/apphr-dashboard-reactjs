import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import BasicLoader from 'src/components/loader/BasicLoader';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { SettingPositionInfoSchema } from 'src/schema/formSchema';
import { changeActions, changeListButtonHeader } from 'src/stores/actions/header';

//TODO: translate
const listOfBranches = [
  { id: 1, name: 'APPHR Thủ Đức' },
  { id: 2, name: 'APPHR Quận 1' },
  { id: 3, name: 'APPHR Quận 2' },
  { id: 4, name: 'APPHR Quận 3' },
  { id: 5, name: 'APPHR Quận 4' },
  { id: 6, name: 'APPHR Quận 5' },
  { id: 7, name: 'APPHR Quận 6' },
  { id: 8, name: 'APPHR Quận 7' },
  { id: 9, name: 'APPHR Quận 8' },
  { id: 10, name: 'APPHR Quận 9' },
  { id: 11, name: 'APPHR Quận 10' },
];

const listOfShifts = [
  { id: 1, name: 'Ca sáng 1' },
  { id: 2, name: 'Ca sáng 2' },
  { id: 3, name: 'Ca sáng 3' },
  { id: 4, name: 'Ca chiều 1' },
  { id: 5, name: 'Ca chiều 2' },
  { id: 6, name: 'Ca chiều 3' },
  { id: 7, name: 'Ca tối 1' },
  { id: 8, name: 'Ca tối 2' },
  { id: 9, name: 'Ca tối 3' },
];
const listOfDepartments = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'Bảo vệ' },
  { id: 3, name: 'Kế toán' },
  { id: 4, name: 'Giáo dục' },
];

const NewPositionPage = ({ t, location, match }) => {
  const params = match.params;
  const positionInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    shortname: '',
    department: '',
    branches: [],
    shifts: [],
    description: '',
  });

  const getPositionInfo = () => {
    setInitialValues({
      name: 'Nhân viên IT',
      shortname: 'DEV0',
      department: 'IT',
      branches: [1, 3],
      shifts: [1, 3],
      description: 'Nhân viên IT',
    });
  };

  useEffect(() => {
    if (params?.id) getPositionInfo();
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => {},
      },
    ];
    dispatch(changeActions(actions));
  }, []);

  const handleSubmitInfo = (values) => {
    console.log(values);
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={positionInfoForm}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SettingPositionInfoSchema}
              onSubmit={(values) => handleSubmitInfo(values)}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <form autoComplete="off">
                  <FormHeader text="Thêm vị trí" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.shortname}
                      onBlur={handleBlur('shortname')}
                      onChange={handleChange('shortname')}
                      inputID={'shortname'}
                      labelText={'Mã vị trí'}
                      inputType={'text'}
                      placeholder={'Nhập mã vị trí'}
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
                      labelText={'Tên vị trí'}
                      inputType={'text'}
                      placeholder={'Nhập tên vị trí'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.name}
                      isError={errors.name && touched.name}
                      errorMessage={errors.name}
                    />
                  </div>
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.department}
                      labelText={'Phòng ban'}
                      selectClassName={'form-control'}
                      isRequiredField
                      onBlur={handleBlur('department')}
                      onChange={handleChange('department')}
                      inputID={'department'}
                      lstSelectOptions={listOfDepartments}
                      placeholder={'Chọn phòng ban'}
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Chi nhánh" />
                      <div role="group" className="d-flex flex-row flex-wrap justify-content-between border">
                        <CommonMultiSelectInput
                          values={values.branches}
                          onChangeValues={handleChange('branches')}
                          listValues={listOfBranches}
                          placeholder={'Chọn chi nhánh'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-12">
                      <Label text="Ca làm việc" />
                      <div role="group" className="d-flex flex-row flex-wrap justify-content-between border">
                        <CommonMultiSelectInput
                          values={values.shifts}
                          onChangeValues={handleChange('shifts')}
                          listValues={listOfShifts}
                          placeholder={'Chọn ca làm việc'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.description}
                      onBlur={handleBlur('description')}
                      onChange={handleChange('description')}
                      inputID={'description'}
                      labelText={'Ghi chú'}
                      inputClassName={'form-control'}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </CContainer>
  );
};

export default NewPositionPage;
