import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchProfile } from 'src/stores/actions/profile';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const UpdateProfile = ({ t, location, history, match }) => {
  const profileInfoForm = useRef();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  // const permissions = useSelector((state) => state.account.permissions);
  // const roles = useSelector((state) => state.account.roles);

  useEffect(() => {
    dispatch(fetchProfile(match?.params?.id));
  }, []);

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.PROFILE);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        profileInfoForm.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        profileInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  return <ProfileTabs t={t} isCreate={false} buttons={buttons} profile={profile} />;
};

export default UpdateProfile;
