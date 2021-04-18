import React from 'react';
import { PERMISSION } from 'src/constants/key';
import Page404 from '../page404/Page404';
import ProfileTabs from './ProfileTabs';

//TODO: translate

const UpdateProfile = ({ t, location, history, match }) => {
  // const profileInfoForm = useRef();
  // const dispatch = useDispatch();
  // const profile = useSelector((state) => state.profile.profile);
  // // const permissions = useSelector((state) => state.account.permissions);
  // // const roles = useSelector((state) => state.account.roles);

  // useEffect(() => {
  //   dispatch(fetchProfile(match?.params?.id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
  //     type: 'reset',
  //     className: `btn btn-primary mr-4`,
  //     onClick: (e) => {
  //       profileInfoForm.current.handleReset(e);
  //     },
  //     name: t('label.reset'),
  //   },
  //   {
  //     type: 'button',
  //     className: `btn btn-primary`,
  //     onClick: (e) => {
  //       profileInfoForm.current.handleSubmit(e);
  //     },
  //     name: t('label.create_new'),
  //   },
  // ];
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  if (permissionIds.includes(PERMISSION.GET_PROFILE)) return <ProfileTabs t={t} history={history} match={match} />;
  else return <Page404 />;
};

export default UpdateProfile;
