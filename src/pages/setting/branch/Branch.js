import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasicLoader from 'src/components/loader/BasicLoader';
import QTable from 'src/components/table/Table';
import { changeListButtonHeader } from 'src/stores/actions/header';
import { fetchBranches } from 'src/stores/actions/branch';

// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: 'shortname', title: 'Mã chi nhánh' },
  { name: 'name', title: 'Tên chi nhánh' },
  { name: 'address', title: 'Địa chỉ' },
];

const Branch = ({ t, location }) => {
  const branches = useSelector((state) => state.branch.branches);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      changeListButtonHeader([
        <Link
          to={'/setting/branch/newBranch'}
          className="btn btn-primary"
          key="newBranch"
        >
          Tạo chi nhánh
        </Link>,
      ])
    );
    dispatch(fetchBranches());
    setIsLoading(false);
    return () => {
      dispatch(changeListButtonHeader([]));
    };
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <QTable
          columnDef={columnDef}
          data={branches}
          route={'/setting/branch/id='}
          idxColumnsFilter={[0, 1]}
        />
      )}
    </CContainer>
  );
};
export default Branch;
