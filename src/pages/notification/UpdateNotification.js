import { CContainer } from '@coreui/react';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import NotificationForm from './NotificationForm';

const UpdateNotification = ({ t, location }) => {
  const notificationInfo = {
    title: '',
    content: '',
    to: [],
    files: [],
    createDate: new Date(2019, 5, 11, 5, 23, 59),
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto row">
        <div className="col-xl-8">
          <NotificationForm notificationInfo={notificationInfo} />
        </div>
        <div className="col-xl-4">
          <div className="shadow bg-white rounded p-4 container">
            <FormHeader text="Người đăng" />
            <div className="text-center mb-3">
              <img src="https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg?w=800&quality=85" alt="alternatetext" height="200px" />
            </div>
            <CommonTextInput
              containerClassName="form-group"
              inputClassName="form-control"
              isDisable
              value={'Nguyễn Lê Tiến Đạt'}
              labelText="Người tạo"
            />
            <CommonTextInput
              containerClassName="form-group"
              inputClassName="form-control"
              isDisable
              value={notificationInfo.createDate.toLocaleString()}
              labelText="Thời gian tạo"
            />
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default UpdateNotification;
