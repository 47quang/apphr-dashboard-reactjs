import React from 'react';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const NewProfile = ({ t, location, history, match }) => {
  // const profileInfoForm = useRef();

  return <ProfileTabs t={t} history={history} match={match} />;
};

export default NewProfile;
