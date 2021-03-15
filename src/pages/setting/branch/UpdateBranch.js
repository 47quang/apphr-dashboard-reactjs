import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { fetchBranch, setEmptyBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import { changeActions } from 'src/stores/actions/header';
import BranchItemBody from './BranchItemBody';

//TODO: translate

const UpdateBranch = ({ t, location, history, match }) => {
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.branch);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);

  useEffect(() => {
    dispatch(fetchBranch(match?.params?.id));

    const actions = [
      {
        type: 'primary',
        name: 'Cập nhật',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchProvinces());
    return () => {
      dispatch(changeActions([]));
      dispatch(setEmptyBranch());
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
      isUpdate={true}
    />
  );
};

export default UpdateBranch;
