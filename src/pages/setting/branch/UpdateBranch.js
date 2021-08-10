import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import Page404 from 'src/pages/page404/Page404';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { fetchBranch, updateBranch } from 'src/stores/actions/branch';
import { fetchProvinces } from 'src/stores/actions/location';
import BranchItemBody from './BranchItemBody';

const UpdateBranch = ({ t, location, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.branch);
  branch.provinces = useSelector((state) => state.location.provinces);
  branch.districts = useSelector((state) => state.location.districts);
  branch.wards = useSelector((state) => state.location.wards);
  const [loading, setLoading] = useState(true);

  const effectFunction = () => {
    if (permissionIds.includes(PERMISSION.GET_BRANCH)) {
      dispatch(fetchBranch(match.params?.id, setLoading));
      if (branch.provinces.length === 0) dispatch(fetchProvinces());
    } else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const submitForm = (values) => {
    let form = values;
    form.provinceId = parseInt(form.provinceId);
    form.districtId = parseInt(form.districtId);
    form.wardId = parseInt(form.wardId);
    delete form.wards;
    delete form.districts;
    delete form.provinces;
    // Call API UPDATE
    dispatch(updateBranch(form, t('message.successful_update')));
  };

  const buttons = permissionIds.includes(PERMISSION.UPDATE_BRANCH)
    ? [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.BRANCH);
          },
          name: t('label.back'),
          position: 'left',
        },
        {
          type: 'reset',
          className: `btn btn-primary mr-4`,
          onClick: (e) => {
            branchInfoForm.current.handleReset(e);
          },
          name: t('label.reset'),
        },
        {
          type: 'button',
          className: `btn btn-primary`,
          onClick: (e) => {
            branchInfoForm.current.handleSubmit(e);
          },
          name: t('label.update'),
        },
      ]
    : [
        {
          type: 'button',
          className: `btn btn-primary mr-4`,

          onClick: (e) => {
            history.push(ROUTE_PATH.BRANCH);
          },
          name: t('label.back'),
          position: 'left',
        },
      ];
  if (permissionIds.includes(PERMISSION.GET_BRANCH))
    return (
      <BranchItemBody
        branchRef={branchInfoForm}
        effectFunction={effectFunction}
        t={t}
        validationSchema={SettingBranchInfoSchema}
        buttons={buttons}
        submitForm={submitForm}
        loading={loading}
        isCreate={false}
      />
    );
  else return <Page404 />;
};

export default UpdateBranch;
