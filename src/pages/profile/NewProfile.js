import React from 'react';
import { PERMISSION } from 'src/constants/key';
import Page404 from '../page404/Page404';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const NewProfile = ({ t, location, history, match }) => {
  // const profileInfoForm = useRef();
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  if (permissionIds.includes(PERMISSION.CREATE_PROFILE)) return <ProfileTabs t={t} history={history} match={match} />;
  else return <Page404 />;
};

export default NewProfile;
