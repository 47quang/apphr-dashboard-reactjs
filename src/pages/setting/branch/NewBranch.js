import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { setEmptyBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { changeActions } from 'src/stores/actions/header';
import BranchItemBody from './BranchItemBody';

//TODO: translate

const NewBranchPage = ({ t, location, history }) => {
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.branch);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);

  useEffect(() => {
    dispatch(setEmptyBranch());

    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchProvinces());
    return () => {
      dispatch(changeActions([]));
    };
  }, []);

  useEffect(() => {
    if (branch.provinceId) {
      dispatch(fetchDistricts({ provinceId: branch.provinceId }));
    }
    if (branch.districtId) {
      dispatch(fetchWards({ districtId: branch.districtId }));
    }
  }, [branch.provinceId, branch.districtId]);

  const handleSubmit = (event) => {
    branchInfoForm.current.handleSubmit(event);
  };

  return (
    <BranchItemBody
      branchRef={branchInfoForm}
      branch={branch}
      validationSchema={SettingBranchInfoSchema}
      provinces={provinces}
      districts={districts}
      wards={wards}
      isUpdate={false}
    />
  );
};

export default NewBranchPage;
