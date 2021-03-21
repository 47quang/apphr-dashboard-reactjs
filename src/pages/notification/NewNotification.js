import { CContainer } from '@coreui/react';
import React from 'react';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import NotificationForm from './NotificationForm';

const NewNotification = ({ t, location }) => {
  const notificationInfo = {
    title: '',
    content: '',
    to: [],
    files: [],
    createDate: new Date(2019, 5, 11, 5, 23, 59),
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto col-lg-8">
        <NotificationForm notificationInfo={notificationInfo} />
      </div>
    </CContainer>
  );
};

export default NewNotification;
