import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { fetchDepartments, deleteDepartment } from 'src/stores/actions/department';
import { changeActions } from 'src/stores/actions/header';

const Department = ({ t, location, history }) => {
  const columnDef = [
    { name: 'shortname', title: 'Mã phòng ban' },
    { name: 'name', title: 'Tên phòng ban' },
    { name: 'branchname', title: 'Chi nhánh' },
    { name: 'note', title: 'Ghi chú' },
  ];
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => history.push('/setting/department/create'),
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
    };
  }, []);

  const deleteRow = (rowId) => {
    dispatch(deleteDepartment({ id: rowId }));
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDef}
        data={departments.map((d) => {
          d.branchname = d.branch?.name;
          d.note = d.note.substr(0, 30) + '...';
          return d;
        })}
        route={'/setting/department/'}
        idxColumnsFilter={[0, 2]}
        deleteRow={deleteRow}
      />
    </CContainer>
  );
};
export default Department;
