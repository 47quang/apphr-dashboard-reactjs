import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasicLoader from "src/components/loader/BasicLoader";
import QTable from "src/components/table/Table";
import { changeListButtonHeader } from "src/stores/actions/header";
import {
  fetchPositions,
  setDeletedPositionId,
  deletePosition,
} from "src/stores/actions/position";
import { changeActions } from "src/stores/actions/header";

const columnDef = [
  { name: "shortname", title: "Mã vị trí" },
  { name: "name", title: "Tên vị trí" },
  { name: "departmentId", title: "Phòng ban" },
  { name: "branchId", title: "Chi nhánh" },
];

const Position = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const positions = useSelector((state) => state.position.positions);

  useEffect(() => {
    let wait = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    wait();
    const actions = [
      {
        type: "primary",
        name: "Tạo vị trí",
        callback: () => {
          history.push("/setting/position/newPosition");
        },
      },
    ];
    dispatch(changeActions(actions));
    dispatch(fetchPositions());
    return () => {
      clearTimeout(wait);
    };
  }, []);

  const deleteRowFunc = async (delRowId) => {
    dispatch(setDeletedPositionId(delRowId));
    dispatch(deletePosition(delRowId));
    dispatch(fetchPositions());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <QTable
          columnDef={columnDef}
          data={positions}
          route={"/setting/position/id="}
          idxColumnsFilter={[0, 2]}
          deleteRowFunc={deleteRowFunc}
        />
      )}
    </CContainer>
  );
};
export default Position;
