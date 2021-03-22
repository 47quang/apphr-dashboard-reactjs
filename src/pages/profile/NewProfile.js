import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActions } from 'src/stores/actions/header';
import { createProfile, setEmptyProfile } from 'src/stores/actions/profile';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const NewProfile = ({ t, location, history }) => {
  const profileInfoForm = useRef();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const permissions = useSelector((state) => state.account.permissions);
  const roles = useSelector((state) => state.account.roles);

  useEffect(() => {
    dispatch(setEmptyProfile());
  }, []);

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/profile');
      },
      name: 'Quay lại',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        profileInfoForm.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];
  console.log('NEW PROFILE');
  return <ProfileTabs isCreate={true} buttons={buttons} profile={profile} />;
};

export default NewProfile;
