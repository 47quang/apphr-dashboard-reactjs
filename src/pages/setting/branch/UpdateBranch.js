import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { fetchBranch, setEmptyBranch, updateBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
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
    dispatch(fetchBranch(match.params?.id));
    dispatch(fetchProvinces());
    return () => {
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
  const submitForm = (values) => {
    let form = values;
    form.provinceId = parseInt(form.provinceId);
    form.districtId = parseInt(form.districtId);
    form.wardId = parseInt(form.wardId);

    // Call API UPDATE
    dispatch(updateBranch(form));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.BRANCH);
      },
      name: 'Quay lại',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        branchInfoForm.current.handleReset(e);
      },
      name: 'Reset',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        branchInfoForm.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];
  return (
    <BranchItemBody
      branchRef={branchInfoForm}
      branch={branch}
      validationSchema={SettingBranchInfoSchema}
      provinces={provinces}
      districts={districts}
      wards={wards}
      buttons={buttons}
      submitForm={submitForm}
    />
  );
};

export default UpdateBranch;
