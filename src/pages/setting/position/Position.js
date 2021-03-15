import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { fetchPositions, deletePosition } from 'src/stores/actions/position';
import { changeActions } from 'src/stores/actions/header';

const columnDef = [
  { name: 'shortname', title: 'Mã vị trí' },
  { name: 'name', title: 'Tên vị trí' },
  { name: 'branchName', title: 'Chi nhánh' },
  { name: 'departmentName', title: 'Phòng ban' },
];

const Position = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.positions);

  useEffect(() => {
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => history.push('/setting/position/create'),
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchPositions());
    return () => {
      dispatch(changeActions([]));
    };
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deletePosition({ id: rowId }));
    dispatch(fetchPositions());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDef}
        data={positions.map((p) => {
          p.branchName = p.branch?.name;
          p.departmentName = p.department?.name;
          return p;
        })}
        route={'/setting/position/'}
        idxColumnsFilter={[0, 2]}
        deleteRow={deleteRow}
      />
    </CContainer>
  );
};
export default Position;
