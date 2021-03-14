import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasicLoader from "src/components/loader/BasicLoader";
import QTable from "src/components/table/Table";
import { changeListButtonHeader } from "src/stores/actions/header";
import { fetchShifts } from "src/stores/actions/shift";
import { api } from "src/stores/apis";

// shortname, name, startCC, endCC, coefficient
const columnDef = [
  { name: "shortname", title: "Mã ca làm" },
  { name: "name", title: "Tên ca làm" },
  { name: "startCC", title: "Giờ Check-in" },
  { name: "endCC", title: "Giờ Check-out" },
  { name: "coefficient", title: "Hệ số giờ làm" },
];

const data = [
  {
    id: 1,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 2,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 3,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 4,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 5,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 6,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
  {
    id: 7,
    shortname: "SA1",
    name: "Ca sáng 1",
    startCC: "08:30",
    endCC: "14:30",
    coefficient: 1,
  },
];

const Shifts = ({ t, location }) => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);
  const [isLoading, setIsLoading] = useState(true);

  const getShiftInfo = () => {
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 5,
      })
    );
  };
  useEffect(() => {
    let wait = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    wait();
    getShiftInfo();
    dispatch(
      changeListButtonHeader([
        <Link
          to={"/setting/shift/newShift"}
          className="btn btn-primary"
          key="newshift"
        >
          Tạo ca làm
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
          data={shifts}
          route={"/setting/shift/id="}
          idxColumnsFilter={[0, 1]}
        />
      )}
    </CContainer>
  );
};
export default Shifts;
