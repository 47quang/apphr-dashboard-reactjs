import QTable from "src/components/table/Table";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeListButtonHeader } from "src/stores/actions/header";
import { Link } from 'react-router-dom';
import { CContainer } from "@coreui/react";
import BasicLoader from "src/components/loader/BasicLoader";



// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: 'departmentCode', title: 'Mã phòng ban' },
  { name: 'departmentName', title: 'Tên phòng ban' },
  { name: 'branches', title: 'Chi nhánh' },
]

const data = [
  {
    id: 1,
    departmentCode: 'IT',
    departmentName: 'IT',
    branches: ['APPHR Thủ Đức', 'APPHR Quận 1'],
  },
  {
    id: 2,
    departmentCode: 'ACC',
    departmentName: 'Kế toán',
    branches: ['APPHR Thủ Đức', 'APPHR Quận 1'],
  },
  {
    id: 3,
    departmentCode: 'SEC',
    departmentName: 'Bảo vệ',
    branches: ['APPHR Thủ Đức', 'APPHR Quận 1', 'APPHR Quận 2', 'APPHR Quận 3', 'APPHR Quận 4', 'APPHR Quận 5'],
  },
  {
    id: 4,
    departmentCode: 'EDU',
    departmentName: 'Giáo dục',
    branches: ['APPHR Thủ Đức', 'APPHR Quận 1', 'APPHR Quận 2', 'APPHR Quận 3', 'APPHR Quận 4', 'APPHR Quận 5'],
  },


];


const Department = ({ t, location }) => {
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
        <Link to={"/setting/department/newDepartment"} className="btn btn-primary" key="newDepartment">
          Tạo phòng ban
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
    ) : <QTable columnDef={columnDef} data={data} route={"/setting/department"} idxColumnsFilter={[0, 2]} />}
  </CContainer>;
};
export default Department;


