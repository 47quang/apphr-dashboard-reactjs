import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmptyProfile } from 'src/stores/actions/profile';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const NewProfile = ({ t, location, history, match }) => {
  // const profileInfoForm = useRef();

  return <ProfileTabs t={t} history={history} match={match} />;
};

export default NewProfile;
