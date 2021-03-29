import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { createBranch, setEmptyBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import BranchItemBody from './BranchItemBody';

const NewBranchPage = ({ t, location, history }) => {
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.branch);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);

  useEffect(() => {
    dispatch(setEmptyBranch());
    if (provinces.length === 0) dispatch(fetchProvinces());
    return () => {
      dispatch(setEmptyBranch());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (branch.provinceId) {
      dispatch(fetchDistricts({ provinceId: branch.provinceId }));
    }
    if (branch.districtId) {
      dispatch(fetchWards({ districtId: branch.districtId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch.provinceId, branch.districtId]);

  const submitForm = (values) => {
    let form = values;
    form.provinceId = parseInt(form.provinceId);
    form.districtId = parseInt(form.districtId);
    form.wardId = parseInt(form.wardId);
    // Call API CREATE
    delete form.id;
    dispatch(createBranch(form, history, t('message.successful_create')));
  };
  const buttons = [
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
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        branchInfoForm.current.handleSubmit(e);
      },
      name: t('label.create_new'),
    },
  ];
  return (
    <BranchItemBody
      branchRef={branchInfoForm}
      branch={branch}
      t={t}
      validationSchema={SettingBranchInfoSchema}
      provinces={provinces}
      districts={districts}
      wards={wards}
      buttons={buttons}
      submitForm={submitForm}
    />
  );
};

export default NewBranchPage;
