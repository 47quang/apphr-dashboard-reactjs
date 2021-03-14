import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { fetchDepartments } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';

const columnDef = [
  { name: 'shortname', title: 'Mã phòng ban' },
  { name: 'name', title: 'Tên phòng ban' },
  { name: 'branches', title: 'Chi nhánh' },
];

const Department = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo phòng ban',
        callback: () => history.push('/setting/department/newDepartment'),
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchDepartments());
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDef}
        data={departments}
        route={'/setting/department/id='}
        idxColumnsFilter={[0, 2]}
        multiValuesCols={[2]}
      />
    </CContainer>
  );
};
export default Department;
