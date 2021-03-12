import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BasicLoader from "src/components/loader/BasicLoader";
import QTable from "src/components/table/Table";
import { changeListButtonHeader } from "src/stores/actions/header";

// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: "shortname", title: "Mã phòng ban" },
  { name: "name", title: "Tên phòng ban" },
  { name: "branches", title: "Chi nhánh" },
];

const data = [
  {
    id: 1,
    shortname: "IT",
    name: "IT",
    branches: ["APPHR Thủ Đức", "APPHR Quận 1"],
  },
  {
    id: 2,
    shortname: "ACC",
    name: "Kế toán",
    branches: ["APPHR Thủ Đức", "APPHR Quận 1"],
  },
  {
    id: 3,
    shortname: "SEC",
    name: "Bảo vệ",
    branches: [
      "APPHR Thủ Đức",
      "APPHR Quận 1",
      "APPHR Quận 2",
      "APPHR Quận 3",
      "APPHR Quận 4",
      "APPHR Quận 5",
    ],
  },
  {
    id: 4,
    shortname: "EDU",
    name: "Giáo dục",
    branches: [
      "APPHR Thủ Đức",
      "APPHR Quận 1",
      "APPHR Quận 2",
      "APPHR Quận 3",
      "APPHR Quận 4",
      "APPHR Quận 5",
    ],
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
    };
    wait();
    dispatch(
      changeListButtonHeader([
        <Link
          to={"/setting/department/newDepartment"}
          className="btn btn-primary"
          key="newDepartment"
        >
          Tạo phòng ban
        </Link>,
      ])
    );
    return () => {
      dispatch(changeListButtonHeader([]));
      clearTimeout(wait);
    };
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <QTable
          columnDef={columnDef}
          data={data}
          route={"/setting/department"}
          idxColumnsFilter={[0, 2]}
        />
      )}
    </CContainer>
  );
};
export default Department;
