import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmptyProfile } from 'src/stores/actions/profile';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const NewProfile = ({ t, location, history }) => {
  // const profileInfoForm = useRef();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  // const permissions = useSelector((state) => state.account.permissions);
  // const roles = useSelector((state) => state.account.roles);

  useEffect(() => {
    dispatch(setEmptyProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const buttons = [
  //   {
  //     type: 'button',
  //     className: `btn btn-primary mr-4`,
  //     onClick: (e) => {
  //       history.push(ROUTE_PATH.PROFILE);
  //     },
  //     name: t('label.back'),
  //     position: 'left',
  //   },
  //   {
  //     type: 'button',
  //     className: `btn btn-primary`,
  //     onClick: (e) => {
  //       profileInfoForm.current.handleSubmit(e);
  //     },
  //     name: t('label.create_new'),
  //     position: 'right',
  //   },
  // ];
  return <ProfileTabs t={t} isCreate={true} profile={profile} history={history} />;
};

export default NewProfile;
