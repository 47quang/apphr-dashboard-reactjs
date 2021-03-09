import QTable from "src/components/table/Table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeListButtonHeader } from "src/stores/actions/header";
import { Link } from 'react-router-dom';
import { CContainer } from "@coreui/react";
import BasicLoader from "src/components/loader/BasicLoader";



// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: 'shortname', title: 'Mã vị trí' },
  { name: 'name', title: 'Tên vị trí' },
  { name: 'department', title: 'Phòng ban' },
  { name: 'shifts', title: 'Ca làm việc' },
]

const data = [
  {
    id: 1,
    shortname: 'DEV0',
    name: 'Nhân viên IT',
    department: 'IT',
    shifts: ['Ca sáng 1', 'Ca chiều 1'],
  },
  {
    id: 2,
    shortname: 'DEV1',
    name: 'Trưởng phòng IT',
    department: 'IT',
    shifts: ['Ca sáng 1', 'Ca chiều 1'],
  },
  {
    id: 3,
    shortname: 'SEC0',
    name: 'Nhân viên bảo vệ',
    department: 'Bảo vệ',
    shifts: ['Ca sáng 1', 'Ca chiều 1', 'Ca tối 1'],
  },
  {
    id: 4,
    shortname: 'SEC1',
    name: 'Trưởng phòng bảo vệ',
    department: 'Bảo vệ',
    shifts: ['Ca sáng 1', 'Ca chiều 1', 'Ca tối 1'],
  },
  {
    id: 5,
    shortname: 'ACC0',
    name: 'Kế toán',
    department: 'Kế toán',
    shifts: ['Ca sáng 1', 'Ca chiều 1'],
  },
  {
    id: 6,
    shortname: 'ACC1',
    name: 'Kế toán trưởng',
    department: 'Kế toán',
    shifts: ['Ca sáng 1', 'Ca chiều 1'],
  },
  {
    id: 7,
    shortname: 'TA',
    name: 'Trợ giảng',
    department: 'Giáo dục',
    shifts: [],
  },
  {
    id: 8,
    shortname: 'TE',
    name: 'Giáo viên',
    department: 'Giáo dục',
    shifts: [],
  },


];


const Position = ({ t, location }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let wait = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    wait();
    dispatch(
      changeListButtonHeader([
        <Link to={"/setting/position/newPosition"} className="btn btn-primary" key="newPosition">
          Tạo vị trí
        </Link>
      ])
    );
    return () => {
      dispatch(changeListButtonHeader([]));
      clearTimeout(wait);
    };
  }, []);

  return <CContainer fluid className="c-main mb-3 px-4">
    {isLoading ? (
      <BasicLoader isVisible={isLoading} radius={10} />
    ) : <QTable columnDef={columnDef} data={data} route={"/setting/position"} idxColumnsFilter={[0, 2]} />}
  </CContainer>;
};
export default Position;
